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
        
		<div class="pageTitle fl"><fmt:message key="page.key21"/></div>
        
		<div class="rule">
			<div class="rule_title">
                <div class="export" id="buttonClick_export">
                	<i class="icon_export"></i>
                	<div><p>导出CSV</p></div>
                </div>
			</div>
            <!--表格-->
            <div class="attentionResp">
                <table class="buttonClick_table" id="buttonClick_table">
                    
                </table>			
            </div>
        </div>
        <div class="paging">
        	<span id="buttonClickCount"></span>
			<a class="button_fir" ><fmt:message key="page.key264"/></a>
			<a class="button_previous"><fmt:message key="page.key322"/></a>
			<a class="button_next"><fmt:message key="page.key323"/></a>
			<a class="button_end"><fmt:message key="page.key267"/></a>
		</div>
<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
<script src="static/v1/scripts/util/ajaxFileDownload.js"></script>
<link rel="stylesheet" href="static/v1/css/statistical.css" />
<script src="static/v1/scripts/statistics/buttonClick.js"></script>
</body>
</html>
