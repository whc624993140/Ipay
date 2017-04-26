$(function(){
	
	$(document).ajaxStart(function(){
		simpleLockTopScreen();
	});
	
	$(document).ajaxStop(function(){
		simpleUnLockTopScreen();
	});
	
	
	
});

