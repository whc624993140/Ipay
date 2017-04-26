$(function() {
	$("body").append("<div class=\"modalWin activityModalWin\"><div class=\"menuPop\"><div class=\"menuPopTitle\"><img src=\"static/v2/img/xiaoLogo.png\" style=\"position: absolute;top:10px;left: 20px;margin-top:-1px;\"/><span style=\"float: left;margin-left:70px; color: #000;\">活动筛选</span><div class=\"menuPopClose\" style=\"cursor:pointer;color:#000;font-size: 24px;\">×</div></div>"+
					"<div style='height:360px;overflow-y: scroll;'><div class=\"uer_body clearfix\"><div class=\"userTag1 fl\"></input><div class=\"userTagTitle\"><label>活动"+wx_lang.page_key316+"：</label><div class=\"tagCnt fl\" id=\"activity_choose_1\"></div>"+
					"</div><div class=\"giftArea fl\" id=\"activity_choose_2\"></div><div style=\"clear: both;\"></div></div></div></div><button class=\"btn_save\">"+wx_lang.page_key331+"</button>"+
			"</div></div>");
});


var activity_choose={
		init:function(callback){
			$(".activityModalWin").on("click",".activity_choose",function(){
				$(".activity_choose").each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
			});
			//点击小×关闭分组框
			$(".activityModalWin").on('click','.menuPopClose',function(){
                $('body').css('position','relative');
				$(".activityModalWin").hide();
				$("#activity_choose_userid").val("");
			});
			//点击"+wx_lang.page_key341+"按钮
			$(".activityModalWin").on('click','.btn_save',function(){
                $('body').css('position','relative');
				var activity=$(".activity_choose").filter(".active").attr("data");
				activity_choose.callback(activity);
				activity_choose.hide();
			});
			$.ajaxSetup({   
	            async : false  
	        });
			activity_choose.loadData();
			$.ajaxSetup({   
	            async : true  
	        });
			activity_choose.callback=callback;
		},
		callback:null,
		activitys:null,
		show:function(){
			activity_choose.clear();
			for(var i=0;i<activity_choose.activitys.length;i++){
				activity_choose.addNode(activity_choose.activitys[i]);
			}
            $('body').css('position','fixed');
			$(".activityModalWin").show();
		},
		hide:function(){
            $('body').css('position','relative');
			$(".activityModalWin").hide();
		},loadData:function(){
			var initUrl = "maserati/admin/meetingmanager/findAll";
			$.post(initUrl, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				activity_choose.activitys=json.data;
			}, "json");
		},addNode : function(node) {
			var str = '<div class="tagName fl activity_choose" data=\'{0}\' id=\'{2}\'>{1}</div>';
			str = str.replace("{0}", JSON.stringify(node));
			str = str.replace("{1}", node.name);
			str = str.replace("{2}", node.oid);
			$("#activity_choose_2").append(str);
		},clear : function() {
			$("#activity_choose_2").html("");
		},changeShow:function(){
			if($("#activity_choose_2").text()!="" ){
				$("#activity_choose_2").show();
			}else{
				$("#activity_choose_2").hide();
			}
		}
}


























