$(function() {
	$("body").append("<div class=\"templateCheckMask\" ><div class=\"templateCheckMaskCnt\" style=\"z-index:3000;\"><div class=\"templateCheckMask_t\"><span></span><span style=\" margin-left: 10px;\">请选择一个模板</span><div class=\"templateCheckMask_close\" style=\"cursor: pointer;line-height: 20px;font-size: 24px;\">×" +
			"</div></div><span class='position:relative;z-index:9999;'>"+
			"<input type=\"text\" placeholder='搜索模板内容名称' id=\"cname\" style=\" margin-left: 20px; margin-top: 10px;width: 200px;border: 1px solid #ddd; border-radius: 2px; height: 30px;padding:0 20px;\" /><a href=\"javascript:void(0);\" id=\"search_checkTemplate\" class=\"btn btn-sm btn-blues allBtn\" style=\"display: inline-block;margin-top:-2px;margin-left:10px;\">搜索</a>"+
			"</span><div class=\"templateCheckCntDisp\">"+
			"<table class=\"table text-center table-bordered\"><thead><tr>"+
			"<th class=\"text-center\" style=\"width:40%\">模板ID</th><th class=\"text-center\" style=\"width:50%\">模板内容名称</th><th class=\"text-center\" style=\"width:10%\">操作</th>"+
			"</tr></thead><tbody></tbody></table>"+
			"</div>" +
			"<div style=\"text-align: center;margin-top: 50px;\"><span id=\"checkTemplateCount\">共0条</span><a class=\"checkTemplate_fir\" >首页</a><a class=\"checkTemplate_previous\">上一页</a><a class=\"checkTemplate_next\">下一页</a><a class=\"checkTemplate_end\">尾页</a></div><div>" +
			"</div></div></div>");
			$.ajaxSetup ({     
				cache: false  
				//禁用缓存
			});
});

var template_content_choose={
	condition : {pageSize:10,pageNum:1},
	data:null,
	callback:null,
	init:function(callback){
		$(document).on('click',".templateCheckMask_close",function(){
			$('.templateCheckMask').hide();
		});
		$(document).on('click',".templateCheckMask .selectTemplate",function(){
			var templateContentOID=$(this).parent().parent().parent().attr("templateContentOID");
			$('.templateCheckMask').hide();
			template_content_choose.callback(templateContentOID);
		});
		$(".templateCheckMask").on('click',"#search_checkTemplate",function(){
			var cname=$("#cname").val();
			template_content_choose.condition.cname=cname;
			if(cname==""){
				delete template_content_choose.condition.cname;
			}
			template_content_choose.loadData();
	    });
		$(".checkTemplate_fir").click(function(){
			template_content_choose.loadPage("first");
		});
		$(".checkTemplate_next").click(function(){
			template_content_choose.loadPage("next");
		});
		$(".checkTemplate_previous").click(function(){
			template_content_choose.loadPage("previous");
		});
		$(".checkTemplate_end").click(function(){
			template_content_choose.loadPage("end");
		});
		template_content_choose.loadData();
		template_content_choose.callback=callback;
	},
	loadData:function(){
		var url = "templatemanager/admin/templatecontent/tc/page.json";
		$.post(url, template_content_choose.condition, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			template_content_choose.data=json.data;
			template_content_choose.clear();
			template_content_choose.load();
			
		}, "json");
	},
	load:function(){
		if (typeof (template_content_choose.data.items) == "undefined") {
			$("#checktemplateCount").html("共0条");
			return;
		}
		for (var int = 0; int < template_content_choose.data.items.length; int++) {
			var item = template_content_choose.data.items[int];
			template_content_choose.addNode(item);
		}
		$("#checkTemplateCount").html("共" + template_content_choose.data.totalCount + "条");
	},addNode:function(node){
		var str = '<tr templateContentOID=\'{9}\'>'
            +'<td>{0}</td>'
            +'<td>{1}</td>'
            +'<td><div>'
            +'<a class="a_pad selectTemplate" href="javascript:void(0);" >选择</a></div>'
            +'</td>'
            +'</tr>';
		str = str.replace("{0}", node.templateId);
		str = str.replace("{1}", node.cname);
		str = str.replace("{9}", node.oid);
		$(".templateCheckMask .templateCheckCntDisp tbody").append(str);
	},
	findNode:function(templateContentOID){
		var url = "templatemanager/admin/templatecontent/"+templateContentOID+"/get.json";
		var item=null;
		$.ajax({
			type : 'get',
			traditional : true,
			url : url,
			async:false,
			success : function(json) {
				if (!json.success) {
					dialogAlertShow('提示',json.errmsg,function(){},'确定');
					return;
				}
				item=json.data;
			},
			dataType : 'json'
		});
		return item;
	},
	loadPage:function(type){
		if("first"==type){
			if(template_content_choose.condition.pageNum==1){
				return ;
			}
			template_content_choose.condition.pageNum=1;
		}
		if("next"==type){
			if(template_content_choose.condition.pageNum== Math.ceil(template_content_choose.data.totalCount/template_content_choose.condition.pageSize)){
				return ;
			}
			template_content_choose.condition.pageNum=template_content_choose.data.currentPage+1;
		}
		if("previous"==type){
			if(template_content_choose.condition.pageNum==1){
				return ;
			}
			template_content_choose.condition.pageNum=template_content_choose.data.currentPage-1;
		}
		if("end"==type){
			if(template_content_choose.condition.pageNum== Math.ceil(template_content_choose.data.totalCount/template_content_choose.condition.pageSize)){
				return ;
			}
			template_content_choose.condition.pageNum= Math.ceil(template_content_choose.data.totalCount/template_content_choose.condition.pageSize);
		}
		template_content_choose.loadData();
	},
	show:function(){
		$(".templateCheckMask").show();
	},hide:function(){
		$(".templateCheckMask").hide();
	},clear:function(){
		$(".templateCheckMask .templateCheckCntDisp tbody").html("");
	}
}