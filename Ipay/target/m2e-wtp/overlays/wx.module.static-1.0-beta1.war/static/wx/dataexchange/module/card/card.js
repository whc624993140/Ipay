var card = {
	data : new Map(),
	del:function(cardid,sck, cck,eck){
		if(!cardid||cardid==''){
			throw "cardid is null";
		}
		$.ajax({
			url : 'wx/admin/card/'+cardid+'/delete.json',
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
	},create:function(condition,sck, cck,eck){
		if(!condition){
			throw "condition is null";
		}
		$.ajax({
			url : 'wx/admin/card/create.json',
			data : {cardjson:JSON.stringify(condition)},
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
	},page : function(conditons, sck, cck) {
		$.ajax({
			url : 'wx/admin/card/page.json',
			data : conditons ? conditons : {},
			cache : false,
			traditional : true,
			type : 'post',
			success : function(data, status, xhr) {
				if (sck) {
					sck(data, status, xhr);
				}
				console.log(data);
				if (data.success) {
					if(!data.data.items){
						return ;
					}
					for (var int = 0; int < data.data.items.length; int++) {
						var item = data.data.items[int];
						card.data.put(item.card_id, item);
					}
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
	get : function(cardid) {
		if (!cardid) {
			return null;
		}
		var res = card.data.get(cardid);
		if (res) {
			return res;
		}
		$.ajax({
			url : 'wx/admin/card/' + cardid + '/get.json',
			data : null,
			cache : false,
			async : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (data.success) {
					card.data.put(cardid, data.data);
				}
			},
			dataType : 'json'
		});
		return card.data.get(cardid);
	},clear:function(){
		card.data=new Map();
	},sync:function(cardid,sck, cck,eck){
		if (!cardid) {
			throw 'cardid is null';
		}
		$.ajax({
			url : 'wx/admin/card/' + cardid + '/sync.json',
			data : null,
			cache : false,
			async : true,
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
	},modifystock:function(cardid,stock,sck, cck,eck){
		if (!cardid) {
			throw 'cardid is null';
		}
		if (!stock) {
			throw 'stock is null';
		}
		$.ajax({
			url : 'wx/admin/card/' + cardid + '/modifystock.json',
			data : {stock:stock},
			cache : false,
			async : true,
			traditional : true,
			type : 'POST',
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
