<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/CSS.inc" %>
	
	<link rel="stylesheet" href="static/normal/css/pager.css" />
	
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
        
		<div class="pageTitle fl"><fmt:message key="page.key308"/></div>
		
		<div class="searchCnt fl">
			<button id="add_qrcode" >新建</button>
		</div>
        
		<div class="rule1">
            <!--表格-->
            <div class="attentionResp">
                <table class="image_text_table" id="qrcode_table" style="width:100%">
                    <tr >
                        <th><fmt:message key="page.key316"/></th>
                        <th><fmt:message key="page.key308"/><fmt:message key="page.key311"/></th>
                        <th><fmt:message key="page.key281"/></th>
                        <th>创建时间</th>
                        <th>过期时间</th>
<!--                         <th><fmt:message key="page.key330"/>组</th> -->
<!--                         <th><fmt:message key="page.key465"/>组</th> -->
                        <th><fmt:message key="page.key284"/></th>
                    </tr>
                </table>			
            </div>
        </div>
        <div style="width: 100%;text-align: center;">
        	<div id="qrcode_page" class="pager"></div>
        </div>
        <div style="width: 100%;height: 20px;"></div>
        
        <div class="labelMask" id="qrcode_add">
			<div class="labelMaskCnt" style="height: 460px; width: 410px;">
				<div class="labelMask_t">
					<span id="addUserTitle"><fmt:message key="page.key308"/></span>
					<div class="labelMask_close" id="close_qrcode_button">
						<i class="icon-remove"></i>
					</div>
				</div>
				<div class="labelCntDisp">
					<table>
						<tr>
							<td><fmt:message key="page.key316"/>:</td>
							<td><input type="text" name="name" id="name"></input></td>
						</tr>
						<tr>
							<td><fmt:message key="page.key311"/>:</td>
							<td><select id="action_name">
										<option value="QR_LIMIT_SCENE"><fmt:message key="page.key312"/></option>
										<option value="QR_LIMIT_STR_SCENE"><fmt:message key="page.key486"/><fmt:message key="page.key308"/></option>
										<option value="QR_SCENE"><fmt:message key="page.key417"/><fmt:message key="page.key308"/></option>
									</select>
							</td>
						</tr>
						<tr>
							<td><fmt:message key="page.key281"/>:</td>
							<td><input type="text" name="scene_id" id="scene_id"></input></td>
						</tr>
						<tr>
							<td>过期时间（秒\只有<fmt:message key="page.key417"/><fmt:message key="page.key308"/>有效）:</td>
							<td><input type="text" name="expire_seconds" id="expire_seconds"></input></td>
						</tr>
					</table>
				</div>
			<button class='allBtn labelBtn' id="add_qrcode_button"	style="margin-top: 280px; margin-left: 160px;"><fmt:message key="page.key341"/></button>
		</div>
	</div>
	
<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
<%@ include file="/WEB-INF/views/wx/v1/include/JqueryUI.inc" %>
<script src='static/normal/js/lang/lang_<fmt:message key="page.key0"/>.js'></script>
<script src="static/normal/js/pager.js"></script>

<script src="static/wx/module/scripts/util/checkLabel.js"></script>
<script src="static/wx/module/scripts/util/checkNews.js"></script>
<script src="static/wx/module/scripts/qrcodeAndLabel.js"></script>
<script src="static/wx/module/scripts/qrcodeAndNews.js"></script>
<script src="static/wx/module/scripts/qrcode.js"></script>
</body>
</html>
