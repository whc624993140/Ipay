<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/WEB-INF/views/v1/include/JSP.inc"%>
<%@ include file="/WEB-INF/views/v1/include/CSS.inc"%>
<title>用户权限管理</title>
</head>
<body>
	<!-- <div class="pageTitle fl">用户权限管理</div>
	<div class="dateTime fr">
		<div class="nowdate fl">
			<div class="nowdate_m1"></div>
			<div class="nowdate_m2"></div>
			<div class="nowdate_m3"></div>
		</div>
		<div class="nowtime fl"></div>
	</div> -->
	<div class="rule" id="userView">
		<div class="create">
			<div id="addRole" class="createRespBtn">+添加角色信息</div>
		</div>
		<div class="attentionResp">
			<table style="width:100%">
				<tr>
					<th style="width:33.33%;">ID</th>
					<th style="width:33.33%;">名称</th>
					<th  style="width:33.33%;">操作</th>
				</tr>
				<c:forEach items="${ps.items }" var="role">
					<tr id="dataTr">
						<td>${role.name }</td>
						<td>${role.nameCN }</td>
						<td><span class='respEdit'
							onclick="editRole('${role.name }')">修改</span>
							 | <span class='respDelete' onclick="delRole('${role.name }')">删除</span></td>
					</tr>
				</c:forEach>
			</table>
			<c:set value="wx/admin/authrole/index.html" var="url" />
			<div class="paging fl">
				<c:if test="${ps.currentPage>1}">
					<a href="${url }?pageNo=1">首页</a>
					<a href="${url }?pageNo=${ps.currentPage-1 }">上一页</a>
				</c:if>
				<c:if test="${ps.currentPage<ps.pageCount}">
					<a href="${url }?pageNo=${ps.currentPage+1 }">下一页</a>
					<a href="${url }?pageNo=${ps.pageCount }">末页</a>
				</c:if>
				${ps.currentPage}/${ps.pageCount }
			</div>
		</div>
	</div>
	<div class="labelMask" id="roleEditDiv">
		<div class="labelMaskCnt">
			<form id="userForm">
				<div class="labelMask_t">
                    <div style="display:inline-block;">
                         <img src="static/v1/images/xiaoLogo.png"/>
                    </div>

					<span id="addTitle" style="color:#000;">角色信息</span>
					<div class="labelMask_close" id="closeUserEdit">
						<i>×</i>
					</div>
				</div>
				<div class="labelCntDisp">
					<table>
						<tr>
							<td>Key:</td>
							<td><input type="text" name="name" id="name"></input></td>
						</tr>
						<tr>
							<td>名称:</td>
							<td><input type="text" name="nameCN" id="nameCN"></input></td>
						</tr>
					</table>
				</div>
			</form>
			<button class='allBtn labelBtn' id="roleUpdateBtn"
				style="margin-top:50px; margin-left: 210px;">确定</button>
		</div>
	</div>
	<%@ include file="/WEB-INF/views/v1/include/Javascript.inc"%>
	<script src="static/v1/scripts/authrole.js"></script>
</body>
</html>