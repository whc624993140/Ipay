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
        
		<div class="pageTitle fl">粉丝性别统计</div>
        
		<div class="rule">
			<div class="rule_title">
            	<!--<ul class="sex_attention">
					<li class="rule_title_attention">粉丝性别</li>
				</ul>-->
                <div class="export">
                	<i class="icon_export"></i>
                	<div><a href="static/v1/<fmt:message key="page.key15"/>导出.xlsx" target="_blank"><p>导出CSV</p></a></div>
                </div>
			</div>
        <!--表格-->
            <div class="attentionResp">
                <table width="100%">
                    <tr>
                       <th width="40%">日期</th>
                        <th width="30%"><fmt:message key="page.key220"/></th>
                        <th width="30%"><fmt:message key="page.key221"/></th>
                    </tr>
                    <tr>
                        <td>2015-06-17</td>
                        <td>12,000</td>
                        <td>18,900</td>
                    </tr>
                    <tr>
                        <td>2015-06-17</td>
                        <td>12,000</td>
                        <td>18,900</td>
                    </tr>
                    <tr>
                        <td>2015-06-17</td>
                        <td>12,000</td>
                        <td>18,900</td>
                    </tr>
                    <tr>
                        <td>2015-06-17</td>
                        <td>12,000</td>
                        <td>18,900</td>
                    </tr>
                    <tr>
                        <td>2015-06-17</td>
                        <td>12,000</td>
                        <td>18,900</td>
                    </tr>
                </table>			
            </div>
        </div>
        <div class="paging">
			<a href=""><fmt:message key="page.key264"/></a>
			<a href=""><fmt:message key="page.key322"/></a>
			<a href=""><fmt:message key="page.key323"/></a>
			<a href="">末<fmt:message key="page.key325"/></a>
           <label>
  				第&nbsp;<input class="padding_page" type="text" size="1"/>&nbsp;<fmt:message key="page.key325"/>
            </label>
           <button>GO</button>
		</div>
<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
<link rel="stylesheet" href="static/v1/css/statistical.css" />
</body>
</html>
