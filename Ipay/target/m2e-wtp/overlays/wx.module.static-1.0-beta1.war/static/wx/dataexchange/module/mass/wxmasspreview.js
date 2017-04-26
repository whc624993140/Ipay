var wxmasspreview = {
		data:[],
		sendNews2user:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.openid || params.openid==''){
				throw "openid is null";
			}
			if(!params.newsid || params.newsid==''){
				throw "newsid is null";
			}
			$.ajax({
				url : 'wx/admin/mass/preview/user/news/send.json',
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
				},error:function(data, msg, err){
					if (eck) {
						eck(data, msg, err);
					}
				},
				dataType : 'json'
			});
		},
		sendNews2Label:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.openid || params.openid==''){
				throw "openid is null";
			}
			if(!params.newsid || params.newsid==''){
				throw "newsid is null";
			}
			$.ajax({
				url : 'wx/admin/mass/preview/label/news/send.json',
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
				},error:function(data, msg, err){
					if (eck) {
						eck(data, msg, err);
					}
				},
				dataType : 'json'
			});
		},
		sendNews2Labels:function(){
			if(!params){
				throw "params is null";
			}
			if(!params.openid || params.openid==''){
				throw "openid is null";
			}
			if(!params.newsid || params.newsid==''){
				throw "newsid is null";
			}
			$.ajax({
				url : 'wx/admin/mass/preview/labels/news/send.json',
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
				},error:function(data, msg, err){
					if (eck) {
						eck(data, msg, err);
					}
				},
				dataType : 'json'
			});
		}

}