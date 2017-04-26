    function dialogAlertShow(title,content,sure_fun,btn_name){
    	var time=new Date().getTime();
    	$('body').append('<div class="shade" id="'+time+'s" style="position: fixed;top:0;left:0;width: 100%;height: 100%;z-index: 999;background-color: #000;opacity: 0.3;filter:alpha(opacity = 30);display: none;">  </div><div id="'+time+'d" class="dialog" style="white-space:nowrap;position: fixed;min-width:360px;max-width:720px;min-height:200px;max-height:400px;background-color: #fff;border-radius: 6px;top:50%;margin-top: -280px;left: 50%;margin-left:-180px;z-index: 9999;display: none;"><div class="title" style="padding: 0 80px 0 20px;height: 42px;line-height: 42px;border-bottom: 1px solid #eee;font-size: 14px;color: #000000;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background-color: #F8F8F8;border-radius: 10px;"></div><div class="content" style="font-size:15px;text-align:center;position: relative; padding: 20px; line-height: 24px; word-break: break-all; overflow: hidden; overflow: auto; min-height: 110px;"></div><div class="" style="text-align:center;padding: 0 10px 12px;"><a href="javascript:void(0);" class="footer_item1" style="text-decoration: none;margin: 0 10px;padding:5px 10px;background: #13C4A5;border-radius: 3px;font-weight: 400;cursor: pointer;color: #fff;display: inline-block;vertical-align: top;line-height:1.5;font-size:12px;text-align:center;"></a></div><div class="close" style="position: absolute;right: 15px;top: 4px;font-size:14;line-height: initial;z-index: 1001;"><a href="javascript:void(0);" class="close_item" style="text-decoration: none;color: #000000;font-weight:700;font-size: 21px;opacity: 1;filter:alpha(opacity = 100);">×</a></div></div>')
        $('#'+time+"s").show();
        $('#'+time+"d").show();

        $('#'+time+"d .title").html(title?title:"提示");
        $('#'+time+"d .content").html(content);
        $('#'+time+"d .footer_item1").html(btn_name?btn_name:"确认");
        
        $('#'+time+"d .close_item").click(function(){
        	dialogAlertHide(time);
        });
        
        $('#'+time+"d .footer_item1").click(function(){
        	dialogAlertHide(time);
        	if(sure_fun){
        		sure_fun(time);
        	}
        });
        return time;
    }

    function dialogAlertHide(time){
    	$('#'+time+"s").remove();
        $('#'+time+"d").remove();
    }
    
    function dialogConfirmShow(title,content,sure_fun,canl_fun,sure_btn_name,canl_btn_name){
    	var time=new Date().getTime();
    	$('body').append('<div class="shade" id="'+time+'ms" style="position: fixed;top:0;left:0;width: 100%;height: 100%;z-index: 999;background-color: #000;opacity: 0.3;filter:alpha(opacity = 30);display: none;">  </div><div class="dialog"  id="'+time+'md" style="white-space:nowrap;position: fixed;min-width:360px;max-width720px;min-height: 200px;max-height:400px;background-color: #fff;border-radius: 6px;top:50%;margin-top: -280px;left: 50%;margin-left:-180px;z-index: 9999;display: none;"><div class="title" style="padding: 0 80px 0 20px;height: 42px;line-height: 42px;border-bottom: 1px solid #eee;font-size: 14px;color: #000000;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background-color: #F8F8F8;border-radius: 10px;"></div><div class="content" style="font-size:15px;text-align:center;position: relative; padding: 20px; line-height: 24px; word-break: break-all; overflow: hidden;overflow: auto; min-height: 110px;"></div><div class="" style="text-align:center;padding: 0 10px 12px;"><a href="javascript:void(0);" class="footer_item1" style="text-decoration: none;margin: 0 10px;padding:5px 10px;background: #13C4A5;border-radius: 3px;font-weight: 400;cursor: pointer;color: #fff;display: inline-block;vertical-align: top;line-height:1.5;font-size:12px;text-align:center;"></a><a href="javascript:void(0);" class="footer_item2" style="text-decoration: none;margin: 0 10px;padding:5px 10px;background: #13C4A5;border-radius: 3px;font-weight: 400;cursor: pointer;color: #fff;display: inline-block;vertical-align: top;line-height:1.5;font-size:12px;text-align:center;"></a></div><div class="close" style="position: absolute;right: 15px;top: 4px;font-size:14;line-height: initial;z-index: 1001;"><a href="javascript:void(0);" class="close_item" style="text-decoration: none;color: #000000;font-weight:700;font-size:21px;opacity:1;filter:alpha(opacity = 100);">×</a></div></div>')
        $('#'+time+"ms").show();
        $('#'+time+"md").show();

        $(".title").html(title?title:"提示");
        $(".content").html(content);
        $(".footer_item1").html(sure_btn_name?sure_btn_name:"确认");
        $(".footer_item2").html(canl_btn_name?canl_btn_name:"取消");
        
        $('#'+time+"md .footer_item1").click(function(){
        	dialogConfirmHide(time);
        	if(sure_fun){
        		sure_fun(time);
        	}
        });
        $('#'+time+"md .footer_item2").click(function(){
        	dialogConfirmHide(time);
        	if(canl_fun){
        		canl_fun(time);
        	}
        });
        
        $('#'+time+"md .close_item").click(function(){
        	dialogConfirmHide(time);
        });
    }

    function dialogConfirmHide(time){
    	 $('#'+time+"ms").remove();
         $('#'+time+"md").remove();
    }
