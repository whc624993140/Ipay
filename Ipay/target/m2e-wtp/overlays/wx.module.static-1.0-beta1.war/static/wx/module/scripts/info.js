$(function(){
	//时间日历
	getTime();
	ss = setInterval(getTime,1000);
	function getTime(){
	try{
		var date = new Date();
		var nowmonth = date.getMonth();
		var nowdate = date.getDate();
		var nowday = date.getDay();
		var nowhours = date.getHours();
		var nowminutes = date.getMinutes();
		if(nowminutes>=0&&nowminutes<10){
			nowminutes = "0"+nowminutes;
		}
		switch(nowday){
			case 1:
				nowday = wx_lang.page_key502;
				break;
			case 2:
				nowday = wx_lang.page_key496;
				break;
			case 3:
				nowday = wx_lang.page_key499;
				break;
			case 4:
				nowday = wx_lang.page_key500;
				break;
			case 5:
				nowday = wx_lang.page_key501;
				break;
			case 6:
				nowday = wx_lang.page_key497;
				break;
			case 0:
				nowday = wx_lang.page_key498;
				break;
			default:
				break;
		}
		switch(nowmonth){
			case 1:
				nowmonth =wx_lang.page_key392;
				break;
			case 2:
				nowmonth = wx_lang.page_key451;
				break;
			case 3:
				nowmonth =wx_lang.page_key459;
				break;
			case 4:
				nowmonth =wx_lang.page_key470;
				break;
			case 5:
				nowmonth = wx_lang.page_key419;
				break;
			case 6:
				nowmonth = wx_lang.page_key423;
				break;
			case 7:
				nowmonth = wx_lang.page_key382;
				break;
			case 8:
				nowmonth =wx_lang.page_key410;
				break;
			case 9:
				nowmonth = wx_lang.page_key456;
				break;
			case 10:
				nowmonth = wx_lang.page_key455;
				break;
			case 11:
				nowmonth = wx_lang.page_key454;
				break;
			case 0:
				nowmonth = wx_lang.page_key483;
				break;
			default:
				break;
		}
		$(".nowdate_m1").html(nowday);
		$(".nowdate_m2").html(nowdate);
		$(".nowdate_m3").html(nowmonth);
		$(".nowtime").html(nowhours+"<span class='dot'>:</span>"+nowminutes);
	}catch(err){}
	}
});

//截取域名
$(function(){
	var $url = window.location.href;
	var domin = $url.split('/')[0]+"//"+$url.split('/')[2];
});
