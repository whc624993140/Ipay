$(function() {

	$("#add_qrcode").click(function(){
		$("#qrcode_add").show();
	});
	
	$("#close_qrcode_button").click(function(){
		$("#qrcode_add").hide();
	});
	
	$("#add_qrcode_button").click(function(){
		var params={};
		params.name=$("#name").val();
		params.action_name=$("#action_name").val();
		if($("#action_name").val()=='QR_LIMIT_STR_SCENE'){
			params.scene_str=$("#scene_id").val();	
		}else{
			params.scene_id=$("#scene_id").val();	
		}
		params.expire_seconds=$("#expire_seconds").val();
		qrcode.add(params);
		$("#qrcode_add").hide();
	});
	
	$(document).on('click',".qrcode_add_label",function(){
		currentQrCode=jQuery.parseJSON($(this).parents("tr:first").attr("data"));
		label_choose.show();
	});
	$(document).on('click',".qrcode_add_news",function(){
		currentQrCode=jQuery.parseJSON($(this).parents("tr:first").attr("data"));
		newsCheck.show();
	});
	$(document).on('click',".qrcode_del_label",function(){
		qrcodeAndLabel.delete(jQuery.parseJSON($(this).attr("data")));
	});
	$(document).on('click',".qrcode_del_news",function(){
		qrcodeAndNews.delete(jQuery.parseJSON($(this).attr("data")));
	});
	label_choose.init(saveQrCodeAndLabel_callBack);
	newsCheck.init(saveQrCodeAndNews_callBack);
	LockTopScreen();
	$.ajaxSetup({ 
	    async : false 
	});
	qrcodeAndLabel.loadData();
	qrcodeAndNews.loadData();
	qrcode.loadData();
	$.ajaxSetup({ 
	    async : true 
	});
	unLockTopScreen();
});


function saveQrCodeAndLabel_callBack(label){
	var params={};
	params.ticket=currentQrCode.ticket;
	if(currentQrCode.action_name=="QR_LIMIT_STR_SCENE"){
		params.scene=currentQrCode.scene_str;
	}else{
		params.scene=currentQrCode.scene_id;
	}
	params.actionName=currentQrCode.action_name;
	params.labelKey=label;
	qrcodeAndLabel.add(params);
}



function saveQrCodeAndNews_callBack(news){
	var params={};
	params.ticket=currentQrCode.ticket;
	if(currentQrCode.action_name=="QR_LIMIT_STR_SCENE"){
		params.scene=currentQrCode.scene_str;
	}else{
		params.scene=currentQrCode.scene_id;
	}
	params.actionName=currentQrCode.action_name;
	params.newsid=news;
	qrcodeAndNews.add(params);
}

var currentQrCode=null;


var qrcode={
		datas:[],
		conditions:{pageSize:10},
		loadData:function(){
			var getUrl = "wx/admin/qrcode/page.json";
			$.post(getUrl, qrcode.conditions, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				qrcode.datas=json.data;
				//alert(JSON.stringify(json.data));
				qrcode.clear();
				qrcode.load(qrcode.datas);
			}, "json");
		},load : function(datas) {
			if (typeof (datas) == "undefined") {
				return ;
			}
			for (var int = 0; int < datas.items.length; int++) {
				var item = datas.items[int];
				qrcode.addNode(item);
			}
			$("#qrcode_page").createPage({
				pageCount:qrcode.datas.pageCount,
		        current:qrcode.datas.currentPage,
		        backFn:function(p){
		        	qrcode.conditions.pageNum=p;
		        	qrcode.clear();
		        	qrcode.loadData();
		        }
			});
		},
		add : function(params) {
			if((params.action_name=='QR_LIMIT_SCENE'||params.action_name=='QR_LIMIT_STR_SCENE')&&qrcode.datas!=null){
				var param_action=params.action_name=='QR_LIMIT_SCENE'?params.scene_id:params.scene_str;
				for (var int = 0; int < qrcode.datas.length; int++) {
					var item = qrcode.datas[int];
					if(item.action_name=='QR_LIMIT_SCENE'||item.action_name=='QR_LIMIT_STR_SCENE'){
						var item_action=item.action_name=='QR_LIMIT_SCENE'?item.scene_id:item.scene_str;
						if(param_action==item_action){
							alert("二维码已经存在");
							return false;
						}
					}
				}
			}
			var saveUrl = "wx/admin/qrcode/save.json";
			$.post(saveUrl,params,function(json) {
					if (json.success) {
						alert("保存成功");
						window.location.reload();
					} else {
						alert(json.errmsg);
					}
				}, "json");
		},
		addNode : function(item) {
			var str="<tr data='"+JSON.stringify(item)+"' >";
			str+='<td>'+item.name+'</td>';
			var action="永久二维码";
			if(item.action_name=="QR_LIMIT_STR_SCENE"){
				action="永久字符串参数值二维码";
			}
			if(item.action_name=="QR_SCENE"){
				action="临时二维码";
			}
			str+='<td>'+action+'</td>';
			if(item.action_name=="QR_LIMIT_STR_SCENE"){
				str+='<td>'+item.scene_str+'</td>';
			}else{
				str+='<td>'+item.scene_id+'</td>';
			}
			str+='<td>'+(new Date(item.createTime)).Format("yyyy-MM-dd hh:mm:ss")+'</td>';
			if(item.action_name=="QR_SCENE"){
				str+='<td>'+(new Date(item.createTime+item.expire_seconds*1000)).Format("yyyy-MM-dd hh:mm:ss")+'</td>';
			}else{
				str+='<td>永久</td>';
			}
			
//			str+='<td>';
//			var labels=qrcodeAndLabel.findByQyCode(item.ticket);
//			if(labels){
//				for(var int = 0; int < labels.length; int++){
//					var label = labels[int];
//					try{
//					if(int>0){
//						str+=',';
//					}
//					str+=label_choose.findNodeByKey(label.labelKey).name+"_"+label.event;
//					str+="<a href='javaScript:void(0);' class='qrcode_del_label' data='"+JSON.stringify(label)+"' >删除</a>";
//					}catch(e){}
//				}
//			}
//			str+='</td>';		
			
//			str+='<td>';
//			var qans=qrcodeAndNews.findByQyCode(item.ticket);
//			if(qans){
//				for(var int = 0; int < qans.length; int++){
//					var qan = qans[int];
//					try{
//					if(int>0){
//						str+=',';
//					}
//					var news=newsCheck.findNode(qan.newsid);
//					if(qan.newsid.indexOf("single")==0){
//						str+="单图文_"+news.title+"_"+qan.event;
//					}else if(qan.newsid.indexOf("multi")==0){
//						str+="多图文_"+news.news[0].title+"_"+qan.event;
//					}
//					str+="<a href='javaScript:void(0);' class='qrcode_del_news' data='"+JSON.stringify(qan)+"' >删除</a>";
//					}catch(e){alert(e)}
//				}
//			}
//			str+='</td>';	
			
			var url='<a href="'+item.url+'" target="_blank">url</a>';
			var addLabel='<a href="javaScript:void(0);" class="qrcode_add_label" >添加标签</a>';
			var addNews='<a href="javaScript:void(0);" class="qrcode_add_news" >添加图文</a>';
			var ticket='<a href="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+item.ticket+'" target="_blank">二维码</a>';
			str+='<td>'+'&nbsp;&nbsp;&nbsp;&nbsp;'+'&nbsp;&nbsp;&nbsp;&nbsp;'+ticket+'</td>';
			str+='</tr>';
			$("#qrcode_table").append(str);
		},clear:function(){
			$("#qrcode_table").find("tr:first").siblings().remove();
		}
}













