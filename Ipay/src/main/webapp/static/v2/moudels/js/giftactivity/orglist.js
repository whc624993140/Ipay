$(function() {
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
   	 activityorg.conditions=params;
   	 activityorg.loadDatas();
    });
	$("#export_activityorg").click(function(){
		activityorg.exprot();
    });
	//添加备注
	$('#activityorg_datas').on('click', '.addremark', function(e) {
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
    activityorg.loadDatas();
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
//			params.activityName=$(this).attr("name");
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
var activityorg={
		datas:null,
		conditions:{pageSize:10},
		loadDatas:function(){
			$.ajax({ 
                type:'post',  
                traditional :true,  
                url:"maserati/activityorg/admin/page.json",  
                data: activityorg.conditions,
                success:function(json){  
                	if (!json.success) {
    					alert(json.errmsg);
    					return;
    				}
                	activityorg.datas=json.data;
                	activityorg.clear();
                	activityorg.load(activityorg.datas.items);
                } ,
                dataType:'json'
            });  
		},load:function(datas){
			if(!datas){
				return;
			}
			activityorg.addNode(datas);
			
			$("#activityorg_page").createPage({
				pageCount:activityorg.datas.pageCount,
				current:activityorg.datas.currentPage,
				backFn:function(p){
					activityorg.conditions.pageNum=p;
					activityorg.clear();
					activityorg.loadDatas();
				}
			});
		},addNode:function(datas){
			$(datas).each(function(index) {
				var node = datas[index];
				if(!node){
					return;
				}
				var str = '<tr data=\'{8}\'>'
	                +'<td>{0}</td>'
	                +'<td>{1}</td>'
	                +'<td>{2}</td>'
	                +'<td>{3}</td>'
	                +'<td>{4}</td>'
	                +'<td>{5}</td>'
	                +'<td>{6}</td>'
	                +'<td>{7}</td>'
	                +'</tr>';
				var pageNum=activityorg.conditions.pageNum==null?1:activityorg.conditions.pageNum;
				var xuhao=(pageNum-1)*(activityorg.conditions.pageSize)+index+1;
				str = str.replace("{0}", xuhao);
				str = str.replace("{1}", node.activityName);
				str = str.replace("{2}", node.orgName);
				str = str.replace("{3}", node.industry);
				str = str.replace("{4}", node.level);
				str = str.replace("{5}", node.sendCnt==null?0:node.sendCnt);
				str = str.replace("{6}", node.signCnt==null?0:node.signCnt);
				str = str.replace("{7}", node.unSignCnt==null?0:node.unSignCnt);
				str = str.replace("{8}", JSON.stringify(node));
				$("#datas_body").append(str);
			});
		},exprot:function(){
			var params=JSON.stringify(activityorg.conditions);
			window.open("maserati/activityorg/admin/export.xls?params="+params);
		},clear:function(){
			$("#datas_body").html("");
		}
}
