var qrcodeandlabel = {
		data :[],
		list:function(sck, cck){
			$.ajax({
				url : 'wx/admin/qrcode/label/all.json',
				data : {},
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						qrcodeandlabel.data= data.data;
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
		},
		create:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			if(!params.ticket || params.ticket==''){
				throw "ticket is null";
			}
			if(!params.scene || params.scene==''){
				throw "scene is null";
			}
			if(!params.actionName || params.actionName==''){
				throw "actionName is null";
			}
			if(!params.labelKey || params.labelKey==''){
				throw "labelKey is null";
			}
			if(!params.event || params.event==''){
				throw "event is null";
			}
			$.ajax({
				url : 'wx/admin/qrcode/label/save.json',
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
		},
		del:function(params,sck, cck,eck){
			if(!params){
				throw "params is null";
			}
			$.ajax({
				url : 'wx/admin/qrcode/label/save.json',
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
		},
		clear:function(){
			qrcodeandlabel.data=[];
		}
}