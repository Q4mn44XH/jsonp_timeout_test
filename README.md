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
Linux operating system. This repository contains simplified versions
of our client and server code that illustrate the basic problem and
may be used to help debug this issue. 

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


