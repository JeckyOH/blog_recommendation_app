#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
This module monitors the database of News API.
"""

import json
import hashlib
import redis

from newsapi import NewsApiClient

from lib.message_queue_client.message_queue_client import RabbitMqClient

_REDIS_HOST = 'localhost'
_REDIS_PORT = 6379

_MQ_URL = 'amqp://xxihpvle:8cjkdhbgzv_PBpDNgP6g3FI_PqhhArUE@buffalo.rmq.cloudamqp.com/xxihpvle'
_MQ_NAME = 'scraper_task_queue_from_news_api'

_REDIS_TIME_OUT = 3600 * 64

def _news_api_response_handler(response):
    articles = []
    for article in response['articles']:
        article['source'] = article['source']['name']
    articles.extend(response['articles'])
    return articles

def start(mq_url = None, mq_name = None):
    redis_client = redis.StrictRedis(_REDIS_HOST, _REDIS_PORT)
    mq_client = RabbitMqClient(_MQ_URL, _MQ_NAME)
    newsapi_client = NewsApiClient(api_key='7cb17bec72944ab4acdd0fe6ca2421ae')
    while True:
        try:
            response = newsapi_client.get_top_headlines(language='en', sources='cnn')
        except NewsAPIException as api_error:
            print "[Error] Failed to get articles from News API. Code [{0}]. Message [{1}]" \
                .format(api_error['code'], api_error['message'])
        else:
            article_num = 0
            article_list = _news_api_response_handler(response)
            for article in article_list:
                article_digest = hashlib.md5(article['title'].encode('utf-8')).digest().encode('base64')
                if (redis_client.get(article_digest) is None):
                    article_num += 1
                    article['digest'] = article_digest
                    redis_client.set(article_digest, article)
                    redis_client.expire(article_digest, _REDIS_TIME_OUT)
                    mq_client.send_message(article)
                else:
                    print "redis client failed.\n"
            print "Send {0} scraping task to message queue.".format(article_num)
            mq_client.sleep(1000)
