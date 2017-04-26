<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc" %>
	<title><fmt:message key="page.key264"/></title>
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
		<div class="pageTitle fl"><fmt:message key="page.key207"/></div>
		<div class="searchCnt fl">
			<div class="inputCnt fl">
				<i class="icon-search"></i>
				<input type="text" placeholder='<fmt:message key="page.key208"/>' id="nickname"/>
			</div>
			<button id="search" style="cursor: pointer"><fmt:message key="page.key252"/></button>
		</div>
		<div class="userTag fl">
			<div class="userTagTitle">
				<label ><fmt:message key="page.key330"/>：</label>
				<div class="tagCnt fl" id="label_1"></div>
			</div>
			<div class="giftArea fl" id="label_2"></div>
			<div style="clear:both;"></div>
			<div class="giftArea fl" id="label_3"></div>
		</div>
		<div class="countryCnt fl">
			<div class="userTagTitle">
				<label for=""><fmt:message key="page.key210"/>：</label>
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
<!-- 			<fmt:message key="page.key487"/>在这里<fmt:message key="page.key462"/> -->
		</div>
		<input type="hidden" id="label_choose_userid">
		<%-- <div class="paging fl">
			<span id="userCount"><fmt:message key="page.key403"/>3<fmt:message key="page.key464"/></span>
			<a class="user_fir" ><fmt:message key="page.key264"/></a>
			<a class="user_previous"><fmt:message key="page.key322"/></a>
			<a class="user_next"><fmt:message key="page.key323"/></a>
			<a class="user_end"><fmt:message key="page.key267"/></a>
		</div> --%>
		<div style="width: 100%;text-align: center;" class="fl">
        	<div id="user_page" class="pager"></div>
        </div> 
	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
	<script src="static/wx/module/scripts/util/checkLabel.js"></script>
	<script src="static/wx/module/scripts/userlist.js"></script>
</body>
</html>
