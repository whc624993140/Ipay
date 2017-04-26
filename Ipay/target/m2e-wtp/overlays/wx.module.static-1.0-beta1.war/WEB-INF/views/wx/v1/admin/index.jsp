<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/CSS.inc" %>
	<title><fmt:message key="page.key264"/></title>
</head>
<body>
	<div class="head">
		<div class="logo fl">
            <img src="static/v2/img/logo.jpg" />
		</div>
		<div class="perSet fl">微信管理</div>
		<c:choose>  
           <c:when test="${amf:isHaveRole('sys_menu_auth')}">
		<div class="sysSet fl">系统设置</div>
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
			<span><fmt:message key="page.key487"/>中心</span>
			<img src="static/v2/img/logo.png" />
		</div>
		<div class="themes-select">
			<div class="tGlobal themeDefault" id="themeDefault"></div>
			<div class="tGlobal themeGreen" id="themeGreen"></div>
			<div class="tGlobal themeOrange" id="themeOrange"></div>
		</div>
		<div class="loginInfo">
			<ul>
<!-- 				<li>切换<fmt:message key="page.key487"/></li> -->
<!-- 				<li><a href="?locale=zh_CN" style="width: 100%;height: 100%;display: block;">简体中文</a></li> -->
<!-- 				<li><a href="?locale=en_US" style="width: 100%;height: 100%;display: block;">English</a></li> -->
				<li id="logout">退出登录</li>
			</ul>
		</div>
	</div>
	<div class="navbar" id="wxnav">
		<ul>
			<li id="home" href="maserati/admin/home.html">
				<i class="icon-home"></i><label><fmt:message key="page.key264"/></label>
			</li>
			<c:if test="${amf:isHaveRole('sys_menu_wechatmenu')||amf:isHaveRole('sys_menu_keyworldreply')||amf:isHaveRole('sys_menu_news')}">
			<li>
				<i class="icon-edit"></i><label><fmt:message key="page.key2"/></label>
				<ul>
			<c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_wechatmenu')}">
					<li href="wx/admin/menu/manage.html"><fmt:message key="page.key3"/>
<!-- 						<div class="badge">1</div> -->
					</li>
			 	</c:when>  
            </c:choose> 
            <c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_keyworldreply')}">
					<li  href="wx/admin/autoreply/manage.html"><fmt:message key="page.key404"/>键字<fmt:message key="page.key408"/></li>
				</c:when>  
            </c:choose> 
            <c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_news')}">
					<li  href="wx/admin/news/manage.html"><fmt:message key="page.key5"/></li>
				</c:when>  
            </c:choose> 
				</ul>
			</li>
			</c:if>
			<c:if test="${amf:isHaveRole('sys_menu_messmanage')||amf:isHaveRole('sys_menu_templatemanage')||amf:isHaveRole('sys_menu_mass')}">
			<li>
				<i class='icon-comment-alt'></i><label><fmt:message key="page.key271"/></label>
				<ul>
			<c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_messmanage')}">
					<li   href="wx/admin/usermessage/manage.html"><fmt:message key="page.key271"/></li>
				</c:when>  
            </c:choose> 
            <c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_templatemanage')}">
					<li   href="wx/admin/template/manage.html"><fmt:message key="page.key8"/></li>
				</c:when>  
            </c:choose> 
<!-- 					<li   href="wx/wxTemplateRecord">模板数据管理</li> -->
 			<c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_mass')}">
					<li   href="wx/admin/mass/manage.html"><fmt:message key="page.key175"/></li>
				</c:when>  
            </c:choose> 
				</ul>
			</li>
			</c:if>
			<c:if test="${amf:isHaveRole('sys_menu_label')||amf:isHaveRole('sys_menu_user')}">
			<li>
				<i class="icon-user"></i><label><fmt:message key="page.key10"/></label>
				<ul>
			 <c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_label')}">
					<li href="wx/admin/label/manage.html"><fmt:message key="page.key199"/></li>
			 	</c:when>  
            </c:choose> 
            <c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_user')}">
					<li href="wx/admin/user/manage.html"><fmt:message key="page.key207"/></li>
				</c:when>  
            </c:choose> 
				</ul>
			</li>
			</c:if>
			 <c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_card')}">
			<li>
				<i class="icon-user"></i><label><fmt:message key="page.key13"/></label>
				<ul>
					<li href="wx/admin/wxCard/list.html"><fmt:message key="page.key14"/></li>
				</ul>
			</li>
			 </c:when>  
            </c:choose> 
			 <c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_summry')}">
               	  	<li>
						<i class="icon-bar-chart"></i><label><fmt:message key="page.key15"/></label>
						<ul>
							<li href="wx/admin/summary/fansattention.html"><fmt:message key="page.key16"/></li>
							<li href="wx/admin/summary/news.html"><fmt:message key="page.key17"/></li>
							<li href="wx/admin/summary/buttomclick.html"><fmt:message key="page.key21"/></li>
						</ul>
					</li>
                </c:when>  
            </c:choose>  
            <c:choose>  
                <c:when test="${amf:isHaveRole('sys_menu_qrcode')}">
			<li>
				<i class="icon-user"></i><label><fmt:message key="page.key308"/></label>
				<ul>
					<li href="wx/admin/qrcode/manage.html"><fmt:message key="page.key23"/></li>
				</ul>
			</li>
			 </c:when>  
            </c:choose> 
            <c:if test="${amf:isHaveRole('sys_menu_maserati_org')||amf:isHaveRole('sys_menu_maserati_person')||amf:isHaveRole('sys_menu_maserati_bnfy')
            ||amf:isHaveRole('sys_menu_maserati_rdhg')||amf:isHaveRole('sys_menu_maserati_feedback')}">
            <li>
				<i class="icon-user"></i><label>媒体管理</label>
				<ul>
					<c:if test="${amf:isHaveRole('sys_menu_maserati_org')}">
					<li href="maserati/admin/org/manage.html">媒体管理</li>
					</c:if>
					<c:if test="${amf:isHaveRole('sys_menu_maserati_person')}">
					<li href="maserati/admin/person/manage.html">联系人管理</li>
					</c:if>
					<c:if test="${amf:isHaveRole('sys_menu_maserati_bnfy')}">
					<li href="maserati/bainianfengya/admin/manage.html">百<fmt:message key="page.key422"/>风雅</li>
					</c:if>
					<c:if test="${amf:isHaveRole('sys_menu_maserati_rdhg')}">
					<li href="maserati/redianhuigu/admin/manage.html">热点回顾</li>
					</c:if>
					<c:if test="${amf:isHaveRole('sys_menu_maserati_feedback')}">
					<li href="maserati/feedback/admin/manage.html">留言管理</li>
					</c:if>
				</ul>
			</li>
			</c:if>
		</ul>
	</div>
	<div class="navbar" id="systemnav">
		<c:choose>  
           <c:when test="${amf:isHaveRole('sys_menu_auth')}">
		<ul>
			<li>
				<i class="icon-edit"></i><label><fmt:message key="page.key487"/>权限</label>
				<ul>
					<li href="wx/admin/authuser/index.html"><fmt:message key="page.key10"/></li>
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
