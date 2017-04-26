$(function() {
	$('#choose_orgType').on('click',function(){
		current_label_select="orgType";
		label_choose.show("sys_"+current_label_select);
	});
     $('#choose_region').on('click',function(){
 		current_label_select="region";
 		label_choose.show("sys_"+current_label_select);
 	});
     //筛选
 	 $("#sub_search").click(function(){
    	 var params=getSelectFrom();
    	 giftactivity.conditions=params;
    	 giftactivity.loadDatas();
     });
     //活动名称选择
 	 $('#choose_activityName').on('click',function(){
 		activity_choose.show();
 	 });
     $("#label_selector").on('click','.badge1',function(){
    	 $(this).parent().remove();
     });
     $('#giftactivity_add').on('click', function (e) {
    	 window.location.href="maserati/giftactivity/admin/add.html";
     });
     $('#giftactivity_datas').on('click', '.del_tr', function(e) {
 		var id = $(this).parent().parent().parent().attr("id");
 		var did=dialogConfirmShow("提示","确认删除吗？",function(){
 			giftactivity.del(id);
 		});
 	})
 	$('#giftactivity_datas').on('click', '.org_list', function(e) {
		var datas = $(this).parent().parent().attr("data");
		datas=$.parseJSON(datas);
		org_person_list.clickflag='org_list';
		org_person_list.loadDatas(datas.orgSet);
	});
     $('#giftactivity_datas').on('click', '.person_list', function(e) {
    	 var datas = $(this).parent().parent().attr("data");
    	 datas=$.parseJSON(datas);
 		 org_person_list.clickflag='person_list';
 		 org_person_list.loadDatas(datas.personSet);
     });
     $('#giftactivity_datas').on('click', '.signPerson_list', function(e) {
    	 var datas = $(this).parent().parent().attr("data");
    	 datas=$.parseJSON(datas);
 		 org_person_list.clickflag='signPerson_list';
 		 org_person_list.loadDatas(datas.signPersonSet);
     });
     $("#export_excel").click(function(){
    	 org.exprot();
     });
     $("#import").change(function(){
    	 if(confirm("您确定要导入此文件？")){
    		 $("#import_excel").submit();
    	 }
     });
     $('#giftactivity_datas').on('click','.edit_tr', function (e) {
    	 var data=$(this).parent().parent().parent().attr("data");
    	 data=$.parseJSON(data);
    	 window.location.href="maserati/giftactivity/admin/add.html?activityOID="+data.activityOID;
     });
     $('#giftactivity_datas').on('click','.detail_tr', function (e) {
    	 var data=$(this).parent().parent().parent().attr("data");
    	 data=$.parseJSON(data);
    	 window.location.href="maserati/giftactivity/admin/detail.html?activityOID="+data.activityOID;
     });
     getActivityType();
     giftactivity.loadDatas();
     activity_choose.init(checkActivity_backup);
	 label_choose.init(checkLabel_backup);
	
});
var current_label_select;
function checkLabel_backup(labelkey){
	var label=label_choose.findNodeByKey(labelkey);
	var str="<a class=\"btn_greys btn_greys11\" bubbledown=\"{1}\" key=\"{2}\">{0}<i class=\"badge1\">x</i></a>";
	if(current_label_select=="region"){
		str="<a class=\"btn_greys btn_greys11 region\" bubbledown=\"{1}\" key=\"{2}\">{0}<i class=\"badge1\">x</i></a>";
	}
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
function getSelectFrom(){
	var params={pageSize : 10};
	var labels=[];
	var activityNames=[];
	var regions=[];
	$("#label_selector").find("a").each(function(){
		if($(this).hasClass("activity")){
			activityNames.push($(this).attr("name"));
		}else if($(this).hasClass("region")){
			regions.push($(this).attr("key"));
		}else{
			labels.push({key:$(this).attr("key"),bubbledown:$(this).attr("bubbledown")});
		}
	});
	var search_select = $("#searchtype").val();
	var searchType;
	var inputItem;
	if(search_select && search_select !=''){
		params['searchType']=$("#searchtype").val();
		params['inputItem']=$("#input_item").val();
	}
	params.activityType=$("#activityType").val();
	if(labels.length>0){
		params.labels=JSON.stringify(labels);
	}
	if(activityNames.length>0){
		params.activityNames=JSON.stringify(activityNames);
	}
	if(regions.length>0){
		params.regions=JSON.stringify(regions);
	}
	console.info(params);
	return params;
}
var org_person_list={
		datas:null,
		conditions:{pageSize:10},
		clickflag:null,
		loadDatas:function(set){
			var url="maserati/admin/org/page.json";
			if(org_person_list.clickflag=='org_list'){
				org_person_list.conditions.orgSet=JSON.stringify(set);
				url="maserati/admin/org/page.json";
			}else if(org_person_list.clickflag=='person_list'||org_person_list.clickflag=='signPerson_list'){
				org_person_list.conditions.personSet=JSON.stringify(set);
				url="maserati/admin/person/page.json";
			}
			org_person_list.clear();
			$.ajax({  
                type:'post',  
                traditional :true,  
                url:url,  
                data: org_person_list.conditions,
                success:function(json){  
                	if (!json.success) {
    					alert(json.errmsg);
    					return;
    				}
                	org_person_list.datas=json.data;
                	org_person_list.load(org_person_list.datas.items);
                } ,
                dataType:'json'
            });
		},load:function(datas){
			if(!datas){
				return;
			}
			$(datas).each(function(index) {
				var node = datas[index];
				org_person_list.addNode(node);
			});
			if(org_person_list.clickflag=='org_list'){
				$("#org_select_page").createPage({
			        pageCount:org_person_list.datas.pageCount,
			        current:org_person_list.datas.currentPage,
			        backFn:function(p){
			        	org_person_list.conditions.pageNum=p;
			        	org_person_list.clear();
			        	org_person_list.loadDatas();
			        }
			    });
			}else if(org_person_list.clickflag=='person_list'||org_person_list.clickflag=='signPerson_list'){
				$("#person_select_page").createPage({
			        pageCount:org_person_list.datas.pageCount,
			        current:org_person_list.datas.currentPage,
			        backFn:function(p){
			        	org_person_list.conditions.pageNum=p;
			        	org_person_list.clear();
			        	org_person_list.loadDatas();
			        }
			    });
			}
			
		},addNode:function(node){
			if(!node){
				return;
			}
			if(org_person_list.clickflag=='org_list'){
				var str = '<tr org_name=\'{8}\' id=\'{9}\'>'
	                +'<td>{0}</td>'
	                +'<td>{1}</td>'
	                +'<td>{2}</td>'
	                +'<td>{3}</td>'
	                +'</tr>';
				str = str.replace("{0}", node.orgName);
				str = str.replace("{1}", node.orgType);
				str = str.replace("{2}", node.industry);
				str = str.replace("{3}", node.phone);
				str = str.replace("{8}", node.orgName);
				str = str.replace("{9}", node.id);
				$("#org_select_datas").append(str);
			}else if(org_person_list.clickflag=='person_list'||org_person_list.clickflag=='signPerson_list'){
				var str = '<tr>'
	                +'<td>{0}</td>'
	                +'<td>{1}</td>'
	                +'<td>{2}</td>'
	                +'</tr>';
				str = str.replace("{0}", node.OID);
				str = str.replace("{1}", node.fullName);
				str = str.replace("{2}", node.org_name);
				$("#person_select_datas").append(str);
			}
		},clear:function(){
			if(org_person_list.clickflag=='org_list'){
				$("#org_select_datas").html("");
			}else if(org_person_list.clickflag=='person_list'||org_person_list.clickflag=='signPerson_list'){
				$("#person_select_datas").html("");
			}
		}
}
var giftactivity={
		datas:null,
		conditions:{pageSize:10},
		loadDatas:function(){
			$.ajax({ 
                type:'post',  
                traditional :true,  
                url:"maserati/giftactivity/admin/page.json",  
                data: giftactivity.conditions,
                success:function(json){  
                	if (!json.success) {
    					alert(json.errmsg);
    					return;
    				}
                	giftactivity.datas=json.data;
    				//alert(JSON.stringify(json.data));
                	giftactivity.clear();
                	giftactivity.load(giftactivity.datas.items);
                } ,
                dataType:'json'
            });  
		},load:function(datas){
			if(!datas){
				return;
			}
			giftactivity.addNode(datas);
			
			$("#giftactivity_page").createPage({
				pageCount:giftactivity.datas.pageCount,
				current:giftactivity.datas.currentPage,
				backFn:function(p){
					giftactivity.conditions.pageNum=p;
					giftactivity.clear();
					giftactivity.loadDatas();
				}
			});
		},addNode:function(datas){
			$(datas).each(function(index) {
				var node = datas[index];
				if(!node){
					return;
				}
				var str = '<tr data=\'{9}\' id=\'{10}\'>'
//	                +'<td><input type="checkbox"  name="org_check"></td>'
	                +'<td>{0}</td>'
	                +'<td>{1}</td>'
	                +'<td>{2}</td>'
	                +'<td>{3}</td>'
	                +'<td>{4}</td>'
	                +'<td>{5}</td>'
	                +'<td><a class="a_pad org_list" data-target="#orglist" data-toggle="modal" style="color:#B61D1D;">{6}</a></td>'
	                +'<td><a class="a_pad person_list" data-target="#personlist" data-toggle="modal" style="color:#B61D1D;">{7}</a></td>'
	                +'<td><a class="a_pad signPerson_list" data-target="#personlist" data-toggle="modal" style="color:#B61D1D;">{8}</a></td>'
	                +'<td><div>'
	                +'<a class="a_pad edit_tr">编辑</a>|<a class="a_pad del_tr" href="javascript:void();">删除</a>|<a class="a_pad detail_tr">详情</a></div>'
	                +'</td>'
	                +'</tr>';
				var pageNum=giftactivity.conditions.pageNum==null?1:giftactivity.conditions.pageNum;
				var xuhao=(pageNum-1)*(giftactivity.conditions.pageSize)+index+1;
				str = str.replace("{0}", xuhao);
				str = str.replace("{1}", node.activityName);
				str = str.replace("{2}", (new Date(node.activityStartTime)).Format("yyyy-MM-dd")+"~"+(new Date(node.activityEndTime)).Format("yyyy-MM-dd"));
				str = str.replace("{3}", node.address==null?"":node.address);
				str = str.replace("{4}", node.activityTypeName);
				var giftType="";
				switch(node.giftType){
					case 1:giftType="顶级礼品";
							break;
					case 2:giftType="中级礼品";
							break;
					case 3:giftType="通用礼品";
							break;
				}
				str = str.replace("{5}", giftType);
				str = str.replace("{6}", node.orgCnt==null?0:node.orgCnt);
				str = str.replace("{7}", node.personCnt==null?0:node.personCnt);
				str = str.replace("{8}", node.signPersonCnt==null?0:node.signPersonCnt);
				str = str.replace("{9}", JSON.stringify(node));
				str = str.replace("{10}", node.activityOID);
				$("#datas_body").append(str);
			});
		},del : function(id) {
			var url = "maserati/giftactivity/admin/"+id+"/delete.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				alert("删除成功！");
				giftactivity.loadDatas();
			}, "json");
		},clear:function(){
			$("#datas_body").html("");
		},exprot:function(){
			var params=JSON.stringify(giftactivity.conditions);
			window.open("maserati/giftactivity/admin/export.xls?params="+params);
		}
}
