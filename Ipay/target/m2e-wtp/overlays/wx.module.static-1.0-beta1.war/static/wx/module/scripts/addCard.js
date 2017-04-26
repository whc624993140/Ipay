$(function() {
	$("#fileUploadButton").click(function() {
		$.ajaxFileUpload({
			url : uploadUrl, // 需要链接到服务器地址
			secureuri : false,
			fileElementId : 'coverFile', // 文件选择框的id属性
			uploadFileKey : 'file',
			dataType : 'json', // 服务器返回的格式
			success : function(json, status) // 相当于java中try语句块的用法
			{
				//alert(JSON.stringify(json));
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				$("#cardLogo").attr("src",json.uri);
				$("#image").attr("value",json.uri);
				
			},
			error:function(json){
				alert(JSON.stringify(json));
			}
		})
	});

});
