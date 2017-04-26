
function popWin(obj){
	var _z=9000;
	var _mv=false;
	var _x,_y;
	var _obj= $("#"+obj);
	var _wid= _obj.width();
	var _hei= _obj.height();
	var _tit= _obj.find(".tit");
	var _cls =_obj.find(".close");
	var docE =document.documentElement;
	var left=($(document).width()-_obj.width())/2;
	var top =(docE.clientHeight-_obj.height())/2;
	_obj.css({	"left":left,"top":top,"display":"block","z-index":_z-(-1)});
			
	_tit.mousedown(function(e){
		_mv=true;
		_x=e.pageX-parseInt(_obj.css("left"));
		_y=e.pageY-parseInt(_obj.css("top"));
		_obj.css({	"z-index":_z-(-1)}).fadeTo(50,1);
	});
	_tit.mouseup(function(e){
		_mv=false;
		_obj.fadeTo("fast",1);
	
	});
	
	$(document).mousemove(function(e){
		if(_mv){
			var x=e.pageX-_x;
			if(x<=0){x=0};
			x=Math.min(docE.clientWidth-_wid,x)-5;
			var y=e.pageY-_y;
			if(y<=0){y=0};
			y=Math.min(docE.clientHeight-_hei,y)-5;
			_obj.css({
				top:y,left:x
			});
		}
	});

			_cls.on("click",function(){
		$(this).parent().parent().hide().siblings("#maskLayer").remove();
	});
			
	$('<div id="maskLayer"></div>').appendTo("body").css({
		"background":"#ffffff","opacity":".4","top":0,"left":0,"position":"absolute","zIndex":"8000"
	});

	reModel();
	$(window).bind("resize",function(){reModel();});
	$(document).keydown(function(event) {
		if (event.keyCode == 27) {
			$("#maskLayer").remove();
			_obj.hide();
		}
	});
	function reModel(){
		var b = docE? docE : document.body,
		height = b.scrollHeight > b.clientHeight ? b.scrollHeight : b.clientHeight,
		width = b.scrollWidth > b.clientWidth ? b.scrollWidth : b.clientWidth;
		$("#maskLayer").css({
			"height": height,"width": width
		});
	}
}