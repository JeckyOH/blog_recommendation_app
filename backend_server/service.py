 #! /usr/bin/#!/usr/bin/env python

import pyjsonrpc

SERVER_ADDR = 'localhost'
SERVER_PORT = 4040

class RequestHandler(pyjsonrpc.HttpRequestHandler):

     @pyjsonrpc.rpcmethod
     def add(self, a, b):
         return a + b;

http_server = pyjsonrpc.ThreadingHttpServer(
    server_address = (SERVER_ADDR, SERVER_PORT),
    RequestHandlerClass = RequestHandler
)

print "Start RPC server on {0}:{1}".format(SERVER_ADDR, SERVER_PORT)
http_server.serve_forever()
