$(document).ready(function() {
    var test_count = 0 ;
    var pass_after_retry_count = 0 ;
    var pass_without_retry_count = 0 ;
    var fail_count = 0 ;
    var is_ready_for_next_test = true ;
    var test_interval_ms = 1000 ;
    var start_time = new Date().getTime() ;
    var get_ajax_obj = function(initRetryCount) {
	return {
	    url: "http://localhost:8090/test_request.html", 
	    timeout: 3000, 
	    dataType: 'jsonp',
	    retryCount: initRetryCount, 
	    retryMaxCount: 10,
	    success: function(data) {
		if (this.retryCount > 0) {
		    pass_after_retry_count++ ;
		    $('#pass_after_retry_count').text(pass_after_retry_count) ;
		} else {
		    pass_without_retry_count++ ;
		    $('#pass_no_retry_count').text(pass_without_retry_count) ;
		}
		is_ready_for_next_test = true ;


		$('#test_result').text(data['result'] ? "True" : "False") ;
		$('#is_retrying').text("No") ;

		var average_interval = (new Date().getTime() - start_time)/(test_count) ;
		$('#average_interval').text(average_interval.toFixed(2)) ;
		$('#retry_state_info').fadeOut() ;
		$('#retry_count_info').fadeOut() ;
		
		run_next_test() ;
	    }, 
	    error: function() {
		this.retryCount++ ;
		if( this.retryCount <= this.retryMaxCount ) {
		    $('#retry_state_info').fadeIn() ;
		    $('#is_retrying').text("Yes") ;

		    $('#retry_count_info').fadeIn() ;
		    $('#retry_count').text(this.retryCount) ;
		    $('#retry_max').text(this.retryMaxCount) ;

		    $.ajax(get_ajax_obj(this.retryCount)) ;
		    return ;
		} else {
		    fail_count++ ;
		    is_ready_for_next_test = true ;
		    $('#fail_count').text(fail_count) ;
		    run_next_test() ;
		}
	    }
	}
    } ;

    var run_next_test = function() { 
	if (is_ready_for_next_test )
	{
	    setTimeout( function() {
		test_count++ ;
		$('#test_count').text(test_count) ;
		is_ready_for_next_test = false ;
		$.ajax(get_ajax_obj(0)); 
	    }, test_interval_ms ) ;
	}
    } ;

    $('#expected_interval').text(test_interval_ms) ;
    run_next_test() ;
});
