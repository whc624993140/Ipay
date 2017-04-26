var wxmedia = {
		data:[],
		get:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.mediaid || params.mediaid==''){
				throw "mediaid is null";
			}
		}
}