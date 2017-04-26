$(function() {
	$("body").append("<div class=\"layer fade\" name=\"label_mulit_choose_div\"><div class=\"modal_layer\"><div class=\"layer-content\"><div class=\"layer-header\">" +
		"<h4 class=\"modal-title text-left\" style=\"margin:0\"> <img src=\"static/v2/img/xiaoLogo.png\" alt=\"\" style=\"margin-right: 12px; margin-top: 0px;\"> 请选择标签 </h4><a href=\"javascript:void(0)\" class=\"close\">×</a></div><div class=\"layer-body layer_minH\"><div sign=\"label_mulit_choose_1\"></div><div sign=\"label_mulit_choose_2\"></div>" +
					"<div sign=\"label_mulit_choose_3\"></div><lable class=\"lab\">所选标签：</lable><div sign=\"label_selected\"></div></div><div class=\"layer-footer\">" +
							"<a href=\"javascript:void(0)\" class=\"btn btn-primary\" click=\"chooses\">确定</a><a href=\"javascript:void(0)\" class=\"btn btn-primary\" name=\"close\">关闭</a></div></div></div></div>");
});


var label_mulit_choose={
		init:function(callback){
			$("[name='label_mulit_choose_div']").on("click",".label_mulit_choose",function(){
				label_mulit_choose.load($(this).attr("id"));
				$(".label_mulit_choose").each(function(){
					$(this).removeClass('btn-primary');
				});
				$(this).addClass('btn-primary');
			});
			$("[name='label_mulit_choose_div']").on("click","[name='unselected']",function(){
				$(this).parent().remove();
				label_mulit_choose.syncSelected();
			});
			//点击小×关闭分组框
			$("[name='label_mulit_choose_div']").on('click','.close',function(){
				layerAction.close("[name='label_mulit_choose_div']");
			});
			//点击关闭按钮
			$("[name='label_mulit_choose_div']").on('click','[name=\'close\']',function(){
				layerAction.close("[name='label_mulit_choose_div']");
			});
			//点击确定按钮
			$("[name='label_mulit_choose_div']").on("click","[click='chooses']",function(){
                var labels=label_mulit_choose.getChecked();
                label_mulit_choose.callback(labels);
			});
			
			$("[name='label_mulit_choose_div']").on('click','[name="label_select"]',function(){
				var key=$(this).parent().attr('key');
				var node=label_mulit_choose.findNodeByKey(key);
				label_mulit_choose.toggleSelected(node);
			});
			
			label_mulit_choose.loadData();
			label_mulit_choose.callback=callback;
		},
		callback:null,
		show_base_level:null,
		show:function(key){
			if(!key){
				label_mulit_choose.load(label.data.id);	
				label_mulit_choose.show_base_level=label.data.level;
			}else{
				var node=label_mulit_choose.findNodeByKey(key);
				if(!node){
					alert("该节点不存在");
					return;
				}
				label_mulit_choose.show_base_level=node.level;
				label_mulit_choose.load(node.id);
			}
			layerAction.open("[name='label_mulit_choose_div']");
		},
		hide:function(){
			layerAction.close("[name='label_mulit_choose_div']");
		},loadData:function(){
			label.tree(function(json){
//				alert(JSON.stringify(data));
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				label_mulit_choose.load(json.id);
			});
		},load : function(nodeid) {
			var parentNode = label_mulit_choose.findNode(label.data, nodeid);
			if (parentNode == null || typeof (parentNode) == "undefined") {
				return;
			}
			if(label_mulit_choose.show_base_level>=1&&parentNode.level>=1){
				label_mulit_choose.clear(1);
			}
			label_mulit_choose.clear(parentNode.level + 1);
			label_mulit_choose.clear(parentNode.level + 2);
			$(parentNode.children).each(function(index) {
				var node = parentNode.children[index];
				label_mulit_choose.addNode(node);
			});
			label_mulit_choose.syncSelected();
			label_mulit_choose.changeShow();
		},syncSelected:function(){
			var label=label_mulit_choose.getChecked();
			$('[name=\'label_mulit_choose_div\']').find("[name='label_select']").prop("checked",false);
			for (var int = 0; int < label.length; int++) {
				var labelkey=label[int];
				$("[name='label_mulit_choose_div']").find(".label_mulit_choose").each(function(){
					var key=$(this).attr("key");
					if(labelkey==key){
						$(this).find("[name='label_select']").prop("checked",true);
						return;
					}
				});
			}
		},toggleSelected:function(node){
			var size=$("[sign=label_selected] [key='"+node.key+"']").size();
			if(size>0){
				$("[sign=label_selected] [key='"+node.key+"']").remove();
			}else{
				var str = '<a class="btn border-ra  mar-10 selected_label" href="javascript:void(0);"  key=\'{0}\' id=\'{2}\'>{1}<span name="unselected">X</span></a>';
				str = str.replace("{0}", node.key);	
				str = str.replace("{1}", node.name);
				$("[sign=label_selected]").append(str);
			}
		},addNode : function(node) {
			var str = '<a class="btn border-ra  mar-10 label_mulit_choose" href="javascript:void(0);"  key=\'{0}\' id=\'{2}\'><input type="checkbox" name="label_select"  />{1}</a>';
			str = str.replace("{0}", node.key);
			str = str.replace("{1}", node.name);
			str = str.replace("{2}", node.id);
			$("[sign=label_mulit_choose_" + node.level+']').append(str);
		},getChecked:function(){
			var label=new Array();
			$("[sign=label_selected]").find(".selected_label").each(function(){
				var key=$(this).attr("key");
				label.push(key);
			});
			return label;
		},findNode : function(tree, nodeid) {
			if (tree.id == nodeid) {
				return tree;
			}
			if (typeof (tree.children) == "undefined") {
				return null;
			}
			for (var int = 0; int < tree.children.length; int++) {
				var node = tree.children[int];
				var leaf = label_mulit_choose.findNode(node, nodeid);
				if (leaf != null) {
					return leaf;
				}
			}
		},clear : function(level) {
			$("[sign=label_mulit_choose_" + level+']').html("");
		},changeShow:function(){
			if($("[sign=label_mulit_choose_2]").text()!="" ){
				$("[sign=label_mulit_choose_2]").show();
			}else{
				$("[sign=label_mulit_choose_2]").hide();
			}
			if($("[sign=label_mulit_choose_3]").text()!="" ){
				$("[sign=label_mulit_choose_3]").show();
			}else{
				$("[sign=label_mulit_choose_3]").hide();
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


























