var wxaddress = {
		data:[],
		list : function(sck, cck) {
			$.ajax({
				url : 'wx/admin/address/list.json',
				data : {},
				cache : false,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						wxaddress.data= data.data;
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
		clear:function(){
			wxaddress.data=[];
		}
}