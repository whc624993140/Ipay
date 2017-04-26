var record = {
		data:[],
		add:function(params,sck, cck,eck){
			if(!params || params == ''){
				throw "params is null";
			}
			if(!params.openid || params.openid==''){
				throw "openid is null";
			}
			if(!params.pageid || params.pageid==''){
				throw "pageid is null";
			}
			if(!params.type || params.type==''){
				throw  "type is null";
			}
			if(!params.backmsg || params.backmsg==''){
				throw "backmsg is null";
			}
			$.ajax({
				url : 'wx/server/share/record/add.json',
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