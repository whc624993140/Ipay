$(function() {
	settingActionList(actionList);
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
	news_contentmodule.loadData();
	news_picturelist.page();
});
var dropzone;
var actionList = {
	'new_picture':function(){
		$("#newPicture").find("input").val("");
		$("#pic").html("");
		dropzone.removeAllFiles(true);
	},
	'save-picture':function(){
		try{
			var oid=$("#oid").val();
			var title=$("#title").val();
			if(title==""){
				throw "请输入标题";
			}
			if(title.length>100){
				throw "标题不得超过100个字符";
			}
			var textMatch=/^[\u4E00-\u9FA5a-zA-Z0-9_]{0,}$/;
			if(title.indexOf("<br>")<0&&title.indexOf("</br>")<0){
				if(!title.match(textMatch)){
					throw "只允许汉字、英文字母、数字、下划线或换行符&lt;br&gt;";
				}
			}
			var picurl=$("#picurl").val();
			var moduleOID=$("#newPicture").find(".moduleList").val();
			var param={OID:oid,title:title,picurl:picurl,version:$("#version").val(),moduleOID:moduleOID};
			news_picturelist.save(param);
		}catch(e){
			dialogAlertShow("",e);
		}
	},'del_tr':function(){
		var oid=$(this).parent().parent().data("id");
		var did = dialogConfirmShow("提示", "是否继续？", function() {
			news_picturelist.del(oid);
		});
	},'edit_tr':function(){
		var oid=$(this).parent().parent().data("id");
		$("#newPicture").find("input").val("");
		dropzone.removeAllFiles(true);
		news_picturelist.get(oid,function(data){
			$("#oid").val(data.oid);
			$("#newPicture").find(".moduleList").val(data.moduleOID);
			$("#title").val(data.title);
			$("#version").val(data.version);
			$("#pic").html("<img src='" + data.picurl + "' />");
			$("#picurl").val(data.picurl);
		});
	},'sub_search':function(){
		var moduleOID=$("#module_list").val();
		if(moduleOID!="0"){
			news_picturelist.condition={moduleOID:moduleOID};
		}else{
			delete news_picturelist.condition.moduleOID;
		}
		news_picturelist.page();
	}
}
var news_contentmodule={
	condition : {openType:"pic_list"},
	loadData:function(){
		$.ajax({
			url : 'newsmanager/admin/contentmodule/find.json',
			data : news_contentmodule.condition,
			cache : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (!data.success) {
					dialogAlertShow("",data.errmsg);
					return;
				}
				news_contentmodule.load(data.data);
			},
			dataType : 'json'
		});
	},load:function(data){
		$(data).each(function(index){
			var node=data[index];
			$(".moduleList").append("<option value='"+node.oid+"'>"+node.name+"</option>");
		});
	}
}
var news_picturelist = {
	condition : {},
	page : function() {
		$.ajax({
			url : 'newsmanager/admin/picturelist/page.json',
			data : news_picturelist.condition,
			cache : false,
			traditional : true,
			type : 'get',
			success : function(data, status, xhr) {
				if (!data.success) {
					dialogAlertShow("",data.errmsg);
					return;
				}
				news_picturelist.clear();
				news_picturelist.loadPage(data.data);
			},
			dataType : 'json'
		});
	},
	loadPage : function(ps) {
		$(ps.items).each(function(index) {
			var node = ps.items[index];
			news_picturelist.addNode(node);
		});
		$("#news_picturelist_page").createPage({
			pageCount : ps.pageCount,
			current : ps.currentPage,
			backFn : function(p) {
				news_picturelist.condition.pageNum = p;
				news_picturelist.clear();
				news_picturelist.page();
			}
		});
	},
	addNode : function(node) {
		var str = "<tr data-id='{98}'>"
				+ "<td>{1}</td>"
				+ "<td>{2}</td>"
				+ "<td>{3}</td>"
				+ "<td>{9}</td>" 
				+ "</tr>";
		str = str.replace("{98}", node.pictureOID);
		str = str.replace("{1}", node.title);
		str = str.replace("{2}", node.picurl);
		str = str.replace("{3}", node.moduleName);
		var linkstr = "<a  data-click='edit_tr' data-target='#newPicture' data-toggle='modal' >编辑</a> "
				+ "| <a data-click='del_tr' class='del_tr'>删除</a>";
		str = str.replace("{9}", linkstr);
		$("[tableid=news_picturelist_table] > tbody").append(str);
	},
	del : function(oid) {
		$.ajax({
			url : 'newsmanager/admin/picturelist/' + oid
					+ '/delete.json',
			type : 'post',
			success : function(data, status, xhr) {
				if (!data.success) {
					dialogAlertShow("","删除失败：" + data.errmsg);
					return;
				}
				dialogAlertShow("","删除成功");
				news_picturelist.page();
			},
			dataType : 'json'
		});
	},
	clear : function() {
		$("[tableid=news_picturelist_table] > tbody").empty();
	},
	save:function(param){
		$.ajax({
			url : 'newsmanager/admin/picturelist/save.json',
			type : 'post',
			cache : false,
			traditional : true,
			data:param,
			success : function(data, status, xhr) {
				if (!data.success) {
					dialogAlertShow("","保存失败：" + data.errmsg);
					return;
				}
				dialogAlertShow("","保存成功");
				$("#newPicture").modal("hide");
				news_picturelist.page();
			},
			dataType : 'json'
		});
	},get:function(oid,callback){
		var url="newsmanager/admin/picturelist/"+oid+"/get.json";
		$.post(url, null, function(json) {
			if (!json.success) {
				dialogAlertShow("",json.errmsg);
				return;
			}
			callback(json.data);
		}, "json");
	}
}
