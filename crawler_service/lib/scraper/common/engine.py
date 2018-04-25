#!/usr/bin/env python
# -*- coding: utf-8 -*-


from lib.message_queue_client.message_queue_client import RabbitMqClient

_DEDUPE_MQ_URL = 'amqp://xxihpvle:8cjkdhbgzv_PBpDNgP6g3FI_PqhhArUE@buffalo.rmq.cloudamqp.com/xxihpvle'
_DEDUPE_MQ_NAME = 'deduper_task_queue_from_common_scraper'

_TASK_MQ_URL = 'amqp://xxihpvle:8cjkdhbgzv_PBpDNgP6g3FI_PqhhArUE@buffalo.rmq.cloudamqp.com/xxihpvle'
_TASK_MQ_NAME = 'scraper_task_queue_from_news_api'

def required_params():
    return {
        "scraper_mq_url": "amqp://xxihpvle:8cjkdhbgzv_PBpDNgP6g3FI_PqhhArUE@buffalo.rmq.cloudamqp.com/xxihpvle",
        "scraper_mq_name": "scraper_task_queue_from_news_api",
        "deduper_mq_url": "amqp://xxihpvle:8cjkdhbgzv_PBpDNgP6g3FI_PqhhArUE@buffalo.rmq.cloudamqp.com/xxihpvle",
        "deduper_mq_name": "deduper_task_queue_from_common_scraper",
        "extracter": "manual"
    }

def start():
    params = required_params()
    __extract = getattr(
        __import__('lib.extracter.{0}.entry'.format(params['extracter']), fromlist = ['__extract']),
        '__extract')

    scraper_mq_client = RabbitMqClient(params['scraper_mq_url'], params['scraper_mq_name'])
    deduper_mq_client = RabbitMqClient(params['deduper_mq_url'], params['deduper_mq_name'])

    while True:
        msg = scraper_mq_client.get_message()
        if msg is None:
            scraper_mq_client.sleep(10)
        else:
            text = __extract(msg['url'])
            msg['text'] = text
            deduper_mq_client.send_message(msg)
            scraper_mq_client.sleep(10)
