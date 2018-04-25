#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import MongoClient

class DatabaseClient:
    """
    Attributes:
        _db_client: [Object] The instance of pymongo.MongoClient. This is for internal use.
        db: self._db_client[DB_NAME]. This is for use of database operations.
    """
    def __init__(self, db_host, db_port, db_name):
        self._db_client = MongoClient("{0}:{1}".format(db_host, db_port))
        self.db = self._db_client[db_name]

    def __get_db(self):
        return self.db

    def __get_articles(self):
        return self.db['articles'].find()

    def __get_articles_in_time_range(self, from_datetime, to_datetime):
        """
        Args:
            from_datetime: [Object] Instance of datetime class representing the start time line of articles.
            to_datetime: [Object] Instance of datetime class representing the end time line of articles.
        """
        return self.db['articles'].find({
            'publishedAt': {
                '$gte': from_datetime,
                '$lt': to_datetime
            }
        }).sort('publishedAt')

    def __insert_one_article(self, article):
        try:
            digest = article['digest']
        except KeyError:
            print "[Error] digest is not defined in article."
            return 0
        return self.db['articles'].replace_one({'digest': digest}, article, upsert=True).modified_count
