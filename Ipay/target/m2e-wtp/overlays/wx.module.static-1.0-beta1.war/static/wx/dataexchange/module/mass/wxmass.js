var wxmass = {
		data : [],
		sendtext2label:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.label || params.label==''){
				throw "label is null";
			}
			var url = '';
			if(params.label instanceof Array){
				url='labels/text/send.json';
			}else{
				url='label/'+params.label+'/text/send.json';
			}
			$.ajax({
				url : 'wx/admin/mass/'+url,
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
			var url = '';
			if(params.label instanceof Array){
				url='labels/image/send.json';
			}else{
				url='label/'+params.label+'/image/send.json';
			}
			$.ajax({
				url : 'wx/admin/mass/'+url,
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
			var url = '';
			if(params.label instanceof Array){
				url='labels/voice/send.json';
			}else{
				url='label/'+params.label+'/voice/send.json';
			}
			$.ajax({
				url : 'wx/admin/mass/'+url,
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
		sendnews2label:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.label || params.label==''){
				throw "label is null";
			}
			var url = '';
			if(params.label instanceof Array){
				url='labels/news/send.json';
			}else{
				url='label/'+params.label+'/news/send.json';
			}
			$.ajax({
				url : 'wx/admin/mass/'+url,
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
		sendtext2all:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.content || params.content==''){
				throw "content is null";
			}
			$.ajax({
				url : 'wx/admin/mass/all/text/send.json',
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
		sendImage2all:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.content || params.content==''){
				throw "src is null";
			}
			$.ajax({
				url : 'wx/admin/mass/all/image/send.json',
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
		sendVoice2all:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.content || params.content==''){
				throw "src is null";
			}
			$.ajax({
				url : 'wx/admin/mass/all/image/send.json',
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
		sendnews2all:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.content || params.content==''){
				throw "newsid is null";
			}
			$.ajax({
				url : 'wx/admin/mass/all/news/send.json',
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