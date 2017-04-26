<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/CSS.inc" %>
	<title>首页</title>
</head>
<body>
	<div class="head">
		<div class="logo fl">
            <img src="static/v2/img/logo.png" />
		</div>
		<div class="perSet fl"><fmt:message key="page.key1"/></div>
		<c:choose>  
           <c:when test="${amf:isHaveRole('sys_menu_auth')}">
		<div class="sysSet fl"><fmt:message key="page.key2"/></div>
			</c:when>  
        </c:choose> 
		
<!-- 		<div class="searchArea fl"> -->
<!-- 			<i class="icon-search"></i> <input type="text" placeholder="Search" /> -->
<!-- 		</div> -->
		<div class="tInfo">
			<a href="mailto:derek.dong@mslgroup.com"><i class="icon-envelope" ></i></a>
		</div>
		<div class="userInfo">
			<i class="icon-sort-down"></i>
			<span>用户中心</span>
			<img src="static/v2/img/logo.png" />
		</div>
		<div class="themes-select">
			<div class="tGlobal themeDefault" id="themeDefault"></div>
			<div class="tGlobal themeGreen" id="themeGreen"></div>
			<div class="tGlobal themeOrange" id="themeOrange"></div>
		</div>
		<div class="loginInfo">
			<ul>
<!-- 				<li>切换用户</li> -->
<!-- 				<li><a href="?locale=zh_CN" style="width: 100%;height: 100%;display: block;">简体中文</a></li> -->
<!-- 				<li><a href="?locale=en_US" style="width: 100%;height: 100%;display: block;">English</a></li> -->
				<li id="logout">退出登录</li>
			</ul>
		</div>
	</div>
	<div class="navbar" id="wxnav">
		<ul>
			<li id="home" href="maserati/admin/home.html">
				<i class="icon-home"></i><label><fmt:message key="page.key3"/></label>
			</li>
			
		</ul>
	</div>
	<div class="navbar" id="systemnav">
		<c:choose>  
           <c:when test="${amf:isHaveRole('sys_menu_auth')}">
		<ul>
			<li>
				<i class="icon-edit"></i><label>用户权限</label>
				<ul>
					<li href="wx/admin/authuser/index.html">用户管理</li>
					<li href="wx/admin/authrole/index.html">权限管理</li>
				</ul>
			</li>
		</ul>
			</c:when>  
        </c:choose>  
	</div>
	<iframe class="mainBody">
		
	</iframe>
	<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
	<script src="static/v1/scripts/winFrame.js"></script>
		<script type="text/javascript">
		$(function(){
			$(".perSet").click(function(){
				$("#wxnav").show();
				$("#systemnav").hide();
			});
			$(".sysSet").click(function(){
				$("#wxnav").hide();
				$("#systemnav").show();
			});
			$(".perSet").click();
		});
	</script>
</body>
</html>
