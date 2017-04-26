var simpleAjaxFileUpload_bak = {
	upload:function(target, uri, scb, ecb){
		getScript("//malsup.github.io/jquery.form.js",function(){
			simpleAjaxFileUpload.process(target, uri, scb, ecb);
		},true);
	},
	process : function(target, uri, scb, ecb) {
		if(!target){
			throw new Exception(' target is  undefined');
		}
		if(!uri){
			uri='upload';
		}
		var f = $(target);
		f.attr('name','file');
		var time=new Date().getTime();
		f.wrap('<form enctype="multipart/form-data" method="post" id="'+time+'" />');
		var options = {
			url : uri,
			type : "post",
			success : function(data) {
				f.unwrap();
				if(scb){
					scb(data);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(ecb){
					ecb(XMLHttpRequest, textStatus, errorThrown);
				}
			}
		};
		f.parent().ajaxSubmit(options); 
	}
}

var simpleAjaxFileUpload = {
		upload:function(target, uri, scb, ecb){
				simpleAjaxFileUpload.process(target, uri, scb, ecb);
		},
		process : function(target, uri, scb, ecb) {
			if(!target){
				throw new Exception(' target is  undefined');
			}
			if(!uri){
				uri='file/upload';
			}
			var f = $(target);
			f.attr('name','file');
			var time=new Date().getTime();
			f.wrap('<form enctype="multipart/form-data" method="post" id="'+time+'" />');
			var data = new FormData(f.parent()[0]);  
			$.ajax({  
		          url: uri ,  
		          type: 'POST',  
		          data: data,  
		          async: false,  
		          cache: false,  
		          contentType: false,  
		          processData: false,  
		          success: function (data) {  
		        	  f.unwrap();
		        	  if(scb){
							scb(data);
						}
		          },  
		          error: function (XMLHttpRequest, textStatus, errorThrown) {  
		        	  if(ecb){
							ecb(XMLHttpRequest, textStatus, errorThrown);
						}
		          }  
		     });  
		}
	}