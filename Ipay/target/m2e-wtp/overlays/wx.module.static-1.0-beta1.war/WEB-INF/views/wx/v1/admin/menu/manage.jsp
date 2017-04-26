<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc" %>
	<title><fmt:message key="page.key264"/></title>
    <style type="text/css">
    .btn{
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
    background-color: #002b5c;
    color: #fff;
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
		<div class="pageTitle fl"><fmt:message key="page.key69"/>
			
		</div>
		<div class="menuEdit  fl">
			<div class="menuDisp">
				<label for=""><fmt:message key="page.key378"/></label>
			</div>
			<div class="menuManage">
				<div class="mma fl">
					<div class="mma-title"><fmt:message key="page.key70"/>
						<div class="mm-icon">
							<i class="icon-plus fl"></i>
							<i class="icon-reorder fl"></i>
						</div>
					</div>
					<ul class='ul-mm'>
						
					</ul>
				</div>
				<div class="mmaction fl">
					<div class="action-title"><fmt:message key="page.key71"/></div>
					<div class="action-cnt">
						<p><fmt:message key="page.key379"/></p>
						<div class="action-img">
							<ul>
								<li>
									<div class="aci action-t"><i class="icon-text-width"></i></div>
									<span><fmt:message key="page.key185"/></span>
								</li>
								<li>
									<div class="aci action-i"><i class="icon-picture"></i></div>
									<span><fmt:message key="page.key187"/></span>
								</li>
								<li>
									<div class="aci action-l"><i class="icon-link"></i></div>
									<span><fmt:message key="page.key76"/></span>
								</li>
<!-- 								<li> -->
<!-- 									<div class="aci action-c"><i class="icon-print"></i></div> -->
<!-- 									<span>卡券</span> -->
<!-- 								</li> -->
							</ul>
						</div>
					</div>
					<div class="actDisp">
						<div class="actDispArea">
							<div class="actDispArea_t">
								<div class="actDtic"></div>
							</div>
							<div class="act_textArea">
								<textarea placeholder="<fmt:message key="page.key98"/><fmt:message key="page.key185"/>" id="return_text"></textarea>
							</div>
							<div class="act_inputArea">
								<input type="text" placeholder="http://"  id="return_url"/>
							</div>
							<button class="actDispYes"><fmt:message key="page.key341"/></button>
							<button class="actDispNo"><fmt:message key="page.key321"/></button>
						</div>
					</div>
				</div>
			</div>
			<div class="actionBtn">
<!-- 				<button class="acs action_sava"><fmt:message key="page.key331"/></button> -->
				<button class="acs action_release"><fmt:message key="page.key72"/></button>
				<button class="acs action_preview"><fmt:message key="page.key73"/></button>
			</div>
		</div>
		<div class="preview fr">
			<div class="preview_keyboard"><i class="icon-keyboard"></i><span></span></div>
			<div class="preview_bar">
				<ul>
					
				</ul>
			</div>
		</div>
<div class="modalWin">
	<div class="menuPop">
		<div class="menuPopTitle">
    <div style="display:inline-block;"><img src="static/v1/images/xiaoLogo.png"/></div>
            <span style="margin-left:10px;"></span>
			<div class="menuPopClose"><i>×</i></div>
		</div>
		<div class="st1">
		<p><fmt:message key="page.key78"/></p>
		<input type="text"  name="name" id="name" style="    margin: 0 15px;
    border: 1px solid #ccc;
    line-height: 30px;
    border-radius: 3px;"/>
		<p><fmt:message key="page.key79"/></p>
		<select type="text"  id="key" name="key" class="key_select">
			<option value="menu-1">menu-1</option>
			<option value="menu-11">menu-11</option>
			<option value="menu-12">menu-12</option>
			<option value="menu-13">menu-13</option>
			<option value="menu-14">menu-14</option>
			<option value="menu-15">menu-15</option>
			<option value="menu-2">menu-2</option>
			<option value="menu-21">menu-21</option>
			<option value="menu-22">menu-22</option>
			<option value="menu-23">menu-23</option>
			<option value="menu-24">menu-24</option>
			<option value="menu-25">menu-25</option>
			<option value="menu-3">menu-3</option>
			<option value="menu-31">menu-31</option>
			<option value="menu-32">menu-32</option>
			<option value="menu-33">menu-33</option>
			<option value="menu-34">menu-34</option>
			<option value="menu-35">menu-35</option>
		</select>
		<p><fmt:message key="page.key80"/></p>
		<input type="text" id="sort" name="sort"  style="    margin: 0 15px;
    border: 1px solid #ccc;
    line-height: 30px;
    border-radius: 3px;"/>
		<input type="hidden" name="parentid" id="parentid"/>
		<input type="hidden" id="id" name="id"/>
		<input type="hidden" id="level" name="level"/>
		</div>
		<div class="st2">
		<div class="infobox"></div>
		</div>
		<div class="errorTip"><i class="icon-warning-sign"></i><span></span></div>
		<div class="tipBtn">
			<button class="btn_save"><fmt:message key="page.key331"/></button>
		</div>
	</div>
</div>

<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>
<%@ include file="/WEB-INF/views/wx/v1/include/JqueryUI.inc" %>
<script src="static/wx/module/scripts/util/checkNews.js"></script>
<script src="static/wx/module/scripts/menu.js"></script>
<script src="static/wx/module/scripts/util/ValidForm.js"></script>

</body>
</html>
