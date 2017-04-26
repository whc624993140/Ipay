var user_card = {
	data : new Map(),
	unavailable:function(code,cardid,sck, cck,eck){
		if(!code||code==''){
			throw "code is null";
		}
		var url='wx/admin/card/user/';
		if(!cardid||cardid==''){
			url+=cardid+'/';
		}
		url+=code+'/unavailable.json';
		$.ajax({
			url : url,
			data : {},
			cache : false,
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
	},card_page : function(cardid,conditons, sck, cck) {
		if(!cardid||cardid==''){
			throw "cardid is null";
		}
		var url='wx/admin/card/user/page.json';
		if(!conditons){
			conditons={};
		}
		conditons['cardid']=cardid;
		$.ajax({
			url : url,
			data : conditons ,
			cache : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (sck) {
					sck(data, status, xhr);
				}
				if (data.success) {
					if(!data.data.items){
						return ;
					}
					for (var int = 0; int < data.data.items.length; int++) {
						var item = data.data.items[int];
						user_card.data.put(item.code, item);
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
	get : function(code) {
		if (!code) {
			return null;
		}
		var res = user_card.data.get(code);
		if (res) {
			return res;
		}
		$.ajax({
			url : 'wx/admin/card/user/' + code + '/get.json',
			data : null,
			cache : false,
			async : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (data.success) {
					user_card.data.put(code, data.data);
				}
			},
			dataType : 'json'
		});
		return user_card.data.get(cardid);
	},clear:function(){
		user_card.data=new Map();
	},consume:function(code,cardid,sck, cck,eck){
		if(!code||code==''){
			throw "code is null";
		}
		var url='wx/server/card/user/';
		if(cardid!=null&&cardid!=''){
			url+=cardid+'/';
		}
		url+=code+'/';
		url+='consume.json';
		$.ajax({
			url :url,
			data : {},
			cache : false,
			traditional : true,
			type : 'PUT',
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
	},sync:function(code,cardid,sck, cck,eck){
		if(!code||code==''){
			throw "code is null";
		}
		var url='wx/admin/card/user/';
		url+=code+'/';
		if(!cardid||cardid==''){
			url+=cardid+'/';
		}
		url+='sync.json';
		$.ajax({
			url :url,
			data : {},
			cache : false,
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

var meeting_ticket_user_card = {
		update:function(condition,sck, cck,eck){
			condition['_method']='put';
			$.ajax({
				url :'wx/admin/card/user/ticket/meeting/update.json',
				data : condition,
				cache : false,
			/*	traditional : true,*/
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




































