var personAndLabel={
	get:function(personid,callback){
		var getUrl = "maserati/admin/person/label/person/"+personid+"/get.json";
		$.post(getUrl, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			callback(json.data);
		}, "json");
	},
	add:function(personOID,labelkey,callback) {
		var saveUrl = "maserati/admin/person/label/save.json";
		$.post(saveUrl,{personOID:personOID,labelkey:labelkey},function(json) {
				if (json.success) {
					alert("保存成功");
					callback();
				} else {
					alert(json.errmsg);
				}
			}, "json");
	},del: function(personOID,labelkey,callback) {
		var saveUrl = "maserati/admin/person/label/delete.json";
		$.post(saveUrl,{personOID:personOID,labelkey:labelkey},function(json) {
				if (json.success) {
					alert("删除成功");
					callback();
				} else {
					alert(json.errmsg);
				}
			}, "json");
	}
}