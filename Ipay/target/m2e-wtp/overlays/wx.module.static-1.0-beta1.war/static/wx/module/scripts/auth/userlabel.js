$(function() {
	$.ajaxSetup({ 
	    async : false 
	});
	authUserAndLabel.loadData();
	label_choose.init(label_choose_callback);
	$.ajaxSetup({ 
	    async : true 
	});
	$(".lable_list").each(function(index){
		var id=$(this).parent().attr("id");
		var labels=authUserAndLabel.findByUserOID(id);
		if(labels){
			for (var int = 0; int < labels.length; int++) {
				var item = labels[int];
				var label=label_choose.findNodeByKey(item.labelKey);
				if(!label){
					continue;
				}
				$(this).append('<div >'+label.name+'<a href="javascript:void(0);" class="label_del" lable-key="'+item.labelKey+'" user-oid="'+item.userOID+'" >'+wx_lang.page_key99+'</a></div>');
			}
		}
	});
	
	$("#data_list").on('click','.label_add',function(){
		current_user=$(this).attr("data-id");
		label_choose.show();
	});
	
	$("#data_list").on('click','.label_del',function(){
		var labelkey=$(this).attr("lable-key");
		var useroid=$(this).attr("user-oid");
		authUserAndLabel.del({userOID:useroid,labelKey:labelkey});
	})
	
});

var current_user=null;
function label_choose_callback(key){
	authUserAndLabel.add({userOID:current_user,labelKey:key});
}


var authUserAndLabel={
	datas:[],
	loadData:function(){
		var getUrl = "auth/admin/userandlabel/all.json";
		$.post(getUrl, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			authUserAndLabel.datas=json.data;
		}, "json");
	},
	add:function(params) {
		var saveUrl = "auth/admin/userandlabel/save.json";
		$.post(saveUrl,params,function(json) {
				if (json.success) {
					alert(wx_lang.page_key357);
					 window.location.reload();
				} else {
					alert(json.errmsg);
				}
			}, "json");
	},del: function(params) {
		var saveUrl = "auth/admin/userandlabel/delete.json";
		$.post(saveUrl,params,function(json) {
				if (json.success) {
					alert(""+wx_lang.page_key99+wx_lang.page_key387);
					 window.location.reload();
				} else {
					alert(json.errmsg);
				}
			}, "json");
	},
	findByUserOID : function(id) {
		var res=[];
		if(!authUserAndLabel.datas){
			return res;
		}
		for (var int = 0; int < authUserAndLabel.datas.length; int++) {
			var item = authUserAndLabel.datas[int];
			if(id==item.userOID){
				res.push(item); 
			}
		}
		return res;
	}
}



