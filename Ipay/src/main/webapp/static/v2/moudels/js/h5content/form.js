$(function() {
	settingActionList(actionList);
	// 文件上传
	//编辑图片时的删除
	$(".dropzone").on("click",".dz-remove",function(){
		var removeitem=$(this).closest(".dz-image-preview").find("img").attr("src");
		var index=$.inArray(removeitem, picContentArr);
		if(index>=0){
			picContentArr.splice(index, 1);
		}
		$(this).closest(".dz-image-preview").remove();	
	});
	initDropZone();
	if(h5ContentOID!=""){
		h5content.loadData();
	}
});
var h5ContentOID=$("#h5ContentOID").val();
//存放图片资料
var picContentArr=[];
var actionList = {
	'file_add':function(){
		materials_file.add();
	},'materials_file_del':function(){
		materials_file.del(this);
	},'h5content_save':function(){
		try{
			var datas=getParam();
			h5content.save(datas);
		}catch(e){
			dialogAlertShow("",e);
		}
	}
}
var h5content={
	loadData:function(){
		$.ajax({
			url : 'templatemanager/admin/h5content/'+h5ContentOID+'/get.json',
			type : 'get',
			async:false,
			success : function(data, status, xhr) {
				if(!data.success){
					dialogAlertShow("",data.errmsg);
					return ;
				}
				if(data.data!=null){
					h5content.load(data.data);
				}
			},
			dataType : 'json'
		});
	},
	load:function(data){
		$("#templateName").val(data.templateName);
		$("#activityName").val(data.activityName);
		$("#textContent").val(data.textContent);
		$("#version").val(data.version);
		//图片资料
		var picContent=data.picContent;
		if(picContent!=null&&picContent!=""){
			picContent=$.parseJSON(picContent);
			$.each(picContent,function(index,item){
				picContentArr.push(item);
				var imgModel=$($("#imgModel").html());
				imgModel.find(".img-model").attr("src",item);
				$(".dropzone").append(imgModel);
			});
		}
		//邮件资料
		$("#materials").val(data.fileContent);
		materials_file.resetFileShow();
		
	},
	save:function(datas){
		$.ajax({
			url : 'templatemanager/admin/h5content/save.json',
			data :datas,
			cache : false,
			traditional : true,
			type : 'post',
			success : function(data, status, xhr) {
				if(!data.success){
					dialogAlertShow("",data.errmsg);
					return ;
				}
				dialogAlertShow("",'保存成功');
			},
			dataType : 'json'
		});
	}
}
var materials_file={
		del:function(tar){
			var mfiles= materials_file.get();
			for (var int = 0; int < mfiles.length; int++) {
				if(mfiles[int].id==$(tar).parent().parent().data("mid")){
					mfiles.splice(int,1);
					break;
				}
			}
			$("#materials").val(JSON.stringify(mfiles));
			materials_file.resetFileShow();
		},add:function(){
			simpleAjaxFileUpload.upload('[key="materials_file_add"]', null, function(data) {
				var obj= materials_file.get();
				var nobj={src:data.uri,name:data.originalFilename,id:new Date().getTime()};
				obj.push(nobj);
				$("#materials").val(JSON.stringify(obj));
				materials_file.resetFileShow();
			});
		},resetFileShow:function(){
			$("#materials_table > tbody").empty();
			var mfiles= materials_file.get();
			for (var int = 0; int < mfiles.length; int++) {
				var str="<tr data-mid='{2}'><td>{0}</td><td><a href='javascript:void(0);' data-click='materials_file_del'>删除</a></td></tr>";
				str = str.replace("{0}", mfiles[int].name);
				str = str.replace("{2}", mfiles[int].id); 
				$("#materials_table > tbody").append(str);
			}
		},get:function(){
			var obj;
			var files=$("#materials").val();
			if(files!=""){
				obj = JSON.parse(files);
			}else{
				obj=new Array();
			}
			return obj;
		}
}
function getParam(){
	var param={OID:$("#h5ContentOID").val()};
	param.version=$("#version").val();
	var templateName=$("#templateName").val();
	if(templateName==""){
		throw "模板名称不能为空";
	}
	param.templateName=templateName;
	var activityName=$("#activityName").val();
	if(activityName==""){
		throw "活动名称不能为空";
	}
	param.activityName=activityName;
	//文字资料
	var textContent=$("#textContent").val();
	if(textContent==""){
		throw "文字资料不能为空";
	}
	param.textContent=textContent;
	//图片资料
	param.picContent=JSON.stringify(picContentArr);
	//邮件资料
	var files= materials_file.get();
	param.fileContent=JSON.stringify(files);
	
	return param;
}
function initDropZone(){
	Dropzone.autoDiscover = false;
	var maxImageWidth = 300, maxImageHeight = 300;
	$(".dropzone").dropzone({
		url : 'upload',
		acceptedFiles : 'image/*',
		paramName : "file",
		maxFilesize : 10,
		maxFiles : 50,
		autoProcessQueue : true,// 自动上传
		addRemoveLinks : true,
		uploadMultiple : false,
		dictDefaultMessage : '上传图片',
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
				var index=$.inArray(data.uri, picContentArr);
				if(index>=0){
					picContentArr.splice(index, 1);
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
				picContentArr.push(data.uri);
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
}
