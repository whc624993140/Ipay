<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc" %>
	<title>autoreply</title>
	<style type="text/css">
		.btn_center{
		text-align:center;
		padding:10px 0;
		<%--border-top:1px solid #dddddd;--%>
	}
	.ruleMask_disp1{
			border-radius: 4px;
			position: relative;
			padding: 20px;
			height: 350px;
			overflow-x:hidden;
			overflow-y:auto;
	}
	.btn_x{
	width:80px;
	height:30px;
	font-size: 12px;
	background-color: #13C4A5;
	/* background: #13C4A5; */
	border-radius: 2px;
	color: #fff;
	cursor: pointer;
	line-height: 30px;
	border-radius:6px;
	display: inline-block;
	}
	#replyContent div{
		line-height:25px;
	}
	.reply_del{
		color:red;
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
		<div class="pageTitle fl"><fmt:message key="page.key93"/></div>
		<div class="rule">
			<div class="rule_title">
				<ul>
					<li key="one2onediv"><fmt:message key="page.key94"/></li>
					<li key="one2morediv" style="display: none;">一问多答</li>
					<li key="subscribediv"><fmt:message key="page.key95"/></li>
					<li key="defaultReplydiv"><fmt:message key="page.key245"/></li>
				</ul>
			</div>
			<div id="one2onediv">
				<div class="create">
					<div class="createBtn"><fmt:message key="page.key97"/></div>
	<!-- 				<div class="createSearch"> -->
	<!-- 					<input type="text" placeholder='<fmt:message key="page.key252"/>规则名'/> -->
	<!-- 					<div class="sh"><i class="icon-search"></i></div> -->
	<!-- 				</div> -->
				</div>
			</div>
			<div id="one2morediv">
				<div class="create">
					<div class="createBtn"><fmt:message key="page.key97"/></div>
	<!-- 				<div class="createSearch"> -->
	<!-- 					<input type="text" placeholder='<fmt:message key="page.key252"/>规则名'/> -->
	<!-- 					<div class="sh"><i class="icon-search"></i></div> -->
	<!-- 				</div> -->
				</div>
			</div>
			<div id="subscribediv">
				<div class="create">
					<div class="createRespBtn"><fmt:message key="page.key462"/><fmt:message key="page.key95"/></div>
				</div>
				<div class="attentionResp">
					<table id="subscribe_reply_table" style="width:100%;">
						<tr id="sub_table_th">
							<th style="width:10%;"><fmt:message key="page.key316"/></th>
							<th style="width:70%;"><fmt:message key="page.key318"/></th>
							<th style="width:10%;"><fmt:message key="page.key98"/></th>
							<th style="width:10%;"><fmt:message key="page.key507"/></th>
						</tr>
					</table>
				</div>
			</div>
			<div id="defaultReplydiv">
				<div class="create">
					<div class="createDefaultReplyBtn"><fmt:message key="page.key246"/></div>
				</div>
				<div class="attentionResp">
					<table id="default_reply_table" style="width:100%;">
						<tr id="default_table_th">
							<th style="width:10%;"><fmt:message key="page.key316"/></th>
							<th style="width:70%;"><fmt:message key="page.key318"/></th>
							<th style="width:10%;"><fmt:message key="page.key98"/></th>
							<th style="width:10%;"><fmt:message key="page.key507"/></th>

						</tr>
					</table>
				</div>
			</div>
		</div>
		
		
		
		<div class="ruleMak">
			<div class="ruleMaskCnt">
				<div class="ruleMask_t">
    <div style="display:inline-block;"><img src="static/v1/images/xiaoLogo.png" /></div>
    <fmt:message key="page.key97"/> -> <span></span>
					<div class="ruleMask_close" id="autoreply_close">×</div>
				</div>
				<div class="ruleMask_disp1">
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key108"/>：</div>
						<div class="createDispR fl">
							<input id="reply_id" type="hidden"></input>
							<input type="text" class='ruleNm' placeholder='<fmt:message key="page.key316"/>'  id="reply_name"	/>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key109"/>：</div>
						<div class="createDispR fl">
							<input type="text" class='inputKey' placeholder='<fmt:message key="page.key110"/>，<fmt:message key="page.key111"/>'   	/>
						</div>
						<div class="getKey" id="reply_keys">
							
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key112"/>：</div>
						<div class="createDispR fl">
							<select name="match" id="reply_match" class='selectScrope'>
								<option value="equals"><fmt:message key="page.key102"/></option>
								<option value="like"><fmt:message key="page.key103"/></option>
							</select>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key95"/>：</div>
						<div class="createDispR fl">
							<div class="typeState respCnt fl"><fmt:message key="page.key114"/></div>
						</div>
					</div>
					<div id="replyContent">
					</div>


				</div>
				<div class="btn_center">
					<a href="javascript:void(0);" id="reply_save" class="btn_x"><fmt:message key="page.key341"/></a>
				</div>
				<div class="respWin lWin">
					<div class="respWin_t"><fmt:message key="page.key376"/>
						<div class="ruleMask_close">×</div>
					</div>
					<div class="respWin_cnt">
						<div class="respWin_cntL fl">
							<ul style="height:100%;">
								<li class="active"><fmt:message key="page.key185"/></li>
								<li id="reply_newsChoose"><fmt:message key="page.key187"/></li>
							</ul>
						</div>
						<div class="respWin_cntR fl">
							<textarea style="width: 100%;height: 100%;resize:none;border:0;" id="reply_textContent" placeholder='<fmt:message key="page.key377"/>'></textarea>
						</div>
					</div>
					<button style='margin-left:300px' id=reply_sure><fmt:message key="page.key341"/></button>
				</div>
			</div>
		</div>
		
		
		
		<div class="responMask">
			<div class="responMaskCnt">
				<div class="ruleMask_t addAttention">
                     <div style="display:inline-block;">
                        <img src="static/v1/images/xiaoLogo.png" />
                     </div>
                    <fmt:message key="page.key462"/><fmt:message key="page.key95"/>
					<div class="ruleMask_close"><i style="font-style:normal;">×</i></div>
				</div>
				<div class="ruleMask_disp1">
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key108"/>：</div>
						<div class="createDispR fl">
							<input id="subreply_id" type="hidden"></input>
							<input type="text" class='ruleNm' placeholder='<fmt:message key="page.key316"/>'  id="subreply_name"		/>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key244"/></div>
						<div class="createDispR fl">
							<div class="typeState attenRespCnt fl"><fmt:message key="page.key114"/></div>
						</div>
					</div>
					<div id="subReplyContent">
					</div>

				</div>
			<div class="btn_center">
	<a href="javascript:void(0);" class='btn_x' id="subReply_save"><fmt:message key="page.key341"/></a>
			</div>
				<div class="respWin pWin">
					<div class="respWin_t"><fmt:message key="page.key114"/>
						<div class="ruleMask_close">×</div>
					</div>
					<div class="respWin_cnt">
						<div class="respWin_cntL fl">
							<ul style="height:100%;">
								<li class="active"><fmt:message key="page.key185"/></li>
								<li id="subReply_newsChoose"><fmt:message key="page.key187"/></li>
							</ul>
						</div>
						<div class="respWin_cntR fl">
							<textarea style="width: 100%;height: 100%;border:0;resize:none;" id="subreply_textContent" placeholder='<fmt:message key="page.key377"/>' ></textarea>
						</div>
					</div>
				<div class="btn_center">
					<a href="javascript:void(0);" class="btn_x" id="subreply_sure"><fmt:message key="page.key341"/></a>
				</div>

				</div>
			</div>
		</div>
		
		
		<div class="defaultReplyMask">
			<div class="defaultReplyMaskCnt">
				<div class="defaultReplyMask_t">
        <div style="display:inline-block;">
        <img src="static/v1/images/xiaoLogo.png"/>
    </div>
    <fmt:message key="page.key97"/> -> <span></span>
					<div class="defaultReplyMask_close" id="defaultReplyMask_close" >×</div>
				</div>
				<div class="ruleMask_disp1">
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key108"/>：</div>
						<div class="createDispR fl">
							<input id="defaultReply_id" type="hidden"></input>
							<input type="text" class='ruleNm' placeholder='<fmt:message key="page.key316"/>' id="defaultReply_name"		/>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key412"/><fmt:message key="page.key404"/>：</div>
						<div class="createDispR fl">
							<select name="defaultReply_isOpen" id="defaultReply_isOpen" class='selectScrope'>
								<option value="true"><fmt:message key="page.key412"/></option>
								<option value="false"><fmt:message key="page.key404"/></option>
							</select>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key95"/>：</div>
						<div class="createDispR fl">
							<div class="typeState respCnt fl dCnt"><fmt:message key="page.key114"/></div>
						</div>
					</div>
					<div id="defaultReplyContent">
					</div>

				</div>
	<div class="btn_center">
		<a href="javascript:void(0);" class="btn_x" id="defaultReply_save"><fmt:message key="page.key341"/></a>
	</div>
				<div class="respWin dWin">
					<div class="respWin_t"><fmt:message key="page.key376"/>
						<div class="ruleMask_close">×</div>
					</div>
					<div class="respWin_cnt">
						<div class="respWin_cntL fl">
							<ul style="height:100%;">
								<li class="active"><fmt:message key="page.key185"/></li>
								<li id="defaultReply_newsChoose"><fmt:message key="page.key187"/></li>
							</ul>
						</div>
						<div class="respWin_cntR fl">
							<textarea style="width: 100%;height: 100%;border:0;resize:none;" id="defaultReply_textContent" placeholder='<fmt:message key="page.key377"/>'></textarea>
						</div>
					</div>
					<button style='margin-left:300px' id=defaultReply_sure><fmt:message key="page.key341"/></button>
				</div>
			</div>
		</div>
		
		
		
		<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
		<%@ include file="/WEB-INF/views/wx/v1/include/JqueryUI.inc" %>
		<script src="static/wx/module/scripts/util/checkNews.js"></script>
		<script src="static/wx/module/scripts/keyWords.js"></script>
		
</body>
</html>
