<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>登录时间过期。请重新登录</title>
	<%@include file="/WEB-INF/views/include/head.jsp" %>
	<script type="text/javascript">
		alert("登录时间过期。请重新登录")
		window.parent.location.href = "${ctx}/login";
	</script>
</head>
<body>
	<div class="container-fluid">
		<div class="page-header"><h1>登录时间过期。请重新登录</h1></div>
	</div>
</body>
</html>