var wxnews = {
		data :[],
		singlePage:function(condition,sck, cck,eck){
			if(!condition){
				throw "condition is null";
			}
			$.ajax({
				url : 'wx/admin/news/single/page.json',
				data : condition,
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						wxnews.data= data.data;
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
		multiPage:function(condition,sck, cck,eck){
			if(!condition){
				throw "condition is null";
			}
			$.ajax({
				url : 'wx/admin/news/multi/page.json',
				data : condition,
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						wxnews.data= data.data;
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
		save:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/admin/news/single/save.json',
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
		multiSave:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/admin/news/multi/save.json',
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
		del:function(id,sck, cck,eck){
			if(!id){
				throw "id is null";
			}
			$.ajax({
				url : 'wx/admin/news/'+id+'/delete.json',
				data : {},
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
				},error:function(data, msg, err){
					if (eck) {
						eck(data, msg, err);
					}
				},
				dataType : 'json'
			});
		},
		get:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.id || params.id==''){
				throw "id is null";
			}
			$.ajax({
				url : 'wx/admin/news/'+params.id+'/get.json',
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
		clear:function(){
			wxnews.data=[];
		}
}