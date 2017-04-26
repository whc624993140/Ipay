var usermessage = {
		data :[],
		page : function(conditons, sck, cck) {
			if(!conditions.openid || conditions.openid==''){
				throw "openid is null";
			}
			$.ajax({
				url : 'wx/admin/usermessage/'+conditions.openid+'/page.json',
				data : conditons,
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						for (var int = 0; int < data.data.items.length; int++) {
							var item = data.data.items[int];
							usermessageusers.data.put(item.card_id, item);
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
		count:function(conditions,sck, cck,eck){
			if(!condition){
				throw "condition is null";
			}
			$.ajax({
				url : 'wx/admin/usermessage/count.json',
				data : condition,
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