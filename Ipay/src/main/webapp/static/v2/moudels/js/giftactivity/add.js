$(function() {
	$("#person_add").off("click").on("click",function(){
		var modelperson=$($(".person_sendgift")[0]).clone();
		modelperson.show();
		label_count++;
		modelperson.addClass("select_label"+label_count);
		$("#person_add").parent().append(modelperson);
	});
	$('#sendgift_form').on('click', "a[checkAddress]",function() {
		$(".address_all").html("");
		current_label_select = "region";
		label_choose.show("sys_" + current_label_select);
	});
	$('#sendgift_form').on('click', "a[checkPerson]",function() {
		$(".person_sendgift").removeClass("check_ok");
		$(this).parent().addClass("check_ok");
		label_mulit_choose.show();
	});
	$('#sendgift_form').on('click', "a[delPerson]",function() {
		$(this).parent().remove();
		//修改统计数据
		updateAllData();
	});
	$("#activityStartTime").datepicker({
    	dateFormat: "yy-mm-dd",
        defaultDate: "+1w",
      	changeMonth: true,
      	changeYear:true,
      	yearRange:'-100:+1',
      	numberOfMonths: 1
    });
	$("#activityEndTime").datepicker({
		dateFormat: "yy-mm-dd",
		defaultDate: "+1w",
		changeMonth: true,
		changeYear:true,
		yearRange:'-100:+1',
		numberOfMonths: 1
	});
	$(".address_all").on('click', '.badge1', function() {
		$(this).parent().remove();
	});
	$("#activityType_add").on('click', function() {
		$("#add_activityType").find("input").val("");
	});
	$("#activityType_save").on("click",function(){
		var activityTypeName=$("#activityTypeName").val();
		if(activityTypeName==null||activityTypeName==""){
			alert("活动类型不能为空");
			return;
		}else{
			var url="base/admin/dictionary/save.json";
			$.ajax({
				type : 'post',
				url : url,
				traditional : true,
				data : {name:activityTypeName,key:activityTypeName,parentid:1},
				dataType : 'json',
				success : function(json) {
					if (!json.success) {
						alert(json.errmsg);
						return;
					}
					$("#add_activityType").modal("hide");
					$("#activityType").append('<option value="'+json.data.id+'">'+json.data.name+'</option>');
				}
			});
		}
	});
	$("#sendgift_save").off("click").on("click",function(){
		var params=getGiftActivity();
		var person_all=$(".person_all").data();
		var personOIDs=[];
		for(var key in person_all){
			if($.inArray(person_all[key], personOIDs)==-1){
				personOIDs.push(person_all[key]);
			}
		}
		params.personOIDs=personOIDs;
		//整理受邀人每行的数据
		var personlines=[];
		$(".person_sendgift:not(:first)").each(function(){
			var label_html=$(this).find(".check_label").html();
			var labelall=$(this).find(".check_label").data();
			var labelkeys=[];
			for(var key in labelall){
				if($.inArray(labelall[key], labelkeys)==-1){
					labelkeys.push(labelall[key]);
				}
			}
			var pcount=$(this).find(".person_count em").html();
			var personall=$(this).find(".person_count").data();
			var personkeys=[];
			for(var key in personall){
				if($.inArray(personall[key], personkeys)==-1){
					personkeys.push(personall[key]);
				}
			}
			personlines.push({label_html:label_html,labelkeys:JSON.stringify(labelkeys),pcount:pcount,personkeys:JSON.stringify(personkeys)});
		});
		params.personlines=JSON.stringify(personlines);
		giftActivity.save(params);
	});
	giftActivity.loaddata();
	label_choose.init(checkLabel_backup);
	label_mulit_choose.init(checkLabel_callback);
	
});
var label_count=0;
var sendType=null;
var current_label_select;

var giftActivity={
		activityPersonLine:null,
		datas:null,
		loaddata:function(){
			//活动类型
			getActivityType();
			
			var activityOID=$("#activityOID").val();
			if(activityOID==null||activityOID==""){
				return ;
			}
			giftActivity.getByActivityOID(activityOID);
			var data=giftActivity.datas;
			if(data!=null&&data.length!=""){
				giftActivity.getActivityPersonLine(activityOID);
				$("#version").val(data.version);
				$("#name").val(data.name);
				$("#activityStartTime").val((new Date(data.activityStartTime)).Format("yyyy-MM-dd"));
				$("#activityEndTime").val((new Date(data.activityEndTime)).Format("yyyy-MM-dd"));
				$("#activityType").find("option").each(function(){
					if($(this).val()==data.activityType){
						$(this).attr("selected","selected");
					}
				});
				$("#giftType").find("option").each(function(){
					if($(this).val()==data.giftType){
						$(this).attr("selected","selected");
					}
				});
				//活动地址
				if(data.address!=null){
					var region = "<a class=\"btn_greys btn_greys11\" style=\"position:relative\" bubbledown=\"true\" key=\"{2}\">{0}<i class=\"badge1\">x</i></a>";
					region = region.replace("{0}", data.address);
					region = region.replace("{2}",data.address);
					$(".address_all").html(region);
				}
				//受邀人单行数据
				for(var i=0;i<giftActivity.activityPersonLine.length;i++){
					var dataline=giftActivity.activityPersonLine[i];
					var person_all=[];
					var label_all=[];
					if(dataline.personKeys!=null&&dataline.personKeys!=""){
						person_all=dataline.personKeys.split(",");
					}
					if(dataline.labelKeys!=null&&dataline.labelKeys!=""){
						label_all=dataline.labelKeys.split(",");
					}
					$("#person_add").click();
					$(".person_sendgift:last").find(".check_label").html(dataline.labelHtml);
					$(".person_sendgift:last").find(".check_label").data(label_all);
					$(".person_sendgift:last").find(".person_count").removeData();
					$(".person_sendgift:last").find(".person_count").data(person_all);
					$(".person_sendgift:last").find(".person_count").find("em").html(dataline.pCount);
				}
				//受邀人统计所有personOID
				updateAllData();
			}
		},
		save:function(params){
			var url="maserati/giftactivity/admin/save";
			$.ajax({
				type : 'post',
				url : url,
				traditional : true,
				data : params,
				dataType : 'json',
				success : function(json) {
					if (!json.success) {
						alert(json.errmsg);
						return;
					}
					alert("创建成功");
				}
			});
		},
		getActivityPersonLine:function(activityOID){
			var url="maserati/activitypersonline/admin/"+activityOID+"/findByActivityOID";
			$.ajax({
				type : 'post',
				url : url,
				async : false,
				dataType : 'json',
				success : function(json) {
					if (!json.success) {
						alert(json.errmsg);
						return;
					}
					giftActivity.activityPersonLine=json.data;
				}
			});
		},
		getByActivityOID:function(activityOID){
			var url="maserati/giftactivity/admin/"+activityOID+"/getByActivityOID";
			$.ajax({
				type : 'post',
				url : url,
				async : false,
				dataType : 'json',
				success : function(json) {
					if (!json.success) {
						alert(json.errmsg);
						return;
					}
					giftActivity.datas=json.data;
				}
			});
		}
}	
function getActivityType(){
	var url="base/admin/dictionary/sys_activitytype/tree.json";
	$.ajax({
		url : url,
		async : false,
		dataType : 'json',
		success : function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			if(json.data!=null){
				for(var i=0;i<json.data.children.length;i++){
					var data=json.data.children[i];
					$("#activityType").append('<option value="'+data.id+'">'+data.name+'</option>');
				}
			}
		}
	});
}
function getGiftActivity() {
	var params = {
			OID:$("#activityOID").val(),
			version:$("#version").val(),
			name:$("#name").val(),
			activityType:$("#activityType").val(),
			activityStartTime:$("#activityStartTime").val(),
			activityEndTime:$("#activityEndTime").val(),
			address:$(".address_all").find(".btn_greys11").attr("key"),
			giftType:$("#giftType").val(),
	};
	return params;
}
function checkLabel_backup(labelkey) {
	var label = label_choose.findNodeByKey(labelkey);
	var str = "<a class=\"btn_greys btn_greys11\" style=\"position:relative\" bubbledown=\"{1}\" key=\"{2}\">{0}<i class=\"badge1\">x</i></a>";
	str = str.replace("{0}", label.name);
	str = str.replace("{2}",label.key);
	if ('region' == current_label_select) {
		str = str.replace("{1}", true);
	} else {
		str = str.replace("{1}", false);
	}
	$(".address_all").append(str);
}
function checkLabel_callback(labels){
	var checkmodel=$(".check_ok");
	checkmodel.find(".check_label").removeData();
	checkmodel.find(".check_label").data(labels);
	checkmodel.find(".check_label").empty();
	for (var int = 0; int < labels.length; int++) {
		var node=label_mulit_choose.findNodeByKey(labels[int]);
		var str = "<a class=\"btn_greys btn_greys11\"  bubbledown=\"{1}\" key=\"{2}\">{0}</a>";
//		var str = '<div class="tagName fl label" key=\'{0}\' >{1}<span name=\'del_label_selected\'>X</span></div>';
		str = str.replace("{0}", node.name);
		str = str.replace("{2}", node.key);
		checkmodel.find(".check_label").append(str);
	}
	updatePersonTotal();
	//修改统计数据
	updateAllData();
}
function updatePersonTotal(){
	var labels=getLabels();
	if(labels.length==0){
		$(".check_ok").find(".person_count em").html("0");
		return;
	}
	var url="maserati/admin/person/label/getPersonByLabel";
	var params={labels:labels};
	for (var int = 0; int < labels.length; int++) {
		if(labels[int]=='all'){
			$(".check_ok").find(".person_count em").html("全部用户");
			return;
		}
	}
	$.ajax({
		type : 'post',
		traditional : true,
		url : url,
		data : params,
		async:false,
		success : function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			var personArr=[];
			for(var i=0;i<json.data.length;i++){
				personArr.push(json.data[i].personOID);
			}
			$(".check_ok").find(".person_count").removeData();	
			$(".check_ok").find(".person_count").data(personArr);	
			$(".check_ok").find(".person_count em").html(json.data.length);	
		},
		dataType : 'json'
	});
}
function updateAllData(){
	var label_all=[];
	var person_all=[];
	$(".person_sendgift").each(function(){
		var shuzu_label=$(this).find(".check_label").data();
		var shuzu_person=$(this).find(".person_count").data();
		for(var key in shuzu_label){
			if($.inArray(shuzu_label[key], label_all)==-1){
				label_all.push(shuzu_label[key]);
			}
		}
		for(var key in shuzu_person){
			if($.inArray(shuzu_person[key], person_all)==-1){
				person_all.push(shuzu_person[key]);
			}
		}
	});
//	var str ="";
//	for (var int = 0; int < label_all.length; int++) {
//		var node=label_mulit_choose.findNodeByKey(label_all[int]);
//		str+= "<a class=\"btn_greys btn_greys11\" href=\"javascript:void();\" bubbledown=\"{1}\" key=\"{2}\">{0}</a>";
//		str= str.replace("{0}", node.name);
//		str= str.replace("{2}", node.key);
//	}
	//$(".label_all").html(str);
	//$(".label_all").data(label_all);
	$(".person_all").find("em").html(person_all.length);
	$(".person_all").removeData();
	$(".person_all").data(person_all);
}
function getLabels(){
	var labels=new Array();
	$(".check_ok").find('.check_label .btn_greys11').each(function(){
		labels.push($(this).attr("key"));
	});
	return labels;
}
