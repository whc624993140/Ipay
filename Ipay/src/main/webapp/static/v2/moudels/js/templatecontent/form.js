$(function() {
	settingActionList(actionList);
	
	//模板结构
	templatecontent.loadStructure();
});
var templateContentOID=$("#templateContentOID").val();
var templateStructure=$("#structure").val();

var actionList = {
	'templatecontent_cancle':function(){
		window.location.href="templatemanager/admin/templatecontent/tlist.html";
	},'templatecontent_save':function(){
		try{
			var datas=getParam();
			templatecontent.save(datas);
		}catch(e){
			dialogAlertShow("",e);
		}
	}
}
var templatecontent={
	loadData:function(){
		$.ajax({
			url : 'templatemanager/admin/templatecontent/'+templateContentOID+'/get.json',
			type : 'get',
			async:false,
			success : function(data, status, xhr) {
				if(!data.success){
					dialogAlertShow("",data.errmsg);
					return ;
				}
				if(data.data!=null){
					templatecontent.load(data.data);
				}
			},
			dataType : 'json'
		});
	},
	load:function(data){
		$("input[name=cname]").val(data.cname);
		$("input[name=link]").val(data.link);
		var content=data.content;
		if(content==null||content==""){
			return;
		}
		content=$.parseJSON(content);
		for(key in content){
			$("input[name="+key+"]").val(content[key]);
		}
	},
	save:function(datas){
		$.ajax({
			url : 'templatemanager/admin/templatecontent/save.json',
			data :datas,
			cache : false,
			traditional : true,
			type : 'post',
			success : function(data, status, xhr) {
				if(!data.success){
					dialogAlertShow("",data.errmsg);
					return ;
				}
//				dialogAlertShow("",'保存成功');
				window.location.href="templatemanager/admin/templatecontent/tclist.html?templateId="+datas.templateId;
			},
			dataType : 'json'
		});
	},
	loadStructure:function(){
		if(templateStructure==""){
			return;
		}
		templateStructure=$.parseJSON(templateStructure);
		if(templateStructure!=null){
			for(var i=0;i<templateStructure.length;i++){
				var structureObj=templateStructure[i];
				var modelObj=getFormDatas(structureObj);
				
				$("#template_structure").append(modelObj);
			}
		}
		initDatepicker();
		if(templateContentOID!=""){
			templatecontent.loadData();
		}
	}
}
function initDatepicker(){
	$("#template_structure").find("input[flag=date]").daterangepicker({
		"singleDatePicker": true,
        "timePickerIncrement": 30,
        "locale":{
       	 "format":"YYYY-MM-DD",
       	 "applyLabel":"确定",
       	 "cancelLabel":"取消",
       	 "daysOfWeek": [
       	                "日",
       	                "一",
       	                "二",
       	                "三",
       	                "四",
       	                "五",
       	                "六"
       	            ],
       	            "monthNames": [
       	                "一月",
       	                "二月",
       	                "三月",
       	                "四月",
       	                "五月",
       	                "六月",
       	                "七月",
       	                "八月",
       	                "九月",
       	                "十月",
       	                "十一月",
       	                "十二月",
       	               
       	            ]
       	 
        }
    });
	$("#template_structure").find("input[flag=time]").daterangepicker({
		"singleDatePicker": true,
		 "timePicker": true,
		"timePickerIncrement": 30,
		"locale":{
		"format":"YYYY-MM-DD hh:mm:00",
		"applyLabel":"确定",
		"cancelLabel":"取消",
		"daysOfWeek": [
		               "日",
		               "一",
		               "二",
		               "三",
		               "四",
		               "五",
		               "六"
		               ],
		               "monthNames": [
		                              "一月",
		                              "二月",
		                              "三月",
		                              "四月",
		                              "五月",
		                              "六月",
		                              "七月",
		                              "八月",
		                              "九月",
		                              "十月",
		                              "十一月",
		                              "十二月",
		                              
		                              ]
	
		}
	});
}
function getFormDatas(structureObj){
	var modelObj=$($("#structureModel").html());
	modelObj.find(".labelName").html(structureObj._value);
	modelObj.find(".textName").attr("name",structureObj._key);
	var inputType=structureObj.type;
	if(inputType==null||inputType==""||inputType=="text"){
		//普通文本框
		modelObj.find(".textName").attr("type",structureObj.type).attr("flag",structureObj.type);;
	}else if(inputType=="phone"){
		//手机号
		modelObj.find(".textName").attr("type","text").attr("flag",structureObj.type);
	}else if(inputType=="date"){
		//只有日期
		modelObj.find(".textName").attr("type","text").attr("flag",structureObj.type).attr("readonly","readonly");
	}else if(inputType=="time"){
		//日期+时间
		modelObj.find(".textName").attr("type","text").attr("flag",structureObj.type).attr("readonly","readonly");
	}
	
	return modelObj;
}
function getParam(){
	var templateId=$("#templateId").val();
	var param ={templateId:templateId};
	var OID=$("#templateContentOID").val();
	param.OID=OID;
	var cname=$("input[name=cname]").val();
	if(cname==""){
		throw "模板内容名称不能为空";
	}
	if(cname.length>40){
		throw "模板内容名称不超过40个字符";
	}
	param.cname=cname;
	var link=$("input[name=link]").val();
	if(link!=""&&link.indexOf("http://")<0){
		link="http://"+link;
	}
	param.link=link;
	var content={};
	$("#template_structure").find(".textName").each(function(){
		var flag=$(this).attr("flag");
		var name=$(this).attr("name");
		var value=$(this).val();
		if(flag=="phone"){
			//手机号校验
			var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;  
			if(value == ''){
		        throw "手机号不能为空！";
		    }else if(!myreg.test(value)){
		        throw "请输入有效的手机号码！";
		    }
		}
		content[name]=value;
	});
	param.content=JSON.stringify(content);
	return param;
}

