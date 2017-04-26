<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc"%>
<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc"%>
<title><fmt:message key="page.key487"/>权限管理</title>
    <style type="text/css">
        .table_name1,.table_name2,.table_name3,.table_name6,.table_name7,.table_name8{width:10%}
        .table_name4,.table_name5{width:20%}
    </style>
</head>
<body style="width:100%;">
	<div class="pageTitle fl"><fmt:message key="page.key487"/>权限管理</div>
	<div class="dateTime fr">
		<div class="nowdate fl">
			<div class="nowdate_m1"></div>
			<div class="nowdate_m2"></div>
			<div class="nowdate_m3"></div>
		</div>
		<div class="nowtime fl"></div>
	</div>
	<div class="rule" id="userView">
		<div class="create">
			<div id="addUser" class="createRespBtn">+<fmt:message key="page.key462"/><fmt:message key="page.key234"/></div>
		</div>
		<div class="attentionResp">
			<table id="data_list" style="width:100%;">
				<tr>
					<th class="table_name1">登录名</th>
					<th class="table_name2">姓名</th>
					<th class="table_name3">性别</th>
					<th class="table_name4">电话</th>
					<th class="table_name5">email</th>
					<th class="table_name6"><fmt:message key="page.key330"/></th>
					<th class="table_name7">地址</th>
					<th class="table_name8"><fmt:message key="page.key284"/></th>
				</tr>
				<c:forEach items="${ps.items }" var="auth">
					<tr id="${auth.OID}">
						<td>${auth.account }</td>
						<td>${auth.name }</td>
						<td>${auth.sex }</td>
						<td>${auth.phone }</td>
						<td>${auth.email }</td>
						<td class="lable_list"></td>
						<td>${fn:substring(auth.adress, 0, 30)}<c:if
								test="${fn:length(auth.adress)>30 }">...</c:if>
						</td>
						<td><span class='respEdit' onclick="editUser('${auth.OID}')"><fmt:message key="page.key480"/></span>
							|<span class='label_add'  data-id="${auth.OID}"><fmt:message key="page.key462"/><fmt:message key="page.key330"/></span>
							| <span class='respDelete' onclick="editUserRole('${auth.OID}')">权限</span></td>
					</tr>
				</c:forEach>
			</table>
			<c:set value="wx/admin/authuser/index.html" var="url" />
			<div class="paging fl">
				<c:if test="${ps.currentPage>1}">
					<a href="${url }?pageNo=1"><fmt:message key="page.key264"/></a>
					<a href="${url }?pageNo=${ps.currentPage-1 }"><fmt:message key="page.key322"/></a>
				</c:if>
				<c:if test="${ps.currentPage<ps.pageCount}">
					<a href="${url }?pageNo=${ps.currentPage+1 }"><fmt:message key="page.key323"/></a>
					<a href="${url }?pageNo=${ps.pageCount }">末<fmt:message key="page.key325"/></a>
				</c:if>
				${ps.currentPage}/${ps.pageCount }
			</div>
		</div>
	</div>
	<div class="labelMask" id="userEditDiv">
		<div class="labelMaskCnt" style="height: 460px; width: 410px;">
			<form id="userForm">
				<div class="labelMask_t">
                    <div style="display:inline-block;">
    <img src="static/v1/images/xiaoLogo.png"/>
                    </div>
					<span id="addUserTitle" style="color:#000;"><fmt:message key="page.key234"/></span>
					<div class="labelMask_close" id="closeUserEdit">
						<i>×</i>
					</div>
				</div>
				<div class="labelCntDisp">
					<input type="hidden" name="oID" id="OID"></input>
					<input type="hidden" id="opter"></input>
					<table>
						<tr>
							<td><fmt:message key="page.key487"/>名:</td>
							<td><input type="text" name="account" id="account"></input></td>
						</tr>
						<tr>
							<td>姓名:</td>
							<td><input type="text" name="name" id="name"></input></td>
						</tr>
						<tr>
							<td>性别:</td>
							<td><input type="text" name="sex" id="sex"></input></td>
						</tr>
						<tr>
							<td>电话:</td>
							<td><input type="text" name="phone" id="phone"></input></td>
						</tr>
						<tr>
							<td>QQ:</td>
							<td><input type="text" name="qq" id="qq"></input></td>
						</tr>
						<tr>
							<td>EMAIL:</td>
							<td><input type="text" name="email" id="email"></input></td>
						</tr>
						<tr>
							<td>地址:</td>
							<td><input type="text" name="adress" id="adress"></input></td>
						</tr>
						<tr>
							<td>备注:</td>
							<td><input type="text" name="remark" id="remark"></input></td>
						</tr>
						<tr>
							<td colspan="2" align="center"><label style="color: red;"
								id="userErrmsg"></label></td>
						</tr>
					</table>
				</div>
			</form>
			<button class='allBtn labelBtn' id="userUpdateBtn"
				style="margin-top: 280px; margin-left: 160px;"><fmt:message key="page.key341"/></button>
		</div>
	</div>

	<div class="labelMask" id="userAndRoleDiv">
		<div class="labelMaskCnt" style="height: 460px; width: 410px;">
			<form id="userroleForm">
				<input type="hidden" name="oID" id="userroleOid"></input>
				<div class="labelMask_t">
        <div style="display:inline-block;">
    <img src="static/v1/images/xiaoLogo.png"/>
    </div>

					<span style="color:#000;"><fmt:message key="page.key234"/></span>
					<div class="labelMask_close" id="closeUserRoleEdit">
						<i>×</i>
					</div>
				</div>
				<div class="attentionResp">
					<table id="userroleTab">
					</table>
				</div>
			</form>
			<button class='allBtn labelBtn' id="userroleUpdateBtn"
				style="margin-top: 40px; margin-left: 160px;"><fmt:message key="page.key341"/></button>
		</div>
	</div>

	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc"%>
	<script src="static/wx/module/scripts/util/checkLabel.js"></script>
	<script src="static/wx/module/scripts/admin/userrole.js"></script>
	<script src="static/wx/module/scripts/admin/userlabel.js"></script>
</body>
</html>
