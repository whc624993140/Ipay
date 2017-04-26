<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc" %>
	<title>label</title>
</head>
<!--
<style type="text/css">
.label-content > ul > li{
	
	float: left;
	margin: 10px;
	margin-right: 20px;
	border-radius: 4px;
	font-size: 14px;
	position: relative;
}
.label-content ul li span{
float:left;	
}
</style>
-->
<body>
		<div class="dateTime fr">
			<div class="nowdate fl">
				<div class="nowdate_m1"></div>
				<div class="nowdate_m2"></div>
				<div class="nowdate_m3"></div>
			</div>
			<div class="nowtime fl"></div>
		</div>

		<div class="label-body fl">
			<div class="label-model model-fl modelone">
				<input type="hidden" id="parentid_1" ></input>
				<div class="label-title"><fmt:message key="page.key200"/></div>
				<div class="label-content" id='labelFirst'>
					<div class="addlabels">+</div>
					<ul id="label1">
					</ul>
				</div>




			</div>
			<div class="label-model model-fl modeltwo">
				<input type="hidden" id="parentid_2" ></input>
				<div class="label-title"><a data-parent="0"><fmt:message key="page.key204"/>_<fmt:message key="page.key205"/></a>><span></span></div>
				<div class="label-content" id='labelSecond'>
					<div class="addlabels">+</div>
					<ul id="label2" style="position:relative">
					</ul>
				</div>
			</div>
			<div class="label-model model-fl modelthree">
				<input type="hidden" id="parentid_3" ></input>
				<div class="label-title"><a data-parent="1"><fmt:message key="page.key206"/>_<fmt:message key="page.key205"/></a>><span></span></div>
				<div class="label-content" id='labelThird'>
					<div class="addlabels">+</div>
					<ul id="label3" style="position:relative">
					</ul>
				</div>
			</div>
		</div>
		<div class="footer fl">
			<p>&copy;北京爱思赛博提供技术支持</p>
		</div>
		<div class="labelMask">
			<div class="labelMaskCnt">
				<div class="labelMask_t">
        <div style="display:inline-block;"> <img src="static/v1/images/xiaoLogo.png"/></div>
    <span style="color:#000">增加、<fmt:message key="page.key98"/>或者<fmt:message key="page.key99"/>菜单</span>
					<div class="labelMask_close">
						<i>×</i>
					</div>
				</div>
				<div class="labelCntDisp">
					<input type="hidden" name="id" id="id" ></input>
					<input type="hidden" name="level"  id="level"></input>
					<input type="hidden" name="parentid"  id="parentid"></input>
					<fmt:message key="page.key316"/>:<input type="text"  name="name" id="name"></input>
					<br/>
					key：<input type="text"  name="key"  id="key"></input>
				</div>
				<button class='allBtn labelBtn'><fmt:message key="page.key341"/></button>
			</div>
		</div>
		<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
		<script src="static/wx/module/scripts/label.js"></script>
</body>
</html>
