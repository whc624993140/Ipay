//溢出后的滚动条
//$(function(){
//	$(".mainBody").niceScroll({
//		cursorcolor:"rgba(035,052,069,.7)",
//		cursoropacitymin:0,
//		cursoropacitymax:1,
//		touchbehavior:false,
//		cursorwidth:"10px",
//		cursorborder:"none",
//		cursorborderradius:"5px" ,
//		scrollspeed:100,
//	});
//});
$(function(){
	var usFlag = false;
	$("html,body").click(function(){
		//点击隐藏模块
		$(".themes").removeClass("temp")
		$(".themes-select").hide();

		$(".loginInfo").hide();
		$(".userInfo").removeClass("userInfoAdd");
		usFlag = false;

	});
	//导航菜单hover效果

		$(".navbar>ul>li").hover(function(){
			if($(this).hasClass("temp")){
				$(this).children("ul").show();

			}else{
				$(this).children("ul").show();
				$(this).removeClass("navbarHover2");
				$(this).addClass("navbarHover1");
				var h = $(this).offset().top;
				$(this).children("ul").css('top',h)

			}
		},function(){
			if($(this).hasClass("temp")){
				$(this).children("ul").hide();
			}else{
				$(this).children("ul").hide();
				$(this).removeClass("navbarHover1");
				$(this).addClass("navbarHover2");
			}
		});



	//点击主题弹出对话框效果
	$(".themes").click(function(ev){
		ev.stopPropagation();
		if($(this).hasClass("temp")){
			$(this).removeClass("temp")
			$(".themes-select").hide();
		}else{
			$(this).addClass("temp")
			$(".themes-select").show();
		}
	});

	//点击导航效果
	try{
		var href = $("#home").attr("href");
		$(".mainBody").attr("src",href);   
	}catch(err){}
	$(".navbar>ul>li").first().addClass("navbarLiAdd");
	$(".navbar>ul>li").click(function(){
		$(this).addClass("temp");
		$(this).siblings().removeClass("temp");
		$(this).addClass("navbarLiAdd");
		$(this).removeClass("navbarLiOtherAdd");
		$(this).siblings().removeClass("navbarLiAdd");
		$(this).siblings().addClass("navbarLiOtherAdd");
	});

	$(".navbar").find("li").click(function(){
		var href = $(this).attr("href");
		$(".mainBody").attr("src",href);   
//		$(".mainBody").load(href);
	});

	$(".userInfo").click(function(ev){
		ev.stopPropagation();
		if(usFlag==false){
			$(".loginInfo").show();
			$(".userInfo").addClass("userInfoAdd");
			usFlag = true;
		}else{
			$(".loginInfo").hide();
			$(".userInfo").removeClass("userInfoAdd");
			usFlag = false;
		}
		$(".loginInfo>ul>li").click(function(ev){
			ev.stopPropagation();
		});
		
		$("#logout").click(function(){
			location.href ="logout";
		});
		
	});

	
});






