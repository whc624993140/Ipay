<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc"%>
	<meta charset="UTF-8">
	<meta name="apple-touch-fullscreen" content="yes" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<meta content="telephone=no" name="format-detection" />
	<meta content="yes" name="apple-mobile-web-app-capable" />
	<meta content="black" name="apple-mobile-web-app-status-bar-style" />
	<title>核销</title>
</head>
<body>
</body>
	code:${code }<br/>
	cardid:${cardid }<br/>
	openid:${openid }<br/>
	
	<a href='javascript:void()' id="consume">核销掉</a>
	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc"%>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript">
		$('#consume').click(function(){
			var code='${code }';
			var cardid='${cardid }';
			var openid='${openid }';
			getScript("static/wx/dataexchange/module/card/usercard.js", function() {
				user_card.consume(code,cardid,function(data, status, xhr){
					if (!json.success) {
						alert(json.errmsg);
						return;
					}
					alert('<fmt:message key="page.key387"/>核销');
					wx.closeWindow();
				});
			}, true);
		});
	</script>
</html>
