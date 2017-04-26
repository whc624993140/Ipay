$(function() {
	settingActionList(actionList);
	$("#pageImg_info_list").on("click",".dz-remove",function(){
		$(this).closest(".dz-image-preview").remove();
	});
	$("#contentmodule_list").on("click",".dz-remove",function(){
		$(this).closest(".dz-image-preview").remove();
	});
	$("#showType").change(function(){
		if($(this).val()=='链接'){
			$("#check_news").hide();
			$("#check_link").show();
		}else{
			$("#check_news").show();
			$("#check_link").hide();
		}
	});
	$("#contentmodule_list").on('click',".editContent",function(){
		$("#contentmodule_list").find(".content_list").removeClass("active");
		var obj=$(this).parents(".content_list");
		obj.addClass("active");
		$("#title").val(obj.find("input[name=title]").val());
		var showType=obj.find("input[name=showType]").val()==""?"内容":obj.find("input[name=showType]").val();
		$("#showType").val(showType);
		$("#link").val(obj.find("input[name=link]").val());
		CKEDITOR.instances.content.setData(obj.find("input[name=content]").val());
		
		$("#showType").change();
		
	});
	$("#contentmodule_list").on('click',".open_type",function(){
		$("#contentmodule_list").find(".content_list").removeClass("active");
		var obj=$(this).parents(".content_list");
		obj.addClass("active");
		var clickstr=$(this).val();
		if(clickstr=="edit_content"){
			$("#title").val(obj.find("input[name=title]").val());
			var showType=obj.find("input[name=showType]").val()==""?"edit_content":obj.find("input[name=showType]").val();
			$("#showType").val();
			$("#link").val(obj.find("input[name=link]").val());
			CKEDITOR.instances.content.setData(obj.find("input[name=content]").val());
			
			$("#showType").change();
		}
	});
		
	pagemanager.loadData();
});
var contentCount=0;
var actionList = {
	'set_pageImg':function(){
		var countPic=$(".lunxun").length;
		if(countPic>=5){
			dialogAlertShow("","最多添加5个");
			return;
		}
		var modeldata=$($("#pageImgModel").html());
		$("#pageImg_info_list").append(modeldata);
		initDropZone();
	},
	'set_contentmodule':function(){
		var modeldata=$($("#contentModel").html());
		$("#contentmodule_list").find(".content_list").removeClass("active");
		modeldata.addClass("active");
		modeldata.find(".open_type").attr("name","openType"+contentCount);
		modeldata.find(".open_type:last").attr("checked","checked");
		$("#contentmodule_list").append(modeldata);
		initContentDropZone();
		contentCount++;
	},
	'save_content':function(){
		var obj=$("#contentmodule_list").find(".active");
		obj.find("input[name=title]").val($("#title").val());
		obj.find("input[name=showType]").val($("#showType").val());
		obj.find("input[name=link]").val($("#link").val());
		var content=CKEDITOR.instances.content.getData();
		obj.find("input[name=content]").val(content);
		$("#contentInfo").modal("hide");
	},
	'remove_page_data':function(){
		$(this).parents(".lable_box").remove();
	},
//	'remove_contentmodule_data':function(){
//		$(this).parents(".content_list").find("input[name=flag]").val("1");
//		$(this).parents(".content_list").hide();
//	},
	'file_add':function(){
		materials_file.add();
	},'materials_file_del':function(){
		materials_file.del(this);
	},'pagemanager_save':function(){
		try{
			var datas=getParam();
			pagemanager.save(datas);
		}catch(e){
			dialogAlertShow("",e);
		}
	}
}
var pagemanager={
	loadData:function(){
		var param={news_page_title:""};
		param.news_page_imgs="";
		param.news_page_files="";
		$.ajax({
			url : 'newsmanager/admin/pagemanager/getData.json',
			type : 'get',
			data:param,
			success : function(data, status, xhr) {
				if(!data.success){
					dialogAlertShow("",data.errmsg);
					return ;
				}
				pagemanager.load(data.data);
			},
			dataType : 'json'
		});
	},
	load:function(data){
		$("#news_page_title").val(data.news_page_title);
		//轮询图片
		if(data.news_page_imgs!=null&&data.news_page_imgs!=""){
			var news_page_imgs=$.parseJSON(data.news_page_imgs);
			for(var i=0;i<news_page_imgs.length;i++){
				var modeldata=$($("#pageImgModel").html());
				modeldata.find("input[name=imgIndex]").val(news_page_imgs[i].imgIndex);
				$("#pageImg_info_list").append(modeldata);
				var imgModel=$($("#imgModel").html());
				imgModel.find(".img-model").attr("src",news_page_imgs[i].imgSrc);
				modeldata.find(".dropzone").append(imgModel);
				modeldata.find("input[name=pageImg]").val(news_page_imgs[i].imgSrc);
				initDropZone();
			}
		}
		//文件
		$("#materials").val(data.news_page_files);
		materials_file.resetFileShow();
		//内容模板
		if(data.contentmodule==null||data.contentmodule.length==0){
			initContent();
		}
		$(data.contentmodule).each(function(index){
			var node=data.contentmodule[index];
			var modeldata=$($("#contentModel").html());
			modeldata.find(".open_type").attr("name","openType"+contentCount);
			modeldata.find("input[name=oid]").val(node.oid);
			modeldata.find("input[name=version]").val(node.version);
			modeldata.find("input[name=title]").val(node.title);
			modeldata.find("input[name=name]").val(node.name);
			modeldata.find("input[name=moduleIndex]").val(node.sort);
			modeldata.find("input[name=showType]").val(node.showType==""?"edit_content":node.showType);
			modeldata.find("input[name=link]").val(node.link);
			modeldata.find("input[name=content]").val(node.content);
			modeldata.find("input[value="+node.openType+"]").attr("checked","checked");
			if(index==1){
				modeldata.find(".editContent").removeAttr("data-target");
			}
			
//			var imgModel=$($("#imgModel").html());
//			imgModel.find(".img-model").attr("src",node.picurl);
//			modeldata.find(".dropzone").append(imgModel);
//			modeldata.find("input[name=picurl]").val(node.picurl);
			
			$("#contentmodule_list").append(modeldata);
			//initContentDropZone();
			contentCount++;
		});
	},
	save:function(datas){
		$.ajax({
			url : 'newsmanager/admin/pagemanager/save.json',
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
	var news_page_title=$("#news_page_title").val();
	if(news_page_title==""){
		throw "页面title不能为空";
	}
	var param={news_page_title:news_page_title};
	//轮播图
	var news_page_imgs=[];
	$("#pageImg_info_list").find(".lable_box").each(function(){
		var imgIndex=$(this).find("input[name=imgIndex]").val();
		if(imgIndex!=""&&!$.isNumeric(imgIndex)){
			throw "请在图片排序处输入数字";
		}
		var imgSrc=$(this).find("input[name=pageImg]").val();
		news_page_imgs.push({"imgIndex":imgIndex,"imgSrc":imgSrc});
	});
	if(news_page_imgs.length==0){
		throw "请上传轮播图片";
	}
	param.news_page_imgs=JSON.stringify(news_page_imgs);
	//文件
	var files= materials_file.get();
	param.news_page_files=JSON.stringify(files);
	//内容模块
	var contentmodule=[];
	$("#contentmodule_list").find(".content_list").each(function(){
		var open_type=$(this).find(".open_type").attr("name");
		var oid = $(this).find("input[name=oid]").val();
		var version = $(this).find("input[name=version]").val();
		var name=$(this).find("input[name=name]").val();
		var flag=$(this).find("input[name=flag]").val();
		var sort=$(this).find("input[name=moduleIndex]").val();
		var picurl=$(this).find("input[name=picurl]").val();
		var openType=$(this).find("input[name="+open_type+"]:checked").val();
		var news_content={OID:oid,version:version,name:name,picurl:picurl,openType:openType,sort:sort,flag:flag};
		if(openType=="edit_content"){
			var showType = $(this).find("input[name=showType]").val();
			var content=$(this).find("input[name=content]").val();
			var link =$(this).find("input[name=link]").val();
			var title = $(this).find("input[name=title]").val();
			news_content.title=title;
			news_content.showType=showType;
			news_content.link=link;
			news_content.content=content;
		}
		contentmodule.push(news_content);
	});
	if(contentmodule.length>0){
		param.contentmodule=JSON.stringify(contentmodule);
	}
	return param;
}
function initContent(){
	for(var cc=0;cc<2;cc++){
		var modeldata=$($("#contentModel").html());
		$("#contentmodule_list").find(".content_list").removeClass("active");
		modeldata.addClass("active");
		modeldata.find(".open_type").attr("name","openType"+contentCount);
		if(cc==0){
			modeldata.find("input[name=name]").val("新闻稿");
			modeldata.find("input[name=moduleIndex]").val(2);
			modeldata.find("input[name=openType]").val("edit_content");
			modeldata.find(".open_type:first").attr("checked","checked");
		}else{
			modeldata.find("input[name=name]").val("新闻图片");
			modeldata.find("input[name=moduleIndex]").val(1);
			modeldata.find(".edit-content").parent().remove();
			modeldata.find("input[name=openType]").val("pic_list");
			modeldata.find(".open_type:last").attr("checked","checked");
			modeldata.find(".editContent").removeAttr("data-target");
		}
		$("#contentmodule_list").append(modeldata);
		//initContentDropZone();
		contentCount++;
	}
}
function initDropZone(){
	$("#pageImg_info_list").find(".dropzone:last").dropzone({
	    url:'upload',
	    acceptedFiles:'image/*',
	    maxFiles:5,
	    addRemoveLinks: true,
	    uploadMultiple:false,
	     init:function(){
	        this.on("sending", function(file, xhr, formData){
	        });
	        this.on('removedfile',function(file){
	        	//删除时将数据库数据也删除
	        });
	        this.on("addedfile", function(file) {
	        });
	        this.on("success", function(file,data) {
	        });
	        this.on("complete", function (file,data) {
	        	if(file.status=="success"){
	        		var responseStr=$.parseJSON(file.xhr.response);
	        		if($($(this.element).find(".dz-success")).length>=2){
	        			dialogAlertShow("","只允许上传一张图片");
		        		this.removeFile(file);
		        	}else{
		        		$(this.element).parents(".form-group").find("input[name=pageImg]").val(responseStr.uri);
			        	$(this.element).find(".dz-remove").html("删除");
		        	}
	        	}else{
	        		$(this.element).find(".dz-error").remove();
	        		dialogAlertShow("","上传失败");
	        	}
	        });
	    }  
	});
}
function initContentDropZone(){
	$("#contentmodule_list").find(".dropzone:last").dropzone({
		url:'upload',
		acceptedFiles:'image/*',
		maxFiles:5,
		addRemoveLinks: true,
		uploadMultiple:false,
		init:function(){
			this.on("sending", function(file, xhr, formData){
			});
			this.on('removedfile',function(file){
				//删除时将数据库数据也删除
			});
			this.on("addedfile", function(file) {
			});
			this.on("success", function(file,data) {
			});
			this.on("complete", function (file,data) {
				if(file.status=="success"){
					var responseStr=$.parseJSON(file.xhr.response);
					if($($(this.element).find(".dz-success")).length>=2){
						dialogAlertShow("","只允许上传一张图片");
						this.removeFile(file);
					}else{
						$(this.element).parents(".form-group").find("input[name=picurl]").val(responseStr.uri);
						$(this.element).find(".dz-remove").html("删除");
					}
				}else{
					$(this.element).find(".dz-error").remove();
					dialogAlertShow("","上传失败");
				}
			});
		}  
	});
}