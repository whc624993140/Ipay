$(function() {

	$("#check_all").click(function() {
		var self = $(this);
		$('input[name="person_check"]').each(function() {
			$(this).prop("checked", self.is(':checked'));
		});
	});
	$(".gift_get_time").datepicker({
		dateFormat: "yy-mm-dd",
		defaultDate: "+1w",
		changeMonth: true,
		changeYear:true,
		yearRange:'-100:+1',
		numberOfMonths: 1
	});
	$(".check_del").click(function() {
		var ids = new Array();
		$('input[name="person_check"]:checkbox').each(function() {
			if ($(this).is(':checked')) {
				ids.push($(this).parent().parent().attr("id"));
			}
		});
		var did=dialogConfirmShow("提示","是否继续？",function(){
			person.dels(ids);
		});
	})

	$('#choose_orgType').on('click', function() {
		label_select_type="select_label";
		current_label_select = "orgType";
		label_choose.show("sys_" + current_label_select);
	});
	$('#choose_industry').on('click', function() {
		label_select_type="select_label";
		current_label_select = "industry";
		label_choose.show("sys_" + current_label_select);
	});
	$('#choose_level').on('click', function() {
		label_select_type="select_label";
		current_label_select = "level";
		label_choose.show("sys_" + current_label_select);
	});
	$('#choose_region').on('click', function() {
		label_select_type="select_label";
		current_label_select = "region";
		label_choose.show("sys_" + current_label_select);
	});
	$('#choose_label').on('click', function() {
		label_select_type="select_label";
		current_label_select = "label";
		label_choose.show();
	});
	//活动名称选择
	$('#choose_activityName').on('click',function(){
		activity_choose.show();
	});
	$('#changeQrcodeState').click(function(){
		var id=$("#audit_OID").val();
		var isOpen=$("#changeQrcodeState").is(':checked');
		person.changeQrcodeState(id,isOpen);
	});
	
	$("#sendMail").click(function(){
		var isall=$("#check_all").is(':checked');
		if(isall){
			if(confirm("您确定要给所有未绑定媒体人发送验证邮件吗？")){
				var url = "maserati/admin/person/sendAllQrcodeEmail.json";
				$.ajax({
					type : 'post',
					traditional : true,
					url : url,
					data : person.conditions,
					success : function(json) {
						if (!json.success) {
							alert(json.errmsg);
							return;
						}
						alert(json.data);
					},
					dataType : 'json'
				});
			}
		}else{
			if(confirm("您确定要给所选中媒体人发送验证邮件吗？")){
				var url = "maserati/admin/person/sendQrcodeEmail.json";
				var ids = new Array();
				$('input[name="person_check"]:checkbox').each(function() {
					if ($(this).is(':checked')) {
						ids.push($(this).parent().parent().attr("id"));
					}
				});
				$.ajax({
					type : 'post',
					traditional : true,
					url : url,
					data : {
						ids : ids
					},
					success : function(json) {
						if (!json.success) {
							alert(json.errmsg);
							return;
						}
						alert(json.data);
					},
					dataType : 'json'
				});
			}
		}
	});
	
	$("#audit_sendEmail").click(function(){
			if(confirm("您确定要给所选中媒体人发送验证邮件吗？")){
				var url = "maserati/admin/person/sendQrcodeEmail.json";
				var ids = new Array();
				ids.push($("#audit_OID").val());
				$.ajax({
					type : 'post',
					traditional : true,
					url : url,
					data : {
						ids : ids
					},
					success : function(json) {
						if (!json.success) {
							alert(json.errmsg);
							return;
						}
						alert(json.data);
					},
					dataType : 'json'
				});
			}
	});
	
	$("#birthday").datepicker({
    	dateFormat: "yy/mm/dd",
        defaultDate: "+1w",
      	changeMonth: true,
      	changeYear:true,
      	yearRange:'-100:+1',
      	numberOfMonths: 1
    });
	
	
	$("#label_selector").on('click', '.badge1', function() {
		$(this).parent().remove();
	});
	$("#label_selector_all").on('click', '.badge1', function() {
		$(this).parent().remove();
	});

	$('#person_add').on('click', function(e) {
		$("#myModal").find("input").val("");
		$("#comment").val("");
	});

	$('#audit_pass').on('click',function(e) {
		var params=getAudit();
		params.auditStatus="审核通过";
		person.audit(params);
	});
	
	$('#audit_refuse').on('click', function(e) {
		var params=getAudit();
		params.auditStatus="审核不通过";
		person.audit(params);
	});
	
	
    $("#sub_search").click(function(){
	   	var params=getSelectFrom();
	   	if(params.activityNames){
	   		activityperson.conditions=params;
	   		$(".check_del").hide();
	   		$("#export_person").hide();
	   		$("#person_datas").hide();
	   		$("#activityperson_datas").show();
	   		activityperson.loadDatas();
	   	}else{
	   		person.conditions=params;
	   		$("#activityperson_datas").hide();
	   		$("#person_datas").show();
	   		$(".check_del").show();
	   		$("#export_person").show();
	   		person.loadDatas();
	   	}
    });
    
    $('#person_datas').on('click', '.del_tr', function(e) {
    	var id = $(this).parent().parent().parent().attr("id");
    	var did=dialogConfirmShow("提示","是否继续？",function(){
    		person.del(id);
    	});
	});
    $('#activityperson_datas').on('click', '.del_tr', function(e) {
		var datas = $(this).parent().parent().parent().attr("data");
		var jsonobj=jQuery.parseJSON(datas);
		var params={activityOID:jsonobj.activityOID,personOID:jsonobj.personOID};
		var did=dialogConfirmShow("提示","确认删除吗？",function(){
			activityperson.del(params);
		});
	})
    $('#activityperson_datas').on('click', '.addremark', function(e) {
		var datas = $(this).parent().parent().parent().attr("data");
		$("#myModal_remark").find("input").val("");
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
    $('#person_datas').on('click', '.audit', function(e) {
    	$("#myModal2").find("input").val("");
		var id = $(this).parent().parent().parent().attr("id");
		person.get(id,function(person){
			$("#audit_auditStatus").html(person.auditStatus);
			$("#audit_OID").val(person.oid);
			$("#audit_openid").val(person.openId);
			$("#audit_fullName").val(person.fullName);
			$("#audit_pinyin").val(person.englishName);
			$("#audit_email").val(person.email);
			$("#audit_jobInfo").val(person.jobInfo);
			$("#audit_phone").val(person.phone);
			$("#audit_orgName").val(person.subOrgName);
			if(person.org){
				$("#audit_org").val(person.org.id);
				$("#audit_org_name").val(person.org.orgName);	
			}
			if(person.isOpenQrCode){
				$("#changeQrcodeState").prop('checked',true);
			}else{
				$("#changeQrcodeState").prop('checked',false); 
			}
		});
		
		person.getQrCodeTicket(id,function(data){
			$("#qrcode_ticket").html(data);
			$("#qrcode_img").attr("src","https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+data);
			$("#qrcode_link").attr("href","https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+data);
		});
	});
    
    

	$('#person_datas').on('click', '.edit_tr', function(e) {
		var id = $(this).parent().parent().parent().attr("id");
		$("#myModal").find("input").val("");
		$("#comment").val("");
		person.get(id,function(person){
			$("#id").val(person.oid);
			$("#fullName").val(person.fullName);
			$("#englishName").val(person.englishName);
			$("#gender").val(person.gender);
			$("#email").val(person.email);
			$("#phone").val(person.phone);
			$("#birthday").val((new Date(person.birthday)).Format("yyyy/MM/dd"));
			$("#jobInfo").val(person.jobInfo);
			$("#jobLevel").val(person.jobLevel);
			$("#linkLevel").val(person.linkLevel);
			$("#org").val(person.org.id);
			$("#org_name").val(person.org.orgName);
			$("#idCard").val(person.idCard);
			$("#passport").val(person.passport);
			$("#province").val(person.province);
			$("#province").change();
			$("#city").val(person.city);
			$("#address").val(person.address);
			$("#remark").val(person.remark);	
		});
	});
	
	$('#person_datas').on('click', '.add_label', function(e) {
		var id = $(this).parent().parent().parent().attr("id");
		loadPersonAndlabel(id);
	});
	
	$('#personAndLable_datas').on('click','.del_person_label', function(e) {
		var pesonoid = $(this).attr("pesonoid");
		var labelkey = $(this).attr("labelkey");
		personAndLabel.del(pesonoid,labelkey,function(){
			loadPersonAndlabel(pesonoid);
		});
	});
	
	
	$("#personAndLable_add").on('click', function() {
		label_select_type="person_label";
		label_choose.show();
	});
	

	$("#person_save").on('click', function() {
		person.save();
	});
	
	$("#person_checkorg").click(function(){
		org_select_currentmodel="person";
	});
	$("#audit_org_checkorg").click(function(){
		org_select_currentmodel="audit";
	});
	
	$("#export_person").click(function(){
		person.exprot();
    });
	
	 $("#import").change(function(){
    	 if(confirm("您确定要导入此文件？")){
    		 $("#import_excel").submit();
    	 }
     });
	
	var org_select_currentmodel;
	person.loadDatas();
	org_select.init(function(id,name){
		if(org_select_currentmodel=="person"){
			$("#org").val(id);
			$("#org_name").val(name);
		}else if(org_select_currentmodel=="audit"){
			$("#audit_org").val(id);
			$("#audit_org_name").val(name);
		}
	});
	
	label_choose.init(checkLabel_backup);
	label_choose.fillSelect("#orgType", "sys_orgType");
	label_choose.fillSelect("#industry", "sys_industry");
	label_choose.fillSelect("#level", "sys_level");
	label_choose.fillSelect("#province", "sys_region");
	label_choose.fillSelect("#jobLevel","sys_joblevel");
	label_choose.fillSelect("#linkLevel","sys_contactlevel");
	activity_choose.init(checkActivity_backup);
	$("#province").on('change', function() {
		label_choose.fillSelect("#city", $("#province").val());
	});
	$("#province").change();
});

var label_select_type;
var current_label_select;
function checkActivity_backup(activity){
	activity=$.parseJSON(activity);
	var str="<a class=\"btn_greys btn_greys11 activity\" data=\"{2}\" name=\"{1}\">{0}<i class=\"badge1\">x</i></a>";
	str = str.replace("{0}",activity.name);
	str = str.replace("{1}",activity.name);
	str = str.replace("{2}",JSON.stringify(activity));
	$("#label_selector").append(str);
}
function checkLabel_backup(labelkey) {
	if("person_label"==label_select_type){
		savePerAndLab(labelkey);
		return ;
	}
	var label = label_choose.findNodeByKey(labelkey);
	var str = "<a class=\"btn_greys btn_greys11\" href=\"javascript:void();\" bubbledown=\"{1}\" key=\"{2}\">{0}<i class=\"badge1\">x</i></a>";
	str = str.replace("{0}", label.name);
	str = str.replace("{2}",label.key);
	if ('region' == current_label_select) {
		str = str.replace("{1}", true);
	} else {
		str = str.replace("{1}", false);
	}
	if('label'==current_label_select){
		$("#label_selector_all").append(str);
	}else{
		$("#label_selector").append(str);
	}
}

var label_person;
function savePerAndLab(labelkey){
	personAndLabel.add(label_person,labelkey,function(){
		loadPersonAndlabel(label_person);
	});
}


function loadPersonAndlabel(id){
	$("#personAndLable_datas").html("");
	label_person=id;
	personAndLabel.get(id,function(personAndLabel){
		$(personAndLabel).each(function(index) {
			var node = personAndLabel[index];
			var str = '<a href="javascript:void(0);" class="btn btn-white btn-space pal del_person_label" pesonoid="{1}" labelkey="{2}">{0}&nbsp;&nbsp;X</a>'

			var label = label_choose.findNodeByKey(node.labelKey);
			if(label){
				str = str.replace("{1}", node.personOID);
				str = str.replace("{2}", node.labelKey);
				str = str.replace("{0}", label.name);
			}
			$("#personAndLable_datas").append(str);
		});
	});
}


function getPerson() {
	var params = {
		OID : $("#id").val(),
		fullName : $("#fullName").val(),
		englishName : $("#englishName").val(),
		gender :  $("#gender").val(),
		email : $("#email").val(),
		phone : $("#phone").val(),
		jobInfo : $("#jobInfo").val(),
		jobLevel : $("#jobLevel").val(),
		linkLevel : $("#linkLevel").val(),
		idCard : $("#idCard").val(),
		passport : $("#passport").val(),
		province : $("#province").val(),
		city : $("#city").val(),
		address : $("#address").val(),
		orgid:$("#org").val(),
		remark :  $("#remark").val()
	};
	if($("#birthday").val()!=""){
		params['birthdayTime'] = new Date($("#birthday").val()).getTime();
	}
	return params;
}

function getAudit() {
	var params = {
			OID:$("#audit_OID").val(),
			openId:$("#audit_openid").val(),
			fullName:$("#audit_fullName").val(),
			englishName:$("#audit_pinyin").val(),
			email:$("#audit_email").val(),
			jobInfo:$("#audit_jobInfo").val(),
			phone:$("#audit_phone").val(),
			subOrgName:$("#audit_orgName").val(),
			orgid:$("#audit_org").val()
	};
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
	$("#label_selector_all").find("a").each(function(){
		labels.push({key:$(this).attr("key"),bubbledown:$(this).attr("bubbledown")});
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
	params.bind=$("#select_bind").find(".active_bing").attr("value");
	params.audit=$("#select_audit").find(".active_bing").attr("value");
	return params;
}

var person = {
	datas : null,
	conditions : {
		pageSize : 10
	},
	loadDatas : function() {
		$.post("maserati/admin/person/page.json", person.conditions, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			person.datas = json.data;
			// alert(JSON.stringify(json.data));
			person.clear();
			person.load(person.datas.items);
		}, "json");
	},
	load : function(datas) {
		if (!datas) {
			return;
		}
		$(datas).each(function(index) {
			var node = datas[index];
			person.addNode(node);
		});
		person.createPage();
	},
	createPage:function(){
		$("#person_page").createPage({
	        pageCount:person.datas.pageCount,
	        current:person.datas.currentPage,
	        backFn:function(p){
	        	person.conditions.pageNum=p;
	        	person.clear();
	        	person.loadDatas();
	        }
	    });
	},
	addNode : function(node) {
		if (!node) {
			return;
		}
		var str = '<tr data=\'{8}\' id=\'{9}\'>'
            +'<td><input type="checkbox"  name="person_check"></td>'
            +'<td>{0}</td>'
            +'<td>{1}</td>'
            +'<td>{2}</td>'
            +'<td>{3}</td>'
            +'<td>{4}</td>'
            +'<td>{5}</td>'
            +'<td>{6}</td>'
            +'<td>{11}</td>'
            +'<td>{7}</td>'
            +'<td><div>'
           // +'<a class="a_pad" href="javascript:void();" >查看</a>|'
            +'<a class="a_pad edit_tr" data-target="#myModal" data-toggle="modal" href="javascript:void();" >编辑</a>|<a class="a_pad del_tr" href="javascript:void();" >删除</a>|<a data-target="#myModal5" data-toggle="modal" href="javascript:void(0);" class="add_label">标签</a></div>'
            +'<div>';
			
			//if(node.auditStatus!='审核通过'){
				str+= '<a class="a_pad audit" data-target="#myModal2" data-toggle="modal" href="javascript:void();" >审核</a>|';
			//}
		     	//str+='<a class="a_pad" href="maserati/admin/person/{10}/qrcode.html" target="_blank">查看二维码</a>|<a data-target="#myModal5" data-toggle="modal" href="javascript:void(0);" class="add_label">标签</a></div>'
				str+='<a class="a_pad" href="maserati/admin/person/{10}/qrcode.html" target="_blank">查看二维码</a></div>'
            +'</td>'
            +'</tr>';
		str = str.replace("{0}", node.fullName);
		str = str.replace("{1}", node.phone);
		if(node.linkLevel==null){
			str = str.replace("{2}", "");
		}else{
			str = str.replace("{2}", node.linkLevel);
		}
		
		if( node.org_id ==null){
			str = str.replace("{3}", node.mediaName);
		}else{
			str = str.replace("{3}", node.org_name);
		}
		
		str = str.replace("{4}", node._level);
		if(node.province==null || node.province ==""){
			str = str.replace("{5}", "");
		}else{
			str = str.replace("{5}", node.province + " " + node.city + " "
					+ node.address);
		}
		str = str.replace("{6}", node.jobInfo);
		//str = str.replace("{7}", node.auditStatus);
		str = str.replace("{7}", (node.auditStatus==null||node.auditStatus=='')?"待审核":node.auditStatus);
		str = str.replace("{8}", JSON.stringify(node));
		str = str.replace("{9}", node.OID);
		str = str.replace("{10}", node.OID);
		//str = str.replace("{11}", node.nickname?node.nickname:"未绑定");
		str = str.replace("{11}", (node.openId==null||node.openId=='')?"未绑定":"已绑定");
		$("#person_datas_body").append(str);
	},
	save : function() {
		var params = getPerson();
		$.post("maserati/admin/person/save.json", params, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			alert("保存成功！");
			person.loadDatas();
			$("#myModal").modal("hide");
		}, "json");
	},
	del : function(id) {
		var url = "maserati/admin/person/" + id + "/delete.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			alert("删除成功！");
			person.loadDatas();
		}, "json");
	},
	dels : function(ids) {
		var url = "maserati/admin/person/deletes.json";
		$.ajax({
			type : 'post',
			traditional : true,
			url : url,
			data : {
				ids : ids
			},
			success : function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				alert("删除成功！");
				person.loadDatas();
			},
			dataType : 'json'
		});
	},get:function(id,callback){
		var url="maserati/admin/person/"+id+"/get.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			callback(json.data);
		}, "json");
	},
	clear : function() {
		$("#person_datas_body").html("");
	},audit:function(params){
		var url = "maserati/admin/person/audit.json";
		$.post(url, params, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			alert("审核成功！");
			person.loadDatas();
		}, "json");
	},getQrCodeTicket:function(id,callback){
		var url="maserati/admin/person/"+id+"/qrcode/ticket.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			callback(json.data);
		}, "json");
	},exprot:function(){
		var params=JSON.stringify(person.conditions);
		window.open("maserati/admin/person/export.xls?params="+params);
	},changeQrcodeState:function(id,boolean){
		var url="maserati/admin/person/"+id+"/qrcode/changestate.json";
		$.post(url, {isOpen:boolean}, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			alert("修改成功");
		}, "json");
	}
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
			
			$("#person_page").createPage({
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
	                +'<a class="a_pad addremark" data-target="#myModal_remark" data-toggle="modal">添加备注</a>|<a class="a_pad del_tr" href="javascript:void();">删除</a></div>'
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
    				$("#myModal_remark").modal("hide");
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



var org_select={
		init:function(callback){
			$("#org_select_sub_search").click(function(){
				var searchval=$("#org_select_search_value").val();
				if(searchval&&searchval!=''){
					org_select.conditions[$("#org_select_search_type").val()]=searchval;
				}else{
					org_select.conditions[$("#org_select_search_type").val()]=null;
				}
				org_select.loadDatas();
			});
			$("#org_select_datas").on('click',".org_select",function(){
				var org_name=$(this).parent().parent().parent().attr("org_name");
				var id=$(this).parent().parent().parent().attr("id");
				callback(id,org_name);
			});
			org_select.loadDatas();
		},
		datas:null,
		conditions:{pageSize:10},
		loadDatas:function(){
			$.ajax({  
                type:'post',  
                traditional :true,  
                url:"maserati/admin/org/page.json",  
                data: org_select.conditions,
                success:function(json){  
                	if (!json.success) {
    					alert(json.errmsg);
    					return;
    				}
    				org_select.datas=json.data;
    				org_select.clear();
    				org_select.load(org_select.datas.items);
                } ,
                dataType:'json'
            });
		},load:function(datas){
			if(!datas){
				return;
			}
			$(datas).each(function(index) {
				var node = datas[index];
				org_select.addNode(node);
			});
			$("#org_select_page").createPage({
		        pageCount:org_select.datas.pageCount,
		        current:org_select.datas.currentPage,
		        backFn:function(p){
		        	org_select.conditions.pageNum=p;
		        	org_select.clear();
		        	org_select.loadDatas();
		        }
		    });
		},addNode:function(node){
			if(!node){
				return;
			}
			var str = '<tr org_name=\'{8}\' id=\'{9}\'>'
                +'<td>{0}</td>'
                +'<td>{1}</td>'
                +'<td>{2}</td>'
                +'<td>{3}</td>'
                +'<td><div>'
                +'<a class="a_pad org_select" data-target="#checkOrg" data-toggle="modal" href="javascript:void();">选择</a></div>'
                +'</td>'
                +'</tr>';
			str = str.replace("{0}", node.orgName);
			str = str.replace("{1}", node.orgType);
			str = str.replace("{2}", node.industry);
			str = str.replace("{3}", node.phone);
			str = str.replace("{8}", node.orgName);
			str = str.replace("{9}", node.id);
			$("#org_select_datas").append(str);
		},clear:function(){
			$("#org_select_datas").html("");
		}
}



























