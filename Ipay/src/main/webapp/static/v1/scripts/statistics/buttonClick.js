$(function(){

	$(".buttonClick_fir").click(function(){
		buttonClick.page("first");
	});
	$(".buttonClick_next").click(function(){
		buttonClick.page("next");
	});
	$(".buttonClick_previous").click(function(){
		buttonClick.page("previous");
	});
	$(".buttonClick_end").click(function(){
		buttonClick.page("end");
	});
	$("#buttonClick_export").click(function(){
		buttonClick.download();
	});
	buttonClick.loadPage();
});


var buttonClick={
		data : null,
		condition : {pageSize:20},
		loadPage : function() {
			var initUrl = "wx/admin/summary/buttomclick/page.json";
			$.post(initUrl, buttonClick.condition, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				buttonClick.data = json.data;
				buttonClick.clear();
				// alert(JSON.stringify(buttonClick.data));
				buttonClick.load();
			}, "json");
		},
		load : function() {
			buttonClick.condition.pageNum=buttonClick.data.currentPage;
			buttonClick.condition.pageSize=buttonClick.data.pageSize;
			if (typeof (buttonClick.data.items) == "undefined") {
				$("#buttonClickCount").html("共0条");
				return;
			}
			buttonClick.addHead();
			for (var int = 0; int < buttonClick.data.items.length; int++) {
				var item = buttonClick.data.items[int];
				buttonClick.addNode(item);
			}
			$("#buttonClickCount").html("共" + buttonClick.data.totalCount + "条");
		},addHead:function(){
			var str='<tr>';
			for (var int = 0; int < buttonClick.data.heads.length; int++) {
				str+='<th>'+buttonClick.data.heads[int].name+'</th>';
			}
			str+='</tr>';
			$("#buttonClick_table").append(str);
		},addNode:function(item){
			var str='<tr>';
			for (var int = 0; int < buttonClick.data.heads.length; int++) {
				if(buttonClick.data.heads[int].key=='date'){
					str+='<td>'+new Date(item[buttonClick.data.heads[int].key]).Format("yyyy-MM-dd")+'</td>';
				}else{
					if (typeof (item[buttonClick.data.heads[int].key]) == "undefined") {
						str+='<td>'+0+'</td>';
					}else{
						str+='<td>'+item[buttonClick.data.heads[int].key]+'</td>';
					}
				}
			}
			str+='</tr>';
			$("#buttonClick_table").append(str);
		},clear:function(){
			$("#buttonClick_table").html("");
		},page:function(type){
			if(buttonClick.condition==null){
				return ;
			}
			if("first"==type){
				if(buttonClick.condition.pageNum==1){
					return ;
				}
				buttonClick.condition.pageNum=1;
			}
			if("next"==type){
				if(buttonClick.condition.pageNum== Math.ceil(buttonClick.data.totalCount/buttonClick.condition.pageSize)){
					return ;
				}
				buttonClick.condition.pageNum=buttonClick.data.currentPage+1;
			}
			if("previous"==type){
				if(buttonClick.condition.pageNum==1){
					return ;
				}
				buttonClick.condition.pageNum=buttonClick.data.currentPage-1;
			}
			if("end"==type){
				if(buttonClick.condition.pageNum== Math.ceil(buttonClick.data.totalCount/buttonClick.condition.pageSize)){
					return ;
				}
				buttonClick.condition.pageNum= Math.ceil(buttonClick.data.totalCount/buttonClick.condition.pageSize);
			}
			buttonClick.loadPage();
		},download:function(){
			$.ajaxDownload("wx/admin/summary/download/buttomclick.export",buttonClick.condition);
		}
}





