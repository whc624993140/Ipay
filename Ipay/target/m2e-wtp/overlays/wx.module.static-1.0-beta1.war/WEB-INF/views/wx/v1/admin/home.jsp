<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<%@ include file="/WEB-INF/views/v2/include/JSP.inc" %>
    <meta charset="UTF-8">
    <title><fmt:message key="page.key264"/></title>
    <link rel="stylesheet" href="static/v2/css/reset.css" type="text/css"/>
    <link rel="stylesheet" href="static/v2/css/commen_login.css" type="text/css"/>
	<style type="text/css">
		.res-img{
    display: block;
    width:100%
    height:auto;
    position: absolute;
    left: 0;
    bottom: 0;
}
.response-img{
    display:inline-block;
}
.home_center{
    position: absolute;
    text-align: center;
    top:50%;
    left:50%;
    z-index: 10;
	</style>
</head>
<body style="width: 100%;background:#fff;">
<div class="home_center">
    <img src="static/v2/img/logo.png" alt="" class="response-img"/>
    <h1 style="margin-top:40px;font-family:'Microsoft YaHei';">欢迎进入玛莎拉蒂媒体<fmt:message key="page.key404"/>系管理系统</h1>
</div>
<img src="static/v2/img/welcome.png" alt="" class="res-img"/>
<script type="text/javascript" src="static/v2/js/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        var home_h = $(".home_center").height();
        var home_w = $(".home_center").width();
        $(".home_center").css("margin-top",-home_h)
        $(".home_center").css("margin-left",-home_w/2)
    })
</script>
</body>
</html>
