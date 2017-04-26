jQuery(document).ready(function($){
	
	var scrollTopVal=0; 
	
	$(document).on('click','.plus', function(event){
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
		scrollTopVal=0;
	});


	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close1') || $(event.target).is('.cd-popup-close1') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	
	$("#content").on("touchstart", function(e) {
	    startX = e.originalEvent.changedTouches[0].pageX,
	    startY = e.originalEvent.changedTouches[0].pageY;
	});
	/*去掉iphone手机滑动默认行为*/
	$('#content').on('touchmove', function (e) {
		moveEndX = e.originalEvent.changedTouches[0].pageX,
	    moveEndY = e.originalEvent.changedTouches[0].pageY,
	    X = moveEndX - startX,
	    Y = moveEndY - startY;
		if($(".cd-popup").hasClass('is-visible')){
			var divHeight = $(".content-bg").height();
	        var nScrollHeight = $(".content-bg")[0].scrollHeight;
	        var nScrollTop = $(".content-bg")[0].scrollTop;
	        if(nScrollTop==0&&Y>0){
	        	e.preventDefault();
				e.stopPropagation();
	        }
			if((nScrollTop + divHeight+1 >= nScrollHeight)&& Y < 0){
				e.preventDefault();
				e.stopPropagation();
			}
			scrollTopVal=nScrollTop;
		}
	});
//	
//	$(window).scroll(function (e) {
//		if($(".cd-popup").hasClass('is-visible')){
//			e.preventDefault();
//			e.stopPropagation();
//			window.event.returnValue = false; 
//			return false;
//		}
//	});
	



    $('.cd-popup').on('click', function(event){
        if( $(event.target).is('.close') || $(event.target).is('.close') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
    $(window).scroll(function(e){
        h = 300;
        t = $(window).scrollTop();
        if(t>h){
            $(".go-top").show();
        }
        else{
            $(".go-top").hide();
        }

        $(".go-top").click(function(){
            $(window).scrollTop(0);
        })
    })


    $("#datas").on('click',".timer",function(){
    	$(this).parent().siblings().each(function(){
    		$(this).removeClass('open');
    		$(this).find('div').hide();
    	});
    	$(this).siblings('div').toggle();
        if($(this).parent().hasClass('open')){
            $(this).parent().removeClass('open')
        }
        else{
            $(this).parent().toggleClass('open');
        }
    })

    $('.icon-edit-item').on('click',function(){
      var edit_html =  $(this).siblings('div').html();
        $(this).hide();
        $(this).siblings('div').hide().siblings('input').show();
        $(this).siblings('input').html(edit_html)
        $(this).siblings('input').focus();

    })


    $('.texts').blur(function(){
        $(this).siblings('a').show();
    })
});