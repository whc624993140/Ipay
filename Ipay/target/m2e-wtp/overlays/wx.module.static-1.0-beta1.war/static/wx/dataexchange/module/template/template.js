var template = {
	data : [],
	list : function(sck, cck) {
		if(template.data.length!=0){
			sck({success:true,data:template.data});
			return ;
		}
		$.ajax({
			url : 'wx/admin/template/list.json',
			data : {},
			cache : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (sck) {
					sck(data, status, xhr);
				}
				if (data.success) {
					template.data= data.data;
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
	del:function(id,sck, cck,eck){
		if(!id||id==''){
			throw "templateId is null";
		}
		$.ajax({
			url : 'wx/admin/template/'+id+'/delete.json',
			data : {},
			cache : false,
			traditional : true,
			type : 'DELETE',
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
	},sync:function(sck, cck,eck){
		$.ajax({
			url : 'wx/admin/template/sync.json',
			data : {},
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
	get : function(id) {
		if (!id) {
			return null;
		}
		for (var int = 0; int < template.data.length; int++) {
			if(template.data[int].template_id==id){ 
				return template.data[int];
			}
		}
		
	},clear:function(){
		template.data=[];
	}

}
