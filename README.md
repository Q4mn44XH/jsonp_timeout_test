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

Test 01
-------


Test01 Results
--------------

All tests were performed on a machine running 64-bit Windows 7
Ultimate with Service Pack 1. The following browsers were used during
the tests:

<table>
  <tr>
    <th>Browser</th>
    <th>Version</th>
  </tr>
  <tr>
    <td>Microsoft Internet Explorer</td>
    <td>10.0.9200.16721</td>
  </tr>
  <tr>
    <td>Google Chrome</td>
    <td>30.0.1599.101 m</td>
  </tr>
</table>

Only one browser was running the client code at any given time during
these tests. The test results are shown below:

<table>
  <tr>
    <th>Browser</th>
    <th>Number of Tests</th>
    <th>Number of Failures</th>
  </tr>
  <tr>
    <td>Microsoft Internet Explorer</td>
    <td>101</td>
    <td>42</td>
  </tr>
  <tr>
    <td>Google Chrome</td>
    <td>150</td>
    <td>0</td>
  </tr>
</table>

