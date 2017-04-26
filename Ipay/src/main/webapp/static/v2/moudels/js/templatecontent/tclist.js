$(function() {

	$("#templatecontent_datas_body").on("click",".del_tr",function(){
		var templateContentOID=$(this).parent().parent().parent().attr("templateContentOID");
		var did = dialogConfirmShow("提示", "是否继续？", function() {
			templatecontent.del(templateContentOID);
		});
	});
	$("#templatecontent_datas_body").on('click','.review_tr',function() {
		var OID=$(this).parent().parent().parent().attr("oid");
		$("#templatecontentUrl").html("http://localhost:8080/ifaw/templatemanager/server/templatecontent/"+OID+"/index.html");
	});
	if(templateId!=""){
		templatecontent.conditions.templateId=templateId;
	}
	templatecontent.loadDatas();
});
var templateId=$("#templateId").val();
var templatecontent = {
	datas : null,
	conditions : {
		pageSize : 20
	},
	loadDatas : function() {
		$.post("templatemanager/admin/templatecontent/tc/page.json", templatecontent.conditions, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			templatecontent.datas = json.data;
			templatecontent.clear();
			templatecontent.load(templatecontent.datas.items);
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
		templatecontent.createPage();
	},
	createPage:function(){
		$("#templatecontent_page").createPage({
	        pageCount:templatecontent.datas.pageCount,
	        current:templatecontent.datas.currentPage,
	        backFn:function(p){
	        	templatecontent.conditions.pageNum=p;
	        	templatecontent.clear();
	        	templatecontent.loadDatas();
	        }
	    });
	},
	addNode : function(node) {
		if (!node) {
			return;
		}
		var str = '<tr templateContentOID=\'{9}\'>'
            +'<td>{0}</td>'
            +'<td>{1}</td>'
            +'<td><div>'
            +'<a class="a_pad" href="templatemanager/admin/templatecontent/form.html?templateContentOID='+node.oid+'&templateId='+node.templateId+'" >编辑</a>|<a href="javascript:void(0);" class="del_tr">删除</a></div>'
            +'</td>'
            +'</tr>';
		str = str.replace("{0}", node.templateId);
		str = str.replace("{1}", node.cname);
		str = str.replace("{9}", node.oid);
		$("#templatecontent_datas_body").append(str);
	},
	del:function(templateContentOID){
		$.ajax({
			url : 'templatemanager/admin/templatecontent/' +templateContentOID+ '/tdelete.json',
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
