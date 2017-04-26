$(function() {
	
	$("#fileUploadButton").click(function(){
		singleNews.uploadCover();
	});
	
	$(".itOneBtnConf").click(function(){
		var params=getParams();
		if(!checkParams(params)){
			return;
		}
		singleNews.save(params);
	});
	
	$(".itOneBtnCanl").click(function(){
		window.location.href="wx/admin/news/manage.html";
	});
	
	$("#insertMobleMete").click(function(){
		editorhepler.insertMeta();
		//$(this).attr("disabled",true);
	});
	
	
	$("#processImg").click(function(){
		editorhepler.processImg();
		//$(this).attr("disabled",true);
	});
	
});
function checkURL(URL){
	var str=URL;
	//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
	//下面的代码中应用了转义字符"\"输出一个字符"/"
	var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
	return true;
	}else{
	return false;
	}
	} 

function getParams(){
	var picurl=$(".faceCnt").children("img").attr("src");
	var title=$("#title").val();
	var description=$("#description").val();
	var content=CKEDITOR.instances.content.getData();
	var isDirectJump=$("#isDirectJump").val();
	var url=$("#url").val();
	var OID=$("#OID").val();
	var author=$("#author").val();
	var show_cover_pic=("checked" == $("#show_cover_pic").attr("checked")?1:0);
	var params={picurl:picurl,title:title,description:description,content:content,isDirectJump:isDirectJump,
			url:url,OID:OID,author:author,show_cover_pic:show_cover_pic};
	return params;
}
function checkParams(params){
	if(params.title==""){
		dialogAlertShow(wx_lang.page_key339,wx_lang.page_key429+wx_lang.page_key187+wx_lang.page_key383,function(){},wx_lang.page_key341);
		return false;
	}
	if(params.title.length>64){
		dialogAlertShow(wx_lang.page_key339,wx_lang.page_key187+wx_lang.page_key383+"不能超过64个字",function(){},wx_lang.page_key341);
		return false;
	}
	if(params.picurl=="" || params.picurl==null){
		dialogAlertShow(wx_lang.page_key339,wx_lang.page_key183+wx_lang.page_key187+wx_lang.page_key400,function(){},wx_lang.page_key341);
		return false;
	}
	if(params.content.length>80000){
		dialogAlertShow(wx_lang.page_key339,wx_lang.page_key492+wx_lang.page_key457,function(){},wx_lang.page_key341);
		return false;
	}
	if(params.content==null || params.content==""){
		dialogAlertShow(wx_lang.page_key339,wx_lang.page_key493,function(){},wx_lang.page_key341);
		return false;
	}
	if(params.isDirectJump=="true"){
		if(checkURL(params.url)){
			//singleNews.save(params);
			return true;
		}else{
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key433+wx_lang.page_key76+"",function(){},wx_lang.page_key341);
			return false;
		}
	}
	return true;
}


var singleNews = {
	data : null,
	load : function(id) {
		var url = "wx/admin/news/"+id+"/get.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				//alert(json.errmsg);
				dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				return;
			}
			singleNews.data=json.data;
			singleNews.transform(singleNews.data);
			//alert(JSON.stringify(user.page));
		}, "json");
	},
	transform : function(data) {
		$(".faceImage").children("img").remove();
		$(".faceImage").prepend('<img src="'+data.picurl+'"  style="width: 320px;height: 200px;"/>');
		$(".faceCnt").html("");
		$(".faceCnt").prepend('<img src="'+data.picurl+'"  style="width: 320px;height: 200px;"/>');
		$("#title").val(data.title);
		$("#description").val(data.description);
		 CKEDITOR.instances.content.setData( data.content );
		$("#isDirectJump").val(""+data.isDirectJump+"");
		//$("#isDirectJump").val(data.isDirectJump);
		$("#url").val(data.url);
		$("#OID").val(data.oid);
		$("#author").val(data.author);
		if(1==data.show_cover_pic){
			$("#show_cover_pic").attr("checked","checked"); 
		}else{
			$("#show_cover_pic").removeAttr("checked");
		}
	},
	save : function(params) {
		var url = "wx/admin/news/single/save.json";
		LockTopScreen();
		$.post(url, params, function(json) {
			unLockTopScreen();
			if (!json.success) {
				//alert(json.errmsg);
				dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				return;
			}
			singleNews.data=json.data;
			singleNews.transform(singleNews.data);
			//alert(JSON.stringify(user.page));
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key357,function(){},wx_lang.page_key341);
			//alert(wx_lang.page_key357);
		}, "json");
	},
	uploadCover : function() {
		simpleAjaxFileUpload.upload('#coverFile', null, function(json) {
			//alert(JSON.stringify(json));
			if(!json.success){
				dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
				//alert(json.errmsg);
				return ;
			}
			$(".faceImage").children("img").remove();
			$(".faceImage").prepend('<img src="'+json.uri+'"  style="width: 320px;height: 200px;"/>');
			$(".faceCnt").html("");
			$(".faceCnt").prepend('<img src="'+json.uri+'"  style="width: 320px;height: 200px;"/>');
		});
		
		
//		$.ajaxFileUpload({
//			url : "upload", // "+wx_lang.page_key481+""+wx_lang.page_key76+""+wx_lang.page_key214+""+wx_lang.page_key401+"
//			secureuri : false,
//			fileElementId : 'coverFile', // 文件选择框的id属性
//			uploadFileKey:'file',
//			dataType : 'json', // 服务器"+wx_lang.page_key321+"的"+wx_lang.page_key139+"
//			success : function(json,status) // 相当于java中try语句块的用法
//			{
//				//alert(JSON.stringify(json));
//				if(!json.success){
//					alert(json.errmsg);
//					return ;
//				}
//				$(".faceImage").children("img").remove();
//				$(".faceImage").prepend('<img src="'+json.uri+'"  style="width: 320px;height: 200px;"/>');
//				$(".faceCnt").html("");
//				$(".faceCnt").prepend('<img src="'+json.uri+'"  style="width: 320px;height: 200px;"/>');
//			}
//		});
	}

};





var editorhepler={
	insertMeta:function(){
		ckeditorHelper.insert2head('content','<meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=no"/><meta name="apple-mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-status-bar-style" content="black"/><meta name="format-detection" content="telephone=no"/>');
	},processImg:function(){
		try{
			var data=ckeditorHelper.get("content");
			data = data.replace(/[\r\n]/g, ""); //去掉回车换行
			data='<n>'+data+'</n>'
			var jdata=$(data);
			jdata.find("img").removeAttr("width");
			jdata.find("img").removeAttr("height");
			jdata.find("img").css("width","100%");
			jdata.find("img").css("height","");
			
			ckeditorHelper.set("content",jdata.html());
		}catch(e){
			alert(e);
		}
	}
};










