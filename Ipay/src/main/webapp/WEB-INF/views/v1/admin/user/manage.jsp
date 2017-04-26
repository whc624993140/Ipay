<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/CSS.inc" %>
	<title>首页</title>
</head>
<body>
		<div class="dateTime fr">
			<div class="nowdate fl">
				<div class="nowdate_m1"></div>
				<div class="nowdate_m2"></div>
				<div class="nowdate_m3"></div>
			</div>
			<div class="nowtime fl"></div>
		</div>
		<div class="pageTitle fl"><fmt:message key="page.key127"/></div>
		<div class="searchCnt fl">
			<div class="inputCnt fl">
				<i class="icon-search"></i>
				<input type="text" placeholder='<fmt:message key="page.key128"/>' id="nickname"/>
			</div>
			<button id="search" style="cursor: pointer"><fmt:message key="page.key129"/></button>
		</div>
		<div class="userTag fl">
			<div class="userTagTitle">
				<label ><fmt:message key="page.key77"/>：</label>
				<div class="tagCnt fl" id="label_1"></div>
			</div>
			<div class="giftArea fl" id="label_2"></div>
			<div style="clear:both;"></div>
			<div class="giftArea fl" id="label_3"></div>
		</div>
		<div class="countryCnt fl">
			<div class="userTagTitle">
				<label for=""><fmt:message key="page.key130"/>：</label>
				<div class="tagCnt fl" id="address_distributed">
					<div class="tagName fl">ABCD</div>
					<div class="tagName fl">EFGH</div>
					<div class="tagName fl">IJKL</div>
					<div class="tagName fl">MNOP</div>
					<div class="tagName fl">QRST</div>
					<div class="tagName fl">UVWX</div>
					<div class="tagName fl">YZ</div>
				</div>
			</div>
			<div class="userTagTitle" style='min-height:50px;' >
				<div class="tagCnt coutryName fl" id="addressDiv">
				</div>
			</div>
		</div>
		<div class="userListCnt fl" id="userItems">
<!-- 			用户在这里添加 -->
		</div>
		<input type="hidden" id="label_choose_userid">
		<div class="paging fl">
			<span id="userCount"><fmt:message key="page.key133"/></span>
			<a class="user_fir" ><fmt:message key="page.key134"/></a>
			<a class="user_previous"><fmt:message key="page.key135"/></a>
			<a class="user_next"><fmt:message key="page.key136"/></a>
			<a class="user_end"><fmt:message key="page.key137"/></a>
		</div>
	<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
	<script src="static/v1/scripts/util/checkLabel.js"></script>
<script src="static/v1/scripts/userlist.js"></script>
</body>
</html>