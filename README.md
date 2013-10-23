jsonp_timeout_test
==================

Tests of JSONP timeouts while using Internet Explorer. 

As part of our medium-sized web application, we utilize jQuery in the
client's browser to communicate with a Python-based HTTP server that
responds to JSONP requests. We noticed that the client code randomly
failed to receive responses from the server when running in Internet
Explorer 9 or Internet Explorer 10. Subsequent tests revealed that
such random failures occurred even while using other major browsers
running on Microsoft Windows 7 but extremely infrequently. Finally, no
such failures were observed when the client browsers were running on
Linux operating
system. [This](https://github.com/Q4mn44XH/jsonp_timeout_test)
repository contains simplified versions of our client and server code
that illustrate the basic problem and may be used to help debug this
issue. Their operation is summarized below. 

Python HTTP Server
------------------

The folder `jsonp_server` contains a simplified version of our HTTP
server in the file named `test_server.py`. It assumes that all GET
requests are jQuery
[JSONP](http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/)
requests. It responds to the JSONP requests with a callback parameter
that is a JavaScript object with a property named `result` whose value
is randomly set to either `true` or `false`.

The server is implemented as a Python 2.7
[`BaseHTTPServer.HTTPServer`](http://docs.python.org/2/library/basehttpserver.html#BaseHTTPServer.HTTPServer)
with a custom request handler implemented as a subclass of
[`BaseHTTPServer.BaseHTTPRequestHandler`](http://docs.python.org/2/library/basehttpserver.html#BaseHTTPServer.BaseHTTPRequestHandler). 

The `do_GET()` method of the request handler is listed below: 

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
            error_message = 'do_GET(): Internal server error while processing: {0} ({1})'.format(self.path, str(errorInst))
            self.send_error( httplib.INTERNAL_SERVER_ERROR, error_message )
            return 

Test 01
-------

A simple test that illustrates the problem is available under the
folder `test_01`. After you are running the Python HTTP server, you
can simply open the file named `test_01.html` in a web browser to run
the test. The client-side JavaScript is in the file named
`test_01.js`. It simply sends one JSONP request to the HTTP server on
`localhost` every second. It keep a count of the number requests that
have succeeded and the number that have failed. These numbers are
displayed in the browser. The corresponding code is listed below:

    $(document).ready(function() {
        console.log("ready!") ;
        var test_count = 0 ;
        var pass_count = 0 ;
        var fail_count = 0 ;
        var test_interval_ms = 1000 ;
        var get_ajax_obj = function() {
            return {
                url: "http://localhost:8090/test_request.html", 
                timeout: 3000, 
                dataType: 'jsonp',
                success: function(data) {
                    pass_count++ ;
                    $('#test_result').text(data['result'] ? "True" : "False") ;
                    $('#pass_count').text(pass_count) ;
                    run_next_test() ;
                }, 
                error: function() {
                    fail_count++ ;
                    $('#fail_count').text(fail_count) ;
                    run_next_test() ;
                }
            }
        } ;
    
        var run_next_test = function() { 
            setTimeout( function() {
                test_count++ ;
                $('#test_count').text(test_count) ;
                $.ajax(get_ajax_obj()); 
            }, test_interval_ms ) ;
        } ;
    
        run_next_test() ;
    });
    


Test01 Results
--------------

All tests were performed on a machine running 64-bit Windows 7
Ultimate with Service Pack 1. The following browsers were used during
the tests:

    +-------------------------------+-----------------+
    |           Browser             |     Version     |
    +-------------------------------+-----------------+
    | Microsoft Internet Explorer   | 10.0.9200.16721 |
    | Google Chrome                 | 30.0.1599.101 m |
    +-------------------------------+-----------------+

Only one browser was running the client code at any given time during
these tests. The test results are shown below:

    +-------------------------------+--------------+--------------+
    |           Browser             |  Total Tests | Failed Tests |
    +-------------------------------+--------------+--------------+
    | Microsoft Internet Explorer   |    101       |     42       |
    | Google Chrome                 |    150       |      0       |
    +-------------------------------+--------------+--------------+


