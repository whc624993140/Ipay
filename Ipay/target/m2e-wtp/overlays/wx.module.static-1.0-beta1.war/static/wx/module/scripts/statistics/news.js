$(function(){
    $("#seadate").datepicker({
    	dateFormat: "yy-mm-dd",
        defaultDate: "+1w",
      	changeMonth: true,
      	changeYear:true,
      	numberOfMonths: 1,
      	onClose: function( selectedDate ) {
        	$( "#seadate_end" ).datepicker( "option", "minDate", selectedDate );
      	}
    });
    $("#seadate_end").datepicker({
        dateFormat: "yy-mm-dd",
      	defaultDate: "+1w",
      	changeMonth: true,
      	changeYear:true,
      	numberOfMonths: 1,
      	onClose: function( selectedDate ) {
        	$( "#seadate" ).datepicker( "option", "maxDate", selectedDate );
      	}
    });
	$("#news_export").click(function(){
		news.download();
	});
	$("#search").click(function(){
		news.load();
	});
});

function getConditions(){
	var start_time=$("#seadate").val();
	var end_time=$("#seadate_end").val();
	var title=$("#title").val();
	var params={start_time:start_time,end_time:end_time,title:title};
	return params;
}

function validConditions(params){
	if(!params.start_time){
		alert(wx_lang.page_key429+wx_lang.page_key249);
		return false;
	}
	if(!params.end_time){
		alert(wx_lang.page_key429+wx_lang.page_key250);
		return false;
	}
	return true;
}


var news={
		data : null,
		condition : {},
		load : function() {
			var conditions=getConditions();
			if(!validConditions(conditions)){
				return;
			}
			news.condition=conditions;
			var url = "wx/admin/summary/news/data.json";
			$.post(url, news.condition, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				news.data = json.data;
				news.clear();
				// alert(JSON.stringify(news.data));
				news.loadDate();
			}, "json");
		},loadDate : function() {
			if (typeof (news.data) == "undefined") {
				return;
			}
			for (var int = 0; int < news.data.length; int++) {
				var item = news.data[int];
				news.addNode(item);
			}
		},addNode:function(item){
			var str='<tr>';
			str+='<td>'+item.title+'</td>';
			str+='<td>'+item.sentCount+'</td>';
			str+='<td>'+item.int_page_read_count+'</td>';
			str+='<td>'+item.ori_page_read_count+'</td>';
			str+='<td>'+item.share_count+'</td>';
			str+='<td>'+item.add_to_fav_count+'</td>';
			str+='</tr>';
			$("#news_table").append(str);
		},clear:function(){
			$("#news_table").find("tr:first").siblings().remove();
		},download:function(){
			if(!validConditions(news.condition)){
				return;
			}
			$.ajaxDownload("wx/admin/summary/download/news.export",news.condition);
		}
}





