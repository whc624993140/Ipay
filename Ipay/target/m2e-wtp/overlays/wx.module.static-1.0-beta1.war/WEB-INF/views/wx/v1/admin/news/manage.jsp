<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc" %>
	<title><fmt:message key="page.key264"/></title>
	<style>
	select{
		height:30px;
		border:1px solid #ccc;
		vertical-align:middle;
		line-height:30px;
	}	
		
	</style>
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
		<div class="pageTitle fl"><fmt:message key="page.key116"/></div>
		<div class="imgTextMessage">
			<div class="addItMessage">
				<div class="addItMessage-one fl">
					<p><a href="wx/admin/news/manage/single.html"><fmt:message key="page.key86"/></a></p>
				</div>
				<div class="addItMessage-much fl">
					<p><a href="wx/admin/news/manage/multi.html"><fmt:message key="page.key87"/></a></p>
				</div>
			</div>
			<div class="searchCnt ">
				<div class="inputCnt fl ">
				<fmt:message key="page.key248"/>：
				<select id="search_type">
					<option value="single" selected="selected"><fmt:message key="page.key86"/></option>
					<option value="multi"><fmt:message key="page.key87"/></option>
				</select>
				</div>
				<div class="inputCnt fl">
				<input type="text" placeholder='<fmt:message key="page.key249"/>'  readonly="readonly" id="seadate" style="width: 100px;"/>
				<input type="text" placeholder='<fmt:message key="page.key250"/> '  readonly="readonly" id="seadate_end" style="width: 100px;"/>
				</div>
				<div class="inputCnt fl">
				<input type="text" placeholder='<fmt:message key="page.key251"/>' id="title" />
				</div>
				<button id="search_news"><fmt:message key="page.key252"/></button>
			</div>
			<div class="itMessageList">
				<ul>
					
				
				
				</ul>
			</div>
			<%-- <div class="paging fl" style="width:100%;">
				<span id="newsCount"><fmt:message key="page.key403"/>1<fmt:message key="page.key464"/></span>
				<a class="news_fir" ><fmt:message key="page.key264"/></a>
				<a class="news_previous"><fmt:message key="page.key322"/></a>
				<a class="news_next"><fmt:message key="page.key323"/></a>
				<a class="news_end"><fmt:message key="page.key267"/></a>
			</div> --%>
			<div style="width: 100%;text-align: center;" class="paging fl">
        			<div id="news_page" class="pager"></div>
       			 </div> 
		</div>
	</div>
<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
<%@ include file="/WEB-INF/views/wx/v1/include/JqueryUI.inc" %>
<script src="static/wx/module/scripts/newsList.js"></script>
</body>
</html>
