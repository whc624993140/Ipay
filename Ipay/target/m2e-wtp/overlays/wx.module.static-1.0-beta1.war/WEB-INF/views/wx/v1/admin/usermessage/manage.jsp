<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc" %>
	<title><fmt:message key="page.key264"/></title>
	<style type="text/css">
		.refresh1{margin-left:130px;height:90px;}
		.refresh2{height:90px;float:left;}
		.refresh-item1,.refresh-item2{font-size:15px;display:inline-block;margin-right:10px;}
		.refresh-line1{line-height:90px;float:left;}
		.refresh-line2{line-height:30px;margin-top:15px;}
		.refresh-line2 p{font-size:13px;}
		#reTime{height:25px;line-height:25px;border:1px solid #ddd;margin-right:10px;}
		#resetre,#stopre{padding:5px 6px;background-color:#13c4a5;color:#ffffff;font-size:12px;margin-right:10px;cursor:pointer;border-radius:3px;}
		.refresh-item2 li{float:left;text-align:center;border:1px solid #ddd;margin-right:10px;border-radius:5px;padding:0 10px;background-color:#ffffff;}
		.refresh-left{display:inline-block;line-height:30px;margin-top:-30px;}
        .ch_btn{padding:6px 12px;font-size:14px;background:#13C4A5;border-radius:4px;color:#fff;cursor:pointer;}
        .ch_color{color:#233445;}
	.toggle{
	position: relative;
	display: inline-block;
	pointer-events: auto;
	margin: -5px;
	padding: 5px;
	}
	.toggle input{
	display: none;
	}
	.toggle-positive input:checked + .track{
	border-color: #51b05d;
	background-color: #51b05d;
	}
	.toggle-positive input:checked + .track1{
	border-color: #51b05d;
	background-color: #51b05d;
	}
	.toggle-inverse input:checked + .track {
	border-color: #333333;
	background-color: #333333;
	}
	.toggle.dragging .handle {
	background-color: #f2f2f2 !important;
	}
	.toggle.dragging .handle1 {
	background-color: #f2f2f2 !important;
	}
	.toggle .track {
	-webkit-transition-timing-function: ease-in-out;
	transition-timing-function: ease-in-out;
	-webkit-transition-duration: 0.3s;
	transition-duration: 0.3s;
	-webkit-transition-property: background-color, border;
	transition-property: background-color, border;
	display: inline-block;
	box-sizing: border-box;
	width: 36px;
	height: 20px;
	border: solid 2px #e6e6e6;
	border-radius: 18px;
	background-color: #e84b4e;
	content: ' ';
	cursor: pointer;
	pointer-events: none;
	}


	.toggle .handle {
	-webkit-transition: 0.3s cubic-bezier(0, 1.1, 1, 1.1);
	transition: 0.3s cubic-bezier(0, 1.1, 1, 1.1);
	-webkit-transition-property: background-color, transform;
	transition-property: background-color, transform;
	position: absolute;
	display: block;
	width: 19px;
	height: 19px;
	border-radius: 18px;
	background-color: #fff;
	top: 6px;
	left: 1px;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.35), 0 1px 1px rgba(0, 0, 0, 0.15);
	}
	.toggle .handle:before {
	position: absolute;
	top: -4px;
	left: -21.5px;
	padding: 18.5px 34px;
	content: " "; }
	.toggle input:checked + .track .handle {
	-webkit-transform: translate3d(20px, 0, 0);
	transform: translate3d(20px, 0, 0);
	background-color: #fff;
	}
	.to_li{
		height:62px;
	}
	.to_text{
		line-height:62px;
	}
	.to_mar{
		margin-top:20px;
		margin-left:20px;
	}
	.to_icon{
	font-size: 20px;
	margin-top: 20px;
	margin-left: 20px;
	color: #333333;
	display:inline-block
	}
	.mes_list li{
	position:relative;
	}
	.mes_list li label{
	height:32px;
	line-height:32px;
	width:80px;
	position:absolute;
	top:0;
	left:0;
	}
	.mes_box{
	margin-left:100px;
	line-height:32px;
	}
	.mes_div{
	border-bottom:1px solid #d6d6d6;
	width:100%;
	margin-bottom:10px;
	}
	.mes_div span{
	cursor: pointer
	}
	.labelCntDisp input.mes_input {
	border:0;
	outline:none;
	height:32px;
	width:95%;
	margin:0;
	}

	.labelCntDisp input#mail_time{
	border:0;
	outline:none;
	height:32px;
	margin:0;
	}
	.mes_ad{
	display:inline-block;
	line-height:32px;
	color:#333333;
	margin-left:200px;
	}
	.qr_label{
	line-height:32px;
	text-indent:10px;
	width:80px;
	}
	.ml20{
	margin-left:20px;
	}
	#mail_time{
	width:70%;
	height:32px;
	line-height:32px;
	text-align:center;
	}

	.btn_cool{
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
	border: 1px solid transparent;
	border-radius: 3px;
	background-color: #13c4a5;
	color: #fff;
	}

	.mes_list{
		width:400px;
	}
	</style>
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
		<div class="pageTitle fl"><fmt:message key="page.key271"/></div>
		<div class="refresh1">
		
<!-- 			<div class="refresh-item1 refresh-line1"> -->
<!-- 				刷新间隔：<input id="reTime" style='width:50px' value='15'><input type="button" id="resetre" value="重置"><input type="button" id="stopre" value="停止"> -->
<!-- 			</div> -->
		
			<div class="refresh2">
		
		<ul class="refresh-item2 refresh-line2">
				<li>
					<span id="c1"></span>
					<p><fmt:message key="page.key253"/></p>
				</li>
<!-- 				<li> -->
<!-- 					<span id="c2"></span> -->
<!-- 					<p><fmt:message key="page.key409"/>总消息</p> -->
<!-- 				</li> -->
<!-- 				<li> -->
<!-- 					<span id="c3"></span> -->
<!-- 					<p><fmt:message key="page.key409"/>总<fmt:message key="page.key408"/></p> -->
<!-- 				</li> -->
				<!--<fmt:message key="page.key253"/>：<span id="c1"></span>&nbsp;&nbsp;<fmt:message key="page.key409"/>总消息：<span id="c2"></span>&nbsp;&nbsp;<fmt:message key="page.key409"/>总<fmt:message key="page.key408"/>：<span id="c3"></span> -->
				<c:choose>  
           <c:when test="${amf:isHaveRole('sys_function_usermessage_remindermail')}">
				<li class="to_li">
					<div class="fl to_text">
						邮件提醒设置
					</div>
					<div class="fl to_mar" >
						<label class="toggle toggle-positive">
							<input type="checkbox"  id="remindermail_switch">
							<div class="track">
								<div class="handle"></div>
							</div>
						</label>
					</div>
					<a href="javascript:void(0)" class="icon-cogs to_icon" id="mes_show"></a>
				</li>
				</c:when>  
        </c:choose> 
			</ul>
		</div>
			
		
		</div>
		
		
		<div class="label-body fl">
			<div class="news-left model-fl">
				<div class="news-head news-box"><fmt:message key="page.key258"/></div>
				<div class="news-search">
					<input type="text" placeholder="<fmt:message key="page.key259"/>" class="news-box" id="userNickName"/>
					<div class="news-box" style="cursor: pointer" id="searchUser"><i class="icon-search" ></i></div>
				</div>
				<div class="news-users" id="newsuser">
					<ul>
					</ul>
				</div>
				<!-- <div class="news-users"   style="font-size:12px;text-align:center;line-height:32px;">
					<span id="userCount"><fmt:message key="page.key167"/></span>
					<a class="user_fir" ><fmt:message key="page.key264"/></a>
					<a class="user_previous"><fmt:message key="page.key322"/></a>
					<a class="user_next"><fmt:message key="page.key323"/></a>
					<a class="user_end"><fmt:message key="page.key267"/></a>
				</div> -->
				<div style="width: 100%;text-align: center;" class="paging fl">
        			<div id="news_page" class="pager"></div>
       			 </div> 
			</div>
			<div class="news-right model-fl">
				<div class="news-head news-box">与<span id="curchouser"></span>对话中</div>
				<div class="news-reply label-body">
<!-- 					<div class="reply-link" id="linkreply"><div><i class="icon-text-width"></i></div></div> -->
				<div class="messgeRelease_t">
				<input type="hidden" id="checktype" value="text" />
				<ul id="reply_mes">
					<li class="messgeRelease_t_liAdd"><i class="icon-text-width"></i><span style="display: none;"><fmt:message key="page.key185"/></span></li>
					<li class="news_msg"><i class="icon-picture"></i><span style="display: none;"><fmt:message key="page.key187"/></span></li>
				</ul>
			</div>
					<div id="checktext" class="reply-conent">
						<textarea style="width:100%;height: 100%;border:none;resize:none;"  placeholder="<fmt:message key="page.key261"/>" id="textcontent"></textarea>
					</div>
					<div id="checknews" style="display: none;">
						<input value="<fmt:message key="page.key272"/>" id='checknews_btn' type="button" class="btn_cool"/>
						<input value="<fmt:message key="page.key174"/>" id='clearnews_btn' type="button" class="btn_cool"/>
						<input id="checked_news_hide" type="hidden"/>
                        <ul class="img_show" id="news_show_ul">
                        </ul>
					</div>
				</div>
				<div class="reply-btn label-body">
					<input type="hidden" id="current_openid"></input>
					<ul>
						<li class="reply-choose text"><fmt:message key="page.key268"/></li>
<!-- 						<li><fmt:message key="page.key408"/>素材</li> -->
<!-- 						<li>模板消息</li> -->
					</ul>
				</div>
				<div class="news-record">
					<div class="users-desc users-desc-record">
						<div class="users-p1 up">
							<span><fmt:message key="page.key262"/></span>
<!-- 							<div class="users-time"><input type="checkbox" />仅显示<fmt:message key="page.key184"/>消息</div> -->
						</div>
						<div class="users-p2 up">
							<span id="dataCount"><fmt:message key="page.key167"/></span>
							<a class="page_fir" ><fmt:message key="page.key264"/></a>
							<a class="page_previous"><fmt:message key="page.key322"/></a>
							<a class="page_next"><fmt:message key="page.key323"/></a>
							<a class="page_end"><fmt:message key="page.key267"/></a>
						</div>
						<!--  <div style="width: 100%;text-align: center;" class="paging fl"> -->
        					<!-- <div id="user_message_page" class="pager"></div> -->
       			 	<!-- 	</div> -->
					</div>
				</div>
				<!-- <div id="user_message_page" class="pager"></div> -->
				<div class="msgbox"  id="messages">
				</div>
			</div>
		</div>
		<div class="footer fl">
			<p>&copy;北京爱思赛博提供技术支持</p>
		</div>
		<div class="link-box">
		<div class="box-model">
			<div class="box-head">
				<span>超<fmt:message key="page.key76"/></span>
				<div class="box-cacell-top btncancell">
					<i class="icon-remove-circle"></i>
				</div>
			</div>
			<div class="box-body">
				<div class="box-content"><div>文本内容：</div><input type="text" /></div>
				<div class="box-content"><div><fmt:message key="page.key76"/>内容：</div><input type="text" /></div>
				<div class="box-content"><div><fmt:message key="page.key383"/>：</div><input type="text" /></div>
				<div class="box-content">
<!-- 					是否在新窗口打<fmt:message key="page.key412"/>：<input type="checkbox" class="box-ckb" /> -->
				</div>
			</div>
			<div class="box-btn">
				<div class="btncancell"><fmt:message key="page.key338"/></div>
				<div class="btnok"><fmt:message key="page.key341"/></div>
			</div>
		</div>
	</div>
	<div class="meng-mask"></div>
	<c:choose>  
           <c:when test="${amf:isHaveRole('sys_function_usermessage_remindermail')}">
	<div class="labelMask" id="mes" >
		<div class="labelMaskCnt" style="height: 500px; width: 740px;">
			<div class="labelMask_t">
				<span id="addUserTitle" style="float:left">邮件提醒设置</span>
				<div class="labelMask_close" id="close_qrcode_button">
					×
			</div>
		</div>
		<div class="labelCntDisp">
			<ul class="mes_list">
				<li class="clearfix">
					<label class="fl ">E-mail地址:</label>
							<div class="mes_box">
								<div class="mes_item">
								</div>
							</div>
				</li>
			</ul>
	<a href="javascript:void(0);" class="mes_ad">+<fmt:message key="page.key462"/>新地址</a>
		</div>
		<div class="labelCntDisp clearfix">
			   <label class="fl qr_label" >时间间隔：</label>
			   <div class="fl ml20" style="border-bottom:1px solid #dddddd;margin-right:20px;width:300px">
			   		<input type="text" id="mail_time"  class="qr_input"
			   		onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"  
                    onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" 
			   		>分钟
			   </div>

		</div>
	<button class="allBtn labelBtn" id="add_qrcode_button" style="position:absolute;bottom:20px;left:150px; "><fmt:message key="page.key341"/></button>
		</div>
	</div>
	</c:when>  
        </c:choose> 
	
	

<script src="static/wx/module/scripts/jquery-1.10.2.js"></script>
<script src="static/normal/js/normal.js"></script>
<script src="static/normal/js/page.js"></script>
<script src="static/normal/js/LockScreen.js"></script>
<!-- <script src="static/normal/js/ajax_plugin.js"></script> -->
<script src="static/normal/js/map.js"></script>

<!--<script src="static/wx/module/scripts/jquery-1.10.2.js"></script>-->
<script src='static/wx/module/scripts/lang/lang_<fmt:message key="page.key0"/>.js'></script>
<script src="static/wx/module/scripts/info.js"></script>
<script src="static/wx/module/scripts/theme.js"></script>
<script src="static/wx/module/scripts/util.js"></script>
<script src="static/wx/module/scripts/util/LockScreen.js"></script>
<script src="static/wx/module/scripts/util/normal.js"></script>
<script src="static/wx/module/scripts/util/page.js"></script>
<script src="static/wx/module/scripts/util/normal.js"></script>
<script src="static/wx/module/scripts/util/dialog.js"></script>
<script src='static/normal/js/lang/lang_<fmt:message key="page.key0"/>.js'></script>
<script src="static/normal/js/pager.js"></script>


<%@ include file="/WEB-INF/views/wx/v1/include/JqueryUI.inc" %>
<link rel="stylesheet" href="static/v1/css/usermessage.css"></link>
<script src="static/wx/module/scripts/util/checkNews.js"></script>
<script src="static/wx/module/scripts/usermessage.js"></script>
</body>
</html>
