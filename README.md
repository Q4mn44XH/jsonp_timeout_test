jsonp_timeout_test
==================

Tests of JSONP timeouts while using Internet Explorer. 

We have a simple Python HTTP server that responds to JSONP
requests. JavaScript (jQuery-based) running in a web browser
communicates with this server periodically to get a response. We have
observed that the JSONP requests fail randomly while using both
Internet Explorer 9 and Internet Explorer 10. The failures are less
frequent with Internet Explorer 10. Other browsers were also tested
(Chrome, Firefox and Opera). The number of failures were significantly
lower for all other browsers. The failures completely disappear when
the same test is run with any major browser on Linux operating
system. Of course, we could only test Chrome, Firefox, and Opera on
Linux but not Internet Explorer.


