#!/usr/bin/env python
# -*- coding: utf-8 -*-

import entry

URL = 'http://www.bbc.com/news/world-europe-43841194'
TEST_STRING = 'His representative said in a statement: "It is with profound sorrow that we announce the loss of Tim Bergling, also known as Avicii.'
def test():
    article = entry.__extract(URL)
    assert TEST_STRING in article
    print "test passed.\n"

if __name__ == "__main__":
    test()
