<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc" %>
	<title><fmt:message key="page.key264"/></title>
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
		<div class="pageTitle fl">模板消息</div>
		<div class="templatesDisp">
			<div class="addTemplates">+</div>
			<ul id="templateUl">
				
			</ul>
		</div>
		<div class="templatesMask">
			<div class="templatesMask_cnt">
				<div class="templatesMask_Title">
            <span>
    <img src="static/v1/images/xiaoLogo.png"/>
    </span>
    <span style="font-size:18px;">模板消息</span><i>×</i></div>
				<div class="templatesDispCnt">
					<div class="templatesInfo clearfix">
						<div class="templatesInfoL fl">模板<fmt:message key="page.key316"/>：</div>
						<div class="templatesInfoR fl">
							<input type="text"  id="name"/>
						</div>
					</div>
					<div class="templatesInfo clearfix">
						<div class="templatesInfoL fl">templateId：</div>
						<div class="templatesInfoR fl">
							<input type="text" id="templateId"/>
						</div>
					</div>
<!-- 					<div class="templatesInfo"> -->
<!-- 						<div class="templatesInfoL fl">主题色：</div> -->
<!-- 						<div class="templatesInfoR fl"> -->
<!-- 							<input type="text" /> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="templatesInfo"> -->
<!-- 						<div class="templatesInfoL fl">URL：</div> -->
<!-- 						<div class="templatesInfoR fl"> -->
<!-- 							<input type="text" /> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<div class="templatesInfo clearfix">
						<div class="templatesInfoL fl">增加参数：</div>
						<div class="templatesInfoR fl">
							<div class="addParam fl"><i class="icon-plus"></i></div>
							<div class="setParam">
								<!-- <div class="setParamDisp">
									参数名：<input type="text" />
									别名：<input type="text" />
									<div class="removeParam"><i class="icon-trash"></i></div>
								</div> -->
							</div>
						</div>
					</div>
					<div class="templatesInfo clearfix">
						<div class="templatesInfoL fl">样例：</div>
						<div class="templatesInfoR fl">
							<textarea name="example"  id="example" cols="30" rows="10" class='eg' style="resize:none;"></textarea>
						</div>
					</div>



				</div>
				<div class="templatesInfo" style="text-align:center">
					<button class="allBtn exampleBTn"><fmt:message key="page.key341"/></button>
				</div>
			</div>
		</div>
<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
<script src="static/wx/module/scripts/templates.js"></script>
</body>
</html>
