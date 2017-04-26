




var qrcodeAndLabel={
	datas:[],
	loadData:function(){
		var getUrl = "wx/admin/qrcode/label/all.json";
		$.post(getUrl, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			qrcodeAndLabel.datas=json.data;
		}, "json");
	},
	add:function(params) {
		var saveUrl = "wx/admin/qrcode/label/save.json";
		$.post(saveUrl,params,function(json) {
				if (json.success) {
					alert(wx_lang.page_key357);
					window.location.reload();
				} else {
					alert(json.errmsg);
				}
			}, "json");
	},delete: function(params) {
		var saveUrl = "wx/admin/qrcode/label/delete.json";
		$.post(saveUrl,params,function(json) {
				if (json.success) {
					alert(wx_lang.page_key99+wx_lang.page_key387);
					window.location.reload();
				} else {
					alert(json.errmsg);
				}
			}, "json");
	},
	findByQyCode : function(ticket) {
		var res=[];
		if(!qrcodeAndLabel.datas){
			return res;
		}
		for (var int = 0; int < qrcodeAndLabel.datas.length; int++) {
			var item = qrcodeAndLabel.datas[int];
			if(ticket==item.ticket){
				res.push(item); 
			}
		}
		return res;
	}
}













