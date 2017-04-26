var dictionary = {
	data : {},
	tree:function(sck, cck,eck){
		$.ajax({
			url : 'base/admin/dictionary/tree.json',
			data : {},
			cache : false,
			traditional : true,
			type : 'GET',
			success : function(data, status, xhr) {
				if (sck) {
					sck(data, status, xhr);
				}
				if(data.success){
					dictionary.data=data.data;
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
	treeByKey:function(key,sck, cck,eck){
		if(!key){
			throw "key is null";
		}
		$.ajax({
			url : 'base/admin/dictionary/'+key+'/tree.json',
			data : {},
			cache : false,
			traditional : true,
			type : 'GET',
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
	,create:function(name,key,parentid,sck, cck,eck){
		if(!name||!key||!parentid){
			throw "args is null";
		}
		$.ajax({
			url : 'base/admin/dictionary/save.json',
			data : {name:name,key:key,parentid:parentid},
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
		if(!id||id==''){
			throw "id is null";
		}
		$.ajax({
			url : 'base/admin/dictionary/delete.json',
			data : {id:id},
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
