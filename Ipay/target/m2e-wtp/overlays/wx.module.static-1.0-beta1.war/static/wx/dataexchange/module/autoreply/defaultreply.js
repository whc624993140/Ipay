var defaultreply = {
		 data : [],
		 list : function(sck, cck,eck) {
				$.ajax({
					url : 'wx/admin/autoreply/default/list.json',
					data : {},
					cache : false,
					type : 'post',
					success : function(data, status, xhr) {
						if (sck) {
							sck(data, status, xhr);
						}
						if (data.success) {
							defaultreply.data= data.data;
						}
					},
					complete : function(xhr, ts) {
						if (cck) {
							cck(xhr, ts);
						}
					},
					error:function(data, msg, err){
						if (eck) {
							eck(data, msg, err);
						}
					},
					dataType : 'json'
				});
		},
		save:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/admin/autoreply/default/save.json',
				data : params,
				cache : false,
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
				error:function(data, msg, err){
					if (eck) {
						eck(data, msg, err);
					}
				},
				dataType : 'json'
			});
		},
		del:function(id,sck, cck,eck){
			if(!id||id==''){
				throw "id is null";
			}
			$.ajax({
				url : 'wx/admin/autoreply/default/'+id+'/delete.json',
				data : {},
				cache : false,
				type : 'post',
				async:false,
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
				error:function(data, msg, err){
					if (eck) {
						eck(data, msg, err);
					}
				},
				dataType : 'json'
			});
		},
		changeOpen:function(id,isOpen,sck, cck,eck){
			if(!id||id==''){
				throw "id is null";
			}
			$.ajax({
				url : 'wx/admin/autoreply/default/'+id+'/changeopen.json',
				data : {isOpen:isOpen},
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
				error:function(data, msg, err){
					if (eck) {
						eck(data, msg, err);
					}
				},
				dataType : 'json'
			});
		},
		clear:function(){
			defaultreply.data=[];
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
}