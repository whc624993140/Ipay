
var newsCheck={
		init:function(callback){
			$(document).on('click'," .newsCheckBtn",function(){
				var newsid=newsCheck.getCheck();
				newsCheck.callback(newsid);
			});
			$(document).on('change',"#news_search_type",function(){
				newsCheck.initData();
			});
			$("#checknews_startTime").datepicker({
		    	dateFormat: "yy-mm-dd",
		        defaultDate: "+1w",
		      	changeMonth: true,
		      	numberOfMonths: 1,
		      	onClose: function( selectedDate ) {
		        	$( "#checknews_endTime" ).datepicker( "option", "minDate", selectedDate );
		      	}
		    });
			
		    $("#checknews_endTime1").datepicker({
		        dateFormat: "yy-mm-dd",
		      	defaultDate: "+1w",
		      	changeMonth: true,
		      	numberOfMonths: 1,
		      	onClose: function( selectedDate ) {
		        	$( "#checknews_startTime" ).datepicker( "option", "maxDate", selectedDate );
		      	}
		    });
		    $("#myModal2").on('click',"#search_checknews",function(){
		    	newsCheck.search();
		    });
		    
	    	$(".checknews_fir").click(function(){
	    		var type=$("#news_search_type").val();
				if("single"==type){
					newsCheck.singlePage("first");
				}else if ("multi"==type){
					newsCheck.multiPage("first");
				}
			});
			$(".checknews_next").click(function(){
				var type=$("#news_search_type").val();
				if("single"==type){
					newsCheck.singlePage("next");
				}else if ("multi"==type){
					newsCheck.multiPage("next");
				}
			});
			$(".checknews_previous").click(function(){
				var type=$("#news_search_type").val();
				if("single"==type){
					newsCheck.singlePage("previous");
				}else if ("multi"==type){
					newsCheck.multiPage("previous");
				}
			});
			$(".checknews_end").click(function(){
				var type=$("#news_search_type").val();
				if("single"==type){
					newsCheck.singlePage("end");
				}else if ("multi"==type){
					newsCheck.multiPage("end");
				}
			});
			newsCheck.initData();
			newsCheck.callback=callback;
		},show:function(){
			$(".newsCheckMask").show();
		},hide:function(){
			$(".newsCheckMask").hide();
		},initData:function(){
			var type=$("#news_search_type").val();
			if("single"==type){
				newsCheck.ajaxSingleData();
			}else if ("multi"==type){
				newsCheck.ajaxMultiData();
			}
		},
		search:function(){
			var start_time=$("#checknews_startTime").val();
			var end_time=$("#checknews_endTime1").val();
			var title=$("#title").val();
			var params={start_time:start_time,end_time:end_time,title:title};
			extend(newsCheck.condition,params,true);
			var type=$("#news_search_type").val();
			if("single"==type){
				newsCheck.ajaxSingleData();
			}else if ("multi"==type){
				newsCheck.ajaxMultiData();
			}
			
		},condition : {pageSize:20,pageNum:1},
		callback:null,
		singleData:null,
		ajaxSingleData:function(condition){
			var url = "wx/admin/news/single/page.json";
			$.post(url, newsCheck.condition, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				//alert(JSON.stringify(json.data));
				newsCheck.singleData=json.data;
				newsCheck.clear();
				newsCheck.loadSingleData();
			}, "json");
		},
		multiData:null,
		ajaxMultiData:function(){
			var url = "wx/admin/news/multi/page.json";
			$.post(url, newsCheck.condition, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				newsCheck.multiData=json.data;
				newsCheck.clear();
				//alert(JSON.stringify(user.page));
				newsCheck.loadMultiData();
			}, "json");
		},loadMultiData:function(){
			if (typeof (newsCheck.multiData.items) == "undefined") {
				$("#checknewsCount").html("共0条");
				return;
			}
			for (var int = 0; int < newsCheck.multiData.items.length; int++) {
				var item = newsCheck.multiData.items[int];
				newsCheck.addMultiNode(item);
			}
			$("#checknewsCount").html("共" + newsCheck.multiData.totalCount + "条");
		},loadSingleData:function(){
			if (typeof (newsCheck.singleData.items) == "undefined") {
				$("#checknewsCount").html("共0条");
				return;
			}
			for (var int = 0; int < newsCheck.singleData.items.length; int++) {
				var item = newsCheck.singleData.items[int];
				newsCheck.addSignleNode(item);
			}
			$("#checknewsCount").html("共" + newsCheck.singleData.totalCount + "条");
		},addSignleNode : function(node) {
			var str='<li id="{0}"><input type="radio" name="news" value="{5}"><div class="iml_title">{1}</div><div class="iml_time">{2}</div><div class="iml_image"><img src="{3}" ></div>';
			str+='<div class="iml_disp1"><p>{4}</p></div></li>';
			str = str.replace("{0}", node.oid);
			str = str.replace("{5}", node.oid);
			str = str.replace("{1}", node.title);
			str = str.replace("{2}", timeStamp2String(node.updateTime));
			str = str.replace("{3}", node.picurl);
			str = str.replace("{4}", node.description);
			$(" .newsCheckCntDisp > ul").append(str);
		},addMultiNode : function(node) {
			var str='<li id={0}><input type="radio" name="news" value="{5}"><div class="iml_title">{1}</div><div class="iml_time">{2}</div><div class="iml_image"><img src="{3}" ></div>';
			str = str.replace("{0}", node.oid);
			str = str.replace("{5}", node.oid);
			str = str.replace("{1}", node.news[0].title);
			str = str.replace("{2}", timeStamp2String(node.updateTime));
			str = str.replace("{3}", node.news[0].picurl);
			for (var int = 1; int < node.news.length; int++) {
				str+='<div class="iml_disp2"><div class="iml_disp2_t fl">{4}</div><img src="{5}" ></div>';
				str = str.replace("{4}", node.news[int].title);
				str = str.replace("{5}", node.news[int].picurl);
			}
			str+='</li>';
			$(".newsCheckCntDisp > ul").append(str);
		},getCheck:function(){
			var newsid = $(".newsCheckCntDisp input[name='news']:checked").val();

			return newsid;
		},clear:function(){
			$(".newsCheckCntDisp").html("<ul></ul>");
		},findNode:function(newsid){
			if(newsid.indexOf("single")==0){
				if(!newsCheck.singleData){
					$.ajaxSetup({ 
					    async : false 
					});
					newsCheck.ajaxSingleData();
					$.ajaxSetup({ 
					    async : true 
					});
				}
				for (var int = 0; int < newsCheck.singleData.items.length; int++) {
					var item = newsCheck.singleData.items[int];
					if(item.oid==newsid){
						return item;
					}
				}
			}else if(newsid.indexOf("multi")==0){
				if(!newsCheck.multiData){
					$.ajaxSetup({ 
					    async : false 
					});
					newsCheck.ajaxMultiData();
					$.ajaxSetup({ 
					    async : true 
					});
				}
				for (var int = 0; int < newsCheck.multiData.items.length; int++) {
					var item = newsCheck.multiData.items[int];
					if(item.oid==newsid){
						return item;
					}
				}
			}
			var url = "wx/admin/news/"+newsid+"/get.json";
			return $.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				return json.data;
			}, "json");
		},singlePage:function(type){
			if(newsCheck.condition==null){
				return ;
			}
			if("first"==type){
				if(newsCheck.condition.pageNum==1){
					return ;
				}
				newsCheck.condition.pageNum=1;
			}
			if("next"==type){
				if(newsCheck.condition.pageNum== Math.ceil(newsCheck.singleData.totalCount/newsCheck.condition.pageSize)){
					return ;
				}
				newsCheck.condition.pageNum=newsCheck.singleData.currentPage+1;
			}
			if("previous"==type){
				if(newsCheck.condition.pageNum==1){
					return ;
				}
				newsCheck.condition.pageNum=newsCheck.singleData.currentPage-1;
			}
			if("end"==type){
				if(newsCheck.condition.pageNum== Math.ceil(newsCheck.singleData.totalCount/newsCheck.condition.pageSize)){
					return ;
				}
				newsCheck.condition.pageNum= Math.ceil(newsCheck.singleData.totalCount/newsCheck.condition.pageSize);
			}
			newsCheck.ajaxSingleData();
		},multiPage:function(type){
			if(newsCheck.condition==null){
				return ;
			}
			if("first"==type){
				if(newsCheck.condition.pageNum==1){
					return ;
				}
				newsCheck.condition.pageNum=1;
			}
			if("next"==type){
				if(newsCheck.condition.pageNum== Math.ceil(newsCheck.multiData.totalCount/newsCheck.condition.pageSize)){
					return ;
				}
				newsCheck.condition.pageNum=newsCheck.multiData.currentPage+1;
			}
			if("previous"==type){
				if(newsCheck.condition.pageNum==1){
					return ;
				}
				newsCheck.condition.pageNum=newsCheck.multiData.currentPage-1;
			}
			if("end"==type){
				if(newsCheck.condition.pageNum== Math.ceil(newsCheck.multiData.totalCount/newsCheck.condition.pageSize)){
					return ;
				}
				newsCheck.condition.pageNum= Math.ceil(newsCheck.multiData.totalCount/newsCheck.condition.pageSize);
			}
			newsCheck.ajaxMultiData();
		}
}








