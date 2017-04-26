var speed = 'fast';// 速度
var $addUserTitle = $('#addUserTitle');
var $userEditDiv = $('#userEditDiv');
var $userPwdEditDiv = $('#userPwdEditDiv');
var $account = $('#account');
var $userroleDiv = $('#userAndRoleDiv');
$(function() {
	$('#addUser').click(function() {
		$addUserTitle.text(wx_lang.page_key462+" "+wx_lang.page_key234);
		$account.removeAttr("readonly"); // 去除readonly属性
		$userEditDiv.show(speed);
		$('#opter').val("add");
		cleanUserPanel();
	});
	$('#closeUserEdit').click(function() {
		$userEditDiv.hide(speed);
	});

	$('#closeUserPwdEdit').click(function() {
		$userPwdEditDiv.hide(speed);
	});
	$('#closeUserRoleEdit').click(function() {
		$userroleDiv.hide(speed);
	});
	$('#userUpdateBtn').click(function() {
		if (verificationUserForm() == false) {
			return;
		}
		submitUserData();// 提交数据
	});
	$('#userPwdUpdateBtn').click(function() {
		var $errmsg = $('#userPwdErrmsg');
		var oldpwd = $('#oldpwd').val();
		if (oldpwd == '' || oldpwd == null || oldpwd == undefined) {
			$errmsg.html('旧密码不能为空！');
			return false;
		}
		var newpwd1 = $('#newpwd1').val();
		if (newpwd1 == '' || newpwd1 == null || newpwd1 == undefined) {
			$errmsg.html('新密码不能为空！');
			return false;
		}
		var newpwd2 = $('#newpwd2').val();
		if (newpwd2 == '' || newpwd2 == null || newpwd2 == undefined) {
			$errmsg.html(wx_lang.page_key337+'密码不能为空！');
			return false;
		}
		if(newpwd1!=newpwd2){
			$errmsg.html('密码输入不一致！');
			return false;
		}
		$errmsg.html('');
		submitUserPwdData(oldpwd,newpwd1,newpwd2);// 密码框提交数据
	});
	$('#userroleUpdateBtn').click(function() {
		saveUserRole();
	});
});
function submitUserData() {
	var data = $("#userForm").serializeArray();
	var str = $("#userForm").serialize();
	var json = strToObj(data, str);
	var url = "wx/admin/authuser/saveUser.json";
	$.ajax({
		type : "POST",
		url : url,
		data : json,
		datatype : "json",
		beforeSend : function() {

		},
		success : function(res) {
			if (!res.success) {
				alert(res.errmsg);
				return;
			}
			$userEditDiv.hide(speed);
			window.location.reload();
		},
		// 调用出错执行的函数
		error : function(res) {
			alert(res.errmsg);
		}
	});
}

function submitUserPwdData(oldpwd,newpwd1,newpwd2) {
	var json={};
	json.oid=$('#useroid').val();
	json.oldpwd=oldpwd;
	json.newpwd1=newpwd1;
	json.newpwd2=newpwd2;
	var url = "wx/admin/authuser/updatePwd";
	$.ajax({
		type : "POST",
		url : url,
		data : json,
		datatype : "json",
		beforeSend : function() {

		},
		success : function(res) {
			if (!res.success) {
				alert(res.errmsg);
				return;
			}
			$userPwdEditDiv.hide(speed);
			window.location.reload();
		},
		// 调用出错执行的函数
		error : function(res) {
			alert(res.errmsg);
		}
	});
}
/**
 * 获取JSON
 * 
 * @param array
 * @param str
 * @returns {___anonymous1097_1098}
 */
function strToObj(array, str) {
	var serializeObj = {};
	$(array).each(
			function() {
				if (serializeObj[this.name]) {
					if ($.isArray(serializeObj[this.name])) {
						serializeObj[this.name].push(this.value);
					} else {
						serializeObj[this.name] = [ serializeObj[this.name],
								this.value ];
					}
				} else {
					serializeObj[this.name] = this.value;
				}
			});
	return serializeObj;
}

function verificationUserForm() {
	var accValue = $account.val();
	var $err = $('#userErrmsg');
	var errmes = '';
	if (accValue == '' || accValue == null || accValue == undefined) {
		$err.html('用户名不能为空！');
		return false;
	}
	var nameval = $('#name').val();
	if (nameval == '' || nameval == null || nameval == undefined) {
		$err.html('姓名不能为空！');
		return false;
	}
	var emailVal = $('#email').val();
	// 对电子邮件的验证
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if (emailVal != '' && !reg.test(emailVal)) {
		$err.html('请输入正确邮箱地址！');
		return false;
	}
	$err.html('');
	return true;
}

function editUser(id) {
	$('#opter').val('');
	$('#userErrmsg').html('');
	$.ajax({
		type : "POST",
		url : "wx/admin/authuser/getUser.json",
		data : {
			oid : id
		},
		datatype : "json",
		beforeSend : function() {
			$userEditDiv.show(speed);
		},
		success : function(data) {
			setUserValue(data);
		},
		// 调用执行后调用的函数
		complete : function(XMLHttpRequest, textStatus) {
		},
		// 调用出错执行的函数
		error : function() {
			alert('请求数据错误');
		}
	});
}

function editUserPwd(id) {
	$('#userErrmsg').html('');
	$('#useroid').val(id);
	$userPwdEditDiv.show(speed);
}
function setUserValue(data) {
	$addUserTitle.text(wx_lang.page_key480+wx_lang.page_key234+"--" + data.name);
	$('#OID').val(data.oID);
	// $account.attr("disabled", "disabled");// 设为不可用
	$account.attr({
		"readonly" : true
	});
	$account.val(data.account);
	$('#name').val(data.name);
	$('#sex').val(data.sex);
	$('#phone').val(data.phone);
	$('#qq').val(data.qq);
	$('#email').val(data.email);
	$('#adress').val(data.adress);
	$('#remark').val(data.remark);
}
function cleanUserPanel() {
	$('#OID').val('');
	$account.val('');
	$('#name').val('');
	$('#sex').val('');
	$('#phone').val('');
	$('#qq').val('');
	$('#email').val('');
	$('#adress').val('');
	$('#remark').val('');
}
function editUserRole(userid) {
	$('#userroleOid').val(userid);
	var url = "wx/admin/authuser/getUserRole.json";
	var data = {
		"oid" : userid
	};
	$.post(url, data, function(json) {
		if (!json.success) {
			alert(json.errmsg);
			return;
		}
		loadUserRole(json.role, json.userrole);
		$userroleDiv.show(speed);
	}, "json");
}
function loadUserRole(roles, userRoles) {
	var userRoleArray = [];
	for (var i = 0; i < userRoles.length; i++) {
		var roleAndUser = userRoles[i];
		userRoleArray.push(roleAndUser.roleName);
	}

	cleanRoleUserTr();
	addtr(roles.length);
	for (var i = 0; i < roles.length; i++) {
		var node = roles[i];
		var isInArr = $.inArray(node.name, userRoleArray) >= 0;
		addRole(node, i, isInArr);
	}
}
var rowCount = 3;
function addtr(size) {
	var str = "";
	var count = size / rowCount;
	if (size % rowCount > 0)
		count++;
	for (var i = 0; i < count; i++) {
		str = str + '<tr id="tr_' + i + '"></tr>';
	}
	$("#userroleTab").append(str);
}
function addRole(node, i, isCheck) {
	var str = '<td><input type="checkbox" {0} value="{1}" name="roles"></input>{2}</td>';
	var checkStr = '';
	if (isCheck) {
		checkStr = 'checked="checked"';
	}
	str = str.replace("{0}", checkStr);
	str = str.replace("{1}", node.name);
	str = str.replace("{2}", node.nameCN);
	var trindex = parseInt(i / rowCount);
	var trid = '#tr_' + trindex;
	$(trid).append(str);
}
function cleanRoleUserTr() {
	$("#userroleTab").html('');
}
function saveUserRole() {
	var oid = $('#userroleOid').val();
	var json = {
		'userOID' : [ oid ],
		'roleName' : []
	};
	var roles = [];// 定义一个数组
	$('input[name="roles"]:checked').each(function() {
		json.roleName.push($(this).val());
		json.userOID.push(oid);
	});
	var url = "wx/admin/authuser/saveUserAndRole.json";
	$.post(url, json, function(res) {
		if (!res.success) {
			alert(json.errmsg);
			return;
		}
		$userroleDiv.hide(speed);
	}, "json");
}
