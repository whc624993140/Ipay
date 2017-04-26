<%@ page contentType="text/html;charset=UTF-8"%>
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
<title>核销卡卷</title>

</head>
<body>
	<input type="button" value="核销" id="consume">
</body>
<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc"%>
<%@ include file="/WEB-INF/views/wx/v1/include/mobileJavascript.inc"%>
<script type="text/javascript" src="static/wx/dataexchange/module/card/usercard.js"></script>
<script type="text/javascript">
	var weChatParams = {
		config : {
			debug : false,
			jsApiList : [ 'scanQRCode', 'hideOptionMenu' ],
			ready : function() {
				$(function() {
					getCard();
				});
			},
			error : function() {
				alert("<fmt:message key="page.key325"/>面初始化失败，<fmt:message key="page.key427"/>稍后重试！~");
				wx.closeWindow();
			}
		},
		menu : {
			hideall : true
		}
	};
	$(function() {
		if (!is_weixn()) {
			alert("<fmt:message key="page.key427"/>在微信中打<fmt:message key="page.key412"/>");
			window.close();
		}
		wechat.init(weChatParams);
		$("#consume").click(function(){scanQRCode()});
	});

	function scanQRCode() {
		wx.scanQRCode({
			needResult : 1, // 默认为0，<fmt:message key="page.key290"/>结果由微信处理，1则直接<fmt:message key="page.key321"/><fmt:message key="page.key290"/>结果，
			scanType : [ "qrCode", "barCode" ], // 可以指定扫<fmt:message key="page.key308"/>还是一维码，默认二者都有
			success : function(res) {
				var code = res.resultStr; // 当needResult 为 1 时，扫码<fmt:message key="page.key321"/>的结果
				if(!confirm("<fmt:message key="page.key341"/>要核销这张卡券吗？")){
					return ;
				}
				user_card.consume(code,null,function(json){
					if (!json.success) {
						alert(json.errmsg);
						return;
					}
					alert("<fmt:message key="page.key284"/><fmt:message key="page.key387"/>！");
				});
			}
		});
	}
</script>
</html>
