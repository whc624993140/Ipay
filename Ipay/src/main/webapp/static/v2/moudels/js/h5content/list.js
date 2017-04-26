$(function() {

	$("#h5content_add").on("click",function(){
		window.location.href ='templatemanager/admin/h5content/form.html';
	});
	$("#h5content_datas_body").on("click",".del_tr",function(){
		var OID=$(this).parent().parent().parent().attr("oid");
		var did = dialogConfirmShow("提示", "是否继续？", function() {
			h5content.del(OID);
		});
	});
	$("#h5content_datas_body").on('click','.review_tr',function() {
		var OID=$(this).parent().parent().parent().attr("oid");
		$("#h5ContentUrl").html("http://localhost:8080/ifaw/templatemanager/server/h5content/"+OID+"/index.html");
	});
	var clipboard = new Clipboard('#copy_h5ContentUrl');
    clipboard.on('success', function(e) {
        if (window.clipboardData) // Internet Explorer
        {  
        	dialogAlertShow("","该浏览器不支持，请手动复制");
        }
    });
	h5content.loadDatas();
});

var h5content = {
	datas : null,
	conditions : {
		pageSize : 20
	},
	loadDatas : function() {
		$.post("templatemanager/admin/h5content/page.json", h5content.conditions, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			h5content.datas = json.data;
			h5content.clear();
			h5content.load(h5content.datas.items);
		}, "json");
	},
	load : function(datas) {
		if (!datas) {
			return;
		}
		$(datas).each(function(index) {
			var node = datas[index];
			h5content.addNode(node);
		});
		h5content.createPage();
	},
	createPage:function(){
		$("#h5content_page").createPage({
	        pageCount:h5content.datas.pageCount,
	        current:h5content.datas.currentPage,
	        backFn:function(p){
	        	h5content.conditions.pageNum=p;
	        	h5content.clear();
	        	h5content.loadDatas();
	        }
	    });
	},
	addNode : function(node) {
		if (!node) {
			return;
		}
		var str = '<tr oid=\'{9}\'>'
            +'<td>{0}</td>'
            +'<td>{1}</td>'
            +'<td><div>'
            +'<a class="a_pad" href="templatemanager/admin/h5content/form.html?h5ContentOID='+node.oid+'" >编辑</a>|<a class="a_pad review_tr" data-target="#review_modal" data-toggle="modal" >预览</a>|<a href="javascript:void(0);" class="del_tr">删除</a></div>'
            +'</td>'
            +'</tr>';
		str = str.replace("{0}", node.templateName);
		str = str.replace("{1}", node.activityName);
		str = str.replace("{9}", node.oid);
		$("#h5content_datas_body").append(str);
	},
	del:function(OID){
		$.ajax({
			url : 'templatemanager/admin/h5content/' +OID+ '/delete.json',
			type : 'post',
			success : function(data, status, xhr) {
				if (!data.success) {
					dialogAlertShow("","删除失败：" + data.errmsg);
					return;
				}
				dialogAlertShow("","删除成功");
				h5content.loadDatas();
			},
			dataType : 'json'
		});
	},
	clear : function() {
		$("#h5content_datas_body").html("");
	}
}
