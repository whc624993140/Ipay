$(function(){

	$('.faceSelect').click(function(){
		$('.imgTextMask').show();
	});


	$('.muchFace').hover(function(){
		$(this).children("i").show();
	},function(){
		$(this).children("i").hide();
	});
	
	$(document).on('click',".icon-pencil",function(){
		clickPencil=this;
		$(".singleMeng").hide();
	});

	$('.addMoreMuch').click(function(){
		var _cnt = '';
		_cnt += '<div class="faceTitle"><span>'+wx_lang.page_key272+'</span>';
		_cnt +=	'<div class="faceTitleOper">';
		_cnt +=	'<div class="faceTitleEdit"><i class="icon-pencil"></i></div>';
		_cnt +=	'<div class="faceTitleDelete"><i class="icon-remove"></i></div>';
		_cnt +=	'</div>';
		_cnt +=	'<div class="smallImg"><img src="images/my.png" alt="" /></div>';
		_cnt +=	'</div>';
		$('.faceTitleList').append(_cnt);
	});

	$(document).on('click','.faceTitleDelete',function(){
		$(this).parent().parent().remove();
	});
	
	$(document).on('click','.itListShow > ul > li',function(){
		$(this).siblings().find('.singleMeng').remove();
		$(this).find('.singleMeng').remove();
		$(this).append('<div class="singleMeng"></div>');
		selectnews_callback(single.get($(this).attr("id")));
	});
	
	$(".itOneBtnConf").click(function(){
		var ids=getParams();
		multi.save(ids);
	});
	
	$('.itListShow').show();
	
	single.loadData();
});


var clickPencil=$('.muchFace').children("i");

function selectnews_callback(data){
	if($(clickPencil).parent().parent(".itMuch").size()>0){
		$(".itMuch").attr("data",data.oid);
		$(clickPencil).parent().children("img").remove();
		$(clickPencil).parent().append('<img src="'+data.picurl+'"  style="width: 320px;height: 160px;"/>');
		$(clickPencil).parent().parent().children(".itFace_t").html(data.title);
	}else{
		$(clickPencil).closest(".faceTitle").attr("data",data.oid);
		$(clickPencil).closest(".faceTitle").children("span").html(data.title);
		$(clickPencil).parent().parent().parent().children(".smallImg").children("img").attr("src",data.picurl);
	}
}

function getParams(){
	var ids="";
	$("div[data]").each(function(){
		ids+=$(this).attr("data");
		ids+=",";
	});
	ids=ids.substring(0,ids.length-1);  
	return ids;
}


var multi={
		data:null,
		loadData:function(id){
			var url = "wx/admin/news/"+id+"/get.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					//alert(json.errmsg);
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
					return;
				}
				multi.data=json.data;
				multi.clear();
				//alert(JSON.stringify(json.data));
				multi.load();
			}, "json");
		},save:function(ids){
			var url = "wx/admin/news/multi/save.json";
			var oid=$("#OID").val();
			$.post(url, {newsids:ids,OID:oid}, function(json) {
				if (!json.success) {
					//alert(json.errmsg);
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
					return;
				}
				//alert(wx_lang.page_key357);
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key357,function(){},wx_lang.page_key341);
				$("#OID").val(json.data.oid);
			}, "json");
		},load:function(){
			if (typeof (multi.data.news) == "undefined") {
				return;
			}
			$("#OID").val(multi.data.oid);
			var item = multi.data.news[0];
			$(".itMuch").attr("data",item.oid);
			$(clickPencil).parent().children("img").remove();
			$(clickPencil).parent().append('<img src="'+item.picurl+'"  style="width: 320px;height: 200px;"/>');
			$(clickPencil).parent().parent().children(".itFace_t").html(item.title);
			for (var int = 1; int < multi.data.news.length; int++) {
				var item = multi.data.news[int];
				multi.addNode(item);
			}
		},addNode:function(node){
			var str = '';
			str += '<div class="faceTitle" data="{0}"><span>{1}</span>';
			str +=	'<div class="faceTitleOper">';
			str +=	'<div class="faceTitleEdit"><i class="icon-pencil"></i></div>';
			str +=	'<div class="faceTitleDelete"><i class="icon-remove"></i></div>';
			str +=	'</div>';
			str +=	'<div class="smallImg"><img src="{2}" alt="" /></div>';
			str +=	'</div>';
			str = str.replace("{0}", node.oid);
			str = str.replace("{1}", node.title);
			str = str.replace("{2}", node.picurl);
			$('.faceTitleList').append(str);
		},clear:function(){
			$('.faceTitleList').html("");
		}
}


var single={
		data:null,
		condition : {pageSize:20,pageNum:1},
		loadData:function(){
			var url = "wx/admin/news/single/page.json";
			$.post(url, single.condition, function(json) {
				if (!json.success) {
					//alert(json.errmsg);
					dialogAlertShow(wx_lang.page_key339,json.errmsg,function(){},wx_lang.page_key341);
					return;
				}
				single.data=json.data;
				single.clear();
				//alert(JSON.stringify(json.data));
				single.load();
				var datas = json.data;
				$("#news_page").pager({
					itemCount:datas.totalCount,
					pageSize:datas.pageSize,
					maxButtonCount:5,
					pageIndex:datas.currentPage-1,
			        backFn:function(p){
			        	single.condition.pageNum=p+1;
			        	single.clear();
			        	single.loadData();
			        }
			    });
			}, "json");
		},load:function(){
			if (typeof (single.data.items) == "undefined") {
				return;
			}
			for (var int = 0; int < single.data.items.length; int++) {
				var item = single.data.items[int];
				single.addNode(item);
			}
		},addNode:function(node){
			var str='<li id="{0}" ><div class="iml_title">{1}</div><div class="iml_time">{2}</div><div class="iml_image"><img src="{3}" ></div>';
			str+='<div class="iml_disp1"><p>{4}</p></div></li>';
			str = str.replace("{0}", node.oid);
			str = str.replace("{1}", node.title);
			str = str.replace("{2}", timeStamp2String(node.updateTime));
			str = str.replace("{3}", node.picurl);
			if (typeof(node.description) == "undefined"){ 
				str = str.replace("{4}", " ");
			}else{
				str = str.replace("{4}", node.description);
			}
			//str = str.replace("{4}", node.description);
//			str = str.replace("{5}", JSON.stringify(node));
			$(".itListShow").children("ul").append(str);
		},clear:function(){
			$(".itListShow").children("ul").html("");
		},get:function(id){
			if (typeof (single.data.items) == "undefined") {
				return null;
			}
			for (var int = 0; int < single.data.items.length; int++) {
				var item = single.data.items[int];
				if(item.oid==id){
					return item;
				}
			}
		}
}




