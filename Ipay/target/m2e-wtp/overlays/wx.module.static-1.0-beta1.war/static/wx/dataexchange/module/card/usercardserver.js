var usercardserver = {
		data:[],
		consume:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.cardcode || params.cardcode==''){
				throw "cardcode is null";
			}
			$.ajax({
				url : 'wx/server/card/user/'+cardcode+'/consume.json',
				data : params,
				cache : false,
				traditional : true,
				type : 'PUT',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
				},
				complete : function(xhr, ts) {
					if (cck) {
						cck(xhr, ts);
					}
				},
				dataType : 'json'
			});
		},
		consumes:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.cardid || params.carid==''){
				throw "cardid is null";
			}
			if(!params.cardcode || params.cardcode==''){
				throw "cardcode is null";
			}
			$.ajax({
				url : 'wx/server/card/user/'+cardid+'/'+cardcode+'/consume.json',
				data : params,
				cache : false,
				traditional : true,
				type : 'PUT',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
				},
				complete : function(xhr, ts) {
					if (cck) {
						cck(xhr, ts);
					}
				},
				dataType : 'json'
			});
		}
}