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
        
		<div class="pageTitle fl"><fmt:message key="page.key20"/></div>
		<div class="searchCnt fl">
			<div class="inputCnt fl">
				<i class="icon-search"></i>
				<input type="text" placeholder='<fmt:message key="page.key429"/><fmt:message key="page.key252"/>内容'/>
			</div>
			<div class="inputCnt fl">
				<input type="text" placeholder='<fmt:message key="page.key249"/>'  readonly="readonly" id="seadate" style="width: 100px;"/>
				<input type="text" placeholder='<fmt:message key="page.key250"/> '  readonly="readonly" id="seadate_end" style="width: 100px;"/>
			</div>
			<div class="fl font12">
				Masha code:
				<select id="Masha code">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
			</div>
			<button><fmt:message key="page.key252"/></button>
		</div>
        <!--导出-->
         <!--<fmt:message key="page.key492"/>-->       
		<div class="rule">
			<div class="rule_title">
                <div class="export">
                	<i class="icon_export"></i>
                	<div><a href="static/v1/<fmt:message key="page.key15"/>导出.xlsx" target="_blank"><p>导出CSV</p></a></div>
                </div>
			</div>
            <div class="attentionResp">
                <table class="card_table">
                    <tr>
                        <th>订单编号</th>
                        <th>商品<fmt:message key="page.key316"/></th>
                        <th>销售价格</th>
                        <th>购买<fmt:message key="page.key458"/></th>
                        <th>领券<fmt:message key="page.key458"/></th>
                        <th>核销<fmt:message key="page.key458"/></th>
                        <th>未核销<fmt:message key="page.key458"/></th>
                    </tr>
                    <tr>
                        <td>卡券<fmt:message key="page.key316"/></td>
                        <td>大床房</td>
                        <td>20.00</td>
                        <td>200</td>
                        <td>52</td>
                        <td>32</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>卡券<fmt:message key="page.key316"/></td>
                        <td>大床房2</td>
                        <td>20.00</td>
                        <td>200</td>
                        <td>22</td>
                        <td>10</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>卡券<fmt:message key="page.key316"/></td>
                        <td>大床房3</td>
                        <td>20.00</td>
                        <td>200</td>
                        <td>112</td>
                        <td>100</td>
                        <td>10</td>
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
<%@ include file="/WEB-INF/views/v1/include/JqueryUI.inc" %>
<script type="text/javascript">
    $(function () {
        $("#seadate").datepicker({
            dateFormat: "yy-mm-dd"
        });
         $("#seadate_end").datepicker({
            dateFormat: "yy-mm-dd"
        });
    })
    </script>
</body>
</html>
