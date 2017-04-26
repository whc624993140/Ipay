$(function() {
	$("body").append("<div class=\"layer fade\"  name=\"template_choose_div\"><div class=\"modal_layer\"><div class=\"layer-content\"><div class=\"layer-header\"><div class=\"layer-title\">"+wx_lang.page_key272+"模版</div>" +
			"<a href=\"javascript:void(0)\" class=\"close\" >×</a></div><div class=\"layer-body layer_minH\"><table class=\"table\" name=\"template_choose_table\"><thead><tr><th>template_id</th>" +
					"<th>"+wx_lang.page_key316+"</th><th>是否可用</th><th>"+wx_lang.page_key284+"</th></tr></thead><tbody></tbody></table></div><div class=\"layer-footer\"><a href=\"javascript:void(0)\" class=\"btn btn-primary\" name=\"close\">"+wx_lang.page_key405+"</a>" +
							"</div></div></div></div>");
});


var template_choose={
		init:function(callback){
			$("[name='template_choose_div']").on("click","[click='choose']",function(){
				var tid=$(this).parent().parent().data('tid');
				template_choose.callback(template.get(tid));
			});

			$("[name='template_choose_div']").on('click','.close',function(){
				layerAction.close("[name='template_choose_div']");
			});

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
			var str = '<tr data-tid="{98}"><td>{1}</td><td>{2}</td><td>{3}</td><td><a class="btn" href="javascript:void(0);" click="choose"><i class="icon-edit"></i>选择</a></td></tr>';
			str = str.replace("{1}", node.template_id);
			str = str.replace("{98}", node.template_id);
			str = str.replace("{2}", node.name); 
			str = str.replace("{3}", node.isInList?"是":"否");
			$("[name='template_choose_table'] > tbody").append(str);
		},clear : function(level) {
			$("[name='template_choose_table'] > tbody").empty(str);
		}
		
		
}


























