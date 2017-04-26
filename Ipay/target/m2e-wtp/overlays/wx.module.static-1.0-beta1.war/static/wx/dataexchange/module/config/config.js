var wxmconfig = {
	data : new Map(),
	get : function(keys) {
		var res = new Object();
		if (!keys) {
			return res;
		}
		var searchkeys = new Array();
		for (var int = 0; int < keys.length; int++) {
			var v = wxmconfig.data.get(keys[int]);
			if (v) {
				res[keys[int]] = v;
			} else {
				searchkeys.push(keys[int]);
			}
		}
		if (searchkeys.length == 0) {
			return res;
		}
		$.ajax({
			url : 'wx/admin/config/gets.json',
			data : {
				keys : searchkeys
			},
			cache : false,
			async : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (data.success) {
					var obj=data.data;
					for ( var i in obj) {
						wxmconfig.data.put(i, obj[i]);
					}
				}
			},
			dataType : 'json'
		});
		for (var int = 0; int < searchkeys.length; int++) {
			var v = wxmconfig.data.get(searchkeys[int]);
			if (v) {
				res[keys[int]] = v;
			}
		}
		return res;
	},
	clear : function() {
		wxmconfig.data = new Map();
	}

}
