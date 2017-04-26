<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<meta charset="UTF-8">
	<meta name="apple-touch-fullscreen" content="yes" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<meta content="telephone=no" name="format-detection" />
	<meta content="yes" name="apple-mobile-web-app-capable" />
	<meta content="black" name="apple-mobile-web-app-status-bar-style" />
	<title>领取卡券，<fmt:message key="page.key427"/>稍等....</title>
	
</head>
<body>
</body>
	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/mobileJavascript.inc" %>
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
					alert("<fmt:message key="page.key325"/>面初始化失败，<fmt:message key="page.key427"/>稍后重试！~");
					wx.closeWindow();
				}	
			},
			menu:{
				hideall:true
			}
		};
		 $(function(){
			if(!is_weixn()){
				alert("<fmt:message key="page.key427"/>在微信中打<fmt:message key="page.key412"/>");
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
				alert("<fmt:message key="page.key427"/>在微信中打<fmt:message key="page.key412"/>");
				window.close();
			}
				var backurl='${param.backurl}';
				wechatCard.get({
					cardids:cardids,
					codes:codes,
					success: function (res) {
        				//alert('已<fmt:message key="page.key462"/>卡券：' + JSON.stringify(res.cardList));
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
