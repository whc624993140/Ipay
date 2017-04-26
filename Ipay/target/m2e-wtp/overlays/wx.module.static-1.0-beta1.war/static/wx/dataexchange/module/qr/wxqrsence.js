var qrsence = {
		data :[],
		list:function(sck, cck){
			$.ajax({
				url : 'wx/admin/qrcode/list.json',
				data : {},
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						qrsence.data= data.data;
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
		page:function(conditons,sck, cck,eck){
			$.ajax({
				url : 'wx/admin/qrcode/page.json',
				data : conditons ? conditons : {},
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						qrsence.data= data.data;
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
		activitypage:function(conditons,sck, cck,eck){
			$.ajax({
				url : 'wx/admin/qrcode/activity/page.json',
				data : conditons ? conditons : {},
				cache : false,
				traditional : true,
				type : 'post',
				success : function(data, status, xhr) {
					if (sck) {
						sck(data, status, xhr);
					}
					if (data.success) {
						qrsence.data= data.data;
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
		create:function(conditons,sck, cck,eck){
			$.ajax({
				url : 'wx/admin/qrcode/save.json',
				data : conditons ? conditons : {},
				cache : false,
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
				},
				dataType : 'json'
			});
		},
		clear:function(){
			qrsence.data=[];
		}
}