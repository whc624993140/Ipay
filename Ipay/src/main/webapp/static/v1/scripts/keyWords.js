$(function(){

	//选择创建规则的方式，如一问一答
	$('.rule_title ul li').click(function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		var key=$(this).attr("key");
		if('one2onediv'==key){
			replyType='one2one';
		}else if('one2morediv'==key){
			replyType='one2more';
		}
		$("#"+key).show();
		$(this).siblings().each(function(){
			var key=$(this).attr("key");
			$("#"+key).hide();
		});
	});
	$("li[key='one2onediv']").click();

	//点击创建规则，弹出一个规则框
	$('.createBtn').click(function(){
		resetRuleMak();
		var arr = new Array();
		$('.rule_title ul li').each(function(){
			if($(this).hasClass("active")){
				arr.push($(this).text());
			}
		});
		if(arr == ''){
			alert('请先选择创建方式！');
		}else{
			$('.ruleMak').show();
			$('.ruleMask_t span').text(arr[0]);
		}
	});
	
	$('.createDefaultReplyBtn').click(function(){
		//resetRuleMak();
		var arr = new Array();
		$('.rule_title ul li').each(function(){
			if($(this).hasClass("active")){
				arr.push($(this).text());
			}
		});
		if(arr == ''){
			alert('请先选择创建方式！');
		}else{
			$('.defaultReplyMask').show();
			$('.defaultReplyMask_t span').text(arr[0]);
		}
	});
	
	
	//关闭弹出框
	$('#autoreply_close').click(function(){
		$('.ruleMak').hide();
	});
	
	$('#defaultReplyMask_close').click(function(){
		$('.defaultReplyMask').hide();
	});

	//添加接收的关键词
	$('.inputKey').keyup(function(event){
		e = event ? event :(window.event ? window.event : null); 
		if(e.keyCode == 13){
			// alert('12');
			var _key =$(this).val();
			if(_key==""){
				return ;
			}
			if(_key.indexOf(",")>-1){
				alert("关键字不允许包含','");
				return ;
			}
			var isHave=false;
			$(".keyFlag").each(function(){
				if($(this).text()==_key){
					alert("关键词重复");
					isHave=true;
				}
				return;
			});
			if(isHave){
				return ;
			}
			$('.getKey').append('<div class="keyFlag fl" data="'+_key+'">'+_key+'<div class="flagRemove"><i class="icon-remove"></i></div></div>');
			$(this).val('');
		}
	});

	//移除关键词
	$(document).on('click','.flagRemove i',function(){
		$(this).parent().parent().remove();
	});

	//点击设置回覆内容
	$('.respCnt').click(function(){
		$('.lWin').animate({'left':'0'},{duration:500});
	});

	//关闭设置回复内容
	$('.lWin i').click(function(){
		$('.lWin').animate({'left':'100%'},{duration:500});
	});
	
	//选择回复内容的方式
	$('.respWin_cntL > ul > li').click(function(){
		//暂时隐藏
		//$(this).addClass('active');
		//$(this).siblings().removeClass('active');
	});
	
	//点击添加关注回复
	$('.createRespBtn').click(function(){
		resetResponMask();
		$('.responMask').show();
	});

	//关闭关注回复的弹出框
	$('.addAttention i').click(function(){
		$('.responMask').hide();
	});

	//关注回复里面的修改
	$(document).on('click','.respEdit',function(){
		var data=$(this).parent().parent().attr("data");
		resetResponMask();
		transferResponMask(jQuery.parseJSON(data));
		$('.responMask').show();
	});
	
	$(document).on('click','.respDelete',function(){
		if (confirm("确认要删除？")) {
			var oid=$(this).parent().parent().attr("id");
			subscribe_reply.del(oid);
		}
	});
	
	$(document).on('click','.defaultReplyEdit',function(){
		var data=$(this).parent().parent().attr("data");
		resetDefaultReplyMask();
		transferDefaultReplyMask(jQuery.parseJSON(data));
		$('.defaultReplyMask').show();
	});
	
	$(document).on('click','.defaultReplyDelete',function(){
		if (confirm("确认要删除？")) {
			var oid=$(this).parent().parent().attr("id");
			defaultReply.del(oid);
		}
	});

	//状态按钮的切换
	//可以通过判断是否有temp来确定按钮状态
	$(document).on('click','.onOff',function(){
		var id=$(this).parent().parent().attr("id");
		if($(this).hasClass('temp')){
			if($(this).hasClass('defaultReply')){
				defaultReply.changeOpen(id,true);
			}else{
				subscribe_reply.changeOpen(id,true);
			}
			$(this).find('a').text('ON');
			$(this).css({'text-align':'right','background':'#13c4a5'});
			$(this).find('.slideDot').css('left','-2.5px').addClass('slideDotAdd_b').removeClass('slideDotAdd');
			$(this).removeClass('temp');
		}else{
			if($(this).hasClass('defaultReply')){
				defaultReply.changeOpen(id,false);
			}else{
				subscribe_reply.changeOpen(id,false);
			}
			$(this).find('a').text('OFF');
			$(this).css({'text-align':'left','background':'#aaa'});
			$(this).find('.slideDot').css('left','37.5px').addClass('slideDotAdd').removeClass('slideDotAdd_b');
			$(this).addClass('temp');
		}
	});

	//点击添加关注回覆内容
	$('.attenRespCnt').click(function(){
		$('.pWin').animate({'left':'0'},{duration:500});
	});

	//关闭添加关注回复内容
	$('.pWin i').click(function(){
		$('.pWin').animate({'left':'100%'},{duration:500});
	});
	
	//点击添加关注回覆内容
	$('.dCnt').click(function(){
		$('.dWin').animate({'left':'0'},{duration:500});
	});

	//关闭添加关注回复内容
	$('.dWin i').click(function(){
		$('.dWin').animate({'left':'100%'},{duration:500});
	});
	
	
	$(document).on('click',".ruleEdit",function(){
		var data=$(this).parent().parent().attr("data");
		resetRuleMak();
		transferRuleMak(jQuery.parseJSON(data));
		$('.ruleMak').show();
		//$('.ruleMask_t span').text(arr[0]);
	});
	
	$(document).on('click',".ruleDelete",function(){
		if (confirm("确认要删除？")) {
			var oid=$(this).parent().parent().attr("id");
			keywords.del(oid);
		}
	});
	
	
	$("#reply_sure").click(function(){
		var text=$("#reply_textContent").val();
		var params={msgType:'text',content:text};
		addTextReply(params);
		$('.lWin').animate({'left':'100%'},{duration:500});
		$("#reply_textContent").val("");
	});
	
	$("#subreply_sure").click(function(){
		var text=$("#subreply_textContent").val();
		var params={msgType:'text',content:text};
		addSubTextReply(params);
		$('.pWin i').click();
		$("#subreply_textContent").val("");
	});
	
	$("#defaultReply_sure").click(function(){
		var text=$("#defaultReply_textContent").val();
		var params={msgType:'text',content:text};
		addDefaultTextReply(params);
		$('.dWin i').click();
		$("#defaultReply_textContent").val("");
	});
	
	$("#reply_save").click(function(){
		keywords.save();
	});
	
	$("#subReply_save").click(function(){
		subscribe_reply.save();
	});
	
	$("#defaultReply_save").click(function(){
		defaultReply.save();
	});
	
	
	$("#reply_newsChoose").click(function(){
		newsPosition='ruleMak';
		newsCheck.show();
	});
	
	$("#subReply_newsChoose").click(function(){
		newsPosition='responMask';
		newsCheck.show();
	});
	
	$("#defaultReply_newsChoose").click(function(){
		newsPosition='defaultReplynMask';
		newsCheck.show();
	});
	
	$(document).on("click",".reply_del",function(){
		$(this).parent().remove();
	});
	
	LockTopScreen();
	$.ajaxSetup({ 
	    async : false 
	});
	newsCheck.init(chooseNews);
	keywords.loadData();
	subscribe_reply.loadData();
	defaultReply.loadData();
	$.ajaxSetup({ 
	    async : true 
	});
	unLockTopScreen();
});

var replyType='one2one';

function resetRuleMak(){
	$("#reply_name").val("");
	$("#inputKey").val("");
	$("#reply_keys").html("");
	$("#replyContent").html("");
	$("#reply_id").val("");
}

function transferRuleMak(item){
	$("#reply_name").val(item.name);
	$("#inputKey").val("");
	$("#reply_keys").html("");
	var _keywords=item.keyword.split(",");
	for (var int = 0; int < _keywords.length; int++) {
		var _keyword = _keywords[int];
		$('.getKey').append('<div class="keyFlag fl" data="'+_keyword+'">'+_keyword+'<div class="flagRemove"><i class="icon-remove"></i></div></div>');
	}
	$("#reply_id").val(item.oid);
	if (typeof (item.messages) != "undefined"&&item.messages!=null) {
		for (var int = 0; int < item.messages.length; int++) {
			var msg= item.messages[int];
			if(msg.msgType=='text'){
				addTextReply(msg);
			}else if(msg.msgType=='news'){
				addNewsReply(msg);
			}
		}
	}
}


var newsPosition=null;
function chooseNews(newsid){
	if("ruleMak"==newsPosition){
		var params={msgType:'news',newsId:newsid};
		addNewsReply(params);
		newsCheck.hide();
		$('.lWin').animate({'left':'100%'},{duration:500});
		$("#reply_textContent").val("");
	}else if("responMask"==newsPosition){
		var params={msgType:'news',newsId:newsid};
		addSubNewsReply(params);
		newsCheck.hide();
		$('.pWin i').click();
		$("#subreply_textContent").val("");
	}else if("defaultReplynMask"==newsPosition){
		var params={msgType:'news',newsId:newsid};
		addDefaultNewsReply(params);
		newsCheck.hide();
		$('.dWin i').click();
		$("#defaultReply_textContent").val("");
	}
}


function addTextReply(params){
	$("#replyContent").append("<div data='"+JSON.stringify(params)+"' >文字回复："+params.content+"<a href='javascript:;' class='reply_del'>删除</a></div>");
}

function addNewsReply(params){
	var item=newsCheck.findNode(params.newsId);
	if(params.newsId.indexOf("single")==0){
		$("#replyContent").append("<div data='"+JSON.stringify(params)+"' >单图文回复："+item.title+"<a href='javascript:;' class='reply_del'>删除</a></div>");
	}else if(params.newsId.indexOf("multi")==0){
		$("#replyContent").append("<div data='"+JSON.stringify(params)+"' >多图文回复："+item.news[0].title+"<a href='javascript:;' class='reply_del'>删除</a></div>");
	}
}

function addSubTextReply(params){
	$("#subReplyContent").append("<div data='"+JSON.stringify(params)+"' >文字回复："+params.content+"<a href='javascript:;' class='reply_del'>删除</a></div>");
}

function addSubNewsReply(params){
	var item=newsCheck.findNode(params.newsId);
	if(params.newsId.indexOf("single")==0){
		$("#subReplyContent").append("<div data='"+JSON.stringify(params)+"' >单图文回复："+item.title+"<a href='javascript:;' class='reply_del'>删除</a></div>");
	}else if(params.newsId.indexOf("multi")==0){
		$("#subReplyContent").append("<div data='"+JSON.stringify(params)+"' >多图文回复："+item.news[0].title+"<a href='javascript:;' class='reply_del'>删除</a></div>");
	}
}

function addDefaultTextReply(params){
	$("#defaultReplyContent").append("<div data='"+JSON.stringify(params)+"' >文字回复："+params.content+"<a href='javascript:;' class='reply_del'>删除</a></div>");
}
function addDefaultNewsReply(params){
	var item=newsCheck.findNode(params.newsId);
	if(params.newsId.indexOf("single")==0){
		$("#defaultReplyContent").append("<div data='"+JSON.stringify(params)+"' >单图文回复："+item.title+"<a href='javascript:;' class='reply_del'>删除</a></div>");
	}else if(params.newsId.indexOf("multi")==0){
		$("#defaultReplyContent").append("<div data='"+JSON.stringify(params)+"' >多图文回复："+item.news[0].title+"<a href='javascript:;' class='reply_del'>删除</a></div>");
	}
}

function getReplyDatas(){
	var id=$("#reply_id").val();
	var name=$("#reply_name").val();
	var match=$("#reply_match").val();
	var keywords="";
	$("#reply_keys").children(".keyFlag").each(function(){
		if(keywords!=''){
			keywords+=","
		}
		keywords+=$(this).attr("data");
	});
	var replys=new Array();
	$("#replyContent").children("div").each(function(){
		var data=$(this).attr("data");
		if (typeof (replyContent) == "undefined"||replyContent==null) {
			return;
		}
		replys.push(jQuery.parseJSON(data));
	});
	var params={OID:id,keyword:keywords,match:match,name:name,datas:replys};
	return params;
}

function getDefaultReplyDatas(){
	var id=$("#defaultReply_id").val();
	var name=$("#defaultReply_name").val();
	var isOpen=$("#defaultReply_isOpen").val();
	var replys=new Array();
	$("#defaultReplyContent").children("div").each(function(){
		var data=$(this).attr("data");
		if (typeof (replyContent) == "undefined"||replyContent==null) {
			return;
		}
		replys.push(jQuery.parseJSON(data));
	});
	var params={OID:id,isOpen:isOpen,name:name,datas:replys};
	return params;
}

function checkReply(params){
	if(typeof (params.name) == "undefined"||params.name==""){
		alert("请输入名称！~");
		return false;
	}
	if(typeof (params.keyword) == "undefined"||params.keyword==""){
		alert("请输入关键字！~");
		return false;
	}
	if(typeof (params.datas) == "undefined"||params.datas.length==0){
		alert("请输入回复信息！~");
		return false;
	}
	if('one2one'==replyType){
		if(params.datas.length>1){
			alert("只能设置一条回复信息！~");
			return false;
		}
	}else if('one2more'==replyType){
		if(params.datas.length<=1){
			alert("请设置大于一条的回复信息！~");
			return false;
		}
	}
	return true;
}



var keywords={
		datas:null,
		loadData:function(){
			var url = "wx/admin/autoreply/list.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				keywords.datas=json.data;
				//alert(JSON.stringify(json.data));
				keywords.load();
				
			}, "json");
		},save:function(){
			var params=getReplyDatas();
			if(!checkReply(params)){
				return;
			}
			var url = "wx/admin/autoreply/save.json";
			$.post(url, params, function(json) {
				if (json.success) {
					alert("保存成功！~");
					$('.ruleMak').hide();
					keywords.updateNode(json.data);
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},load:function(){
			keywords.clear();
			if (typeof (keywords.datas) == "undefined"||keywords.datas==null||keywords.datas.length==0) {
				return;
			}
			for (var int = 0; int < keywords.datas.length; int++) {
				var item =  keywords.datas[int];
				keywords.addNode(item);
			}
			$("#one2onediv").append("<div class='clear'></div>");
		},del : function(id) {
			var url = "wx/admin/autoreply/"+id+"/delete.json";
			$.post(url, null, function(json) {
				if (json.success) {
					alert("删除成功");
					$("#"+id).remove();
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},updateNode:function(item){
			$("#"+item.oid).remove();
			keywords.addNode(item);
		},addNode:function(item){
			var str='<div class="ruleMode fl" id=\'{1}\' data=\'{2}\'><div class="ruleMode_t"><span>{0}</span><div class="ruleEdit">编辑</div><div class="ruleDelete">删除</div></div>';
			str = str.replace("{0}", item.name);
			str = str.replace("{1}", item.oid);
			str = str.replace("{2}", JSON.stringify(item));
			str+='<div class="ruleMode_key"><div class="ruleMode_l">关键词：</div><div class="ruleMode_r">';
			var _keywords=item.keyword.split(",");
			for (var int = 0; int < _keywords.length; int++) {
				var _keyword = _keywords[int];
				str+="<span>"+_keyword+"</span>";
			}
			str+='</div></div><div class="ruleMode_type"><div class="ruleMode_l fl">规则类型：</div><div class="ruleMode_r fl">';
			if('equals'==item.match){
				str+='完全匹配';
			}else if('like'==item.match){
				str+='模糊匹配';
			}
			str+='</div></div><div class="ruleMode_disp"><div class="ruleMode_l fl">回复内容：</div><div class="ruleMode_r fl">';
			
			if (typeof (item.messages) != "undefined"&&item.messages!=null) {
				for (var int = 0; int < item.messages.length; int++) {
					var msg= item.messages[int];
					if(msg.msgType=='text'){
						str+='<div>文字回复：'+msg.content+'</div>';
					}else if(msg.msgType=='news'){
						var news=newsCheck.findNode(msg.newsId);
						if(msg.newsId.indexOf("single")==0){
							str+='<div>单图文回复：'+news.title+'</div>';
						}else if(msg.newsId.indexOf("multi")==0){
							str+='<div>多图文回复：'+item.news[0].title+'</div>';
						}
					}
				}
			}
			str+='</div></div></div>';
			if (typeof (item.messages) == "undefined"||item.messages==null) {
				$("#one2onediv").prepend(str);
			}else if(item.messages.length==1){
				$("#one2onediv").prepend(str);
			}else{
				$("#one2morediv").prepend(str);
			}
		},clear:function(){
			$("#one2onediv").children(".ruleMode").remove();
			$("#one2morediv").children(".ruleMode").remove();
		}
}

function getSubscribeReplyDatas(){
	var id=$("#subreply_id").val();
	var name=$("#subreply_name").val();
	var replys=new Array();
	$("#subReplyContent").children("div").each(function(){
		var data=$(this).attr("data");
		if (typeof (replyContent) == "undefined"||replyContent==null) {
			return;
		}
		replys.push(jQuery.parseJSON(data));
	});
	var params={OID:id,name:name,datas:replys};
	return params;
}

function checkSubscribeReplyDatas(params){
	if(typeof (params.name) == "undefined"||params.name==""){
		alert("请输入名称！~");
		return false;
	}
	if(typeof (params.datas) == "undefined"||params.datas.length==0){
		alert("请输入回复信息！~");
		return false;
	}
	return true;
}


function resetResponMask(){
	$("#subreply_id").val("");
	$("#subreply_name").val("");
	$("#subReplyContent").html("");
}

function resetDefaultReplyMask(){
	$("#defaultReply_id").val("");
	$("#defaultReply_name").val("");
	$("#defaultReplyContent").html("");
}

function transferResponMask(item){
	$("#subreply_id").val(item.oid);
	$("#subreply_name").val(item.name);
	if (typeof (item.messages) != "undefined"&&item.messages!=null) {
		for (var int = 0; int < item.messages.length; int++) {
			var msg= item.messages[int];
			if(msg.msgType=='text'){
				addSubTextReply(msg);
			}else if(msg.msgType=='news'){
				addSubNewsReply(msg);
			}
		}
	}
}

function transferDefaultReplyMask(item){
	$("#defaultReply_id").val(item.oid);
	$("#defaultReply_name").val(item.name);
	$("#defaultReply_isOpen").val(item.isOpen);
	if (typeof (item.messages) != "undefined"&&item.messages!=null) {
		for (var int = 0; int < item.messages.length; int++) {
			var msg= item.messages[int];
			if(msg.msgType=='text'){
				addDefaultTextReply(msg);
			}else if(msg.msgType=='news'){
				addDefaultNewsReply(msg);
			}
		}
	}
}

var subscribe_reply={
		datas:null,
		loadData:function(){
			var url = "wx/admin/subscribereply/list.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				subscribe_reply.datas=json.data;
				//alert(JSON.stringify(json.data));
				subscribe_reply.load();
			}, "json");
		},save:function(){
			var params=getSubscribeReplyDatas();
			if(!checkSubscribeReplyDatas(params)){
				return;
			}
			var url = "wx/admin/subscribereply/save.json";
			$.post(url, params, function(json) {
				if (json.success) {
					alert("保存成功！~");
					subscribe_reply.hide();
					subscribe_reply.updateNode(json.data);
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},load:function(){
			subscribe_reply.clear();
			if (typeof (subscribe_reply.datas) == "undefined"||subscribe_reply.datas==null||subscribe_reply.datas.length==0) {
				return;
			}
			for (var int = 0; int < subscribe_reply.datas.length; int++) {
				var item =  subscribe_reply.datas[int];
				subscribe_reply.addNode(item);
			}
		},del : function(id) {
			var url = "wx/admin/subscribereply/"+id+"/delete.json";
			$.post(url, null, function(json) {
				if (json.success) {
					alert("删除成功");
					$("#"+id).remove();
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},changeOpen:function(id,isOpen){
			LockTopScreen();
			var url = "wx/admin/subscribereply/"+id+"/changeopen.json";
			$.post(url, {isOpen:isOpen}, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				unLockTopScreen();
			}, "json");
		},updateNode:function(item){
			$("#"+item.oid).remove();
			subscribe_reply.addNode(item);
		},addNode:function(item){
			var str='<tr id="{0}" data=\'{1}\' class=\'subdata\'><td>{2}</td><td>{3}</td><td><span class="respEdit">修改</span> | <span class="respDelete">删除</span></td><td>';
			str+='{4}</td></tr>;'
			str = str.replace("{2}", item.name);
			str = str.replace("{0}", item.oid);
			str = str.replace("{1}", JSON.stringify(item));
			var replyContent='';
			if (typeof (item.messages) != "undefined"&&item.messages!=null) {
				for (var int = 0; int < item.messages.length; int++) {
					var msg= item.messages[int];
					if(msg.msgType=='text'){
						replyContent+='<div>文字回复：'+msg.content+'</div>';
					}else if(msg.msgType=='news'){
						var news=newsCheck.findNode(msg.newsId);
						if(msg.newsId.indexOf("single")==0){
							replyContent+='<div>单图文回复：'+news.title+'</div>';
						}else if(msg.newsId.indexOf("multi")==0){
							replyContent+='<div>多图文回复：'+item.news[0].title+'</div>';
						}
					}
				}
			}
			str = str.replace("{3}", replyContent);
			var openHtml='<div class="onOff"><a>ON</a><div class="slideDot"></div></div>';
			if(!item.isOpen){
				openHtml='<div class="onOff temp" style="text-align: left; background: rgb(170, 170, 170) none repeat scroll 0% 0%;"><a>OFF</a><div class="slideDot slideDotAdd" style="left: 37.5px;"></div></div>';
			}
			str = str.replace("{4}", openHtml);
			$("#subscribe_reply_table #sub_table_th").after(str);
		},clear:function(){
			$("#subscribe_reply_table .subdata").remove();
		},hide:function(){
			$(".responMask").hide();			
		}
}





var defaultReply={
		datas:null,
		loadData:function(){
			var url = "wx/admin/autoreply/default/list.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				defaultReply.datas=json.data;
				//alert(JSON.stringify(json.data));
				defaultReply.load();
				
			}, "json");
		},save:function(){
			var params=getDefaultReplyDatas();
			var url = "wx/admin/autoreply/default/save.json";
			$.post(url, params, function(json) {
				if (json.success) {
					alert("保存成功！~");
					$('.defaultReplyMask').hide();
					defaultReply.updateNode(json.data);
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},load:function(){
			defaultReply.clear();
			if (typeof (defaultReply.datas) == "undefined"||defaultReply.datas==null||defaultReply.datas.length==0) {
				return;
			}
			for (var int = 0; int < defaultReply.datas.length; int++) {
				var item =  defaultReply.datas[int];
				try{
				defaultReply.addNode(item);
				}catch(e){
					alert(e);
				}
			}
			$("#defaultReplydiv").append("<div class='clear'></div>");
		},del : function(id) {
			var url = "wx/admin/autoreply/default/"+id+"/delete.json";
			$.post(url, null, function(json) {
				if (json.success) {
					alert("删除成功");
					$("#"+id).remove();
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},changeOpen:function(id,isOpen){
			LockTopScreen();
			var url = "wx/admin/autoreply/default/"+id+"/changeopen.json";
			$.post(url, {isOpen:isOpen}, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				unLockTopScreen();
			}, "json");
		},updateNode:function(item){
			$("#"+item.oid).remove();
			defaultReply.addNode(item);
		},addNode:function(item){
			//var str='<div class="ruleMode fl" id=\'{1}\' data=\'{2}\'><div class="ruleMode_t"><span>{0}</span><div class="defaultReplyEdit">编辑</div><div class="defaultReplyDelete">删除</div></div>';
			//str = str.replace("{0}", item.name);
			//str = str.replace("{1}", item.oid);
			//str = str.replace("{2}", JSON.stringify(item));
			//str+='<div class="ruleMode_key"><div class="ruleMode_l">开关：</div><div class="ruleMode_r">';
			//if(item.isOpen){
			//	str+="开";
			//}else{
			//	str+="关";
			//}
			//str+='</div></div><div class="ruleMode_disp"><div class="ruleMode_l fl">回复内容：</div><div class="ruleMode_r fl">';
			
			//if (typeof (item.messages) != "undefined"&&item.messages!=null) {
			//	for (var int = 0; int < item.messages.length; int++) {
			//		var msg= item.messages[int];
			//		if(msg.msgType=='text'){
			//			str+='<div>文字回复：'+msg.content+'</div>';
			//		}else if(msg.msgType=='news'){
			//			var news=newsCheck.findNode(msg.newsId);
			//			if(msg.newsId.indexOf("single")==0){
			//				str+='<div>单图文回复：'+news.title+'</div>';
			//			}else if(msg.newsId.indexOf("multi")==0){
			//				str+='<div>多图文回复：'+item.news[0].title+'</div>';
			//			}
			//		}
			//	}
			//}
			//str+='</div></div></div>';
			//$("#defaultReplydiv").prepend(str);
			
			
			
			
			
			
			var str='<tr id="{0}" data=\'{1}\' class=\'subdata\'><td>{2}</td><td>{3}</td><td><span class="defaultReplyEdit">修改</span> | <span class="defaultReplyDelete">删除</span></td><td>';
			str+='{4}</td></tr>;'
			str = str.replace("{2}", item.name);
			str = str.replace("{0}", item.oid);
			str = str.replace("{1}", JSON.stringify(item));
			var replyContent='';
			if (typeof (item.messages) != "undefined"&&item.messages!=null) {
				for (var int = 0; int < item.messages.length; int++) {
					var msg= item.messages[int];
					if(msg.msgType=='text'){
						replyContent+='<div>文字回复：'+msg.content+'</div>';
					}else if(msg.msgType=='news'){
						var news=newsCheck.findNode(msg.newsId);
						if(msg.newsId.indexOf("single")==0){
							replyContent+='<div>单图文回复：'+news.title+'</div>';
						}else if(msg.newsId.indexOf("multi")==0){
							replyContent+='<div>多图文回复：'+item.news[0].title+'</div>';
						}
					}
				}
			}
			str = str.replace("{3}", replyContent);
			var openHtml='<div class="onOff defaultReply"><a>ON</a><div class="slideDot"></div></div>';
			if(!item.isOpen){
				openHtml='<div class="onOff temp defaultReply" style="text-align: left; background: rgb(170, 170, 170) none repeat scroll 0% 0%;"><a>OFF</a><div class="slideDot slideDotAdd" style="left: 37.5px;"></div></div>';
			}
			str = str.replace("{4}", openHtml);
			$("#default_reply_table #default_table_th").after(str);
			
			
			
		},clear:function(){
			$("#defaultReplydiv").children(".ruleMode").remove();
		}
}


































