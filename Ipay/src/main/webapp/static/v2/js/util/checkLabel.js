$(function() {
	$("body").append("<div name=\"label_choose_div\" class=\"layer fade\"><div class=\"modal_layer\"><div class=\"layer-content\"><div class=\"layer-header\">" +
		"<h4 class=\"modal-title text-left\" style=\"margin:0\"> <img src=\"static/v2/img/xiaoLogo.png\" alt=\"\" style=\"margin-right: 12px; margin-top: 0px;\"> 请选择标签 </h4><a class=\"close\" href=\"javascript:void(0)\">×</a></div><div class=\"layer-body layer_minH\"><div id=\"label_choose_1\" ></div><div id=\"label_choose_2\" ></div><div id=\"label_choose_3\" ></div>" +
					"</div><div class=\"layer-footer\"><a click=\"choose\" class=\"btn btn-primary\" href=\"javascript:void(0)\">确定</a><a name=\"close\" class=\"btn btn-primary\" href=\"javascript:void(0)\">关闭</a>" +
							"</div></div></div></div>");
});


var label_choose={
		init:function(callback){
			$("[name='label_choose_div']").on("click",".label_choose",function(){
				label_choose.load($(this).attr("id"));
				$(".label_choose").each(function(){
					$(this).removeClass('btn-primary');
				});
				$(this).addClass('btn-primary');
			});
			//点击小×关闭分组框
			$("[name='label_choose_div']").on('click','.close',function(){
				layerAction.close("[name='label_choose_div']");
			});
			//点击关闭按钮
			$("[name='label_choose_div']").on('click','[name=\'close\']',function(){
				layerAction.close("[name='label_choose_div']");
			});
			$("[name='label_choose_div']").on("click","[click='choose']",function(){
				var key=$("[name='label_choose_div']").find(".btn-primary").attr("key");
				if(!key){
					alert("请选择一个标签");
					return;
				}
				label_choose.callback(label.findNodeByKey(key));
			});
			label_choose.loadData();
			label_choose.callback=callback;
		},
		callback:null,
		show_base_level:null,
		show:function(key){
			if(!key){
				label_choose.load(label.data.id);	
				label_choose.show_base_level=label.data.level;
			}else{
				var node=label_choose.findNodeByKey(key);
				if(!node){
					alert("该节点不存在");
					return;
				}
				label_choose.show_base_level=node.level;
				label_choose.load(node.id);
			}
			layerAction.open("[name='label_choose_div']");
		},
		hide:function(){
			layerAction.close("[name='label_choose_div']");
		},loadData:function(){
			label.tree(function(json){
//				alert(JSON.stringify(data));
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				label_choose.load(json.id);
			});
		},load : function(nodeid) {
			var parentNode = label_choose.findNode(label.data, nodeid);
			if (parentNode == null || typeof (parentNode) == "undefined") {
				return;
			}
			if(label_choose.show_base_level>=1&&parentNode.level>=1){
				label_choose.clear(1);
			}
			label_choose.clear(parentNode.level + 1);
			label_choose.clear(parentNode.level + 2);
			$(parentNode.children).each(function(index) {
				var node = parentNode.children[index];
				label_choose.addNode(node);
			});
			label_choose.changeShow();
		},addNode : function(node) {
			var str = '<a class="btn border-ra  mar-10 label_choose" href="javascript:void(0);"  key=\'{0}\' id=\'{2}\'>{1}</a>';
			str = str.replace("{0}", node.key);
			str = str.replace("{1}", node.name);
			str = str.replace("{2}", node.id);
			$("#label_choose_" + node.level).append(str);
		},findNode : function(tree, nodeid) {
			if (tree.id == nodeid) {
				return tree;
			}
			if (typeof (tree.children) == "undefined") {
				return null;
			}
			for (var int = 0; int < tree.children.length; int++) {
				var node = tree.children[int];
				var leaf = label_choose.findNode(node, nodeid);
				if (leaf != null) {
					return leaf;
				}
			}
		},clear : function(level) {
			$("#label_choose_" + level).html("");
		},changeShow:function(){
			if($("#label_choose_2").text()!="" ){
				$("#label_choose_2").show();
			}else{
				$("#label_choose_2").hide();
			}
			if($("#label_choose_3").text()!="" ){
				$("#label_choose_3").show();
			}else{
				$("#label_choose_3").hide();
			}
		},findNodeByKey : function(key,tree) {
			return label.findNodeByKey(key,tree);
		},findLeafByKey:function(key,tree){
			return label.findLeafByKey(key,tree);
		},fillSelect:function(selector,key,emptyStr){
			$(selector).empty();
			if(emptyStr){
				$(selector).append("<option value=''>"+emptyStr+"</option>");
			}
			var nodes=label_choose.findLeafByKey(key);
			if(!nodes){
				return;
			}
			$(nodes).each(function (i) {
				var node = nodes[i];
				$(selector).append("<option value='" + node.key + "'>" + node.name + "</option>");
            });
		}
		
		
}


























