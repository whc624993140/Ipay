<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<meta charset="UTF-8">
	<meta name="apple-touch-fullscreen" content="yes" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<meta content="telephone=no" name="format-detection" />
	<meta content="yes" name="apple-mobile-web-app-capable" />
	<meta content="black" name="apple-mobile-web-app-status-bar-style" />
	<title>测试jssdk领取卡卷</title>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script src="http://pv.sohu.com/cityjson?ie=utf-8" type="text/javascript"></script>
	<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
	<script src="static/v1/scripts/util/mobile.js" type="text/javascript"></script>
	<script type="text/javascript">
	      
	    $(function(){
				if(!is_weixn()){
					alert("<fmt:message key="page.key427"/>在微信中打<fmt:message key="page.key412"/>");
					window.close();
				}
		});
	    
	    wx.config({
    		debug: false, // <fmt:message key="page.key412"/>启调试模式,调用的所有api的<fmt:message key="page.key321"/>值会在客户端alert出来，若要查看传入的参数，可以在pc端打<fmt:message key="page.key412"/>，参数信息会通过log打出，仅在pc端时才会打印。
   	 		appId: '${signPage.appid}', // 必填，公众号的唯一标识
    		timestamp: ${signPage.timestamp}, // 必填，生成签名的时间戳
    		nonceStr: '${signPage.nonceStr}', // 必填，生成签名的随机串
   			signature: '${signPage.signature}',// 必填，签名，见附录1
    		jsApiList: ['addCard'] // 必填，<fmt:message key="page.key481"/>使用的JS接口列表，所有JS接口列表见附录2
		});
	    
	    function getCard(){
	   		if(!is_weixn()){
				alert("<fmt:message key="page.key427"/>在微信中打<fmt:message key="page.key412"/>");
				window.close();
			}
			try{
		    	var cardExt={};
		    	cardExt.timestamp='${timestamp}';
		    	cardExt.nonce_str ='${nonce_str}';
		    	cardExt.signature='${signature}';
	    		wx.addCard({
    				cardList: [{
       				 	cardId: '${cardid}',
        			 	cardExt: JSON.stringify(cardExt)	
    				}], // <fmt:message key="page.key481"/><fmt:message key="page.key462"/>的<fmt:message key="page.key14"/>
    				success: function (res) {
        				//alert('已<fmt:message key="page.key462"/>卡券：' + JSON.stringify(res.cardList));
        				wx.closeWindow();
    				},fail: function (res) {
    					//if(res.errMsg!='addCard:fail'){
    					//}
    				}
				});
			}catch(e){
				alert(e);
			}
	    }
	    
	    wx.error(function(res){
	    	//alert(JSON.stringify(cardExt));
    		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打<fmt:message key="page.key412"/>config的debug模式查看，也可以在<fmt:message key="page.key321"/>的res参数中查看，对于SPA可以在这里更新签名。
			alert("<fmt:message key="page.key325"/>面初始化失败，<fmt:message key="page.key427"/>稍后重试！~");
			wx.closeWindow();
		});
		
		
		wx.ready(function(){
		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步<fmt:message key="page.key284"/>，所以如果<fmt:message key="page.key481"/>在<fmt:message key="page.key325"/>面加载时就调用相<fmt:message key="page.key404"/>接口，则须把相<fmt:message key="page.key404"/>接口放在ready函数中调用来确保正确执行。对于<fmt:message key="page.key487"/>触发时才调用的接口，则可以直接调用，不<fmt:message key="page.key481"/>放在ready函数中。
			$(function(){
				$(".getGift").click(function(){
					getCard();
				});
			});
		});
	</script>
</head>
<body>
<div class="mainBody">
	<input type="button"  value="点击领取卡卷" class="getGift"/>
</div>
</body>
</html>
