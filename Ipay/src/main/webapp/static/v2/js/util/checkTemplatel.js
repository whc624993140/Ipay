$(function() {
	$("body").append("<div class=\"layer fade\"  name=\"template_choose_div\"><div class=\"modal_layer\"><div class=\"layer-content\"><div class=\"layer-header\">" +
		"<h4 class=\"modal-title text-left\" style=\"margin:0\"> <img src=\"static/v2/img/xiaoLogo.png\" alt=\"\" style=\"margin-right: 12px; margin-top: 0px;\"> 请选择模板 </h4><a href=\"javascript:void(0)\" class=\"close\" >×</a></div><div class=\"layer-body layer_minH\"><table class=\"table\" name=\"template_choose_table\"><thead><tr><th>template_id</th>" +
					"<th>名称</th><th>是否可用</th><th>操作</th></tr></thead><tbody></tbody></table></div><div class=\"layer-footer\"><a href=\"javascript:void(0)\" class=\"btn btn-primary\" name=\"close\">关闭</a>" +
							"</div></div></div></div>");
});


var template_choose={
		init:function(callback){
			$("[name='template_choose_div']").on("click","[click='choose']",function(){
				var tid=$(this).parent().parent().data('tid');
				template_choose.callback(template.get(tid));
			});
			//点击小×关闭分组框
			$("[name='template_choose_div']").on('click','.close',function(){
				layerAction.close("[name='template_choose_div']");
			});
			//点击关闭按钮
			$("[name='template_choose_div']").on('click','[name=\'close\']',function(){
				layerAction.close("[name='template_choose_div']");
			});
			template_choose.loadData(); 
			template_choose.callback=callback;
		},
		callback:null,
		show:function(key){
			layerAction.open("[name='template_choose_div']");
		},hide:function(){
			layerAction.close("[name='template_choose_div']");
		},
		loadData:function(){
			template.list(function(data){
//				alert(JSON.stringify(data));
				if (!data.success) {
					alert(data.errmsg);
					return;
				}
				for (var int = 0; int < data.data.length; int++) {
					template_choose.addNode(data.data[int]); 
				}
			});
		},addNode : function(node) {
			var str = '<tr data-tid="{98}"><td>{1}</td><td>{2}</td><td>{3}</td><td><a href="javascript:void(0);" click="choose"><i class="icon-edit"></i>选择</a></td></tr>';
			str = str.replace("{1}", node.template_id);
			str = str.replace("{98}", node.template_id);
			str = str.replace("{2}", node.title); 
			str = str.replace("{3}", node.isInList?"是":"否");
			$("[name='template_choose_table'] > tbody").append(str);
		},clear : function(level) {
			$("[name='template_choose_table'] > tbody").empty(str);
		}
		
		
}


























