$(function() {

	$("#templatecontent_datas_body").on("click",".del_tr",function(){
		var template_id=$(this).parent().parent().parent().attr("template_id");
		var did = dialogConfirmShow("提示", "是否继续？", function() {
			templatecontent.del(template_id);
		});
	});
	$("#templatecontent_datas_body").on('click','.review_tr',function() {
		var OID=$(this).parent().parent().parent().attr("oid");
		$("#templatecontentUrl").html("http://localhost:8080/ifaw/templatemanager/server/templatecontent/"+OID+"/index.html");
	});
	templatecontent.loadDatas();
});

var templatecontent = {
	datas : null,
	conditions : {
	},
	loadDatas : function() {
		$.post("templatemanager/admin/templatecontent/tlist.json", templatecontent.conditions, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			templatecontent.datas = json.data;
			templatecontent.clear();
			templatecontent.load(templatecontent.datas);
		}, "json");
	},
	load : function(datas) {
		if (!datas) {
			return;
		}
		$(datas).each(function(index) {
			var node = datas[index];
			templatecontent.addNode(node);
		});
	},
	addNode : function(node) {
		if (!node) {
			return;
		}
		var str = '<tr template_id=\'{9}\'>'
            +'<td>{0}</td>'
            +'<td>{1}</td>'
            +'<td><div>'
            +'<a class="a_pad" href="templatemanager/admin/templatecontent/form.html?templateId='+node.template_id+'" >新建模板内容</a>|<a class="a_pad"  href="templatemanager/admin/templatecontent/tclist.html?templateId='+node.template_id+'" >查看内容列表</a></div>'
            +'</td>'
            +'</tr>';
		str = str.replace("{0}", node.template_id);
		str = str.replace("{1}", node.title);
		str = str.replace("{9}", node.template_id);
		$("#templatecontent_datas_body").append(str);
	},
	del:function(template_id){
		$.ajax({
			url : 'templatemanager/admin/templatecontent/' +template_id+ '/tdelete.json',
			type : 'post',
			success : function(data, status, xhr) {
				if (!data.success) {
					dialogAlertShow("","删除失败：" + data.errmsg);
					return;
				}
				dialogAlertShow("","删除成功");
				templatecontent.loadDatas();
			},
			dataType : 'json'
		});
	},
	clear : function() {
		$("#templatecontent_datas_body").html("");
	}
}
