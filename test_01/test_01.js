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
