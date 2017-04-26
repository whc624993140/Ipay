<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/CSS.inc" %>
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
        
		<div class="pageTitle fl"><fmt:message key="page.key187"/></div>
		<div class="searchCnt fl">
			<div class="inputCnt fl">
				<i class="icon-search"></i>
				<input type="text" placeholder='<fmt:message key="page.key251"/>' id="title" />
			</div>
			<div class="inputCnt fl">
				<input type="text" placeholder='<fmt:message key="page.key249"/>'  readonly="readonly" id="seadate" style="width: 100px;"/>
				<input type="text" placeholder='<fmt:message key="page.key250"/> '  readonly="readonly" id="seadate_end" style="width: 100px;"/>
			</div>
			<button id="search"><fmt:message key="page.key252"/></button>
		</div>
        
		<div class="rule">
			<div class="rule_title">
                <div class="export" id="news_export">
                	<i class="icon_export"></i>
                	<div><p>导出CSV</p></div>
                </div>
			</div>
            <!--表格-->
            <div class="attentionResp">
                <table class="image_text_table" id="news_table">
                    <tr>
                        <th><fmt:message key="page.key465"/><fmt:message key="page.key383"/></th>
                        <th>送达<fmt:message key="page.key458"/></th>
                        <th><fmt:message key="page.key465"/><fmt:message key="page.key325"/>阅读<fmt:message key="page.key40"/></th>
                        <th>原文<fmt:message key="page.key325"/>阅读<fmt:message key="page.key40"/></th>
                        <th>分享的<fmt:message key="page.key40"/></th>
                        <th>收藏的<fmt:message key="page.key40"/></th>
                    </tr>
                </table>			
            </div>
        </div>
<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
<%@ include file="/WEB-INF/views/v1/include/JqueryUI.inc" %>
<script src="static/v1/scripts/util/ajaxFileDownload.js"></script>
<link rel="stylesheet" href="static/v1/css/statistical.css" />
<script src="static/v1/scripts/statistics/news.js"></script>
</body>
</html>
