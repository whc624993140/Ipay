$(function(){
	//活动名称选择
	$('#choose_activityName').on('click',function(){
		activity_choose.show();
	});
	 $("#check_all").click(function(){
         var self = $(this);
         $('input[name="org_check"]').each(function(){
             $(this).prop("checked",self.is(':checked'));
         });
     });

     $(".check_del").click(function(){
    	 var ids=new Array();
         $('input[name="org_check"]:checkbox').each(function(){
             if($(this).is(':checked')){
                 ids.push($(this).parent().parent().attr("id"));
             }
         });
         var did=dialogConfirmShow("提示","是否继续？",function(){
        	 org.dels(ids);
         });
     })

	$('#choose_orgType').on('click',function(){
		current_label_select="orgType";
		label_choose.show("sys_"+current_label_select);
	});
     $('#choose_industry').on('click',function(){
 		current_label_select="industry";
 		label_choose.show("sys_"+current_label_select);
 	});
     $('#choose_level').on('click',function(){
 		current_label_select="level";
 		label_choose.show("sys_"+current_label_select);
 	});
     $('#choose_region').on('click',function(){
 		current_label_select="region";
 		label_choose.show("sys_"+current_label_select);
 	});
     $("#label_selector").on('click','.badge1',function(){
    	 $(this).parent().remove();
     });
     
     $('#org_add').on('click', function (e) {
    	 $("#myModal").find("input").val("");
    	 $("#comment").val("");
     });
     
     $('#org_datas').on('click','.del_tr', function (e) {
    	 var id=$(this).parent().parent().parent().attr("id");
    	 var did=dialogConfirmShow("提示","是否继续？",function(){
    		 org.del(id);
    	 });
     });
     
     $('#org_datas').on('click','.edit_tr', function (e) {
    	 var data=$(this).parent().parent().parent().attr("data");
    	 $("#myModal").find("input").val("");
    	 $("#comment").val("");
    	 var org=jQuery.parseJSON(data);
	 	$("#id").val(org.id);
		$("#orgName").val(org.orgName);
		$("#orgType").val(org.orgType);
		$("#industry").val(org.industry);
		$("#level").val(org.level);
		$("#phone").val(org.phone);
		$("#province").val(org.province);
		$("#province").change();
		$("#city").val(org.city);
		$("#address").val(org.address);
		$("#comment").val(org.comment);
     });
     
     $("#org_save").on('click',function(){
    	 org.save();
     });
     
     $("#sub_search").click(function(){
    	 var params=getSelectFrom();
    	 if(params.activityNames){
    		$(".check_del").hide();
 	   		$("#org_datas").hide();
 	   		$("#activityorg_datas").show();
 	   		activityorg.conditions=params;
 	   		activityorg.loadDatas();
 	   	}else{
 	   		$("#activityorg_datas").hide();
 	   		$("#org_datas").show();
	 	   	$(".check_del").show();
 	   		org.conditions=params;
 	   		org.loadDatas();
 	   	}
     });
     
     $("#export_excel").click(function(){
    	 if($('#org_datas').css('display')=='none'){
    		 activityorg.exprot();
    	 }else if($('#activityorg_datas').css('display')=='none'){
    		 org.exprot();
    	 }
     });
     
     $("#import").change(function(){
    	 if(confirm("您确定要导入此文件？")){
    		 $("#import_excel").submit();
    	 }
     });
     
    org.loadDatas();
	label_choose.init(checkLabel_backup);
	label_choose.fillSelect("#orgType","sys_orgType");
	label_choose.fillSelect("#industry","sys_industry");
	label_choose.fillSelect("#level","sys_level");
	label_choose.fillSelect("#province","sys_region");
	activity_choose.init(checkActivity_backup);
	 $("#province").on('change',function(){
		 label_choose.fillSelect("#city",$("#province").val());
     });
	 $("#province").change();
});

var current_label_select;
function checkLabel_backup(labelkey){
	var label=label_choose.findNodeByKey(labelkey);
	var str="<a class=\"btn_greys btn_greys11\" href=\"javascript:void();\" bubbledown=\"{1}\" key=\"{2}\">{0}<i class=\"badge1\">x</i></a>";
	str = str.replace("{0}",label.name);
	str = str.replace("{2}",label.key);
	if('region'==current_label_select){
		str = str.replace("{1}",true);
	}else{
		str = str.replace("{1}",false);
	}
	$("#label_selector").append(str);
}
function checkActivity_backup(activity){
	activity=$.parseJSON(activity);
	var str="<a class=\"btn_greys btn_greys11 activity\" data=\"{2}\" name=\"{1}\">{0}<i class=\"badge1\">x</i></a>";
	str = str.replace("{0}",activity.name);
	str = str.replace("{1}",activity.name);
	str = str.replace("{2}",JSON.stringify(activity));
	$("#label_selector").append(str);
}

function getOrg(){
	var id=$("#id").val();
	var orgName=$("#orgName").val();
	var orgType=$("#orgType").val();
	var industry=$("#industry").val();
	var level=$("#level").val();
	var phone=$("#phone").val();
	var province=$("#province").val();
	var city=$("#city").val();
	var address=$("#address").val();
	var comment=$("#comment").val();
	var params={id:id,orgName:orgName,orgType:orgType,industry:industry,level:level,phone:phone,province:province,city:city,address:address,comment:comment};
	return params;
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
			
			$("#org_page").createPage({
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
var org={
		datas:null,
		conditions:{pageSize:10},
		loadDatas:function(){
			$.ajax({ 
                type:'post',  
                traditional :true,  
                url:"maserati/admin/org/page.json",  
                data: org.conditions,
                success:function(json){  
                	if (!json.success) {
    					alert(json.errmsg);
    					return;
    				}
    				org.datas=json.data;
    				//alert(JSON.stringify(json.data));
    				org.clear();
    				org.load(org.datas.items);
                } ,
                dataType:'json'
            });  
		},load:function(datas){
			if(!datas){
				return;
			}
			$(datas).each(function(index) {
				var node = datas[index];
				org.addNode(node);
			});
			$("#org_page").createPage({
				pageCount:org.datas.pageCount,
				current:org.datas.currentPage,
				backFn:function(p){
					org.conditions.pageNum=p;
					org.clear();
					org.loadDatas();
				}
			});
		},addNode:function(node){
			if(!node){
				return;
			}
			var str = '<tr data=\'{8}\' id=\'{9}\'>'
                +'<td><input type="checkbox"  name="org_check"></td>'
                +'<td>{0}</td>'
                +'<td>{1}</td>'
                +'<td>{2}</td>'
                +'<td>{3}</td>'
                +'<td>{4}</td>'
                +'<td>{5}</td>'
                +'<td>{6}</td>'
                +'<td>{7}人</td>'
                +'<td><div>'
//                +'<a class="a_pad" href="javascript:void();">查看</a>|'
                +'<a class="a_pad edit_tr" data-target="#myModal" data-toggle="modal">编辑</a>|<a class="a_pad del_tr" href="javascript:void();">删除</a></div>'
                +'</td>'
                +'</tr>';
			str = str.replace("{0}", node.orgName);
			str = str.replace("{1}", node.orgType);
			str = str.replace("{2}", node.industry);
			str = str.replace("{3}", node.level);
			str = str.replace("{4}", node.phone);
			str = str.replace("{5}", node.province+" "+node.city+" "+node.address);
			str = str.replace("{6}", node.comment);
			str = str.replace("{7}", node.personNum);
			str = str.replace("{8}", JSON.stringify(node));
			str = str.replace("{9}", node.id);
			$("#org_datas_body").append(str);
		},save:function(){
			var params=getOrg();
			$.post("maserati/admin/org/save.json", params, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				alert("保存成功！");
				org.loadDatas();
				$("#myModal").modal("hide");
			}, "json");
		},del:function(id){
			var url="maserati/admin/org/"+id+"/delete.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				alert("删除成功！");
				org.loadDatas();
			}, "json");
		},dels:function(ids){
			var url="maserati/admin/org/deletes.json";
			$.ajax({  
                type:'post',  
                traditional :true,  
                url:url,  
                data: {ids:ids} ,
                success:function(json){  
                	if (!json.success) {
    					alert(json.errmsg);
    					return;
    				}
    				alert("删除成功！");
    				org.loadDatas();
                } ,
                dataType:'json'
            });  
		},clear:function(){
			$("#org_datas_body").html("");
		},exprot:function(){
			var params=JSON.stringify(org.conditions);
			window.open("maserati/admin/org/export.xls?params="+params);
		}
}



















