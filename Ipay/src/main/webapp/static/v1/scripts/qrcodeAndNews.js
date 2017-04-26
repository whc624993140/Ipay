

var qrcodeAndNews={
	datas:[],
	loadData:function(){
		var getUrl = "wx/admin/qrcode/news/all.json";
		$.post(getUrl, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			qrcodeAndNews.datas=json.data;
		}, "json");
	},
	add:function(params) {
		var saveUrl = "wx/admin/qrcode/news/save.json";
		$.post(saveUrl,params,function(json) {
				if (json.success) {
					alert("保存成功");
					window.location.reload();
				} else {
					alert(json.errmsg);
				}
			}, "json");
	},delete: function(params) {
		var saveUrl = "wx/admin/qrcode/news/delete.json";
		$.post(saveUrl,params,function(json) {
				if (json.success) {
					alert("删除成功");
					window.location.reload();
				} else {
					alert(json.errmsg);
				}
			}, "json");
	},
	findByQyCode : function(ticket) {
		var res=[];
		if(!qrcodeAndNews.datas){
			return res;
		}
		for (var int = 0; int < qrcodeAndNews.datas.length; int++) {
			var item = qrcodeAndNews.datas[int];
			if(ticket==item.ticket){
				res.push(item); 
			}
		}
		return res;
	}
}













