var wxuser = {
		data:null,
		page:function(conditons,sck, cck,eck){
			$.ajax({
				url : 'wx/admin/user/page.json',
				data : conditons ? conditons : {},
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						/*for (var int = 0; int < data.data.items.length; int++) {
							var item = data.data.items[int];
							wxuser.data.put(item.card_id, item);
						}*/
						wxuser.data= data.data;
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
		count:function(condition,sck, cck,eck){
			if(!condition){
				throw "condition is null";
			}
			$.ajax({
				url : 'wx/admin/user/count.json',
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
		},
		get:function(condition,sck, cck,eck){
			if(!condition){
				throw "condition is null";
			}
			if(!condition.openid || condition.openid==''){
				throw "openid is null";
			}
			$.ajax({
				url : 'wx/admin/user/'+condition.openid+'/get.json',
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