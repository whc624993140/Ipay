function simpleLockTopScreen(){
	var divStr='<div id="lockMaskDiv" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);z-index: 9999;display: block;">';
	if(lockWords!=null&&lockWords!=""){
		divStr+=' <div style="width:300px;background-color: #ffffff;border-radius: 3px;position: absolute;top:240px;left:50%;margin-left:-150px;font-size: 14px;padding:15px;    line-height: 1.42857143;">';
		divStr+= '<div style="width:100%"><img src="http://www.cr173.com/up/2012-12/20121212661146575367.gif" alt="" style="width:100%;height:16px;"/></div>';
		divStr+='<div style="width: 100%;text-align: center;margin-top:5px;">等待中....</div>';
		divStr+= '<div style="margin-top:20px;margin-bottom:20px;">';
		divStr+=lockWords;
		divStr+='</div>';
		divStr+='</div>';
	}
	divStr+='</div>';
	$("body").append(divStr);
}

var lockWords="";

function setLockWord(word){
	lockWords=word;
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













