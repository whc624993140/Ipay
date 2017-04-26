var reply = {
		data:[],
		list:function(prefix,sck, cck,eck){
			$.ajax({
				url : 'wx/admin/reply/list.json',
				data : {prefix:prefix},
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						reply.data= data.data;
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
		}
}