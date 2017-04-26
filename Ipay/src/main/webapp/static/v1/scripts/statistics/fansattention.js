$(function(){

	$(".fans_fir").click(function(){
		fans.page("first");
	});
	$(".fans_next").click(function(){
		fans.page("next");
	});
	$(".fans_previous").click(function(){
		fans.page("previous");
	});
	$(".fans_end").click(function(){
		fans.page("end");
	});
	$("#fans_export").click(function(){
		fans.download();
	});
	
	fans.loadPage();
});


var fans={
		data : null,
		condition : {pageSize:20},
		loadPage : function() {
			fans.loadLast();
			var initUrl = "wx/admin/summary/info/page.json";
			$.post(initUrl, fans.condition, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				fans.data = json.data;
				fans.clear();
				// alert(JSON.stringify(fans.data));
				fans.load();
			}, "json");
		},loadLast:function(){
			var initUrl = "wx/admin/summary/info/last.json";
			$.post(initUrl, fans.condition, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				$("#subscribe").html(json.data.subscribe);
				$("#unSubscribe").html(json.data.unSubscribe);
				$("#netSubscribe").html(json.data.netSubscribe);
				$("#cumulateUser").html(json.data.cumulateUser);
			}, "json");
		},load : function() {
			fans.condition.pageNum=fans.data.currentPage;
			fans.condition.pageSize=fans.data.pageSize;
			if (typeof (fans.data.items) == "undefined") {
				$("#fansCount").html("共0条");
				return;
			}
			for (var int = 0; int < fans.data.items.length; int++) {
				var item = fans.data.items[int];
				fans.addNode(item);
			}
			$("#fansCount").html("共" + fans.data.totalCount + "条");
		},addNode:function(item){
			var str='<tr>';
			str+='<td>'+new Date(item.date).Format("yyyy-MM-dd")+'</td>';
			str+='<td>'+item.subscribe+'</td>';
			str+='<td>'+item.unSubscribe+'</td>';
			str+='<td>'+item.netSubscribe+'</td>';
			str+='<td>'+item.cumulateUser+'</td>';
			str+='</tr>';
			$("#fans_table").append(str);
		},clear:function(){
			$("#fans_table").find("tr:first").siblings().remove();
		},page:function(type){
			if(fans.condition==null){
				return ;
			}
			if("first"==type){
				if(fans.condition.pageNum==1){
					return ;
				}
				fans.condition.pageNum=1;
			}
			if("next"==type){
				if(fans.condition.pageNum== Math.ceil(fans.data.totalCount/fans.condition.pageSize)){
					return ;
				}
				fans.condition.pageNum=fans.data.currentPage+1;
			}
			if("previous"==type){
				if(fans.condition.pageNum==1){
					return ;
				}
				fans.condition.pageNum=fans.data.currentPage-1;
			}
			if("end"==type){
				if(fans.condition.pageNum== Math.ceil(fans.data.totalCount/fans.condition.pageSize)){
					return ;
				}
				fans.condition.pageNum= Math.ceil(fans.data.totalCount/fans.condition.pageSize);
			}
			fans.loadPage();
		},download:function(){
			$.ajaxDownload("wx/admin/summary/download/fans.export",fans.condition);
		}
}





