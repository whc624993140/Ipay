$(function() {
	$("body").append("<div class=\"layer fade\"  name=\"email_template_choose_div\"><div class=\"modal_layer\"><div class=\"layer-content\"><div class=\"layer-header\">" +
		"<h4 class=\"modal-title text-left\" style=\"margin:0\"> <img src=\"static/v2/img/xiaoLogo.png\" alt=\"\" style=\"margin-right: 12px; margin-top: 0px;\"> 请选择模板 </h4><a href=\"javascript:void(0)\" class=\"close\" >×</a></div><div class=\"layer-body layer_minH\"><div class=\"table_box\"><table class=\"table table-bordered\" name=\"email_template_choose_table\"><thead><tr><th>模板id</th>" +
					"<th>名称</th><th>操作</th></tr></thead><tbody></tbody></table></div></div><div class=\"layer-footer\"><a href=\"javascript:void(0)\" class=\"btn btn-primary\" name=\"close\">关闭</a>" +
							"</div></div></div></div>");
});
var email_template={
		datas:null,
		meetingOID:'',
		files:[],
		init : function(callback) {
			$("[name='email_template_choose_div']").on("click","[click='choose']",function(){
				var tid=$(this).parent().parent().data('templateid');
				email_template.callback(tid);
			});
			//点击小×关闭分组框
			$("[name='email_template_choose_div']").on('click','.close',function(){
				layerAction.close("[name='email_template_choose_div']");
			});
			//点击关闭按钮
			$("[name='email_template_choose_div']").on('click','[name=\'close\']',function(){
				layerAction.close("[name='email_template_choose_div']");
			});
			email_template.loadDatas();
			email_template.callback=callback;
		},
		loadDatas:function(){
			$.ajax({
				url : 'maserati/admin/emailtemplate/find.json',
				data : email_template.condition,
				cache : false,
				traditional : true,
				type : 'get',
				success : function(data, status, xhr) {
					if (!data.success) {
						dialogAlertShow("",data.errmsg);
						return;
					}
					email_template.datas=data.data;
				},
				dataType : 'json'
			});
		},
		show:function(){
			layerAction.open("[name='email_template_choose_div']");
			email_template.load();
		},hide:function(){
			layerAction.close("[name='email_template_choose_div']");
		},
		load:function(){
			email_template.clear();
			$(email_template.datas).each(function(index) {
				var node = email_template.datas[index];
				email_template.addNode(node);
			});
		},
		addNode : function(node) {
			var str = "<tr data-templateid='{98}' data='{99}'>"
					+ "<td>{1}</td>"
					+ "<td>{2}</td>"
					+ "<td>{9}</td>" + "</tr>";
			str = str.replace("{98}", node.templateId);
			str = str.replace("{99}", JSON.stringify(node));
			str = str.replace("{1}", node.templateId);
			str = str.replace("{2}", node.name);
			var linkstr = "<a href='javascript:void(0);' click='choose'><i class='icon-edit'></i>选择</a> "
			str = str.replace("{9}", linkstr);
			$("[name='email_template_choose_table'] > tbody").append(str);
		},clear : function(level) {
			$("[name='email_template_choose_table'] > tbody").empty();
		}
	}
