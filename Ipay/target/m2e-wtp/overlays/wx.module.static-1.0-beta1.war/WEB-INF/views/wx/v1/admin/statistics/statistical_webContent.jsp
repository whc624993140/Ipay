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
        
		<div class="pageTitle fl"><fmt:message key="page.key325"/>面<fmt:message key="page.key18"/>统计</div>
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
            <div class="fl font12">
				<fmt:message key="page.key325"/>面分类:
				<select id="Masha code">
					<option value="1">酒店</option>
					<option value="2">餐饮</option>
					<option value="3">特惠</option>
				</select>
			</div>
            <div class="fl font12">
				<fmt:message key="page.key325"/>面<fmt:message key="page.key316"/>:
				<select id="Masha code" style="width:200px;">
					<option value="1">端午节粽子免费送</option>
					<option value="2">咖啡邀<fmt:message key="page.key427"/>券</option>
					<option value="3">豪华套房免费试住啦</option>
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
                        <th>活动<fmt:message key="page.key325"/></th>
                        <th>访问<fmt:message key="page.key40"/>（PV\次）</th>
                        <th>访问<fmt:message key="page.key223"/>（UV\人）</th>
                        <th>停留时间（秒）</th>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>万豪礼品</td>
                        <td>205</td>
                        <td>355</td>
                        <td>450</td>
                    </tr>
                    <tr>
                        <td>2015-05-27</td>
                        <td>万豪特惠</td>
                        <td>205</td>
                        <td>355</td>
                        <td>450</td>
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
