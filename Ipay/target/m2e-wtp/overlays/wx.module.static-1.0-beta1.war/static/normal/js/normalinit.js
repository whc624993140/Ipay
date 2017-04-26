var actionList_nor={
		
}

function settingActionList(options){
	jQuery.extend(actionList_nor, options);
}


function _handle(actionName, context) {
	var fn = actionList_nor[actionName];
	if (fn && $.isFunction(fn)) {
		return fn.call(context || window)
	}
}

$(function() {
	$(document).on('click', '[data-click]', function() {
		var actionName = $(this).data('click');
		var context = $(this);
		_handle(actionName, context)
	});
	
	$(document).on('change', '[data-change]', function() {
		var actionName = $(this).data('change');
		var context = $(this);
		_handle(actionName, context)
	});
	
	$(document).on('submit', '[data-submit]', function() {
		var actionName = $(this).data('submit');
		var context = $(this);
		_handle(actionName, context)
	});
	
	$(document).on('dbclick', '[data-dbclick]', function() {
		var actionName = $(this).data('dbclick');
		var context = $(this);
		_handle(actionName, context)
	});
	
	$(document).on('resize', '[data-resize]', function() {
		var actionName = $(this).data('resize');
		var context = $(this);
		_handle(actionName, context)
	});
	
	$(document).on('scroll', '[data-scroll]', function() {
		var actionName = $(this).data('scroll');
		var context = $(this);
		_handle(actionName, context)
	});
	
	$(document).on('select', '[data-select]', function() {
		var actionName = $(this).data('select');
		var context = $(this);
		_handle(actionName, context)
	});

});