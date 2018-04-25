#!/usr/bin/env python
# -*- coding: utf-8 -*-

import datetime
from dateutil import parser

from sklearn.feature_extraction.text import TfidfVectorizer

from lib.data_service_client.rpc_client import DataServiceClient
from lib.message_queue_client.message_queue_client import RabbitMqClient

def _dedupe_article(task, db_client):
    published_at = parser.parse(task['publishedAt'])
    from_datetime = datetime.datetime(published_at.year, published_at.month, published_at.day - 1, 0, 0, 0, 0)
    to_datetime = from_datetime + datetime.timedelta(days=2)
    recent_articles = db_client._DataServiceClient__get_articles_in_time_range(from_datetime, to_datetime)
    if recent_articles:
        documents = [str(article['text']) for article in recent_articles]
        documents.insert(0, msg['text'])

        # Calculate similarity matrix
        tfidf = TfidfVectorizer().fit_transform(documents)
        pairwise_sim = tfidf * tfidf.T

        print pairwise_sim.A

        rows, _ = pairwise_sim.shape

        for row in range(1, rows):
            if pairwise_sim[row, 0] >= params['similarity_threshold']:
                # Duplicated news. Ignore.
                print "Duplicated news. Ignore."
                return
    task['publishedAt'] = parser.parse(task['publishedAt'])
    db_client._DataServiceClient__insert_one_article(task)

def required_params():
    return {
        "deduper_mq_url": "amqp://xxihpvle:8cjkdhbgzv_PBpDNgP6g3FI_PqhhArUE@buffalo.rmq.cloudamqp.com/xxihpvle",
        "deduper_mq_name": "deduper_task_queue_from_common_scraper",
        "similarity_threshold": 0.9,
        "data_service_server_url": "http://localhost:4040"
    }

def start():
    params = required_params()
    deduper_mq_client = RabbitMqClient(params['deduper_mq_url'], params['deduper_mq_name'])
    db_client = DataServiceClient(params['data_service_server_url'])

    while True:
        msg = deduper_mq_client.get_message()
        if msg is not None and msg['text']:
            _dedupe_article(msg, db_client)
        deduper_mq_client.sleep(1)
