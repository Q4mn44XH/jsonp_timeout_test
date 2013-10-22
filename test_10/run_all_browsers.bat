set TESTSITE="file:///%cd%/ajax_timeout_test.html"
start /b "" "C:\Program Files (x86)\Internet Explorer\iexplore.exe" %TESTSITE%
start /b "" "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" %TESTSITE%
start /b "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" %TESTSITE%
start /b "" "C:\Program Files (x86)\Opera\opera.exe" %TESTSITE%