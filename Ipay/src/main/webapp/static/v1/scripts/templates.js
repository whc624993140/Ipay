$(function(){

	//增加模版
	$('.addTemplates').click(function(){
		$('.templatesMask').show();
	});
	
	$('.templatesMask_Title > i').click(function(){
		$('.templatesMask').hide();
	});

	//点击增加模板里面的确定
	$('.exampleBTn').click(function(){
		var params=getParams();
		//alert(JSON.stringify(params));
		template.update(params);
		$('.templatesMask').hide();
	});

	//编辑模版
	$(document).on('click','.templatesEdit',function(){
		var data=$(this).parent().parent().attr("data");
		var item=jQuery.parseJSON(data);
		reset();
		$("#name").val(item.name);
		$("#templateId").val(item.templateId);
		$("#example").val(item.example);
		if (typeof (item.datas) != "undefined") {
			for(var p in item.datas){
				addParam(p,item.datas[p]);
			}
		}
		$('.templatesMask').show();
	});

	//删除模版
	$(document).on('click','.templatesDelete',function(){
		var templateId=$(this).parent().parent().attr("templateId");
		template.del(templateId);
	});

	//增加参数
	$(document).on('click','.addParam',function(){
		addParam("","");
	});

	//删除参数
	$(document).on('click','.removeParam',function(){
		$(this).parent().remove();
	});
	
	
	template.loadData();
	
});

function reset(){
	$(".setParamDisp").remove();
	$("#name").val("");
	$("#templateId").val("");
	$("#example").val("");
}

function getParams(){
	var name=$("#name").val();
	var templateId=$("#templateId").val();
	var example=$("#example").val();
	var params={name:name,templateId:templateId,example:example,datas:{}};
	$("input[name='paramName']").each(function(){
		var paramAlias=$(this).siblings("input[name='paramAlias']").val();
		var paramName=$(this).val();
		params.datas[paramName]=paramAlias;
	});
	return params;
}


function addParam(paramName,paramAlias){
	var _param = '';
	_param += '<div class="setParamDisp">';
	_param += '参数名：<input type="text" name="paramName" value="'+paramName+'"/>';
	_param += '　别名：<input type="text" name="paramAlias" value="'+paramAlias+'"/>';
	_param += '<div class="removeParam"><i class="icon-trash"></i></div>';
	_param += '</div>';
	$('.setParam').append(_param);
}


var template={
		templates:null,
		loadData:function(){
			var initUrl = "wx/admin/template/list.json";
			$.post(initUrl, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				template.templates=json.data;
				//alert(JSON.stringify(json.data));
				template.load();
			}, "json");
		},load:function(){
			template.clear();
			if (typeof (template.templates) == "undefined"||template.templates==null) {
				return;
			}
			for (var int = 0; int < template.templates.length; int++) {
				var item =  template.templates[int];
				template.addNode(item);
			}
		},update : function(params) {
			var saveUrl = "wx/admin/template/update.json";
			$.post(saveUrl, params, function(json) {
				if (json.success) {
					if($("li").filter("[templateid='"+json.data.templateId+"']").size()==0){
						template.addNode(json.data);
					}else{
						template.updateNode(json.data);
					}
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},del : function(id) {
			var saveUrl = "wx/admin/template/"+id+"/delete.json";
			$.post(saveUrl, {templateId:id}, function(json) {
				if (json.success) {
					$("li").filter("[templateid='"+id+"']").remove();
				} else {
					alert(json.errmsg);
				}
			}, "json");
		},updateNode:function(params){
			$("li").filter("[templateid='"+params.templateId+"']").attr("data",JSON.stringify(params));
			$("li").filter("[templateid='"+params.templateId+"']").children("span").html(params.name);
		},addNode:function(item){
			var str = '<li templateId="{0}" data=\'{1}\'><span>{2}</span>';
			str +=	'<div class="templatesOper">';
			str +=	'<div class="templatesEdit"><i class="icon-pencil"></i></div>';
			str +=	'<div class="templatesDelete"><i class="icon-remove"></i></div>';
			str +=	'</div>';
			str +=	'</li>';
			str = str.replace("{0}", item.templateId);
			str = str.replace("{1}",JSON.stringify(item));
			str = str.replace("{2}", item.name);
			$("#templateUl").append(str);
		},clear:function(){
			$("#templateUl").html("");
		}
}




