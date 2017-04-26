$(function(){

	//图文消息下的选择弹出层
	$('.faceSelect').click(function(){
		$('.imgTextMask').show();
	});


	//多图文鼠标滑倒封面图片
	$('.muchFace').hover(function(){
		$(this).children("i").show();
	},function(){
		$(this).children("i").hide();
	});
	
	$(document).on('click',".icon-pencil",function(){
		clickPencil=this;
		$(".singleMeng").hide();
	});

	//增加一条多图文标题
	$('.addMoreMuch').click(function(){
		var _cnt = '';
		_cnt += '<div class="faceTitle"><span>请选择</span>';
		_cnt +=	'<div class="faceTitleOper">';
		_cnt +=	'<div class="faceTitleEdit"><i class="icon-pencil"></i></div>';
		_cnt +=	'<div class="faceTitleDelete"><i class="icon-remove"></i></div>';
		_cnt +=	'</div>';
		_cnt +=	'<div class="smallImg"><img src="images/my.png" alt="" /></div>';
		_cnt +=	'</div>';
		$('.faceTitleList').append(_cnt);
	});

	//删除一条多图文标题
	$(document).on('click','.faceTitleDelete',function(){
		$(this).parent().parent().remove();
	});
	
	$(document).on('click','.itListShow > ul > li',function(){
		$(this).siblings().find('.singleMeng').remove();
		$(this).find('.singleMeng').remove();
		$(this).append('<div class="singleMeng"></div>');
		selectnews_callback(jQuery.parseJSON($(this).attr("data")));
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
					alert(json.errmsg);
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
					alert(json.errmsg);
					return;
				}
				alert("保存成功");
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
		loadData:function(){
			var url = "wx/admin/news/single/page.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				single.data=json.data;
				single.clear();
				//alert(JSON.stringify(json.data));
				single.load();
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
			var str='<li id="{0}" data=\'{5}\'><div class="iml_title">{1}</div><div class="iml_time">{2}</div><div class="iml_image"><img src="{3}" ></div>';
			str+='<div class="iml_disp1"><p>{4}</p></div></li>';
			str = str.replace("{0}", node.oid);
			str = str.replace("{1}", node.title);
			str = str.replace("{2}", timeStamp2String(node.updateTime));
			str = str.replace("{3}", node.picurl);
			str = str.replace("{4}", node.description);
			str = str.replace("{5}", JSON.stringify(node));
			$(".itListShow").children("ul").append(str);
		},clear:function(){
			$(".itListShow").children("ul").html("");
		}
}




