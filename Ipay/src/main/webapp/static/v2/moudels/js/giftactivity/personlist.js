$(function() {
	$(".gift_get_time").datepicker({
		dateFormat: "yy-mm-dd",
		defaultDate: "+1w",
		changeMonth: true,
		changeYear:true,
		yearRange:'-100:+1',
		numberOfMonths: 1
	});
	//活动名称选择
	$('#choose_activityName').on('click',function(){
		activity_choose.show();
	});
	$("#label_selector").on('click','.badge1',function(){
   	 $(this).parent().remove();
    });
	//筛选
	$("#sub_search").click(function(){
   	 var params=getSelectFrom();
   	 activityperson.conditions=params;
   	 activityperson.loadDatas();
    });
	$('#activityperson_datas').on('click', '.addremark', function(e) {
		var datas = $(this).parent().parent().parent().attr("data");
		$("#myModal").find("input").val("");
		var jsonobj=jQuery.parseJSON(datas);
		$("#activityOID").val(jsonobj.activityOID);
		$("#personOID").val(jsonobj.personOID);
		$("#giftStartTime").val(jsonobj.giftStartTime==null?"":(new Date(jsonobj.giftStartTime)).Format("yyyy-MM-dd"));
		$("#giftEndTime").val(jsonobj.giftEndTime==null?"":(new Date(jsonobj.giftEndTime)).Format("yyyy-MM-dd"));
		$("#giftStatus").val(jsonobj.giftStatus);
		$("#remark").val(jsonobj.remark);
	});
	$("#gift_save").off("click").on("click",function(){
		var params = {
				activityOID:$("#activityOID").val(),
				personOID:$("#personOID").val(),
				giftStartTime:$("#giftStartTime").val(),
				giftEndTime:$("#giftEndTime").val(),
				giftStatus:$("#giftStatus").val(),
				remark:$("#remark").val(),
		};
		activityperson.save(params);
	});
	$('#activityperson_datas').on('click', '.del_tr', function(e) {
		var datas = $(this).parent().parent().parent().attr("data");
		var jsonobj=jQuery.parseJSON(datas);
		var params={activityOID:jsonobj.activityOID,personOID:jsonobj.personOID};
		var did=dialogConfirmShow("提示","确认删除吗？",function(){
			activityperson.del(params);
		});
	})
    activityperson.loadDatas();
    activity_choose.init(checkActivity_backup);
});
function checkActivity_backup(activity){
	activity=$.parseJSON(activity);
	var str="<a class=\"btn_greys btn_greys11 activity\" data=\"{2}\" name=\"{1}\">{0}<i class=\"badge1\">x</i></a>";
	str = str.replace("{0}",activity.name);
	str = str.replace("{1}",activity.name);
	str = str.replace("{2}",JSON.stringify(activity));
	$("#label_selector").append(str);
}
function getSelectFrom(){
	var params={pageSize : 10};
	var labels=[];
	var activityNames=[];
	$("#label_selector").find("a").each(function(){
		if($(this).hasClass("activity")){
			activityNames.push($(this).attr("name"));
		}else{
			labels.push({key:$(this).attr("key"),bubbledown:$(this).attr("bubbledown")});
		}
	});
	var searchval=$("#input_item").val();
	if(searchval&&searchval!=''){
		params[$("#searchtype").val()]=searchval;
	}
	if(activityNames.length>0){
		params.activityNames=JSON.stringify(activityNames);
	}
	if(labels.length>0){
		params.labels=JSON.stringify(labels);
	}
	return params;
}
var activityperson={
		datas:null,
		conditions:{pageSize:10},
		loadDatas:function(){
			$.ajax({ 
                type:'post',  
                traditional :true,  
                url:"maserati/activityperson/admin/page.json",  
                data: activityperson.conditions,
                success:function(json){  
                	if (!json.success) {
    					alert(json.errmsg);
    					return;
    				}
                	activityperson.datas=json.data;
                	activityperson.clear();
                	activityperson.load(activityperson.datas.items);
                } ,
                dataType:'json'
            });  
		},load:function(datas){
			if(!datas){
				return;
			}
			activityperson.addNode(datas);
			
			$("#activityperson_page").createPage({
				pageCount:activityperson.datas.pageCount,
				current:activityperson.datas.currentPage,
				backFn:function(p){
					activityperson.conditions.pageNum=p;
					activityperson.clear();
					activityperson.loadDatas();
				}
			});
		},addNode:function(datas){
			$(datas).each(function(index) {
				var node = datas[index];
				if(!node){
					return;
				}
				var str = '<tr data=\'{6}\'>'
	                +'<td>{0}</td>'
	                +'<td>{1}</td>'
	                +'<td>{2}</td>'
	                +'<td>{3}</td>'
	                +'<td>{4}</td>'
	                +'<td>{5}</td>'
	                +'<td><div>'
//	                +'<a class="a_pad" href="javascript:void();">查看</a>|'
	                +'<a class="a_pad addremark" data-target="#myModal" data-toggle="modal">添加备注</a>|<a class="a_pad del_tr" href="javascript:void();">删除</a></div>'
	                +'</td>'
	                +'</tr>';
				var pageNum=activityperson.conditions.pageNum==null?1:activityperson.conditions.pageNum;
				var xuhao=(pageNum-1)*(activityperson.conditions.pageSize)+index+1;
				str = str.replace("{0}", xuhao);
				str = str.replace("{1}", node.activityName);
				str = str.replace("{2}", node.orgName);
				str = str.replace("{3}", node.personName);
				var giftType="";
				switch(node.giftType){
					case 1:giftType="高级礼品";
							break;
					case 2:giftType="定制礼品";
							break;
					case 3:giftType="普通礼品";
							break;
					default:giftType="暂无";
							break;
				}
				str = str.replace("{4}", giftType);
				var giftStatus="";
				switch(node.giftStatus){
					case 1:giftStatus="已发送";
							break;
					case 2:giftStatus="已签收";
							break;
					case 3:giftStatus="已退回";
							break;
					default:giftStatus="暂无";
							break;
				}
				str = str.replace("{5}", giftStatus);
				str = str.replace("{6}", JSON.stringify(node));
				str = str.replace("{7}", node.id);
				$("#datas_body").append(str);
			});
		},save:function(params){
			$.ajax({
				type : 'post',
				url : "maserati/activityperson/admin/save.json",
//				traditional : true,
				data : params,
				dataType : 'json',
				success : function(json) {
					if (!json.success) {
						alert(json.errmsg);
						return;
					}
					alert("保存成功！");
    				activityperson.loadDatas();
    				$("#myModal").modal("hide");
				}
			});
		},del : function(params) {
			var url = "maserati/activityperson/admin/delete.json";
			$.post(url, params, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				alert("删除成功！");
				activityperson.loadDatas();
			}, "json");
		},clear:function(){
			$("#datas_body").html("");
		}
}
