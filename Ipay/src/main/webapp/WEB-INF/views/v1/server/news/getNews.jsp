<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<meta charset="UTF-8">
	<title>${title}</title>
	<meta name="apple-touch-fullscreen" content="yes" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<meta content="telephone=no" name="format-detection" />
	<meta content="yes" name="apple-mobile-web-app-capable" />
	<meta content="black" name="apple-mobile-web-app-status-bar-style" />
	<link rel="stylesheet" href="static/v1/css/common.css">
	<style>
		.mainBody{
			overflow: hidden;
			max-width: 700px;
			margin: 0 auto;
		}
		.wxTitle{
			padding: 10px;
			line-height: 1.4;
			font-weight: 400;
			font-size: 24px;
			word-break:normal;
		}
		.metaList{
			padding: 10px;
			font-size:16px;
			color:#8c8c8c;
		}
		.metaList a{
			color: #607fa6;
			 text-decoration: none;
		}
		.mainCnt{
			padding: 10px;
			font-size: 16px;
			color:#3e3e3e;
			line-height:1.4;
			word-break:normal;
		}
	</style>
</head>
<body>
	<article class="mainBody">
		<div class="wxTitle">${title}</div>
		<div class="metaList">${date}&nbsp;&nbsp;<a>${weChatName}</a></div>
		<div class="mainCnt">
			${content}
		</div>
	</article>
</body>
</html>