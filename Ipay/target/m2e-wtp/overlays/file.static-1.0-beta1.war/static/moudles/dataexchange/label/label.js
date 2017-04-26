$(function() {
	// 关闭弹出框
	$('.labelMask_close i').click(function() {
		$('.labelMask').hide();
	});

	// 点击确定按钮
	$('.labelBtn').click(function() {
		var id = $("#id").val();
		var name = $("#name").val();
		var key = $("#key").val();
		var level = $("#level").val();
		var parentid = $("#parentid").val();
		var params = {
			id : id,
			name : name,
			key : key,
			level : level,
			parentid : parentid,
			parentId : parentid
		};
		if (id == '') {
			label.add(params);
		} else {
			label.update(params);
		}
		$('.labelCntDisp input').val('');
		$('.labelMask').hide();
	});
	// 点击标签
	$(document).on('click','.label-content > ul > li', function() {
		var _pId = $(this).parent().parent().attr('id');
		var _lName = $(this).text();
		switch (_pId) {
		case 'labelFirst':
			$('.modeltwo').show();
			$('.modeltwo').find('.label-title span').text(_lName);
			$("#parentid_2").val($(this).attr('id'));
			$('.modelthree').hide();
			break;
		case 'labelSecond':
			$('.modelthree').show();
			$('.modelthree').find('.label-title span').text(_lName);
			$("#parentid_3").val($(this).attr('id'));
			break;
		case 'labelThird':
			break;
		}
		label.load($(this).attr('id'));
	});

	// 增加菜单
	$('.addlabels').click(function() {
		var _parent = $(this).parent();
		$('.labelCntDisp input').val('');
		if (_parent.attr('id') == 'labelFirst') {
			$('.labelMask_t span').text('增加一级标签');
			$('#level').val('1');
			$('#parentid').val($("#parentid_1").val());
		} else if (_parent.attr('id') == 'labelSecond') {
			$('.labelMask_t span').text('增加二级标签');
			$('#level').val('2');
			$('#parentid').val($("#parentid_2").val());
		} else if (_parent.attr('id') == 'labelThird') {
			$('.labelMask_t span').text('增加三级标签');
			$('#level').val('3');
			$('#parentid').val($("#parentid_3").val());
		}
		$('.labelMask').show();
	});

	// 点击编辑
	$(document).on('click', '.label_ed',function(e) {
		e.stopPropagation();
		var data = eval("(" + $(this).parent().parent().attr("data") + ")");
		$("#id").val(data.id);
		$("#level").val(data.level);
		$("#parentid").val($("#parentid_" + data.level).val());
		$("#name").val(data.name);
		$("#key").val(data.key);

		$('.labelMask_t span').text('编辑标签#' + data.name);
		$('.labelMask').show();
	});

	// 点击删除
	$(document).on('click','.label_det', function(e) {
		e.stopPropagation();
		if (confirm("确认要删除？")) {
			var id = $(this).parent().parent().attr("id");
			label.del(id);
		}
	});
	
	$(".action_push").click(function(){
		var initUrl = "base/admin/label/push.json";
		$.post(initUrl, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			alert(JSON.stringify(json.data));
			// alert(JSON.stringify(user.page));
		}, "json");
	});

	label.init();

});

var label = {
	labels : null,
	init : function() {
		var initUrl = "base/admin/label/tree.json";
		$.get(initUrl, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			label.labels = json.data;
			$("#parentid_1").val(label.labels.id);
			label.load(label.labels.id);
		}, "json");
	},
	load : function(nodeid) {
		// alert(JSON.stringify(label.labels));
		var parentNode = label.findNode(label.labels, nodeid);
		label.clear(parentNode.level + 1);
		if (parentNode == null || typeof (parentNode) == "undefined") {
			return;
		}
		$(parentNode.children).each(function(index) {
			var node = parentNode.children[index];
			label.addNode(node);
		});
	},
	del : function(id) {
		var delUrl = "base/admin/label/delete.json";
		$.post(delUrl, {
			id : id
		}, function(json) {
			if (json.success) {
				$("#" + id).remove();
			} else {
				alert(json.errmsg);
			}
		}, "json");
	},
	add : function(node) {
		var saveUrl = "base/admin/label/save.json";
		$.post(
			saveUrl,
			node,
			function(json) {
				if (json.success) {
					label.addNode(json.data);
					node = json.data;
					if (typeof ($("#parentid_" + node.level).val()) == "undefined") {
						return;
					}
					var _node = label.findNode(label.labels, $(
							"#parentid_" + node.level).val());
					if (typeof (_node.children) == "undefined") {
						_node.children = new Array(node);
					} else {
						_node.children.push(node);
					}
				} else {
					alert(json.errmsg);
				}
			}, "json");
	},
	update : function(node) {
		var saveUrl = "base/admin/label/update.json";
		$.post(saveUrl, node, function(json) {
			if (json.success) {
				label.updateNode(json.data);
				var _node = label.findNode(label.labels, node.id);
				_node.name = node.name;
				_node.key = node.key;
			} else {
				alert(json.errmsg);
			}
		}, "json");

	},
	addNode : function(node) {
		var str = '<li id="{0}" data=\'{1}\'><span>{2}</span><div class="label_operate"><div class="label_ed"><i class="icon-edit"></i></div><div class="label_det"><i class="icon-remove"></i></div></div></li>';
		str = str.replace("{0}", node.id);
		str = str.replace("{1}", JSON.stringify(node));
		str = str.replace("{2}", node.name);
		$("#label" + node.level).append(str);
	},
	updateNode : function(node) {
		$("#" + node.id).attr("data", JSON.stringify(node));
		$("#" + node.id + " span").text(node.name);

	},
	findNode : function(tree, nodeid) {
		if (tree.id == nodeid) {
			return tree;
		}
		if (typeof (tree.children) == "undefined") {
			return null;
		}
		for (var int = 0; int < tree.children.length; int++) {
			var node = tree.children[int];
			var leaf = label.findNode(node, nodeid);
			if (leaf != null) {
				return leaf;
			}
		}
	},
	clear : function(level) {
		$("#label" + level).html("");
	}

}