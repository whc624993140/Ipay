$(function() {
	$("body").append("<div class=\"modalWin simpleModalWin\"><div class=\"menuPop\"><div class=\"menuPopTitle\"><img src=\"static/v2/img/xiaoLogo.png\" style=\"position: absolute;top:10px;left: 20px;margin-top:-1px;\"/><span style=\"float: left;margin-left:70px; color: #000;\">标签筛选</span><div class=\"menuPopClose\" style=\"cursor:pointer;color:#000;font-size: 24px;\">×</div></div>"+
					"<div style='height:360px;overflow-y: scroll;'><div class=\"uer_body clearfix\"><div class=\"userTag1 fl\"></input><div class=\"userTagTitle\"><label>标签：</label><div class=\"tagCnt fl\" id=\"label_choose_1\"></div>"+
					"</div><div class=\"giftArea fl\" id=\"label_choose_2\"></div><div style=\"clear: both;\"></div><div class=\"giftArea fl\" id=\"label_choose_3\"></div></div></div></div><button class=\"btn_save\">保存</button>"+
			"</div></div>");
});


var label_choose={
		init:function(callback){
			$(".simpleModalWin").on("click",".label_choose",function(){
				label_choose.load($(this).attr("id"));
				$(".label_choose").each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
			});
			//点击小×关闭分组框
			$(".simpleModalWin").on('click','.menuPopClose',function(){
                $('body').css('position','relative')
				$(".simpleModalWin").hide();
				$("#label_choose_userid").val("");
			});
			//点击确定按钮
			$(".simpleModalWin").on('click','.btn_save',function(){
                $('body').css('position','relative')
				var label=$(".label_choose").filter(".active").attr("key");
				label_choose.callback(label);
				label_choose.hide();
			});
			$.ajaxSetup({   
	            async : false  
	        }); 
			label_choose.loadData();
			$.ajaxSetup({   
	            async : true  
	        });
			label_choose.callback=callback;
		},
		callback:null,
		labels:null,
		show_base_level:null,
		show:function(key){
			if(!key){
				label_choose.load(label_choose.labels.id);	
				label_choose.show_base_level=label_choose.labels.level;
			}else{
				var node=label_choose.findNodeByKey(key);
				if(!node){
					alert("该节点不存在");
					return;
				}
				label_choose.show_base_level=node.level;
				label_choose.load(node.id);
			}

            $('body').css('position','fixed');
			$(".simpleModalWin").show();
		},
		hide:function(){
            $('body').css('position','relative')
			$(".simpleModalWin").hide();
		},loadData:function(){
			var initUrl = "wx/admin/label/tree.json";
			$.post(initUrl, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				label_choose.labels=json.data;
				//alert(JSON.stringify(json.data));
				label_choose.load(label_choose.labels.id);
			}, "json");
		},load : function(nodeid) {
			var parentNode = label_choose.findNode(label_choose.labels, nodeid);
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
			var str = '<div class="tagName fl label_choose" key=\'{0}\' id=\'{2}\'>{1}</div>';
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
			if(!key){
				return null;
			}
			if(!tree){
				tree=label_choose.labels;
			}
			if (tree.key == key) {
				return tree;
			}
			if (typeof (tree.children) == "undefined") {
				return null;
			}
			for (var int = 0; int < tree.children.length; int++) {
				var node = tree.children[int];
				var leaf = label_choose.findNodeByKey(key,node);
				if (leaf != null) {
					return leaf;
				}
			}
		},findLeafByKey:function(key,tree){
			if(!tree){
				tree=label_choose.labels;
			}
			var node=label_choose.findNodeByKey(key,tree);
			if(!node){
				return null;
			}
			return node.children;
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


























