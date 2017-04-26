jQuery.extend({
	createFormSubmit:function (url, data, method,target) {
		if(!url){
			alert("url  is null");
			return;
		}
		var form=$("<form>");//定义一个form表单
		form.attr("style","display:none");
		form.attr("target",(target||"_blank"));
		form.attr("method",(method || 'post'));
		form.attr("action",url);
		$("body").append(form);
		if (data) {
			for(var o in data){  
				var _input=$("<input>");
				_input.attr("type","hidden");
				_input.attr("name",o);
				_input.attr("value",data[o]);
		        form.append(_input);
		      }  
		}
		form.submit().remove();//表单提交 
	}
	
});
