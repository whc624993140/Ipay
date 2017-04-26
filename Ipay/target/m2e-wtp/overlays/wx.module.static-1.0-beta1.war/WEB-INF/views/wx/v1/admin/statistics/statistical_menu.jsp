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
        
		<div class="pageTitle fl">商品<fmt:message key="page.key20"/></div>
        
		<div class="rule">
			<div class="rule_title">
            	<!--<ul class="menu_title">
					<li>总汇商城</li>
				</ul>-->
                <div class="export">
                	<i class="icon_export"></i>
                	<div><a href="static/v1/<fmt:message key="page.key15"/>导出.xlsx" target="_blank"><p>导出CSV</p></a></div>
                </div>
			</div>
            <!--表格-->
            <div class="attentionResp">
                <table class="menu_table">
                    <tr>
                        <th>日期</th>
                        <th>商品<fmt:message key="page.key316"/></th>
                        <th><fmt:message key="page.key19"/></th>
                        <th>加入购物车</th>
                        <th>商品购买</th>
                        <th>购买金额</th>
                        <th>卡券<fmt:message key="page.key458"/></th>
                        <th>核销<fmt:message key="page.key458"/></th>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>商品<fmt:message key="page.key316"/>内容</td>
                        <td>20</td>
                        <td>3</td>
                        <td>0</td>
                        <td>125</td>
                        <td>70</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>商品<fmt:message key="page.key316"/>内容</td>
                        <td>20</td>
                        <td>3</td>
                        <td>0</td>
                        <td>125</td>
                        <td>70</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>商品<fmt:message key="page.key316"/>内容</td>
                        <td>20</td>
                        <td>3</td>
                        <td>0</td>
                        <td>125</td>
                        <td>70</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>商品<fmt:message key="page.key316"/>内容</td>
                        <td>20</td>
                        <td>3</td>
                        <td>0</td>
                        <td>125</td>
                        <td>70</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>商品<fmt:message key="page.key316"/>内容</td>
                        <td>20</td>
                        <td>3</td>
                        <td>0</td>
                        <td>125</td>
                        <td>70</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>商品<fmt:message key="page.key316"/>内容</td>
                        <td>20</td>
                        <td>3</td>
                        <td>0</td>
                        <td>125</td>
                        <td>70</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>商品<fmt:message key="page.key316"/>内容</td>
                        <td>20</td>
                        <td>3</td>
                        <td>0</td>
                        <td>125</td>
                        <td>70</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>商品<fmt:message key="page.key316"/>内容</td>
                        <td>20</td>
                        <td>3</td>
                        <td>0</td>
                        <td>125</td>
                        <td>70</td>
                        <td>5</td>
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
