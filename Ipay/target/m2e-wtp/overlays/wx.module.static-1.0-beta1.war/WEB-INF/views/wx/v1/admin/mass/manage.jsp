<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc"%>
<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc"%>
<title><fmt:message key="page.key264"/></title>
<style type=text/css>
.img_show li {
	width: 300px; /* height: 200px; */
	border-radius: 4px;
	border: 1px solid #ddd;
	margin: 20px;
	cursor: pointer;
	position: relative;
	float: left;
}

#checknews_btn {
	margin: 10px;
	display: inline-block;
	padding: 5px 10px;
	margin-bottom: 0;
	font-size: 12px;
	font-weight: 400;
	line-height: 1.5;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-ms-touch-action: manipulation;
	touch-action: manipulation;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	background-image: none;
	border: 1px solid transparent;
	border-radius: 3px;
	background-color: #13c4a5;
	color: #fff;
}

.btn {
	display: inline-block;
	padding: 5px 10px;
	margin-bottom: 0;
	font-size: 12px;
	font-weight: 400;
	line-height: 1.5;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-ms-touch-action: manipulation;
	touch-action: manipulation;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	background-image: none;
	border: 1px solid transparent;
	border-radius: 3px;
	background-color: #13c4a5;
	color: #fff;
}

.img_text_item {
	display: inline-block;
	float: left;
	height: 30px;
	line-height: 30px;
	margin-top: 6px;
}

.btn_group {
	position: relative;
	display: inline-block;
}

.upload {
	display: inline-block;
	background-color: #13C4A5;
	color: #fff;
	font-weight: bold;
}

#imageFile, #voiceFile {
	position: absolute;
	top: 0;
	filter: alpha(opacity : 0);
	opacity: 0;
	height: 32px;
	left: 0;
	width: 100%;
}
</style>
</head>
<body style="width: 100%;">
	<div style="position: relative; width: 100%; overflow: hidden; overflow-y: scroll; height: calc(100%);">

		<div class="dateTime fr">
			<div class="nowdate fl">
				<div class="nowdate_m1"></div>
				<div class="nowdate_m2"></div>
				<div class="nowdate_m3"></div>
			</div>
			<div class="nowtime fl"></div>
		</div>
		<div class="pageTitle fl">
			<fmt:message key="page.key175"/>
		</div>
		<div class="userTag fl">
			<div class="userTagTitle">
				<label><fmt:message key="page.key330"/>：</label>
				<div id="select_label" class="tagName fl "><fmt:message key="page.key555"/></div>
				<div id="-999" key="all" class="tagName fl label"><fmt:message key="page.key273"/></div>

			</div>
			<label class="lab2"><fmt:message key="page.key274"/></label>
			<div class="tagCnt fl" id="mass_label_selected"></div>
			<label class="lab3"><fmt:message key="page.key275"/><span class="person" id="totalPerson"></span></label>
		</div>
		<div class="sengGroup">
			<div class="sengGroup_t">
				<fmt:message key="page.key181"/>
			</div>
			<div class="sengGroup_cnt">
				<div class="sengGroup_cnt_l fl">
					<div class="sendBtn gr" id="mass">
						<div class="sendBtnImg fl">
							<i class="icon-group"></i>
						</div>
						<div class="sendBtnText fl">
							<p>
								<fmt:message key="page.key188"/>
							</p>
							<!-- 							<a>预计发送给8人</a> -->
						</div>
					</div>
					<div class="sengDisp">
<!-- 						<p> -->
<!-- 							* -->
<!-- 							每天限制发送10<fmt:message key="page.key464"/> -->
<!-- 						</p> -->
<!-- 						<p> -->
<!-- 							* -->
<!-- 							群发内容必须通过微信审核 -->
<!-- 						</p> -->
<!-- 						<p> -->
<!-- 							* -->
<%-- 							所有<fmt:message key="page.key487"/>均会收<fmt:message key="page.key214"/> --%>
<!-- 						</p> -->
						<p>
							*
							<fmt:message key="page.key189"/></br>
							<fmt:message key="page.key563"/></br>
							<fmt:message key="page.key564"/></br>
							<fmt:message key="page.key565"/>
						</p>
					</div>
				</div>
				<div class="sengGroup_cnt_r fl">
					<div class="sendBtn se" id="customsend">
						<div class="sendBtnImg fl">
							<i class="icon-phone"></i>
						</div>
						<div class="sendBtnText fl">
							<p>
								<fmt:message key="page.key193"/>
							</p>
							<!-- 							<a>预计发送给8人</a> -->
						</div>
					</div>
					<div class="sengDisp">
<!-- 						<p> -->
<!-- 							* -->
<%-- 							无法送<fmt:message key="page.key40"/>限制 --%>
<!-- 						</p> -->
<!-- 						<p> -->
<!-- 							* -->
<!-- 							群发内容自由 -->
<!-- 						</p> -->
						<p>
							*
							<fmt:message key="page.key195"/></br>
							<fmt:message key="page.key566"/>
						</p>
<!-- 						<p> -->
<!-- 							* -->
<%-- 							<fmt:message key="page.key487"/>收<fmt:message key="page.key214"/><fmt:message key="page.key40"/>无上限 --%>
<!-- 						</p> -->
					</div>
				</div>
				<div class="sengGroup_cnt_l fl">
					<div class="sendBtn gr" id="preview">
						<div class="sendBtnImg fl">
							<i class="icon-mail-reply-all"></i>
						</div>
						<div class="sendBtnText fl">
							<p><fmt:message key="page.key276"/></p>
						</div>
					</div>
					<div class="sengDisp">
						<p><fmt:message key="page.key277"/></p>
						<p>*<fmt:message key="page.key198"/></p>
					</div>
				</div>
			</div>
		</div>
		<div class="messgeRelease">
			<div class="messgeRelease_t">
				<input type="hidden" id="checktype" value="text" />
				<ul>
					<li><i class="icon-text-width"></i><span><fmt:message key="page.key185"/></span></li>
					<li><i class="icon-file-alt"></i><span><fmt:message key="page.key187"/></span></li>
					<li><i class="icon-picture"></i><span><fmt:message key="page.key184"/></span></li>
					<li><i class="icon-music"></i><span><fmt:message key="page.key182"/></span></li>
					<!-- 					<li><i class="icon-link"></i><span><fmt:message key="page.key76"/></span></li> -->
				</ul>
			</div>
			<div class="messgeRelease_cnt">
				<!-- 输入<fmt:message key="page.key185"/>区域 -->
				<div class="messageText">
					<textarea placeholder="<fmt:message key="page.key319"/>" id="textcontent"></textarea>
				</div>
				<div class="messagenews" style="display: none;">
					<input value="<fmt:message key="page.key272"/>" id='checknews_btn' type="button" /> <input type="hidden" id="checked_news_hide" />
					<ul class="img_show" id="news_show_ul">
					</ul>
				</div>
				<!-- <fmt:message key="page.key129"/><fmt:message key="page.key184"/>区域 -->
				<div class="messageImg itMessageList" style="height: 500px;">
					<div class="btn_group">
						<input type="button" class="new_btn upload" value="<fmt:message key="page.key272"/>"> <input type="file" id="imageFile" /><br />
					</div>
					<button class='new_btn' id="imageFileUploadButton"><fmt:message key="page.key183"/></button>
					<div id='uploadImg'></div>
				</div>

				<!-- <fmt:message key="page.key76"/>区域 -->
				<div class="messageLink">
					<input type="text" placeholder="http://">
				</div>

				<!-- <fmt:message key="page.key182"/>区域 -->
				<div class="messageVoice">

					<div class="btn_group">
						<input type="button" class="new_btn upload" value="<fmt:message key="page.key272"/>"> <input type="file" id="voiceFile" /><br />
					</div>
					<button class='new_btn' id="voiceFileUploadButton"><fmt:message key="page.key183"/></button>
					<div id='uploadVoice'></div>
				</div>
			</div>
		</div>
		<div class="messageBtnArea">
			<button class="msBtn RleBt">
				<fmt:message key="page.key270"/>
			</button>
			<!-- 			<button class="msBtn prevBt"><fmt:message key="page.key73"/></button> -->
		</div>
	</div>

	<div class="alertWin">
		<div class="alertArea">
			<div class="alertArea_tip"></div>
			<p><fmt:message key="page.key336"/>？</p>
			<div class="alertBtn">
				<button class="sure"><fmt:message key="page.key341"/></button>
				<button class="cancel"><fmt:message key="page.key338"/></button>
			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc"%>
	<%@ include file="/WEB-INF/views/wx/v1/include/JqueryUI.inc"%>
	<script src="static/wx/module/scripts/ajaxFileUpload.js"></script>
	<script src="static/wx/module/scripts/util/checkMultiLabel.js"></script>
	<script src="static/wx/module/scripts/util/checkNews.js"></script>
	<script src="static/wx/module/scripts/massjob.js"></script>
	<script src="static/wx/module/scripts/util/dialog.js"></script>
</body>
</html>
