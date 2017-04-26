var speed = 'fast';// 速度
var $addUserTitle = $('#addTitle');
var $editDiv = $('#roleEditDiv');
$(function() {
	// "+wx_lang.page_key462+"信息
	$('#addRole').click(function() {
		$addUserTitle.text("添加角色信息");
		$('#addRole').removeAttr("readonly"); // 去除readonly属性
		$editDiv.show(speed);
		cleanUserPanel();
	});
	$('#closeUserEdit').click(function() {
		$editDiv.hide(speed);
	});
	$('#roleUpdateBtn').click(function() {
		if (verificationUserForm() == false) {
			return;
		}
		submitData();// 提交数据
	});
});
function submitData() {
	var name = $('#name').val();
	var nameCN = $('#nameCN').val();
	var data = {
		'name' : name,
		'nameCN' : nameCN
	};
	var url = "wx/admin/authrole/saverole.json";
	$.ajax({
		type : "POST",
		url : url,
		data : data,
		datatype : "json",
		success : function(res) {
			if (res.success) {
				$editDiv.hide(speed);
				window.location.reload();
			} 
		},
		// 调用出错执行的函数
		error : function(res) {
			alert(res.errmsg);
		}
	});
}

function verificationUserForm() {
	return true;
}

function editRole(id) {
	var url = "wx/admin/authrole/getRole.json";
	var data = {
		name : id
	};
	$.post(url, data, function(json) {
		if (!json.success) {
			alert(json.errmsg);
			return;
		}
		setRoleValue(json.data);
		$editDiv.show(speed);
	}, "json");
}
function setRoleValue(data) {
	$addUserTitle.text("修改角色信息");
	$('#nameCN').val(data.nameCN);
	$('#name').val(data.name);
}
function cleanUserPanel() {
	$('#nameCN').val('');
	$('#name').val('');
}

