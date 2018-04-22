#!/usr/bin/env python

import pika
import json

class RabbitMqClient:
    def __init__(self, server_url, queue_name):
        self.server_url = server_url
        self.queue_name = queue_name
        self.params = pika.URLParameters(server_url)
        self.params.socket_timeout = 3
        self.connection = pika.BlockingConnection(self.params)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue = queue_name)

    def send_message(self, message):
        self.channel.basic_publish(
            exchange = '',
            routing_key = self.queue_name,
            body = json.dumps(message))
        print "Send message to {0} : {1}.\n".format(self.queue_name, message)

    def get_message(self):
        method_frame, header_frame, body = self.channel.basic_get(self.queue_name)
        if method_frame:
            print "Received message from {0}: {1}.\n".format(self.queue_name, body)
            self.channel.basic_ack(method_frame.delivery_tag)
            return json.loads(body)
        else:
            print "No message.\n"
            return None

    def sleep(self, seconds):
        self.connection.sleep(seconds)
