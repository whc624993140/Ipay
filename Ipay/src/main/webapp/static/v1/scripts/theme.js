$(function(){
	//默认主题
	var themeid="themeDefault";
	$('<link>').attr({
			rel:'stylesheet',
			type:'text/css',
			href:'static/v1/css/themes/'+themeid+'.css',
			id:"css"+themeid,
		}).appendTo("head");

	//选取主题
	$(".themes-select").click(function(ev){
		ev.stopPropagation();
	});

	//点击选取主题
	$(".tGlobal").click(function(){
		$(".themes").removeClass("temp")
		$(".themes-select").hide();
		$("head").children("link").each(function(){
			if($(this).attr("id")){
				$(this).remove();
			}
		});
		var th_id = $(this).attr("id");
		$('<link>').attr({
			rel:'stylesheet',
			type:'text/css',
			href:'css/v1/themes/'+th_id+'.css',
			id:"css"+th_id,
		}).appendTo("head");
		//将th_id插入数据库
	});
});