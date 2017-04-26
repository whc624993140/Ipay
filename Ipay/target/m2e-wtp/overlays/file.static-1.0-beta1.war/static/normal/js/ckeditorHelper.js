
var ckeditorHelper={
	insert2head:function(id,html){
		var htmlData=CKEDITOR.instances[id].getData();
		var theData=html+htmlData;
		CKEDITOR.instances[id].setData(theData);
	},append:function(id,html){
		var htmlData=CKEDITOR.instances[id].getData();
		var theData=htmlData+html;
		CKEDITOR.instances[id].setData(theData);
	},insert:function(id,html){
		CKEDITOR.instances[id].insertHtml(html);
	},get:function(id){
		var htmlData=CKEDITOR.instances[id].getData();
		return htmlData;
	},set:function(id,html){
		CKEDITOR.instances[id].setData(html);
	}
}
