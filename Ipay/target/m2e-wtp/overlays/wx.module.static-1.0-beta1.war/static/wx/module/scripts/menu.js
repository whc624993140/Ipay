$(function() {
	getScript("static/wx/dataexchange/module/menu/menu.js", function(){
		menu.loadData(menuaction.news);
	}, true);
	getScript("static/wx/dataexchange/module/reply/reply.js", function(){
		menuaction.loadData();
	}, true);
	$(".menuPopClose i").click(function() {
		$(".modalWin").hide();
		$(".errorTip").hide();
	});

	$(document).on("click",".mm-icon .icon-plus",function() {
		resetForm();
		$(".menuPop input[name='parentid']").val("-1");
		$(".menuPopTitle span").html(wx_lang.page_key342);
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
		$(".menuPopTitle span").html(wx_lang.page_key348);
	});
	
	$(document).on("click",".ul-mm .icon-plus",function() {
		plus_this = $(this).parent().parent();
		resetForm();
		$(".menuPop input[name='parentid']").val(plus_this.attr("id"));
		$(".modalWin").show();
		$(".st1").show();
		$(".st2").hide();
		$(".menuPopTitle span").html(wx_lang.page_key343);
		editFlag = "plus";
	});
	$(document).on("click",".ul-mm .icon-trash",function() {
		if (confirm(wx_lang.page_key349)) {
			var _id = $(this).parent().parent().attr("id");
			menu.del(_id);
		}
	});

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
				$(".errorTip span").html(wx_lang.page_key385);
				return;
			}
			if(_key==null){
				$(".errorTip").show();
				$(".errorTip span").html("菜单key值不能为空");
				return;
			}
			if ((_parentId=='-1'||_level=='1')&&_strLen > 8) {
				$(".errorTip").show();
				$(".errorTip span").html(wx_lang.page_key482);
				return;
			}
			if ((_parentId==''&&_level=='2'&&_strLen > 14)||(_parentId!=''&&_level==''&&_strLen > 14)) {
				$(".errorTip").show();
				$(".errorTip span").html(wx_lang.page_key390);
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
		wxmenu.release(function(json){
			if (!json.success) {
				alert(json.errmsg);
				return;
			}else{
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key387,function(){},wx_lang.page_key341);
				//alert(""+wx_lang.page_key72+wx_lang.page_key387);
			}
		})
	});
	//menu.loadData(menuaction.news);
	//menuaction.loadData();
});


function resetForm(){
	$(".menuPop input[name='name']").val("");
	$("#key").val("");
	$(".menuPop input[name='parentid']").val("");
	$("#id").val("");
	$("#sort").val("");
}

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
			//alert(wx_lang.page_key340);
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key340,function(){},wx_lang.page_key341);
			return;
		}
		var _textSti = $(this).find("span").html();
		menuaction.resetShow();
		switch (_textSti) {
		case wx_lang.page_key185:
			$(".actDisp").animate({
				"left" : "0"
			}, {
				duration : 500
			});
			$(".actDtic").html('<i class="icon-text-width"></i>');
			$(".act_inputArea").hide();
			$(".act_textArea").show();
			break;
		case wx_lang.page_key187:
			newsCheck.reflush();
			newsCheck.show();
			break;
		case wx_lang.page_key76:
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
			dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+"一个菜单！",function(){},wx_lang.page_key341);
			return false;
		}
		//连接
		if($(".act_inputArea").is(':visible')){
			var _url=$("#return_url").val();
			if(checkUrl(_url)){
				menuaction.link(_url);
			}else{
				//alert(wx_lang.page_key416);
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key416,function(){},wx_lang.page_key341);
				return false;
			}
		}
		if($(".act_textArea").is(':visible')){
			var text=$("#return_text").val();
			menuaction.text(text);
		}
		$(".actDispNo").click();
	});
	newsCheck.init(menuaction.news);
});

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
					// alert(""+wx_lang.page_key421+"！")
				}
			});
	$(document).on('click',".preview_bar>ul>li>ul>li", function() {
		return false;
	});
});

var menu={
		menus:null,
		loadData:function(){
			wxmenu.list(function(json){
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				menu.menus=json.data;
				//alert(JSON.stringify(json.data));
				menu.clear();
				menu.load(menu.menus);
			})
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
			wxmenu.del(id,function(json){
				if (json.success) {
					$("#" + id).remove();
					dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key99+wx_lang.page_key387,function(){},wx_lang.page_key341);
				} else {
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				}
			})
		},
		add : function(node) {
			wxmenu.save(node,function(json){
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
					dialogAlertShow(wx_lang.page_key339,wx_lang.page_key357,function(){},wx_lang.page_key341);
					//alert(wx_lang.page_key357);
				} else {
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
					//alert(json.errmsg);
				}
			})
		},
		update : function(node) {
			wxmenu.update(node,function(json){
				if (json.success) {
					menu.updateNode(json.data);
					var _node = menu.findNode(menu.menus, node.id);
					_node.name = node.name;
					_node.key = node.key;
					dialogAlertShow(wx_lang.page_key339,wx_lang.page_key353,function(){},wx_lang.page_key341);
					//alert(wx_lang.page_key353);
				} else {
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
					//alert(json.errmsg);
				}
			})
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
			reply.list('Menu_',function(json){
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				menuaction.action=json.data;	
			})
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
			var params = {id : menuaction.menuid,text:text};
			wxmenu.clickText(params,function(json){
				if (json.success) {
					menu.loadData();
					menuaction.loadData();
					dialogAlertShow(wx_lang.page_key339,wx_lang.page_key353+'！~',function(){},wx_lang.page_key341);
				} else {
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				}
			})
		},news:function(newid){
			var params = {id : menuaction.menuid,newid:newid};
			wxmenu.clickNews(params,function(json){
				if (json.success) {
					menu.loadData();
					menuaction.loadData();
					dialogAlertShow(wx_lang.page_key339,wx_lang.page_key353+'！~',function(){},wx_lang.page_key341);
				} else {
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				}
				newsCheck.hide();
			})
		},link:function(link){
			var params = {id : menuaction.menuid,link:link};
			wxmenu.viewLink(params,function(json){
				if (json.success) {
					menu.loadData();
					menuaction.loadData();
					dialogAlertShow(wx_lang.page_key339,wx_lang.page_key353+'！~',function(){},wx_lang.page_key341);
				} else {
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				}
			});
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

