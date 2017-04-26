function simpleLockTopScreen(){
	var divStr='<div id="lockMaskDiv" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);z-index: 9999;display: block;"></div>';
	$("body").append(divStr);
}

function simpleUnLockTopScreen(){
	$("#lockMaskDiv").remove();
}


function lockWait(){
	var time=new Date().getTime();
	var divStr='<div id="lockMaskDiv'+time+'" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);z-index: 9999;display: block;"></div>';
	$("body").append(divStr);
	return time;
}


function unlockWait(time){
	if(time){
		return;
	}
	$("#lockMaskDiv"+time).remove();
}













