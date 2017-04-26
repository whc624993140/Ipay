var customsend = {
		data :[],
		count:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/admin/customsend/count.json',
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
		sendText2User:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.openid || params.openid==''){
				throw "openid is null";
			}
			$.ajax({
				url : 'wx/admin/customsend/user/'+params.openid+'/text/send.json',
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
		sendNews2User:function(params,openid,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.openid || params.openid==''){
				throw "openid is null";
			}
			$.ajax({
				url : 'wx/admin/customsend/user/'+params.openid+'/news/send.json',
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
		sendImage2User:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.openid || params.openid==''){
				throw "openid is null";
			}
			$.ajax({
				url : 'wx/admin/customsend/user/'+params.openid+'/image/send.json',
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
		sendVoice2User:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.openid || params.openid==''){
				throw "openid is null";
			}
			$.ajax({
				url : 'wx/admin/customsend/user/'+params.openid+'/voice/send.json',
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
		sendText2Label:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.label || params.label==''){
				throw "label is null";
			}
			var url = "";
			if(params.label instanceof Array){
				url="labels/text/send.json";
			}else{
				url="label/"+params.label+"/text/send.json";
			}
			$.ajax({
				url :'wx/admin/customsend/user/'+ url,
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
			if(!params.label || params.label==''){
				throw "label is null";
			}
			var url = "";
			if(params.label instanceof Array){
				url="labels/news/send.json";
			}else{
				url="label/"+params.label+"/news/send.json";
			}
			$.ajax({
				url :'wx/admin/customsend/user/'+ url,
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
		sendImage2Label:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.label || params.label==''){
				throw "label is null";
			}
			var url = "";
			if(params.label instanceof Array){
				url="labels/image/send.json";
			}else{
				url="label/"+params.label+"/image/send.json";
			}
			$.ajax({
				url :'wx/admin/customsend/user/'+ url,
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
		sendVoice2Label:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.label || params.label==''){
				throw "label is null";
			}
			var url = "";
			if(params.label instanceof Array){
				url="labels/voice/send.json";
			}else{
				url="label/"+params.label+"/voice/send.json";
			}
			$.ajax({
				url :'wx/admin/customsend/user/'+ url,
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