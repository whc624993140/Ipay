$(function(){
	var dropzone;
	//文件上传
	Dropzone.autoDiscover = false;
	var maxImageWidth = 300,
    	maxImageHeight = 300;
	$(".dropzone").dropzone({
	    url:'upload',
	    acceptedFiles:'image/*',
	    paramName: "file",
	    maxFilesize:10,
	    maxFiles:1,
        autoProcessQueue: true,//自动上传
	    addRemoveLinks: true,
	    uploadMultiple:false,
	    dictDefaultMessage:'点击选择上传文件',
	    dictRemoveFile:'删除',
	    dictCancelUploadConfirmation:'文件正在上传，确认取消吗？',
	    dictCancelUpload:'取消',
	    dictMaxFilesExceeded:'文件超过上传数量限制，您一次最多只能上传{{maxFiles}}个文件',
	    dictFileTooBig:"文件过大({{filesize}}MB). 上传文件最大支持: {{maxFilesize}}MB.",
	    dictInvalidFileType: "你不能上传该类型文件",
	     init:function(){
	    	 dropzone=this;
	        this.on("sending", function(file, xhr, formData){
	        });
	        this.on('removedfile',function(file){
	        	var data=jQuery.parseJSON(file.xhr.response);
	        	if(data.uri==$("#picurl").val("")){
	        		$("#picurl").val("");
	        	}
	        });
	        this.on("addedfile", function(file) {
	        	$(".dz-filename").remove();
	        	$(".dz-size").remove();
	        	$(".dz-success-mark").remove();
	        	$(".dz-error-mark").remove();
	        });
	        this.on("success", function(file,data) {
	        	var str = JSON.stringify(file.xhr.response);
	        	var data=jQuery.parseJSON(file.xhr.response);
	        	$("#picurl").val(data.uri);
	        });
	        this.on("complete", function (file,data) {
	        	
	        });
	        this.on("maxfilesreached", function (file,data) {
	        	
	        });
	        this.on("maxfilesexceeded", function (file,data) {
	        	this.removeFile(file);
//	        	$(".dz-error").remove();
	        });
	    }  
	});
	
		$("#date").datepicker({
	    	dateFormat: "yy/mm/dd",
	        defaultDate: "+1w",
	      	changeMonth: true,
	      	changeYear:true,
	      	yearRange:'-200:+1',
	      	numberOfMonths: 1
	    });
     
     $('#data_add').on('click', function (e) {
    	 $("#myModal").find("input").val("");
    	 $("#pic").html("");
    	 dropzone.removeAllFiles(true);
    	 CKEDITOR.instances.content.setData("");
     });
     
     $('#data_datas').on('click','.del_tr', function (e) {
    	 var id=$(this).parent().parent().parent().attr("id");
    	 var did=dialogConfirmShow("提示","是否继续？",function(){
    		 bainianfengya.del(id);
    	 });
     });
     
     $('#data_datas').on('click','.edit_tr', function (e) {
    	 var id=$(this).parent().parent().parent().attr("id");
    	 $("#myModal").find("input").val("");
    	 bainianfengya.get(id,function(data){
    		 $("#id").val(data.oid);
    		 $("#title").val(data.title);
    		 $("#subTitle").val(data.subTitle);
    		 $("#date").val(new Date(data.date).Format("yyyy/MM/dd"));
    		 $("#pic").html("<img src='"+data.picurl+"' />");
    		 dropzone.removeAllFiles(true);
    		 CKEDITOR.instances.content.setData(data.content);
    	 });
    	 
     });
     
     $("#data_save").on('click',function(){
    	 for (var int = 0; int <dropzone.files.length; int++) {
    		 var file=dropzone.files[int];
    		 if(file.status!="success"){
    			 alert("仍然有文件在上传");
    			 return;
    		 }
    	 }
    	 var datas=getForm();
    	 bainianfengya.save(datas);
     });
     
    bainianfengya.loadDatas();
});



function getForm(){
	var id=$("#id").val();
	var title=$("#title").val();
	var subTitle=$("#subTitle").val();
	var picurl=$("#picurl").val();
	var date=$("#date").val();
	var content=CKEDITOR.instances.content.getData();
	var params={OID:id,title:title,subTitle:subTitle,picurl:picurl,content:content,datelang:(new Date(date)).getTime() };
	return params;
}

var bainianfengya={
		datas:null,
		loadDatas:function(){
			$.post("maserati/bainianfengya/admin/list.json", null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				bainianfengya.datas=json.data;
				//alert(JSON.stringify(json.data));
				bainianfengya.clear();
				bainianfengya.load(bainianfengya.datas);
			}, "json");
		},load:function(datas){
			if(!datas){
				return;
			}
			$(datas).each(function(index) {
				var node = datas[index];
				bainianfengya.addNode(node);
			});
		},addNode:function(node){
			if(!node){
				return;
			}
			var str = '<tr  id=\'{9}\'>'
                +'<td>{0}</td>'
                +'<td>{1}</td>'
                +'<td>{2}</td>'
                +'<td><div>'
//                +'<a class="a_pad" href="javascript:void();">查看</a>|'
                +'<a class="a_pad edit_tr" data-target="#myModal" data-toggle="modal" href="javascript:void(0);">编辑</a>|<a class="a_pad del_tr" href="javascript:void(0);">删除</a></div>'
                +'</td>'
                +'</tr>';
			str = str.replace("{0}", node.title);
			str = str.replace("{1}", node.subTitle);
			str = str.replace("{2}", (new Date(node.updateTime)).Format("yyyy-MM-dd hh:mm:ss"));
			str = str.replace("{9}", node.oid);
			$("#data_datas_body").append(str);
		},save:function(params){
			$.post("maserati/bainianfengya/admin/save.json", params, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				alert("保存成功！");
				bainianfengya.loadDatas();
				$("#myModal").modal("hide");
			}, "json");
		},del:function(id){
			var url="maserati/bainianfengya/admin/"+id+"/delete.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				alert("删除成功！");
				bainianfengya.loadDatas();
			}, "json");
		},get:function(id,callback){
			var url="maserati/bainianfengya/admin/"+id+"/get.json";
			$.post(url, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				callback(json.data);
			}, "json");
		},find:function(id){
			var res=$(bainianfengya.datas).each(function(index) {
				var data=bainianfengya.datas[index];
				if(data.id==id){
					return data;
				}
			});
			return res;
		},clear:function(){
			$("#data_datas_body").html("");
		}
}





















