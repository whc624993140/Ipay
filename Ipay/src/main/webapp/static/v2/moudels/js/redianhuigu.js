$(function() {
	var dropzone;
	// 文件上传
	Dropzone.autoDiscover = false;
	var maxImageWidth = 300, maxImageHeight = 300;
	$(".dropzone").dropzone({
		url : 'upload',
		acceptedFiles : 'image/*',
		paramName : "file",
		maxFilesize : 10,
		maxFiles : 1,
		autoProcessQueue : true,// 自动上传
		addRemoveLinks : true,
		uploadMultiple : false,
		dictDefaultMessage : '点击选择上传文件',
		dictRemoveFile : '删除',
		dictCancelUploadConfirmation : '文件正在上传，确认取消吗？',
		dictCancelUpload : '取消',
		dictMaxFilesExceeded : '文件超过上传数量限制，您一次最多只能上传{{maxFiles}}个文件',
		dictFileTooBig : "文件过大({{filesize}}MB). 上传文件最大支持: {{maxFilesize}}MB.",
		dictInvalidFileType : "你不能上传该类型文件",
		init : function() {
			dropzone = this;
			this.on("sending", function(file, xhr, formData) {
			});
			this.on('removedfile', function(file) {
				var data = jQuery.parseJSON(file.xhr.response);
				if (data.uri == $("#picurl").val("")) {
					$("#picurl").val("");
				}
			});
			this.on("addedfile", function(file) {
				$(".dz-filename").remove();
				$(".dz-size").remove();
				$(".dz-success-mark").remove();
				$(".dz-error-mark").remove();
			});
			this.on("success", function(file, data) {
				var str = JSON.stringify(file.xhr.response);
				var data = jQuery.parseJSON(file.xhr.response);
				$("#picurl").val(data.uri);
			});
			this.on("complete", function(file, data) {

			});
			this.on("maxfilesreached", function(file, data) {

			});
			this.on("maxfilesexceeded", function(file, data) {
				this.removeFile(file);
				// $(".dz-error").remove();
			});
		}
	});

	$("#date").datepicker({
		dateFormat : "yy/mm/dd",
		defaultDate : "+1w",
		changeMonth : true,
		changeYear : true,
		yearRange : '-100:+1',
		numberOfMonths : 1
	});

	$('#data_add').on('click', function(e) {
		$("#myModal").find("input").val("");
		$("#pic").html("");
		$("#selected_news").html("");
		dropzone.removeAllFiles(true);
	});

	$('#data_datas').on('click', '.del_tr', function(e) {
		var id = $(this).parent().parent().parent().attr("id");
		var did=dialogConfirmShow("提示","是否继续？",function(){
			redianhuigu.del(id);
		});
	});

	$('#data_datas').on('click', '.edit_tr', function(e) {
		var id = $(this).parent().parent().parent().attr("id");
		$("#myModal").find("input").val("");
		$("#selected_news").html("");
		var data = redianhuigu.find(id);
		$("#id").val(data.oid);
		$("#title").val(data.title);
		$("#subTitle").val(data.subTitle);
		$("#link").val(data.link);
		$("#showType").val(data.showType);
		$("#date").val(new Date(data.date).Format("yyyy/MM/dd"));
		$("#newsid").val(data.newsid);
		var item = newsCheck.findNode(data.newsid);
		if (item) {
			if (data.newsid.indexOf("single") == 0) {
				$("#selected_news").html(item.title);
			} else if (data.newsid.indexOf("multi") == 0) {
				$("#selected_news").html(item.news[0].title);
			}
		}
		dropzone.removeAllFiles(true);
		$("#pic").html("<img src='" + data.picurl + "' />");
		$("#picurl").val(data.picurl);
		$("#showType").change();
	});

	$("#data_save").on('click', function() {
		for (var int = 0; int < dropzone.files.length; int++) {
			var file = dropzone.files[int];
			if (file.status != "success") {
				alert("仍然有文件在上传");
				return;
			}
		}
		var datas = getForm();
		redianhuigu.save(datas);
	});

	$("#select_news").click(function() {
		newsCheck.show();
	});
	
	$("#showType").change(function(){
		if($(this).val()=='图文'){
			$("#check_news").show();
			$("#check_link").hide();
		}else{
			$("#check_news").hide();
			$("#check_link").show();
		}
	});
	$("#showType").change();
	
	redianhuigu.loadDatas();
	newsCheck.init(function(newsid) {
		$("#newsid").val(newsid);
		var item = newsCheck.findNode(newsid);
		$("#newsid").val(newsid);
		if (newsid.indexOf("single") == 0) {
			$("#selected_news").html(item.title);
		} else if (newsid.indexOf("multi") == 0) {
			$("#selected_news").html(item.news[0].title);
		}
	});
});

function getForm() {
	var id = $("#id").val();
	var title = $("#title").val();
	var subTitle = $("#subTitle").val();
	var picurl = $("#picurl").val();
	var newsid = $("#newsid").val();
	var date = $("#date").val();
	var link = $("#link").val();
	var showType = $("#showType").val();
	var params = {
		OID : id,
		title : title,
		subTitle : subTitle,
		picurl : picurl,
		newsid : newsid,
		datelang : (new Date(date)).getTime(),
		link : link,
		showType : showType
	};
	return params;
}

var redianhuigu = {
	datas : null,
	loadDatas : function() {
		$.post("maserati/redianhuigu/admin/list.json", null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			redianhuigu.datas = json.data;
			// alert(JSON.stringify(json.data));
			redianhuigu.clear();
			redianhuigu.load(redianhuigu.datas);
		}, "json");
	},
	load : function(datas) {
		if (!datas) {
			return;
		}
		$(datas).each(function(index) {
			var node = datas[index];
			redianhuigu.addNode(node);
		});
	},
	addNode : function(node) {
		if (!node) {
			return;
		}
		var str = '<tr  id=\'{9}\'>'
				+ '<td>{0}</td>'
				+ '<td>{1}</td>'
				+ '<td>{2}</td>'
				+ '<td><div>'
				// +'<a class="a_pad" href="javascript:void();">查看</a>|'
				+ '<a class="a_pad edit_tr" data-target="#myModal" data-toggle="modal" href="javascript:void(0);">编辑</a>|<a class="a_pad del_tr" href="javascript:void(0);">删除</a></div>'
				+ '</td>' + '</tr>';
		str = str.replace("{0}", node.title);
		str = str.replace("{1}", node.subTitle);
		str = str.replace("{2}", (new Date(node.createTime))
				.Format("yyyy-MM-dd hh:mm:ss"));
		str = str.replace("{9}", node.oid);
		$("#data_datas_body").append(str);
	},
	save : function(params) {
		$.post("maserati/redianhuigu/admin/save.json", params, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			alert("保存成功！");
			redianhuigu.loadDatas();
			$("#myModal").modal("hide");
		}, "json");
	},
	del : function(id) {
		var url = "maserati/redianhuigu/admin/" + id + "/delete.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			alert("删除成功！");
			redianhuigu.loadDatas();
		}, "json");
	},
	get : function(id, callback) {
		var url = "maserati/redianhuigu/admin/" + id + "/get.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			callback(json.data);
		}, "json");
	},
	find : function(id) {
		for (var int = 0; int < redianhuigu.datas.length; int++) {
			var data = redianhuigu.datas[int];
			if (data.oid == id) {
				return data;
			}
		}
	},
	clear : function() {
		$("#data_datas_body").html("");
	}
}
