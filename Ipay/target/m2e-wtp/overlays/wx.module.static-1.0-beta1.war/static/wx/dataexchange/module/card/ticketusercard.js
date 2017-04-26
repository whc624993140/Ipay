var ticketusercard = {
		data:[],
		meetingUpdate:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/admin/card/user/ticket/meeting/update.json',
				data : params,
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
				},
				dataType : 'json'
			});
		}
}