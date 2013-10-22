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

Test 01
-------


Test 10
------- 


