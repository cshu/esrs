function execLoop(recv_func, send_func, context_obj){
	var last_received_data;
	for(;;){
		result = recv_func();
		if(!result) break;
		if(result.is_code){
			eval(result.data);
		}else{
			last_received_data=result.data;
		}
	}
}


	//test_data = [ {'is_code': true, 'data':'send_func(last_received_data+2)'},{'is_code': false, 'data' : 111}]
	//function test_recv(){
	//	return test_data.length ? test_data.pop() : undefined;
	//}
	//function test_send(test_param){
	//	console.log(test_param);
	//}
	//execLoop(test_recv, test_send, undefined);
