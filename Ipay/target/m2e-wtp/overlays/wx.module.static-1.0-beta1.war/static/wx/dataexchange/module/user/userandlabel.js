var userandlabel = {
		data :[],
		count:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/admin/userandlabel/count.json',
				data : params,
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