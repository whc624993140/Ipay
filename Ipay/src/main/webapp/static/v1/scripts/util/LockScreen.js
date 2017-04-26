function LockTopScreen(){
	var divStr='<div id="lockMaskDiv" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);z-index: 9999;display: block;"></div>';
	$("body").append(divStr);
}

function unLockTopScreen(){
	$("#lockMaskDiv").remove();
}