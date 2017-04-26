$(function() {
	$("body").append("<div class=\"modalWin multiModalWin\"><div class=\"menuPop\"><div class=\"menuPopTitle\"><img src=\"static/v2/img/xiaoLogo.png\" style=\"position: absolute;top:10px;left: 20px;margin-top:-1px;\"/>"+
					"<span style=\"float: left;margin-left:70px; color: #000;\">标签筛选</span><div class=\"menuPopClose\" style=\"cursor:pointer;color:#000;font-size: 24px\">×</div></div>"+
					"<div class='modal_scr'><div class=\"uer_body clearfix\"><div class=\"userTag1 fl\"></input><div class=\"userTagTitle\"><label>标签：</label><div class=\"tagCnt fl\" id=\"label_mulit_choose_1\"></div>"+
					"</div><div class=\"giftArea fl\" id=\"label_mulit_choose_2\"></div><div style=\"clear: both;\"></div><div class=\"giftArea fl\" id=\"label_mulit_choose_3\"></div></div></div><lable class=\"lab\">所选标签：</lable><div id=\"label_selected\"></div><button class=\"btn_save\">确认</button></div>"+
					"</div></div>");
});


var label_mulit_choose={
		init:function(callback){
			$(".multiModalWin").on("click",".label_mulit_choose",function(){
				label_mulit_choose.load($(this).attr("id"));
				$(".label_mulit_choose").each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
			});
			$(".multiModalWin").on("click","[name='unselected']",function(){
				$(this).parent().remove();
				label_mulit_choose.syncSelected();
			});
			//点击小×关闭分组框
			$(".multiModalWin").on('click','.menuPopClose',function(){
                $('body').css('position','relative')
				$(".multiModalWin").hide();
			});
			//点击确定按钮
			$(".multiModalWin").on('click','.btn_save',function(){
                $('body').css('position','relative')
                var label=label_mulit_choose.getChecked();
				label_mulit_choose.callback(label);
				label_mulit_choose.hide();
			});
			
			$(".multiModalWin").on('click','[name="label_select"]',function(){
				var key=$(this).parent().attr('key');
				var node=label_mulit_choose.findNodeByKey(key);
				label_mulit_choose.toggleSelected(node);
			});
			
			$.ajaxSetup({   
	            async : false  
	        }); 
			label_mulit_choose.loadData();
			$.ajaxSetup({   
	            async : true  
	        });
			label_mulit_choose.callback=callback;
		},
		callback:null,
		labels:null,
		show_base_level:null,
		show:function(key){
			if(!key){
				label_mulit_choose.load(label_mulit_choose.labels.id);	
				label_mulit_choose.show_base_level=label_mulit_choose.labels.level;
			}else{
				var node=label_mulit_choose.findNodeByKey(key);
				if(!node){
					alert("该节点不存在");
					return;
				}
				label_mulit_choose.show_base_level=node.level;
				label_mulit_choose.load(node.id);
			}
            $('body').css('position','fixed');
			$(".multiModalWin").show();
		},
		hide:function(){
			$('body').css('position','relative')
			$(".multiModalWin").hide();
		},loadData:function(){
			var initUrl = "wx/admin/label/tree.json";
			$.post(initUrl, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				label_mulit_choose.labels=json.data;
				//alert(JSON.stringify(json.data));
				label_mulit_choose.load(label_mulit_choose.labels.id);
			}, "json");
		},load : function(nodeid) {
			var parentNode = label_mulit_choose.findNode(label_mulit_choose.labels, nodeid);
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
			$('.userTag1').find("[name='label_select']").prop("checked",false);
			for (var int = 0; int < label.length; int++) {
				var labelkey=label[int];
				$(".userTag1").find(".label_mulit_choose").each(function(){
					var key=$(this).attr("key");
					if(labelkey==key){
						$(this).find("[name='label_select']").prop("checked",true);
						return;
					}
				});
			}
		},toggleSelected:function(node){
			var size=$("#label_selected [key='"+node.key+"']").size();
			if(size>0){
				$("#label_selected [key='"+node.key+"']").remove();
			}else{
				var str = '<div class="tagName fl selected_label" key=\'{0}\' >{1}<span name="unselected">X</span></div>';
				str = str.replace("{0}", node.key);	
				str = str.replace("{1}", node.name);
				$("#label_selected").append(str);
			}
		},addNode : function(node) {
			var str = '<div class="tagName fl label_mulit_choose" key=\'{0}\' id=\'{2}\'><input type="checkbox" name="label_select"  />{1}</div>';
			str = str.replace("{0}", node.key);
			str = str.replace("{1}", node.name);
			str = str.replace("{2}", node.id);
			$("#label_mulit_choose_" + node.level).append(str);
		},getChecked:function(){
			var label=new Array();
			$("#label_selected").find(".selected_label").each(function(){
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
			$("#label_mulit_choose_" + level).html("");
		},changeShow:function(){
			if($("#label_mulit_choose_2").text()!="" ){
				$("#label_mulit_choose_2").show();
			}else{
				$("#label_mulit_choose_2").hide();
			}
			if($("#label_mulit_choose_3").text()!="" ){
				$("#label_mulit_choose_3").show();
			}else{
				$("#label_mulit_choose_3").hide();
			}
		},findNodeByKey : function(key,tree) {
			if(!key){
				return null;
			}
			if(!tree){
				tree=label_mulit_choose.labels;
			}
			if (tree.key == key) {
				return tree;
			}
			if (typeof (tree.children) == "undefined") {
				return null;
			}
			for (var int = 0; int < tree.children.length; int++) {
				var node = tree.children[int];
				var leaf = label_mulit_choose.findNodeByKey(key,node);
				if (leaf != null) {
					return leaf;
				}
			}
		},findLeafByKey:function(key,tree){
			if(!tree){
				tree=label_mulit_choose.labels;
			}
			var node=label_mulit_choose.findNodeByKey(key,tree);
			if(!node){
				return null;
			}
			return node.children;
		},fillSelect:function(selector,key,emptyStr){
			$(selector).empty();
			if(emptyStr){
				$(selector).append("<option value=''>"+emptyStr+"</option>");
			}
			var nodes=label_mulit_choose.findLeafByKey(key);
			if(!nodes){
				return;
			}
			$(nodes).each(function (i) {
				var node = nodes[i];
				$(selector).append("<option value='" + node.key + "'>" + node.name + "</option>");
            });
		}
		
		
}


























