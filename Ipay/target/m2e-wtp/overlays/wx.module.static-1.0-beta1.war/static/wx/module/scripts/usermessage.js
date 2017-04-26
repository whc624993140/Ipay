$(function() {

	$(".btncancell").click(function() {
		$(".link-box").animate({
			"margin-top" : "-100%"
		}, 500);
		setTimeout(function() {
			$(".meng-mask").fadeOut(500);
		}, 150);
	});
	$("#close_qrcode_button").click(function(){
		
		//$('.labelMaskCnt').hide();
		$("#mes").hide();
	})
	$(".btnok").click(function() {
		$(".link-box").animate({
			"margin-top" : "-100%"
		}, 500);
		setTimeout(function() {
			$(".meng-mask").fadeOut(500);
		}, 150);
	});
	
	$("#reply_mes li").click(function(){
		if($(this).hasClass("messgeRelease_t_liAdd")){
			$("#checktext").show();
			$("#checknews").hide();
			$("#checktype").val("text");
		}else if($(this).hasClass("news_msg")){
			$("#checktext").hide();
			$("#checknews").show();
			$("#checktype").val("news");
		}
	});
	$("#clearnews_btn").click(function(){
		$(".img_show").empty();
	});
	$(document).on('click',"[name='playvoice']",function() {
		var url=$(this).attr("url");
		playSound(url);
	});


	$(document).on("click", "#newsuser li",function() {
		var curli = $(this);
		curli.find(".unread").remove();
		curli.addClass("active");
		curli.siblings().removeClass("active");
		$("#curchouser").text(curli.find("span").text());
		usermessage.loadPage($(this).attr("id"));
	});
	
	
	$(".reply-choose").filter(".text").click(function(){
		var did=dialogConfirmShow(wx_lang.page_key339,wx_lang.page_key336+"？",function(){
			var checktype=$("#checktype").val();
			if("text"==checktype){
				var content = $("#textcontent").val();
				if(content.length>500){

					dialogAlertShow(wx_lang.page_key339,wx_lang.page_key467,function(){},wx_lang.page_key341);
					return;
				}
				customsend.textsend(content);
			}else if("news"==checktype){
				var newsid=$("#checked_news_hide").val();
				customsend.newssend(newsid);
			}else{
				dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+wx_lang.page_key506,function(){},wx_lang.page_key341);
			}	
		});
	});

	$(".page_fir").click(function(){
		usermessage.page("first");
	});
	$(".page_next").click(function(){
		usermessage.page("next");
	});
	$(".page_previous").click(function(){
		usermessage.page("previous");
	});
	$(".page_end").click(function(){
		usermessage.page("end");
	});

	$(".user_fir").click(function(){
		user.page("first");
	});
	$(".user_next").click(function(){
		user.page("next");
	});
	$(".user_previous").click(function(){
		user.page("previous");
	});
	$(".user_end").click(function(){
		user.page("end");
	});
	$("#checknews_btn").click(function(){
		newsCheck.show();
	});
	$("#searchUser").click(function(){
		var nickname=$("#userNickName").val();
		user.condition.nickname=nickname;
		user.condition.pageNum=1;
		user.loadPage();
	});
	
	$("#resetre").click(function(){
		var time=$("#reTime").val();
		if(time){
			refreshUser.reset(time);
		}
	});
	
	$("#stopre").click(function(){
		refreshUser.stop();
	});
	newsCheck.init(selectNews);
	user.loadPage();
	usermessageCount.init();
	refreshUser.reset();
	reminderMail.init();
	


	$('.ch_group>li').click(function() {
		var self = $(this)
		var oIndex = self.index();
		$('.ch_con>div').eq(oIndex).show().siblings().hide();
	});
	
	
	$('#mes_show').click(function() {
		$('.mes_item').empty();
		reminderMail.init();
		$("#mes").show();
	});

	$(".icon-remove").click(function() {
		$("#mes").hide();
	});
	
	$(".mes_ad").click(	function() {
		reminderMail.addMailNode();
	});
	
	$(document).on('click',"[data-click=\"remindermail-remove\"]",function(){
		reminderMail.delMailNode(this);
	});
	
	$("#remindermail_switch").change(function(){
		reminderMail.changeReminderMailSwitch();
	});
	
	$("#add_qrcode_button").click(function(){
		reminderMail.save();
	});
});




var reminderMail={
	addMailNode:function(){
		var len = $(".mes_item>div").length;
		if (len >= 5) {

			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key504,function(){},wx_lang.page_key341);
			return ;
		}
		var str = '<div class=" mes_div"><input type="text" name="name"  class="mes_input" placeholder="tom@163.com"><span data-click="remindermail-remove">X</span></div>';
		$(".mes_item").append(str);
	},delMailNode:function(e){
		$(e).parent().remove();
	},getMails:function(){
		var mails=[];
		var res = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
		$(".mes_input").each(function(){
			var val=$(this).val();
			if(res.test(val)){
				mails.push(val);
			}else{
				mails.length=0;
				mails.push(false)

				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key432,function(){},wx_lang.page_key341);
				return false;
			}
		});
		return mails;
	},save:function(){
		var url="wx/admin/usermessage/remindermail/mail/save.json";
		var datas=reminderMail.getMails();
		var time=$("#mail_time").val();
		if(datas[0]==false){
			$('.mes_item').empty();
			$("#mes").hide();
			return;
		}
		$.ajax({
			url : url,
			data :  {mails:datas,minute:time},
			cache : false,
			traditional : true,
			type : 'post',
			success : function(json, status, xhr) {
				if (!json.success) {
					return;
				}
				//alert(wx_lang.page_key357);
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key357,function(){},wx_lang.page_key341);
				$("#mes").hide();
			},
			dataType : 'json'
		});
	},init:function(){
		var initUrl="wx/admin/usermessage/remindermail/get.json";
		$.get(initUrl,null, function(json) {
			if (!json.success) {
				return;
			}
//			 alert(JSON.stringify(json));
			 $("#remindermail_switch").attr("checked",json.data.isSwitch);
			 
			 var mails=json.data.mails;
			 for (var int = 0; int < mails.length; int++) {
				 reminderMail.addMailNode();
				 $(".mes_input:last").val(mails[int]);
			 }
			 $("#mail_time").val(json.data.time);
		}, "json");
	},changeReminderMailSwitch:function(){
		var checked=$("#remindermail_switch").is(":checked");
		var initUrl="wx/admin/usermessage/remindermail/switch/save.json";
		$.post(initUrl, {isSwitch:checked}, function(json) {
			if (!json.success) {
				return;
			}
			//alert(wx_lang.page_key357);
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key357,function(){},wx_lang.page_key341);
		}, "json");
	}
}

function selectNews(newsid){
	var node=newsCheck.findNode(newsid);
	if(!node){
		return ;
	}
	$("#checked_news_hide").val(newsid);
	$(".img_show").empty();
	if(newsid.indexOf("single")==0){
		var str='<li id="{0}"><div class="iml_title">{1}</div><div class="iml_time">{2}</div><div class="iml_image"><img src="{3}" ></div>';
		str+='<div class="iml_disp1"><p>{4}</p></div></li>';
		str = str.replace("{0}", node.oid);
		str = str.replace("{1}", node.title);
		str = str.replace("{2}", timeStamp2String(node.updateTime));
		str = str.replace("{3}", node.picurl);
		if (typeof(node.description) == "undefined"){ 
			str = str.replace("{4}", " ");
		}else{
			str = str.replace("{4}", node.description);
		}
		//str = str.replace("{4}", node.description);
		$("#news_show_ul").append(str);
	}else{
		var str='<li id={0}><div class="iml_title">{1}</div><div class="iml_time">{2}</div><div class="iml_image"><img src="{3}" ></div>';
		str = str.replace("{0}", node.oid);
		str = str.replace("{1}", node.news[0].title);
		str = str.replace("{2}", timeStamp2String(node.updateTime));
		str = str.replace("{3}", node.news[0].picurl);
		for (var int = 1; int < node.news.length; int++) {
			str+='<div class="iml_disp2"><div class="iml_disp2_t fl">{4}</div><img src="{5}" ></div>';
			str = str.replace("{4}", node.news[int].title);
			str = str.replace("{5}", node.news[int].picurl);
		}
		str+='</li>';
		$("#news_show_ul").append(str);
	}
	newsCheck.hide();
}

var user = {
	data : null,
	condition : {pageSize:10},
	loadPage : function() {
		var initUrl = "wx/admin/usermessage/users/unread/page.json";
		$.post(initUrl, user.condition, function(json) {
			if (!json.success) {
				//alert(json.errmsg);
				dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				return;
			}
			user.data = json.data;
			user.clear();
			// alert(JSON.stringify(user.data));
			user.load();
			var datas = json.data
			$("#news_page").pager({
				itemCount:datas.totalCount,
				pageSize:datas.pageSize,
				maxButtonCount:1,
				pageIndex:datas.currentPage-1,
		        backFn:function(p){
		        	user.condition.pageNum=p+1;
		        	user.clear();
		        	user.loadPage();
		        }
		    });
			detectionMessages.reset();
		}, "json");
	},
	load : function() {
		//user.condition=user.data.conditions;
		user.condition.pageNum=user.data.currentPage;
		user.condition.pageSize=user.data.pageSize;
		if (typeof (user.data.items) == "undefined") {
			$("#userCount").html(wx_lang.page_key167);
			return;
		}
		for (var int = 0; int < user.data.items.length; int++) {
			var item = user.data.items[int];
			user.addNode(item);
		}
		$("#userCount").html(wx_lang.page_key403 + user.data.totalCount + wx_lang.page_key464);
	},
	addNode : function(item) {
		var str = '<li id=\'{4}\'><img src="{0}" class="model-fl"><div class="users-desc news-box">{5}<div class="users-p1 up"><span>{1}</span><div class="users-time">{2}</div></div>';
		str += '<div class="users-p2 up">{3}</div></div></li>';
		str = str.replace("{0}", item.headimgurl);
		str = str.replace("{1}", item.nickname);
		str = str.replace("{2}",typeof (item.lastActionTime) == "undefined" ? "": timeStamp2String(item.lastActionTime));
		//先截取字符串：用户发送信息
		var ss = item.lastActionStr.substring(0,6);
		var ss2 = item.lastActionStr.substring(6);
		console.info(ss);
		if(typeof (item.lastActionStr) == "undefined"){
			str = str.replace("{3}", "");
		}else{
			if(/^[\u4e00-\u9fa5]+$/i.test(wx_lang.page_key339)){
				//判断是否是中文版
				str = str.replace("{3}", item.lastActionStr);
			}else{
				str = str.replace("{3}",wx_lang.page_key538+ss2);
			}
		}
		//str = str.replace("{3}",typeof (item.lastActionStr) == "undefined" ? "": item.lastActionStr);
		str = str.replace("{4}", item.openid);
		if(item.unreadCount>0){
			str = str.replace("{5}", '<div class="unread">'+item.unreadCount+'</div>');
		}else{
			str = str.replace("{5}", '');
		}
		
		$("#newsuser>ul").append(str);
	},
	clear : function() {
		$("#newsuser>ul").html("");
	},page:function(type){
		if(user.condition==null){
			return ;
		}
		if("first"==type){
			if(user.condition.pageNum==1){
				return ;
			}
			user.condition.pageNum=1;
		}
		if("next"==type){
			if(user.condition.pageNum== Math.ceil(user.data.totalCount/user.condition.pageSize)){
				return ;
			}
			user.condition.pageNum=user.data.currentPage+1;
		}
		if("previous"==type){
			if(user.condition.pageNum==1){
				return ;
			}
			user.condition.pageNum=user.data.currentPage-1;
		}
		if("end"==type){
			if(user.condition.pageNum== Math.ceil(user.data.totalCount/user.condition.pageSize)){
				return ;
			}
			user.condition.pageNum= Math.ceil(user.data.totalCount/user.condition.pageSize);
		}
		user.loadPage();
	}
}

var usermessage = {
	messages : null,
	condition : {},
	loadPage : function(openid) {
		if (typeof (openid) != "undefined") {
			usermessage.condition.openid=openid;
		}
		var initUrl = "wx/admin/usermessage/" + usermessage.condition.openid + "/page.json";
		$.post(initUrl, usermessage.condition, function(json) {
			if (!json.success) {
				//alert(json.errmsg);
				dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				return;
			}
			usermessage.messages = json.data;
			usermessage.clear();
			// alert(JSON.stringify(user.page));
			usermessage.load();
			/*var datas = json.data
			$("#user_message_page").pager({
				itemCount:datas.totalCount,
				pageSize:datas.pageSize,
				maxButtonCount:1,
				pageIndex:datas.currentPage-1,
		        backFn:function(p){
		        	usermessage.condition.pageNum=p+1;
		        	usermessage.clear();
		        	usermessage.loadPage();
		        }
		    });*/
			//$("#current_openid").val(openid);
		}, "json");
	},
	load : function() {
		//usermessage.condition=usermessage.messages.conditions;
		usermessage.condition.pageNum=usermessage.messages.currentPage;
		usermessage.condition.pageSize=usermessage.messages.pageSize;
		if (typeof (usermessage.messages.items) == "undefined") {
			$("#dataCount").html(wx_lang.page_key167);
			return;
		}
		for (var int = 0; int < usermessage.messages.items.length; int++) {
			var item = usermessage.messages.items[int];
			usermessage.addNode(item);
		}
		$("#dataCount").html(wx_lang.page_key403 + usermessage.messages.totalCount + wx_lang.page_key464);
	},
	addNode : function(item) {
		if('um'==item.type){
			usermessage.addUserMessageNode(item);
		}else if('cs'==item.type){
			usermessage.addCustomSendNode(item);
		}
	},addUserMessageNode:function(item){
		var str='<div class="datetime">{0}</div><div class="usermsg"><div class="user fl"><img src="{1}" class="fl" /></div>';
	    str+='<div class="arrowleft fl"></div><div class="tagleft fl">{2}</div><!-- 对话框内容--></div></div><div class="clear"></div>';
		if("text"==item.msgtype){
			str = str.replace("{0}",(new Date(item.date)).Format("yyyy-MM-dd hh:mm:ss"));
			str = str.replace("{1}", $("#"+item.openId).children("img").attr("src"));
			str = str.replace("{2}", ""+wx_lang.page_key466+"："+item.content);
			$("#messages").append(str);
		}else if("image"==item.msgtype){
			str = str.replace("{0}",(new Date(item.date)).Format("yyyy-MM-dd hh:mm:ss"));
			str = str.replace("{1}", $("#"+item.openId).children("img").attr("src"));
			str = str.replace("{2}", "<img src='wx/admin/media/get?mediaid="+item.mediaId+"' />");
			$("#messages").append(str);
		}else if("voice"==item.msgtype){
			str = str.replace("{0}",(new Date(item.date)).Format("yyyy-MM-dd hh:mm:ss"));
			str = str.replace("{1}", $("#"+item.openId).children("img").attr("src"));
			str = str.replace("{2}", "<button type='button'name='playvoice' url='wx/admin/media/get?mediaid="+item.mediaId+"'>"+wx_lang.page_key384+"</button>");
			$("#messages").append(str);
		}
	},addCustomSendNode:function(item){
		var str='<div class="datetime">{0}</div><div class="cstmsg"><div class="user fr"><img src="{1}" class="fl" /></div>';
		str+='<div class="arrowright fr"></div><div class="tagright fr">{2}</div></div><div class="clear"></div>';
		if('text'==item.msgtype){
			var sendmsg=jQuery.parseJSON(item.sendmsg);
			var res=jQuery.parseJSON(item.res);
			str = str.replace("{0}",(new Date(item.date)).Format("yyyy-MM-dd hh:mm:ss"));
			str = str.replace("{1}", "static/v1/images/admin.png");
			str = str.replace("{2}", ""+wx_lang.page_key466+"："+sendmsg.text.content+"<br/>"+wx_lang.page_key395+":"+res.errmsg);
			$("#messages").append(str);
		}else if('news'==item.msgtype){
			var sendmsg=jQuery.parseJSON(item.sendmsg);
			var res=jQuery.parseJSON(item.res);
			str = str.replace("{0}",(new Date(item.date)).Format("yyyy-MM-dd hh:mm:ss"));
			str = str.replace("{1}", "static/v1/images/admin.png");
			str = str.replace("{2}", (sendmsg.news.articles.length>1?""+wx_lang.page_key87+":":""+wx_lang.page_key86+":")+sendmsg.news.articles[0].title+"<br/>"+wx_lang.page_key395+":"+res.errmsg);
			$("#messages").append(str);
		}
	},
	clear : function() {
		$("#messages").html("");
	},page:function(type){
		if(usermessage.condition==null){
			return ;
		}
		if("first"==type){
			if(usermessage.condition.pageNum==1){
				return ;
			}
			usermessage.condition.pageNum=1;
		}
		if("next"==type){
			if(usermessage.condition.pageNum== Math.ceil(usermessage.messages.totalCount/usermessage.condition.pageSize)){
				return ;
			}
			usermessage.condition.pageNum=usermessage.messages.currentPage+1;
		}
		if("previous"==type){
			if(usermessage.condition.pageNum==1){
				return ;
			}
			usermessage.condition.pageNum=usermessage.messages.currentPage-1;
		}
		if("end"==type){
			if(usermessage.condition.pageNum== Math.ceil(usermessage.messages.totalCount/usermessage.condition.pageSize)){
				return ;
			}
			usermessage.condition.pageNum= Math.ceil(usermessage.messages.totalCount/usermessage.condition.pageSize);
		}
		usermessage.loadPage();
	}
}

var usermessageCount = {
	condition : {},
	init:function(){
		var n = new Date();
		n.setHours(0);
		n.setMinutes(0);
		n.setSeconds(0);
		n.setMilliseconds(0);
		var startTime=new Date(n.getTime());
		n.setHours(23);
		n.setMinutes(59);
		n.setSeconds(59);
		var endTime=new Date(n.getTime());
		usermessageCount.condition.startTime=startTime.getTime();
		usermessageCount.condition.endTime=endTime.getTime();
		usermessageCount.load();
	},
	load : function() {
		$.post("wx/admin/usermessage/users/unread/count.json", null, function(json) {
			if (!json.success) {
				//alert(json.errmsg);
				dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				return;
			}
			$("#c1").html(json.data.unReadSum);
			if(json.data.unReadSum>0){
				window.parent.window.titlemessage.show();
			}else{
				window.parent.window.titlemessage.clear();
			}
			//alert(JSON.stringify(json));
		}, "json");
/*		$.post("wx/admin/usermessage/count.json", usermessageCount.condition, function(json) {
			if (!json.success) {
				//alert(json.errmsg);
				dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				return;
			}
			$("#c2").html(json.data.all);
			//alert(JSON.stringify(json));
		}, "json");
		$.post("wx/admin/customsend/count.json", usermessageCount.condition, function(json) {
			if (!json.success) {
				//alert(json.errmsg);
				dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				return;
			}
			$("#c3").html(json.data.all);
			//alert(JSON.stringify(json));
		}, "json");*/
	}
}

var customsend = {
	textsend : function(content) {
		if(!content){

			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key431,function(){},wx_lang.page_key341);
			return;
		}
		var openid=usermessage.condition.openid;
		if (typeof (openid) == "undefined"||openid=="") {

			dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key333+"！",function(){},wx_lang.page_key341);
			return;
		}
		var params={content:content};
		var initUrl = "wx/admin/customsend/user/"+openid+"/text/send.json";
		$.post(initUrl, params, function(json) {
			usermessage.loadPage();
			$("#textcontent").val("");
			if (!json.success) {
				//alert(json.errmsg);
				var str  = json.errmsg;
				if(str.indexOf("out of time")){
					dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key488+"！~",function(){},wx_lang.page_key341);
				}else{
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);	
				}
				return;
			}
			user.loadPage();
            usermessageCount.load();
			refreshUser.reset();
			//alert(""+wx_lang.page_key393+"！");
			dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key393+"！",function(){},wx_lang.page_key341);
			// alert(JSON.stringify(user.page));
		}, "json");
	},
	newssend : function(newsid) {
		var openid=usermessage.condition.openid;
		if (typeof (openid) == "undefined"||openid=="") {
			//alert(""+wx_lang.page_key426+"！");
			dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key333+"！",function(){},wx_lang.page_key341);
			return;
		}
		var params={newsid:newsid};
		var initUrl = "wx/admin/customsend/user/"+openid+"/news/send.json";
		$.post(initUrl, params, function(json) {
			usermessage.loadPage();
			if (!json.success) {
				//alert(json.errmsg);
				/*dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				return;*/
				var str  = json.errmsg;
				if(str.indexOf("out of time")){
					dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key488+"！~",function(){},wx_lang.page_key341);
				}else{
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);	
				}
				return;
			}
			newsCheck.hide();
			user.loadPage();
            usermessageCount.load();
			refreshUser.reset();
			//alert(""+wx_lang.page_key393+"！");
			dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key393+"！",function(){},wx_lang.page_key341);
			//$("#textcontent").val("");
			// alert(JSON.stringify(user.page));
		}, "json");
	}

}


var detectionMessages={
	timer:null,
	time:30000,
	lastTime:0,
	reset:function(){
		detectionMessages.lastTime=new Date().getTime();
		clearInterval(detectionMessages.timer);
		detectionMessages.clear();
		detectionMessages.timer= setInterval(  
           function() {   
              detectionMessages.get();
            },      
            detectionMessages.time
        );   
	},
	get:function(){
		var initUrl = "wx/admin/usermessage/time.json";
		$.post(initUrl, null, function(json) {
			if (!json.success) {
				return;
			}
			if (typeof (json.data) == "undefined"||typeof (detectionMessages.time) == "undefined") {
				return;
			}
			if(json.data>detectionMessages.lastTime){
				detectionMessages.show();			
			}
		}, "json");
	},
	show:function(){
		clearInterval(detectionMessages.timer);   
		window.parent.window.titlemessage.show();
	},clear:function(){
		window.parent.window.titlemessage.clear();
	}
}

var refreshUser={
	timer:null,
	time:30000,
	reset:function(newTime){
		if(newTime){
			refreshUser.time=newTime*1000;
		}
		refreshUser.stop();
		refreshUser.start();
	},
	stop:function(){
		clearInterval(refreshUser.timer);   
	},start:function(){
		refreshUser.timer= setInterval(  
           function() {
              user.loadPage();
              usermessageCount.load();
              detectionMessages.clear();
            },   
            refreshUser.time
        );
	}

}





































