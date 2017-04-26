var qrcard = {
	data : new Map(),
	gets : function(cardid, sck, cck) {
		var res=card.get(cardid);
		if(res){
			sck({success:true,data:res});
			return ;
		}
		$.ajax({
			url : 'wx/admin/qrcard/qrcard/'+cardid+'/gets.json',
			data : null,
			cache : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (sck) {
					sck(data, status, xhr);
				}
				if (data.success) {
					card.put(cardid, data.data);
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
	getDefault : function(cardid) {
		if (!cardid) {
			return null;
		}
		var res=null;
		$.ajax({
			url : 'wx/admin/qrcard/qrcard/' + cardid + '/default/get.json',
			data : null,
			cache : false,
			async : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (data.success) {
					res=data.data;
					qrcard.data.remove(cardid);
				}
			},
			dataType : 'json'
		});
		return res;
	},clear:function(){
		card.data=new Map();
	}

}
