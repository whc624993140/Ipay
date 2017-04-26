$(function(){
	getScript("static/wx/dataexchange/module/news/wxnews.js", function(){
		single.loadData();
	}, true);
    $("#seadate").datepicker({
    	dateFormat: "yy-mm-dd",
    	defaultDate: new Date(),
	    showButtonPanel:true,//是否显示按钮面板  
	    clearText:wx_lang.page_key424,//"+wx_lang.page_key424+"日期的按钮"+wx_lang.page_key316+"  
        closeText:wx_lang.page_key405,//"+wx_lang.page_key405+"选择框的按钮"+wx_lang.page_key316+"
      	changeMonth: true,
      	changeYear:true,
      	numberOfMonths: 1,
      	onClose: function( selectedDate ) {
        	$( "#seadate_end" ).datepicker( "option", "minDate", selectedDate );
      	}
    });
    $("#seadate_end").datepicker({
        dateFormat: "yy-mm-dd",
      	defaultDate: "+1w",
	    showButtonPanel:true,//是否显示按钮面板  
	    clearText:wx_lang.page_key424,//"+wx_lang.page_key424+"日期的按钮"+wx_lang.page_key316+"  
        closeText:wx_lang.page_key405,//"+wx_lang.page_key405+"选择框的按钮"+wx_lang.page_key316+"
      	changeMonth: true,
      	changeYear:true,
      	numberOfMonths: 1,
      	onClose: function( selectedDate ) {
        	$( "#seadate" ).datepicker( "option", "maxDate", selectedDate );
      	}
    });
	$("#search_type").change(function(){
		var type=$(this).val();
		if("single"==type){
			news_type="single";
			single.clear();
			single.loadData();
		}
		if("multi"==type){
			news_type="multi";
			multi.clear();
			multi.loadData();
		}
	});
	
	$(document).on("click",".itmListEdit",function(){
		var id=$(this).parent().parent().attr("id");
		window.location.href="wx/admin/news/"+id+"/manage.html";
	});
	
	$(document).on("click",".itmListDelete",function(){
		if (confirm(wx_lang.page_key349)) {
			var id=$(this).parent().parent().attr("id");
			wxnews.del(id,function(json){
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				var type=$("#search_type").val();
				if("single"==type){
					single.clear();
					single.loadData();
				}
				if("multi"==type){
					multi.clear();
					multi.loadData();
				}
			});
		}
	});
	
	$(".action_push").click(function(){
		var initUrl = "wx/admin/news/push.json";
		$.post(initUrl, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			alert(JSON.stringify(json.data));
			// alert(JSON.stringify(user.page));
		}, "json");
	});
	
	
	
	$(".news_fir").click(function(){
		if("single"==news_type){
			single.page("first");
		}else if("multi"==news_type){
			multi.page("first");
		}
	});
	$(".news_next").click(function(){
		if("single"==news_type){
			single.page("next");
		}else if("multi"==news_type){
			multi.page("next");
		}
	});
	$(".news_previous").click(function(){
		if("single"==news_type){
			single.page("previous");
		}else if("multi"==news_type){
			multi.page("previous");
		}
	});
	$(".news_end").click(function(){
		if("single"==news_type){
			single.page("end");
		}else if("multi"==news_type){
			multi.page("end");
		}
	});
	
	$("#search_news").click(function(){
		search();
	});
	//single.loadData();
});

var news_type="single";

function getConditions(){
	var start_time=$("#seadate").val();
	var end_time=$("#seadate_end").val();
	var title=$("#title").val();
	var params={start_time:start_time,end_time:end_time,title:title};
	return params;
}

function search(){
	var params=getConditions();
	if("single"==news_type){
		extend(single.condition,params,true);
		single.loadData();
	}else if("multi"==news_type){
		extend(multi.condition,params,true);
		multi.loadData();
	}
}

var single={
		data:null,
		condition : {pageSize:20,pageNum:1},
		loadData:function(){
			wxnews.singlePage(single.condition,function(json){
				if (!json.success) {
					alert(json.errmsg);
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
			});
		},load:function(){
			if (typeof (single.data.items) == "undefined") {
				$("#newsCount").html(wx_lang.page_key167);
				return;
			}
			for (var int = 0; int < single.data.items.length; int++) {
				var item = single.data.items[int];
				single.addNode(item);
			}
			$("#newsCount").html(wx_lang.page_key403 + single.data.totalCount + wx_lang.page_key464);
		},addNode:function(node){
			var str='<li id="{0}"><div class="iml_title">{1}</div><div class="iml_time">{2}</div><div class="iml_image"><img src="{3}" ></div>';
			str+='<div class="iml_disp1"><p>{4}</p></div><div class="itmListOper"><div class="itmListEdit fl"><i class="icon-pencil"></i></div><div class="itmListDelete fl"><i class="icon-trash"></i></div></div></li>';
			str = str.replace("{0}", node.oid);
			str = str.replace("{1}", node.title);
			str = str.replace("{2}", timeStamp2String(node.updateTime));
			str = str.replace("{3}", node.picurl);
			if (typeof(node.description) == "undefined"){ 
				str = str.replace("{4}", " ");
			}else{
				str = str.replace("{4}", node.description);
			}
			$(".itMessageList>ul").append(str);
		},clear:function(){
			$(".itMessageList>ul").html("");
		},page:function(type){
			if(single.condition==null){
				return ;
			}
			if("first"==type){
				if(single.condition.pageNum==1){
					return ;
				}
				single.condition.pageNum=1;
			}
			if("next"==type){
				if(single.condition.pageNum== Math.ceil(single.data.totalCount/single.condition.pageSize)){
					return ;
				}
				single.condition.pageNum=single.data.currentPage+1;
			}
			if("previous"==type){
				if(single.condition.pageNum==1){
					return ;
				}
				single.condition.pageNum=single.data.currentPage-1;
			}
			if("end"==type){
				if(single.condition.pageNum== Math.ceil(single.data.totalCount/single.condition.pageSize)){
					return ;
				}
				single.condition.pageNum= Math.ceil(single.data.totalCount/single.condition.pageSize);
			}
			single.loadData();
		}
}



var multi={
		data:null,
		condition : {pageSize:20,pageNum:1},
		loadData:function(){
			wxnews.multiPage(multi.condition,function(json){
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				multi.data=json.data;
				multi.clear();
				//alert(JSON.stringify(user.page));
				multi.load();
				var datas = json.data;
				$("#news_page").pager({
					itemCount:datas.totalCount,
					pageSize:datas.pageSize,
					maxButtonCount:5,
					pageIndex:datas.currentPage-1,
			        backFn:function(p){
			        	multi.condition.pageNum=p+1;
			        	multi.clear();
			        	multi.loadData();
			        }
			    });
			});
		},load:function(){
			if (typeof (multi.data.items) == "undefined") {
				$("#newsCount").html(wx_lang.page_key167);
				return;
			}
			for (var int = 0; int < multi.data.items.length; int++) {
				var item = multi.data.items[int];
				multi.addNode(item);
			}
			$("#newsCount").html(wx_lang.page_key403 + multi.data.totalCount + wx_lang.page_key464);
		},addNode:function(node){
			var str='<li id={0}><div class="iml_title">{1}</div><div class="iml_time">{2}</div><div class="iml_image"><img src="{3}" ></div>';
			str = str.replace("{0}", node.oid);
			str = str.replace("{2}", timeStamp2String(node.updateTime));
			if (typeof ( node.news) == "undefined") {
				str = str.replace("{1}", "无");
				str = str.replace("{3}", "");
			}else{
				str = str.replace("{1}", node.news[0].title);
				str = str.replace("{3}", node.news[0].picurl);
				str += '<div class="dis_box">'
				for (var int = 1; int < node.news.length; int++) {
					str+='<div class="iml_disp2"><div class="iml_disp2_t fl">{4}</div><img src="{5}" ></div>';
					str = str.replace("{4}", node.news[int].title);
					str = str.replace("{5}", node.news[int].picurl);
				}
				str += '</div>'
			}
			str+='<div class="itmListOper"><div class="itmListEdit fl"><i class="icon-pencil"></i></div><div class="itmListDelete fl"><i class="icon-trash"></i></div></div></li>';
			$(".itMessageList>ul").append(str);
		},clear:function(){
			$(".itMessageList>ul").html("");
		},page:function(type){
			if(multi.condition==null){
				return ;
			}
			if("first"==type){
				if(multi.condition.pageNum==1){
					return ;
				}
				multi.condition.pageNum=1;
			}
			if("next"==type){
				if(multi.condition.pageNum== Math.ceil(multi.data.totalCount/multi.condition.pageSize)){
					return ;
				}
				multi.condition.pageNum=multi.data.currentPage+1;
			}
			if("previous"==type){
				if(multi.condition.pageNum==1){
					return ;
				}
				multi.condition.pageNum=multi.data.currentPage-1;
			}
			if("end"==type){
				if(multi.condition.pageNum== Math.ceil(multi.data.totalCount/multi.condition.pageSize)){
					return ;
				}
				multi.condition.pageNum= Math.ceil(multi.data.totalCount/multi.condition.pageSize);
			}
			multi.loadData();
		}
}


























