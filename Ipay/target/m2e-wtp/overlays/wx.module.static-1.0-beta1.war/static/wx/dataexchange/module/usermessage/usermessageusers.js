var usermessageusers = {
		data :[],
		page : function(conditons, sck, cck) {
			$.ajax({
				url : 'wx/admin/usermessage/users/unread/page.json',
				data : conditons ? conditons : {},
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
				dataType : 'json'
			});
		},
		count:function(conditons, sck, cck){
			$.ajax({
				url : 'wx/admin/usermessage/users/unread/count.json',
				data : conditons ? conditons : {},
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
				dataType : 'json'
			});
		}
}