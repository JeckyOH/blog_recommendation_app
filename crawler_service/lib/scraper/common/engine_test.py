#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../'))

import engine

def test():
    engine.start()

if __name__ == '__main__':
    test()
