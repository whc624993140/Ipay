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
				nowday = "周一";
				break;
			case 2:
				nowday = "周二";
				break;
			case 3:
				nowday = "周三";
				break;
			case 4:
				nowday = "周四";
				break;
			case 5:
				nowday = "周五";
				break;
			case 6:
				nowday = "周六";
				break;
			case 0:
				nowday = "周日";
				break;
			default:
				break;
		}
		switch(nowmonth){
			case 1:
				nowmonth = "2月";
				break;
			case 2:
				nowmonth = "3月";
				break;
			case 3:
				nowmonth = "4月";
				break;
			case 4:
				nowmonth = "5月";
				break;
			case 5:
				nowmonth = "6月";
				break;
			case 6:
				nowmonth = "7月";
				break;
			case 7:
				nowmonth = "8月";
				break;
			case 8:
				nowmonth = "9月";
				break;
			case 9:
				nowmonth = "10月";
				break;
			case 10:
				nowmonth = "11月";
				break;
			case 11:
				nowmonth = "12月";
				break;
			case 0:
				nowmonth = "1月";
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