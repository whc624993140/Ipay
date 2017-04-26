<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc" %>
	<title><fmt:message key="page.key264"/></title>
</head>
<style type="text/css">

</style>
<body>
		<div class="dateTime fr">
			<div class="nowdate fl">
				<div class="nowdate_m1"></div>
				<div class="nowdate_m2"></div>
				<div class="nowdate_m3"></div>
			</div>
			<div class="nowtime fl"></div>
		</div>
		<div class="pageTitle fl"><fmt:message key="page.key86"/></div>
		<div class="itMessDisp">
			<div class="itFace fl">
				<div class="itFace_t"><fmt:message key="page.key124"/></div>
				<div class="faceCnt">
					<fmt:message key="page.key124"/>
				</div>
			</div>
			<div class="configItOne fl">
				<div class="setItmess">
					<div class="setItmess_t"><fmt:message key="page.key125"/></div>
					<div class="setItmess_cnt">
						<p><fmt:message key="page.key126"/></p>
						<input type="text" class='itTitleInput' placeholder='' id="title"/>
						<input id="OID" type="hidden"></input>
						<p><fmt:message key="page.key127"/></p>
						<div class="faceImage">
							<div class="faceImageDisp">
								<input type="file" id="coverFile"/><br/>
								<button class='allBtn faceSelect hehe'  id="fileUploadButton"><fmt:message key="page.key129"/></button>
								<span><fmt:message key="page.key130"/></span>
							</div>
						</div>
						<p><fmt:message key="page.key131"/></p>
						<textarea name="" id="description" cols="30" rows="10" class='itTitleTextArea'></textarea>
					</div>
				</div>
				<div class="setItmess">
					<div class="setItmess_t"><fmt:message key="page.key132"/>
						<div class="selectItMod fr">
							<fmt:message key="page.key133"/>:
							<select name="" id="isDirectJump">
								<option value="false"><fmt:message key="page.key134"/></option>
								<option value="true"><fmt:message key="page.key135"/></option>
							</select>
						</div>
					</div>
					<div class="setItmess_cnt">
						<p><fmt:message key="page.key137"/></p>
						<div class="itContentDisp">
							<textarea id="content" cols="20" rows="2" class="ckeditor"></textarea>
						</div>
						
						<!--<p><input type="button" id="insertMobleMete"  value="插入手机支持参数"/></p>-->
						<p><input type="button" id="processImg"  value="<fmt:message key="page.key142"/>"/></p>
						
						<p><input type="checkbox" class="chkBox" id="show_cover_pic"></input><fmt:message key="page.key143"/></p>

						<p><fmt:message key="page.key144"/></p>
						<input class="itTitleInput" id="author" ></input>
						<p><fmt:message key="page.key145"/></p>
						<input class="itTitleInput" id="url"  placeholder='http://'></input>
					</div>
				</div>
				<button class='allBtn itOneBtnConf'><fmt:message key="page.key331"/></button>
				<button class='allBtn itOneBtnCanl'><fmt:message key="page.key338"/></button>
			</div>
		</div>
		<div class="imgTextMask">
			<div class="imgTextMask_cnt">
				<div class="imgTextMask_Title"><i class="icon-remove"></i></div>
			</div>
		</div>
	</div>
<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
<script src="static/normal/js/simpleAjaxFileUpload.js"></script>
<script src="static/wx/module/scripts/singleNews.js"></script>
<script src="static/wx/module/scripts/ckeditor/ckeditor.js"></script>
<script src="static/wx/module/scripts/util/ckeditorHelper.js"></script>
<script type="text/javascript">
	CKEDITOR.replace('content');
	var id='${id}';
	if(id!=""){
		singleNews.load(id);
	}
</script>
</body>
</html>
