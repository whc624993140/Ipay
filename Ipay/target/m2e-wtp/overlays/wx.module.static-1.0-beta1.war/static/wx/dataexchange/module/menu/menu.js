var wxmenu = {
	data : [],
	list : function(sck, cck) {
		$.ajax({
			url : 'wx/admin/menu/tree.json',
			data : {},
			cache : false,
			traditional : true,
			type : 'post',
			success : function(data, status, xhr) {
				if (sck) {
					sck(data, status, xhr);
				}
				if (data.success) {
					wxmenu.data= data.data;
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
	save:function(condition,sck, cck,eck){
		if(!condition){
			throw "condition is null";
		}
		if(!condition.name || condition.name==''){
			throw "name is null";
		}
		if(!condition.key || condition.key==''){
			throw "key is null";
		}
		$.ajax({
			url : 'wx/admin/menu/save.json',
			data : condition,
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
	update:function(condition,sck, cck,eck){
		if(!condition){
			throw "condition is null";
		}
		$.ajax({
			url : 'wx/admin/menu/update.json',
			data : condition,
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
	del:function(id,sck, cck,eck){
		if(!id){
			throw "id is null";
		}
		
		$.ajax({
			url : 'wx/admin/menu/delete.json',
			data : {id :id},
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
	clickText:function(condition,sck, cck,eck){
		if(!condition){
			throw "condition is null";
		}
		if(!condition.id||condition.id==''){
			throw "id is null";
		}
		if(!condition.text||condition.text==''){
			throw "text is null";
		}
		$.ajax({
			url : 'wx/admin/menu/click/text.json',
			data : {'id':condition.id,'text':condition.text},
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
	viewLink:function(condition,sck, cck,eck){
		if(!condition){
			throw "condition is null";
		}
		if(!condition.id||condition.id==''){
			throw "id is null";
		}
		if(!condition.link||condition.link==''){
			throw "text is null";
		}
		$.ajax({
			url : 'wx/admin/menu/view/link.json',
			data : {'id':condition.id,'link':condition.link},
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
	clickNews:function(condition,sck, cck,eck){
		if(!condition){
			throw "condition is null";
		}
		if(!condition.id||condition.id==''){
			throw "id is null";
		}
		if(!condition.newid||condition.newid==''){
			throw "text is null";
		}
		$.ajax({
			url : 'wx/admin/menu/click/news.json',
			data : {'id':condition.id,'newid':condition.newid},
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
	release:function(sck, cck,eck){
		$.ajax({
			url : 'wx/admin/menu/release.json',
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
	clear:function(){
		wxmenu.data=[];
	}

}
