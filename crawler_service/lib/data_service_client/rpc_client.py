#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import datetime

import pyjsonrpc

class DataServiceClient:
    """
    Attributes:
        http_client: [Object] The instance of pyjsonrpc.HttpClient.
    """
    def __init__(self, rpc_server_url):
        self.http_client = pyjsonrpc.HttpClient(url = rpc_server_url)

    def __add(self, a, b):
        return self.http_client.call('add', a, b);

    def __get_articles_in_time_range(self, from_datetime, to_datetime):
        """
        Request the articles which are published from 'from_datetime' to 'to_datetime'.
        Args:
            from_datetime
        """
        from_datetime = from_datetime.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        to_datetime = to_datetime.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        response_ = self.http_client.call('get_articles_in_time_range', from_datetime, to_datetime)
        if 'code' in response_:
            print "[Error] Failed to get articles in time range from database."
            return {}
        else:
            return json.loads(response_)

    def __insert_one_article(self, article):
        return self.http_client.call('insert_one_article', article)
