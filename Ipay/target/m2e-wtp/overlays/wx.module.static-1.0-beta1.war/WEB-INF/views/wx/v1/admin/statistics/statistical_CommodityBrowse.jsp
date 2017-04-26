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
        
		<div class="pageTitle fl"><fmt:message key="page.key19"/></div>
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
        
		<div class="rule">
			<div class="rule_title">
                <div class="export">
                	<i class="icon_export"></i>
                	<div><a href="static/v1/<fmt:message key="page.key15"/>导出.xlsx" target="_blank"><p>导出CSV</p></a></div>
                </div>
			</div>
            <!--表格-->
            <div class="attentionResp">
                <table class="image_text_table">
                    <tr>
                        <th>日期</th>
                        <th>商品<fmt:message key="page.key316"/></th>
                        <th><fmt:message key="page.key19"/><fmt:message key="page.key40"/></th>
                        <th>加入购物车<fmt:message key="page.key40"/></th>
                    </tr>
                    <tr>
                        <td>2015-06-17</td>
                        <td>万豪礼品1</td>
                        <td>355</td>
                        <td>45</td>
                    </tr>
                    <tr>
                        <td>2015-06-17</td>
                        <td>万豪礼品2</td>
                        <td>355</td>
                        <td>45</td>
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
