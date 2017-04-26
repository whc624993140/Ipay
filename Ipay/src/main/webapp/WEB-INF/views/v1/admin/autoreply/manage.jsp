<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/CSS.inc" %>
	<title>autoreply</title>
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
		<div class="pageTitle fl"><fmt:message key="page.key64"/></div>
		<div class="rule">
			<div class="rule_title">
				<ul>
					<li key="one2onediv"><fmt:message key="page.key65"/></li>
					<li key="one2morediv" style="display: none;">一问多答</li>
					<li key="subscribediv"><fmt:message key="page.key73"/></li>
					<li key="defaultReplydiv">默认回复</li>
				</ul>
			</div>
			<div id="one2onediv">
				<div class="create">
					<div class="createBtn"><fmt:message key="page.key66"/></div>
	<!-- 				<div class="createSearch"> -->
	<!-- 					<input type="text" placeholder='搜索规则名'/> -->
	<!-- 					<div class="sh"><i class="icon-search"></i></div> -->
	<!-- 				</div> -->
				</div>
			</div>
			<div id="one2morediv">
				<div class="create">
					<div class="createBtn"><fmt:message key="page.key66"/></div>
	<!-- 				<div class="createSearch"> -->
	<!-- 					<input type="text" placeholder='搜索规则名'/> -->
	<!-- 					<div class="sh"><i class="icon-search"></i></div> -->
	<!-- 				</div> -->
				</div>
			</div>
			<div id="subscribediv">
				<div class="create">
					<div class="createRespBtn"><fmt:message key="page.key74"/></div>
				</div>
				<div class="attentionResp">
					<table id="subscribe_reply_table" style="width:100%;">
						<tr id="sub_table_th">
							<th style="width:10%;">名称</th>
							<th style="width:70%;"><fmt:message key="page.key72"/></th>
							<th style="width:10%;"><fmt:message key="page.key78"/></th>
							<th style="width:10%;"><fmt:message key="page.key79"/></th>
						</tr>
					</table>
				</div>
			</div>
			<div id="defaultReplydiv">
				<div class="create">
					<div class="createDefaultReplyBtn">创建自动回复</div>
				</div>
				<div class="attentionResp">
					<table id="default_reply_table" style="width:100%;">
						<tr id="default_table_th">
							<th style="width:10%;">名称</th>
							<th style="width:70%;"><fmt:message key="page.key72"/></th>
							<th style="width:10%;"><fmt:message key="page.key78"/></th>
							<th style="width:10%;"><fmt:message key="page.key79"/></th>

						</tr>
					</table>
				</div>
			</div>
		</div>
		
		
		
		<div class="ruleMak">
			<div class="ruleMaskCnt">
				<div class="ruleMask_t">
    <div style="display:inline-block;"><img src="static/v1/images/xiaoLogo.png" /></div>
    <fmt:message key="page.key66"/> -> <span></span>
					<div class="ruleMask_close" id="autoreply_close">×</div>
				</div>
				<div class="ruleMask_disp">
					<div class="createDispAll">
						<div class="createDispL fl">规则名字：</div>
						<div class="createDispR fl">
							<input id="reply_id" type="hidden"></input>
							<input type="text" class='ruleNm' placeholder='规则名称' id="reply_name"/>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl">接收关键词：</div>
						<div class="createDispR fl">
							<input type="text" class='inputKey' placeholder='输入关键词，回车添加'/>
						</div>
						<div class="getKey" id="reply_keys">
							
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl">选择规则类型：</div>
						<div class="createDispR fl">
							<select name="match" id="reply_match" class='selectScrope'>
								<option value="equals">完全匹配</option>
								<option value="like">模糊匹配</option>
							</select>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key73"/>：</div>
						<div class="createDispR fl">
							<div class="typeState respCnt fl">设置回复内容</div>
						</div>
					</div>
					<div id="replyContent">
					</div>
                    <div >
    <button id="reply_save">确定</button>
    </div>

				</div>
				<div class="respWin lWin">
					<div class="respWin_t">选择回复内容
						<div class="ruleMask_close"><i class="icon-remove"></i></div>
					</div>
					<div class="respWin_cnt">
						<div class="respWin_cntL fl">
							<ul>
								<li class="active">文字</li>
								<li id="reply_newsChoose">图文消息</li>
							</ul>
						</div>
						<div class="respWin_cntR fl">
							<textarea style="width: 100%;height: 100%;" id="reply_textContent" placeholder='输入文字回复内容'></textarea>
						</div>
					</div>
					<button style='margin-left:300px' id=reply_sure>确定</button>
				</div>
			</div>
		</div>
		
		
		
		<div class="responMask">
			<div class="responMaskCnt">
				<div class="ruleMask_t addAttention">
                     <div style="display:inline-block;">
                        <img src="static/v1/images/xiaoLogo.png" />
                     </div>
                    <fmt:message key="page.key74"/>
					<div class="ruleMask_close"><i style="font-style:normal;">×</i></div>
				</div>
				<div class="ruleMask_disp">
					<div class="createDispAll">
						<div class="createDispL fl">规则名字：</div>
						<div class="createDispR fl">
							<input id="subreply_id" type="hidden"></input>
							<input type="text" class='ruleNm' placeholder='规则名称' id="subreply_name"/>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key72"/>：</div>
						<div class="createDispR fl">
							<div class="typeState attenRespCnt fl">设置回复内容</div>
						</div>
					</div>
					<div id="subReplyContent">
					</div>
					<button class='allBtn' id="subReply_save">确定</button>
				</div>
				<div class="respWin pWin">
					<div class="respWin_t">设置回复内容
						<div class="ruleMask_close"><i class="icon-remove"></i></div>
					</div>
					<div class="respWin_cnt">
						<div class="respWin_cntL fl">
							<ul>
								<li class="active">文字</li>
								<li id="subReply_newsChoose">图文消息</li>
							</ul>
						</div>
						<div class="respWin_cntR fl">
							<textarea style="width: 100%;height: 100%;" id="subreply_textContent" placeholder='输入文字回复内容'></textarea>
						</div>
					</div>
					<button id=subreply_sure>确定</button>
				</div>
			</div>
		</div>
		
		
		<div class="defaultReplyMask">
			<div class="defaultReplyMaskCnt">
				<div class="defaultReplyMask_t">
        <div style="display:inline-block;">
        <img src="static/v1/images/xiaoLogo.png"/>
    </div>
    <fmt:message key="page.key66"/> -> <span></span>
					<div class="defaultReplyMask_close" id="defaultReplyMask_close" >×</div>
				</div>
				<div class="ruleMask_disp">
					<div class="createDispAll">
						<div class="createDispL fl">规则名字：</div>
						<div class="createDispR fl">
							<input id="defaultReply_id" type="hidden"></input>
							<input type="text" class='ruleNm' placeholder='规则名称' id="defaultReply_name"/>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl">开关：</div>
						<div class="createDispR fl">
							<select name="defaultReply_isOpen" id="defaultReply_isOpen" class='selectScrope'>
								<option value="true">开</option>
								<option value="false">关</option>
							</select>
						</div>
					</div>
					<div class="createDispAll">
						<div class="createDispL fl"><fmt:message key="page.key73"/>：</div>
						<div class="createDispR fl">
							<div class="typeState respCnt fl dCnt">设置回复内容</div>
						</div>
					</div>
					<div id="defaultReplyContent">
					</div>
					<button class='allBtn' id="defaultReply_save">确定</button>
				</div>
				<div class="respWin dWin">
					<div class="respWin_t">选择回复内容
						<div class="ruleMask_close"><i class="icon-remove"></i></div>
					</div>
					<div class="respWin_cnt">
						<div class="respWin_cntL fl">
							<ul>
								<li class="active">文字</li>
								<li id="defaultReply_newsChoose">图文消息</li>
							</ul>
						</div>
						<div class="respWin_cntR fl">
							<textarea style="width: 100%;height: 100%;" id="defaultReply_textContent" placeholder='输入文字回复内容'></textarea>
						</div>
					</div>
					<button style='margin-left:300px' id=defaultReply_sure>确定</button>
				</div>
			</div>
		</div>
		
		
		
		<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
		<%@ include file="/WEB-INF/views/v1/include/JqueryUI.inc" %>
		<script src="static/v1/scripts/util/checkNews.js"></script>
		<script src="static/v1/scripts/keyWords.js"></script>
		
</body>
</html>