$(function(){
	$(".imgWinClose").click(function(){
		$(".messageVoice").hide();
		$(".imgText").removeClass("imgWinAdd");
	});

	try{
		$(".messgeRelease_t ul li").eq(0).addClass("messgeRelease_t_liAdd");
		$(".messageText").show();
		$(".messageImg").hide();
		$(".messageVoice").hide();
		// $(".messgeRelease_t ul li span").hide();
	}catch(err){
	}
	$(".messgeRelease_t ul li").hover(function(){
		$(this).find("span").show();
		$(this).siblings().find("span").hide();
	},function(){
		$(this).find("span").hide();
		$(this).siblings().find("span").hide();
	});
	$(".messgeRelease_t ul li").click(function(){
		if($(this).find("i").hasClass("icon-text-width")){
			$(".messageText").show();
			$(".messagenews").hide();
			$(".messageImg").hide();
			$(".messageVoice").hide();
			$("#checktype").val("text");
		}else if($(this).find("i").hasClass("icon-file-alt")){
			$(".messageText").hide();
			$(".messagenews").show();
			$(".messageImg").hide();
			$(".messageVoice").hide();
			$("#checktype").val("news");
		}else if($(this).find("i").hasClass("icon-picture")){
			$(".messageText").hide();
			$(".messagenews").hide();
			$(".messageImg").show();
			$(".messageVoice").hide();
			$("#checktype").val("image");
		}else if($(this).find("i").hasClass("icon-music")){
			$(".messageText").hide();
			$(".messagenews").hide();
			$(".messageImg").hide();
			$(".messageVoice").show();
			$("#checktype").val("voice");
		}
	});

	$(".sendBtn").click(function(){
		sendType = $(this).attr("id");
		$(this).addClass("temp");
		$(this).parent().siblings().find(".sendBtn").removeClass("temp");
		$(this).append("<div class='operYes'><a class='icon-ok'></a></div>");
		$(this).parent().siblings().find(".operYes").remove();
	});
	
	$(".RleBt").click(function(){
		send();
	});
	
	$("#checknews_btn").click(function(){
		newsCheck.show();
	});
	
	$("#imageFileUploadButton").click(function(){
		$.ajaxFileUpload({
			url : "upload", 
			secureuri : false,
			fileElementId : 'imageFile', // 文件选择框的id属性
			uploadFileKey:'file',
			dataType : 'json', 
			success : function(json,status) // 相当于java中try语句块的用法
			{
				//alert(JSON.stringify(json));
				if(!json.success){
					//alert(json.errmsg);
					dialogAlertShow(wx_lang.page_key332,json.errmsg,function(){},wx_lang.page_key334);
					return ;
				}
				$("#uploadImg").html('<img src="'+json.uri+'" />');
			}
		});
	});
	
	$("#voiceFileUploadButton").click(function(){
		$.ajaxFileUpload({
			url : "upload", 
			secureuri : false,
			fileElementId : 'voiceFile', // 文件选择框的id属性
			uploadFileKey:'file',
			dataType : 'json', 
			success : function(json,status) // 相当于java中try语句块的用法
			{
				//alert(JSON.stringify(json));
				if(!json.success){
					//alert(json.errmsg);
					dialogAlertShow(wx_lang.page_key332,json.errmsg,function(){},wx_lang.page_key334);
					return ;
				}
				$("#uploadVoice").html(json.uri);
			}
		});
	});
	
	$("#-999").click(function(){
		$("#mass_label_selected").empty();
		$("#mass_label_selected").append( "<div class='tagName fl ' key='all' >"+wx_lang.page_key178+"<span name='del_label_selected'>X</span></div>");
		updatePersonTotal();
	});
	
	$("#mass_label_selected").on('click',"[name='del_label_selected']",function(){
		$(this).parent().remove();
		updatePersonTotal();
	});
	
	$("#select_label").click(function(){
		label_mulit_choose.show();
	});
	label_mulit_choose.init(checkLabel_callback);
	newsCheck.init(selectNews);
});

var sendType=null;

function checkLabel_callback(labels){
	$("#mass_label_selected").empty();
	for (var int = 0; int < labels.length; int++) {
		var node=label_mulit_choose.findNodeByKey(labels[int]);
		var str = '<div class="tagName fl label" key=\'{0}\' >{1}<span name=\'del_label_selected\'>X</span></div>';
		str = str.replace("{0}", node.key);
		str = str.replace("{1}", node.name);
		$("#mass_label_selected").append(str);
	}
	updatePersonTotal();
}

function updatePersonTotal(){
	var labels=getLabels();
	if(labels.length==0){
		$("#totalPerson").html("0");
		return;
	}
	var url="wx/admin/userandlabel/count.json";
	var params={labels:labels};
	for (var int = 0; int < labels.length; int++) {
		if(labels[int]=='all'){
			$("#totalPerson").html(""+wx_lang.page_key273+wx_lang.page_key487);
			return;
		}
	}
	$.ajax({
		type : 'post',
		traditional : true,
		url : url,
		data : params,
		success : function(json) {
			if (!json.success) {
				//alert(json.errmsg);
				dialogAlertShow(wx_lang.page_key332,json.errmsg,function(){},wx_lang.page_key334);
				return;
			}
			$("#totalPerson").html(json.data);	
		},
		dataType : 'json'
	});
}

function send(){
	var did=dialogConfirmShow(wx_lang.page_key339,""+wx_lang.page_key336+"？",function(){
		var checkType=$("#checktype").val();
		if("text"==checkType){
			sendText();
		}else if("news"==checkType){
			sendNews();
		}else if("image"==checkType){
			sendImage();
		}else if("voice"==checkType){
			sendVoice();
		}
	});
}

function getLabels(){
	var labels=new Array();
	$("#mass_label_selected").find('.tagName').each(function(){
		labels.push($(this).attr("key"));
	});
	return labels;
}

function sendImage(){
	var labels=getLabels();
	if(labels.length==0){
		//alert(""+wx_lang.page_key272+""+wx_lang.page_key330+"");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key330+"！~",function(){},wx_lang.page_key341);
		return;
	}
	var src = $("#uploadImg").find("img").attr("src");
	if (typeof (src) == "undefined"||src=="") {
		//alert(""+wx_lang.page_key183+""+wx_lang.page_key184+"！");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key183+""+wx_lang.page_key184+"！~",function(){},wx_lang.page_key341);
		return ;
	}
	if("customsend"==sendType){
		customsend.image(labels,src);
	}else if("mass"==sendType){
		masssend.image(labels,src);
	}else {
		//alert(""+wx_lang.page_key425+"！");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key506+"！~",function(){},wx_lang.page_key341);
	}
}

function sendVoice(){
	var labels=getLabels();
	if(labels.length==0){
		//alert(""+wx_lang.page_key272+""+wx_lang.page_key330+"");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key330+"！~",function(){},wx_lang.page_key341);
		return;
	}
	var voice = $("#uploadVoice").html();
	if (typeof (voice) == "undefined"||voice=="") {
		//alert(""+wx_lang.page_key183+""+wx_lang.page_key485+"！");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key183+""+wx_lang.page_key485+"！~",function(){},wx_lang.page_key341);
		return ;
	}
	if("customsend"==sendType){
		customsend.voice(labels,voice);
	}else if("mass"==sendType){
		masssend.voice(labels,voice);
	}else{
		//alert(""+wx_lang.page_key425+"！");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key506+"！~",function(){},wx_lang.page_key341);
	}
}

function sendText(){
	var labels=getLabels();
	if(labels.length==0){
		//alert(""+wx_lang.page_key272+""+wx_lang.page_key330+"");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key330+"！~",function(){},wx_lang.page_key341);
		return;
	}
	var content = $("#textcontent").val();
	if (typeof (content) == "undefined"||content=="") {
		//alert(""+wx_lang.page_key431+"！");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key431+"！~",function(){},wx_lang.page_key341);
		return ;
	}
	if("customsend"==sendType){
		customsend.text(labels,content);
	}else if("mass"==sendType){
		masssend.text(labels,content);
	}else{
		//alert(""+wx_lang.page_key425+"！");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key506+"！~",function(){},wx_lang.page_key341);
	}
}

function sendNews(){
	var labels=getLabels();
	if(labels.length==0){
		//alert(""+wx_lang.page_key272+""+wx_lang.page_key330+"");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key330+"！~",function(){},wx_lang.page_key341);
		return;
	}
	var newsid=$("#checked_news_hide").val();
	if(!newsid){
		//alert(""+wx_lang.page_key272+wx_lang.page_key465);
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key465+"！~",function(){},wx_lang.page_key341);
		return;
	}
	if("customsend"==sendType){
		customsend.news(labels,newsid);
	}else if("mass"==sendType){
		masssend.news(labels,newsid);
	}else if("preview"==sendType){
		preview.news(labels,newsid);
	}else {
		//alert(""+wx_lang.page_key425+"！");
		dialogAlertShow(wx_lang.page_key339,""+wx_lang.page_key272+""+wx_lang.page_key506+"！",function(){},wx_lang.page_key341);
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
		//	str = str.replace("{4}", node.description);
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

var customsend={
	text : function(label,content) {
		if(label=='all'){
			//alert(wx_lang.page_key380+wx_lang.page_key273+wx_lang.page_key487);
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key380+wx_lang.page_key273+wx_lang.page_key487,function(){},wx_lang.page_key341);
		}
		var params={content:content,labels:label};
		var initUrl = "wx/admin/customsend/labels/text/send.json";
		$.ajax({
			type : 'post',
			traditional : true,
			url : initUrl,
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				//alert(wx_lang.page_key393);
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				// alert(JSON.stringify(user.page));
				},
			dataType : 'json'
		});
	},news : function(label,newsid) {
		if(label=='all'){
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key380+wx_lang.page_key273+wx_lang.page_key487,function(){},wx_lang.page_key341);
			//alert(wx_lang.page_key380+wx_lang.page_key273+wx_lang.page_key487);
		}
		var params={newsid:newsid,labels:label};
		var initUrl = "wx/admin/customsend/labels/news/send.json";
		$.ajax({
			type : 'post',
			traditional : true,
			url : initUrl,
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				//alert(wx_lang.page_key393);
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				// alert(JSON.stringify(user.page));
				},
			dataType : 'json'
		});
	},image:function(label,src){
		if(label=='all'){
			//alert(wx_lang.page_key380+wx_lang.page_key273+wx_lang.page_key487);
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key380+wx_lang.page_key273+wx_lang.page_key487,function(){},wx_lang.page_key341);
		}
		var params={src:src,labels:label};
		var initUrl = "wx/admin/customsend/labels/image/send.json";
		$.ajax({
			type : 'post',
			traditional : true,
			url : initUrl,
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				//alert(wx_lang.page_key393);
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				// alert(JSON.stringify(user.page));
				},
			dataType : 'json'
		});
	},voice:function(label,src){
		if(label=='all'){
			//alert(wx_lang.page_key380+wx_lang.page_key273+wx_lang.page_key487);
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key380+wx_lang.page_key273+wx_lang.page_key487,function(){},wx_lang.page_key341);
		}
		var params={src:src,labels:label};
		var initUrl = "wx/admin/customsend/labels/voice/send.json";
		$.ajax({
			type : 'post',
			traditional : true,
			url : initUrl,
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				//alert(wx_lang.page_key393);
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				// alert(JSON.stringify(user.page));
				},
			dataType : 'json'
		});
	}
}


var masssend={
	text : function(label,content) {
		var params={content:content,labels:label};
		var initUrl = "wx/admin/massjob/labels/text/send.json";
		if(label=='all'){
			initUrl = "wx/admin/massjob/all/text/send.json";
		}
		$.ajax({
			type : 'post',
			traditional : true,
			url : initUrl,
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				//alert(wx_lang.page_key393);
				// alert(JSON.stringify(user.page));
				},
			dataType : 'json'
		});
	},news : function(label,newsid) {
		var params={newsid:newsid,labels:label};
		var initUrl = "wx/admin/massjob/labels/news/send.json";
		if(label=='all'){
			initUrl = "wx/admin/massjob/all/news/send.json";
		}
		$.ajax({
			type : 'post',
			traditional : true,
			url : initUrl,
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				//alert(wx_lang.page_key393);
				newsCheck.hide();
				// alert(JSON.stringify(user.page));
			},
			dataType : 'json'
		});
	},image:function(label,src){
		var params={src:src,labels:label};
		var initUrl = "wx/admin/massjob/labels/image/send.json";
		if(label=='all'){
			initUrl = "wx/admin/massjob/all/image/send.json";
		}
		$.ajax({
			type : 'post',
			traditional : true,
			url : initUrl,
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				//alert(wx_lang.page_key393);
				// alert(JSON.stringify(user.page));
			},
			dataType : 'json'
		});
	},voice:function(label,src){
		var params={src:src,labels:label};
		var initUrl = "wx/admin/massjob/labels/voice/send.json";
		if(label=='all'){
			initUrl = "wx/admin/massjob/all/voice/send.json";
		}
		$.ajax({
			type : 'post',
			traditional : true,
			url : initUrl,
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				//alert(wx_lang.page_key393);
				// alert(JSON.stringify(user.page));
			},
			dataType : 'json'
		});
	}
}


var preview={
	news : function(label,newsid) {
		if(label=='all'){
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key386+wx_lang.page_key273+wx_lang.page_key487,function(){},wx_lang.page_key341);
			//alert(wx_lang.page_key386+wx_lang.page_key273+wx_lang.page_key487);
			return;
		}
		var params={newsid:newsid,labels:label};
		$.ajax({
			type : 'post',
			traditional : true,
			url : "wx/admin/mass/preview/labels/news/send.json",
			data : params,
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				newsCheck.hide();
				//alert(wx_lang.page_key393);
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key393,function(){},wx_lang.page_key341);
				// alert(JSON.stringify(user.page));
			},
			dataType : 'json'
		});
	}
}
