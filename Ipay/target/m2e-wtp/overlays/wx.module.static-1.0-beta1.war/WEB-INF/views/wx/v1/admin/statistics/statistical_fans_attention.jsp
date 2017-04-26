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
        
		<div class="pageTitle fl"><fmt:message key="page.key16"/>统计</div>
         <!--第1块-->
        <div class="rule" id="rule_attention">
        	<div class="rule_title_attention">
            	<div>昨日<fmt:message key="page.key404"/>键指标</div>
            </div>
            <div class="attention_person">
               <ul>
               		<li><fmt:message key="page.key287"/><fmt:message key="page.key223"/></li>
                    <li id="subscribe"></li>
               </ul>
               <ul>
               		<li><fmt:message key="page.key338"/><fmt:message key="page.key291"/><fmt:message key="page.key223"/></li>
                    <li id="unSubscribe"></li>
               </ul>
               <ul>
               		<li>净增<fmt:message key="page.key291"/><fmt:message key="page.key223"/></li>
                    <li id="netSubscribe"></li>
               </ul>
               <ul>
               		<li>累计<fmt:message key="page.key291"/><fmt:message key="page.key223"/></li>
                    <li id="cumulateUser"></li>
               </ul>
            </div>
		 </div>
         <!--第3块-->
		<div class="rule">
			<div class="rule_title">
            	<!--<ul>
					<li class="rule_title_attention"><div class="box_grey"></div>粉丝情况</li>
				</ul>-->
                <div class="export" id="fans_export">
                	<i class="icon_export"></i>
                	<div><p>导出CSV</p></div>
                </div>
			</div>
        <!--表格-->
            <div class="attentionResp">
                <table class="situation_attention" id="fans_table">
                    <tr>
                        <th>日期</th>
                        <th><fmt:message key="page.key287"/><fmt:message key="page.key223"/></th>
                        <th><fmt:message key="page.key338"/><fmt:message key="page.key291"/><fmt:message key="page.key223"/></th>
                        <th>净增<fmt:message key="page.key291"/><fmt:message key="page.key223"/></th>
                        <th>累计<fmt:message key="page.key291"/><fmt:message key="page.key223"/></th>
                    </tr>
                   
                </table>			
            </div>
        </div>
        <div class="paging">
			<span id="fansCount"></span>
			<a class="fans_fir" ><fmt:message key="page.key264"/></a>
			<a class="fans_previous"><fmt:message key="page.key322"/></a>
			<a class="fans_next"><fmt:message key="page.key323"/></a>
			<a class="fans_end"><fmt:message key="page.key267"/></a>
		</div>
<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
<script src="static/v1/scripts/util/ajaxFileDownload.js"></script>
<link rel="stylesheet" href="static/v1/css/statistical.css" />
<script src="static/v1/scripts/statistics/fansattention.js"></script>
</body>
</html>
