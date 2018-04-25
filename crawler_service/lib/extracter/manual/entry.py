#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import json
import random

import requests
from lxml import html

import sys
_PROJECT_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../')

USER_AGENTS = []
HTML_PATTERNS = {}

def _read_user_agents(user_agents_file):
    """
    Read the file storing all possible user agents used for article downloading.
    User agents will be stored as a global variable so that it can be only read once.
    Args:
        user_agents_file: [str] The path of user agents file relative to PROJECT_ROOT.
    """
    file_path = os.path.join(_PROJECT_ROOT, user_agents_file)
    file = open(file_path, 'r')
    for line in file.readlines():
        if not line:
            continue
        global USER_AGENTS
        USER_AGENTS.append(line.strip()[1: -1])
    random.shuffle(USER_AGENTS)
    file.close()

def _read_html_patterns(html_pattern_file):
    """
    Read the file storing all possible html patterns to be used to parse the HTML source code.
    The file is in Json format as following:
    {
        "url_pattern" : "html_pattern",
        ".*cnn\.com.*" : "/p[@class='zn-body__paragraph']"
    }
    Args:
        html_pattern_file: [str] The path of html patterns file relative to PROJECT_ROOT.
    """
    file_path = os.path.join(_PROJECT_ROOT, html_pattern_file)
    with open(file_path, 'r') as file:
        global HTML_PATTERNS
        HTML_PATTERNS = json.load(file)
        file.close()

def _build_headers():
    return {
        "Connection": "close",
        "User-Agent": random.choice(USER_AGENTS)
    }

def __extra_params():
    return {
        "user_agent_file": 'config/user_agents.txt',
        "html_pattern_file": 'config/html_patterns.json'
    }

def __extract(article_url):
    required_params = __extra_params()
    if not USER_AGENTS:
        _read_user_agents(required_params['user_agent_file'])
    if not HTML_PATTERNS:
        _read_html_patterns(required_params['html_pattern_file'])

    html_pattern = None

    for url_pattern in HTML_PATTERNS:
        if re.search(url_pattern, article_url) is not None:
            html_pattern = HTML_PATTERNS[url_pattern]
            break

    if html_pattern is not None:
        session_request = requests.session()
        session_response = session_request.get(article_url, headers = _build_headers())
        try:
            tree = html.fromstring(session_response.content)
            article = tree.xpath(html_pattern)
        except IndexError:
            print "[Error] Failed to parse html for url [{0}]".format(article_url)
            return None
        article = ''.join(article)
        return article
    return None
