#! /usr/bin/env python
import httplib
import urlparse
import json
import random
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

class MyRequestHandler(BaseHTTPRequestHandler):
    def __init__(self, request, client_address, server):
        BaseHTTPRequestHandler.__init__(self, request, client_address, server)
        return 

    def do_GET(self):
        try:
            #
            # Send OK and content type. 
            #
            self.send_response( httplib.OK )
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            #
            # Send the JSONP response body. 
            #
            parsed_path = urlparse.urlparse(self.path)
            parsed_query = urlparse.parse_qs(parsed_path.query)
            callback = parsed_query['callback'][0]
            result = random.choice([True, False])
            self.wfile.write( "{0}({1})".format( callback, 
                                                 json.dumps({ 'result' : result })) )
            return
        except IOError as errorInst:
            self.send_error( httplib.INTERNAL_SERVER_ERROR,
                             'do_GET(): Internal server error while processing: %s (%s)' % (self.path, str(errorInst)) )
            
            return 

def main():
    try:
        SERVER_PORT = 8090
        server = HTTPServer( ('localhost', SERVER_PORT), MyRequestHandler )
        server.serve_forever()
    except KeyboardInterrupt:
        server.socket.close()

if __name__ == '__main__':
    main()
