$(function() {
	$("#person_add").off("click").on("click",function(){
		var modelperson=$($(".person_sendgift")[0]).clone();
		modelperson.show();
		label_count++;
		modelperson.addClass("select_label"+label_count);
		$("#person_add").parent().append(modelperson);
	});
	giftActivity.loaddata();
});
var label_count=0;

var giftActivity={
		activityPersonLine:null,
		datas:null,
		loaddata:function(){
			
			var activityOID=$("#activityOID").val();
			if(activityOID==null||activityOID==""){
				return ;
			}
			giftActivity.getByActivityOID(activityOID);
			var data=giftActivity.datas;
			if(data!=null&&data.length!=""){
				giftActivity.getActivityPersonLine(activityOID);
				$("#version").val(data.version);
				$("#name").html(data.name);
				$("#activityStartTime").html(data.activityStartTime);
				$("#activityEndTime").html(data.activityEndTime);
				//活动类型
				getActivityType(data.activityType);
				
				var giftType="";
				switch(data.giftType){
					case 1:giftType="顶级礼品";
							break;
					case 2:giftType="中级礼品";
							break;
					case 3:giftType="通用礼品";
							break;
				}
				$("#giftType").html(giftType);
				//活动地址
				if(data.address!=null){
					var region = "<a class=\"btn_greys btn_greys11\" bubbledown=\"true\" key=\"{2}\">{0}</a>";
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
function getActivityType(activityType){
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
					if(data.id==activityType){
						$("#activityType").html(data.name);
					}
				}
			}
		}
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
	$(".person_all").find("em").html(person_all.length);
	$(".person_all").removeData();
	$(".person_all").data(person_all);
}
