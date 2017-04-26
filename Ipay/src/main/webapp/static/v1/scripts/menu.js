$(function() {

	// 关闭弹出的编辑菜单窗口
	$(".menuPopClose i").click(function() {
		$(".modalWin").hide();
		$(".errorTip").hide();
	});

	$(document).on("click",".mm-icon .icon-plus",function() {
		resetForm();
		$(".menuPop input[name='parentid']").val("-1");
		$(".menuPopTitle span").html("您正在创建一个一级菜单");
		$(".modalWin").show();
		$(".st1").show();
		$(".st2").hide();
	});
	$(document).on("click",".ul-mm .icon-pencil",function() {
		resetForm();
		pencil_this = $(this).parent().parent();
		pencil_id = pencil_this.attr("id");
		pencil_key = pencil_this.attr("key");
		pencil_sort = pencil_this.attr("sort");
		pencil_level = pencil_this.attr("level");
		var _text = pencil_this.find("span:first").text();
		$(".modalWin").show();
		$(".st1").show();
		$(".st2").hide();
		$("#name").val(_text);
		$("#key").val(pencil_key);
		$("#sort").val(pencil_sort);
		$("#id").val(pencil_id);
		$("#level").val(pencil_level);
		$(".menuPopTitle span").html("您正在编辑菜单");
	});
	
	$(document).on("click",".ul-mm .icon-plus",function() {
		plus_this = $(this).parent().parent();
		resetForm();
		$(".menuPop input[name='parentid']").val(plus_this.attr("id"));
		$(".modalWin").show();
		$(".st1").show();
		$(".st2").hide();
		$(".menuPopTitle span").html("您正在创建一个子菜单");
		editFlag = "plus";
	});
	$(document).on("click",".ul-mm .icon-trash",function() {
		if (confirm("确认要删除？")) {
			var _id = $(this).parent().parent().attr("id");
			menu.del(_id);
		}
	});

	// 保存编辑菜单按钮点击事件
	$(".btn_save").click(function() {
			var _submitText = $("#name").val();
			var _key= $("#key").val();
			var _parentId = $("#parentid").val();
			var _id= $("#id").val();
			var _sort= $("#sort").val();
			var _level= $("#level").val();
			var _strLen = _submitText.length+ _submitText.replace(/[\u0000-\u00ff]/g, "").length;
			if(_strLen < 1){
				$(".errorTip").show();
				$(".errorTip span").html("菜单不能为空");
				return;
			}
			if ((_parentId=='-1'||_level=='1')&&_strLen > 8) {
				$(".errorTip").show();
				$(".errorTip span").html("一级菜单最多4个汉字");
				return;
			}
			if ((_parentId==''&&_level=='2'&&_strLen > 14)||(_parentId!=''&&_level==''&&_strLen > 14)) {
				$(".errorTip").show();
				$(".errorTip span").html("二级菜单最多7个汉字");
				return;
			}
			
			if(_id==''){
				var params={name:_submitText,key:_key,parentid:_parentId,sort:_sort}
				menu.add(params);
			}else{
				var params={name:_submitText,key:_key,id:_id,sort:_sort}
				menu.update(params);
			}
			$(".modalWin").hide();
			$(".errorTip").hide();
		});
	
	$(".action_push").click(function(){
		var url = "wx/admin/menu/push.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}else{
				alert(JSON.stringify(json.data));
			}
		}, "json");
	});
	
	$(".action_release").click(function(){
		var url = "wx/admin/menu/release.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}else{
				alert("发布成功");
			}
		}, "json");
	});
	menu.loadData(menuaction.news);
	menuaction.loadData();
});


function resetForm(){
	$(".menuPop input[name='name']").val("");
	$("#key").val("");
	$(".menuPop input[name='parentid']").val("");
	$("#id").val("");
	$("#sort").val("");
}



// 点击菜单编辑图文消息里的效果
$(function() {
	$(document).on('click',".ul-mm li",function(event) {
		$(".menu1").css("background","#f1f2f7");
		$(".menu2").css("background","#f1f2f7");
		$(this).css("background", "rgba(0,0,0,.1)");
		menuaction.menuid=$(this).attr("id")
		event.stopPropagation();
	});
	$(".action-img ul li").click(function() {
		if(menuaction.menuid==null){
			alert("请选择一个您要编辑的菜单！");
			return;
		}
		var _textSti = $(this).find("span").html();
		menuaction.resetShow();
		switch (_textSti) {
		case "文字":
			$(".actDisp").animate({
				"left" : "0"
			}, {
				duration : 500
			});
			$(".actDtic").html('<i class="icon-text-width"></i>');
			$(".act_inputArea").hide();
			$(".act_textArea").show();
			break;
		case "图文消息":
			newsCheck.show();
			break;
		case "链接":
			$(".actDisp").animate({
				"left" : "0"
			}, {
				duration : 500
			});
			$(".actDtic").html('<i class="icon-link"></i>');
			$(".act_textArea").hide();
			$(".act_inputArea").show();
			break;
		case "卡券":
			$(".actDtic").html('<i class="icon-print"></i>');
			break;
		default:
			$(".actDtic").html('<i class="icon-text-width"></i>');
		}
	});

	$(".imgWinClose").click(function() {
		$(".imgWin").hide();
		$(".imgText").removeClass("imgWinAdd");
	});
	$(".actDispNo").click(function() {
		$(".actDisp").animate({
			"left" : "100%"
		}, {
			duration : 500
		});
	});
	
	$(".actDispYes").click(function(){
		if(menuaction.menuid==null){
			alert("请选择一个菜单！");
			return false;
		}
		//连接
		if($(".act_inputArea").is(':visible')){
			var _url=$("#return_url").val();
			if(checkUrl(_url)){
				menuaction.link(_url);
			}else{
				alert("连接不合法");
				return false;
			}
		}
		//文字
		if($(".act_textArea").is(':visible')){
			var text=$("#return_text").val();
			menuaction.text(text);
		}
		$(".actDispNo").click();
	});
	newsCheck.init(menuaction.news);
});

// 微信菜单预览
$(function() {
	$(document).on("click",".action_preview",function() {
		$(".preview_bar>ul").html("");
		var arr = new Array();
		$(".ul-mm>li").each(function() {
			var _res = $(this).children("span").text();
			arr.push(_res);
		});
		switch (arr.length) {
		case 0:
			// alert("no");
			break;
		case 1:
			var fMenuName = arr[0];
			$(".preview_bar>ul").append('<li><i class="icon-reorder"></i><span>'+ fMenuName + '</span></li>');
			$(".preview_bar>ul>li:nth-child(1)").css({"width" : "284px"});
			break;
		case 2:
			var sMenuName1 = arr[0];
			var sMenuName2 = arr[1];
			$(".preview_bar>ul").append('<li><i class="icon-reorder"></i><span>'
									+ sMenuName1
									+ '</span></li><li><i class="icon-reorder"></i><span>'
									+ sMenuName2
									+ '</span></li>');
			$(".preview_bar>ul>li:nth-child(1)").css("width","142px");
			$(".preview_bar>ul>li:nth-child(2)").css("width","142px");
			break;
		case 3:
			var tMenuName1 = arr[0];
			var tMenuName2 = arr[1];
			var tMenuName3 = arr[2];
			$(".preview_bar>ul").append('<li><i class="icon-reorder"></i><span>'
									+ tMenuName1
									+ '</span></li><li><i class="icon-reorder"></i><span>'
									+ tMenuName2
									+ '</span></li><li><i class="icon-reorder"></i><span>'
									+ tMenuName3
									+ '</span></li>');
			$(".preview_bar>ul>li:nth-child(1)").css("width","94.5px");
			$(".preview_bar>ul>li:nth-child(2)").css("width","94.5px");
			$(".preview_bar>ul>li:nth-child(3)").css("width","95px");
			break;
		}
	});
	$(document).on('click',".preview_bar>ul>li",function() {
				var _prevThis = $(this);
				var _index = $(this).index();
				var _inLi = $(".ul-mm>li").eq(_index);
				if (_inLi.is(":has(ul)")) {
					var sonArr = new Array();
					_inLi.find("li").each(function() {
						var _sonRes = $(this).children("span").text();
						sonArr.push(_sonRes);
					});

					// 阻止重复的循环数据
					if (_prevThis.hasClass('temp')) {
						_prevThis.children("ul").show();
						_prevThis.siblings().children("ul").hide();
					} else {
						for (var i = 0; i < sonArr.length; i++) {
							if (_prevThis.is(":has(ul)")) {
								_prevThis.children("ul").append(
										"<li>" + sonArr[i] + "</li>");
								_prevThis.children("ul").show();
								_prevThis.siblings().children("ul").hide();
								_prevThis.addClass('temp');
							} else {
								_prevThis.append("<ul><li>" + sonArr[i]
										+ "</li></ul>");
								_prevThis.children("ul").show();
								_prevThis.siblings().children("ul").hide();
								_prevThis.addClass('temp');
							}
						}
					}
				} else {
					// alert("没有子菜单啦！")
				}
			});
	$(document).on('click',".preview_bar>ul>li>ul>li", function() {
		return false;
	});
});






var menu={
		menus:null,
		loadData:function(){
			var initUrl = "wx/admin/menu/tree.json";
			$.post(initUrl, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				menu.menus=json.data;
				//alert(JSON.stringify(json.data));
				menu.clear();
				menu.load(menu.menus);
			}, "json");
		},load : function(node) {
			if (typeof (node) == "undefined") {
				return ;
			}
			if (typeof (node.children) == "undefined") {
				return ;
			}
			for (var int = 0; int < node.children.length; int++) {
				var items = node.children[int];
				items.parentid=node.id;
				menu.addNode(items);
				menu.load(items);
			}
			$('#'+menuaction.menuid).css("background", "rgba(0,0,0,.1)");
		},del : function(id) {
			var delUrl = "wx/admin/menu/delete.json";
			$.post(delUrl, {id : id}, function(json) {
				if (json.success) {
					$("#" + id).remove();
					alert("删除成功");
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},
		add : function(node) {
			var saveUrl = "wx/admin/menu/save.json";
			$.post(saveUrl,node,function(json) {
					if (json.success) {
						var parentid=node.parentid;
						json.data.parentid=parentid;
						menu.addNode(json.data);
						node = json.data;
						var _node = menu.findNode(menu.menus,parentid);
						if (typeof (_node.children) == "undefined") {
							_node.children = new Array(node);
						} else {
							_node.children.push(node);
						}
						alert("保存成功");
					} else {
						alert(json.errmsg);
					}
				}, "json");
		},
		update : function(node) {
			var saveUrl = "wx/admin/menu/update.json";
			$.post(saveUrl, node, function(json) {
				if (json.success) {
					menu.updateNode(json.data);
					var _node = menu.findNode(menu.menus, node.id);
					_node.name = node.name;
					_node.key = node.key;
					alert("修改成功");
				} else {
					alert(json.errmsg);
				}
			}, "json");

		},
		addNode : function(node) {
			if(node.level==1){
				var str='<li id="{0}" key="{1}" sort="{3}" level="1" class="menu1"><span>{2}</span><div class="li-edit"><i class="icon-plus fl"></i><i class="icon-pencil fl"></i><i class="icon-trash fl"></i></div><ul></ul></li>';
				str = str.replace("{0}", node.id);
				str = str.replace("{1}", node.key);
				str = str.replace("{2}", node.name);
				str = str.replace("{3}", node.sort);
				$(".ul-mm").append(str);
			}
			if(node.level==2){
				var str='<li id="{0}" key="{1}" sort="{3}" level="2" class="menu2"><span>{2}</span><div class="ul-son-edit"><i class="icon-pencil fl"></i><i class="icon-trash fl"></i></div></li>';
				str = str.replace("{0}", node.id);
				str = str.replace("{1}", node.key);
				str = str.replace("{2}", node.name);
				str = str.replace("{3}", node.sort);
				$("#"+node.parentid).children("ul").append(str);
			}
		},
		updateNode : function(node) {
			$("#" + node.id).children("span").html(node.name);
			$("#" + node.id).attr("key",node.key);
			$("#" + node.id).attr("sort",node.sort);
		},findNode : function(tree, nodeid) {
			if (tree.id == nodeid) {
				return tree;
			}
			if (typeof (tree.children) == "undefined") {
				return null;
			}
			for (var int = 0; int < tree.children.length; int++) {
				var node = tree.children[int];
				var leaf = menu.findNode(node, nodeid);
				if (leaf != null) {
					return leaf;
				}
			}
		},clear:function(){
			$(".ul-mm").html("");
		}
}



var menuaction={
		menuid:null,
		action:null,
		loadData:function(){
			var initUrl = "wx/admin/reply/list.json";
			$.post(initUrl, {prefix:'Menu_'}, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				menuaction.action=json.data;
			}, "json");
		},find:function(key){
			if(menuaction.action){
				for (var int = 0; int < menuaction.action.length; int++) {
				var action = menuaction.action[int];
				if ('Menu_'+key == action.key) {
					return action;
				}
			}
			}
		},text:function(text){
			var url = "wx/admin/menu/click/text.json";
			$.post(url, {id : menuaction.menuid,text:text}, function(json) {
				if (json.success) {
					menu.loadData();
					menuaction.loadData();
					alert('修改成功！~');
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},news:function(newid){
			var url = "wx/admin/menu/click/news.json";
			$.post(url, {id : menuaction.menuid,newid:newid}, function(json) {
				if (json.success) {
					menu.loadData();
					menuaction.loadData();
					alert('修改成功！~');
				} else {
					alert(json.errmsg);
				}
				newsCheck.hide();
			}, "json");
		},link:function(link){
			var url = "wx/admin/menu/view/link.json";
			$.post(url, {id : menuaction.menuid,link:link}, function(json) {
				if (json.success) {
					menu.loadData();
					menuaction.loadData();
					alert('修改成功！~');
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},resetShow:function(){
			$("#return_text").val('');
			$("#return_url").val('');
			var node=menu.findNode(menu.menus,menuaction.menuid);
			if(!node){
				return;
			}
			if(node.type=='view'){
				$("#return_url").val(node.url);
				return;
			}
			var action=menuaction.find(node.key);
			if(!action){
				return;
			}
			if(action.messages[0].msgType=='text'){
				$("#return_text").val(action.messages[0].content);
			}
			
		}
}




















