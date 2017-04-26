var jssdk = {
		data :[],
		getCardByJsSdk:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/support/jssdk/config.json',
				data : params,
				cache : false,
				traditional : true,
				type : 'post',
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
		getCardByJsSdk_String:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/support/jssdk/jsonp/config.json',
				data : params,
				cache : false,
				traditional : true,
				type : 'post',
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
		getCards:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/support/jssdk/cards.json',
				data : params,
				cache : false,
				traditional : true,
				type : 'post',
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