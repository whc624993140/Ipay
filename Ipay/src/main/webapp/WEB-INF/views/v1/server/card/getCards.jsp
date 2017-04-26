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
	<title>领取卡卷</title>
	
</head>
<body>
</body>
	<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/mobileJavascript.inc" %>
	<script type="text/javascript">
			
		var weChatParams={
			config:{
				debug:false,
				jsApiList:['addCard','hideOptionMenu'],
				ready:function(){
					$(function(){
						getCard();
					});
				},
				error:function(){
					alert("页面初始化失败，请稍后重试！~");
					wx.closeWindow();
				}	
			},
			menu:{
				hideall:true
			}
		};
		 $(function(){
			if(!is_weixn()){
				alert("请在微信中打开");
				window.close();
			}
			wechat.init(weChatParams);
		});
		
		var cardids=new Array();
		<c:forEach items="${paramValues.cardids}" var="arrag">
			cardids.push('${arrag}');
		</c:forEach>
		
		var codes=new Array();
		<c:forEach items="${paramValues.codes}" var="arrag">
			codes.push('${arrag}');
		</c:forEach>
		
	    function getCard(cardList){
	   		if(!is_weixn()){
				alert("请在微信中打开");
				window.close();
			}
				var backurl='${param.backurl}';
				wechatCard.get({
					cardids:cardids,
					codes:codes,
					success: function (res) {
        				//alert('已添加卡券：' + JSON.stringify(res.cardList));
        				//wx.closeWindow();
        				if(backurl&&backurl!=''){
    						window.location.href=backurl; 
    					}else{
    						wx.closeWindow();
    					}
    				},fail: function (res) {
    					//wx.closeWindow();
    					if(backurl&&backurl!=''){
    						window.location.href=backurl; 
    					}else{
    						wx.closeWindow();
    					}
    				}
				});
	    }
	    
	</script>
</html>
