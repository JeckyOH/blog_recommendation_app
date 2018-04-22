#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import MongoClient

MONGO_DB_HOST = 'localhost'
MONGO_DB_PORT = 27017
DB_NAME = 'happy-reading'

client = MongoClient("{0}:{1}".format(MONGO_DB_HOST, MONGO_DB_PORT))

def get_db(db = DB_NAME):
    return client[db]

def get_articles():
    return list(client[DB_NAME]['articles'].find())
