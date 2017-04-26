$(function(){
    $(document).on('click','[data-action]',function(){
        var actionName = $(this).data('action');
        var context = $(this)
        _handle(actionName,context)
    })
    $('body').on('click',function(){
        $("#menu").hide();
    })
});
function _handle(actionName,context){
    var fn = actionList[actionName];
    if(fn && $.isFunction(fn)){
        return fn.call(context || window)
    }
}

var actionList = {
    'layerLabel':function(){
        var layer = $(this).attr('data-layer');
        $(layer).addClass('in');
        $('body').addClass('layer-open');
    },
    'close':function(){
        var layer = $(this).attr('data-layer');
        $(layer).removeClass('in');
        $('body').removeClass('layer-open');
    },
    'dropdown_menu':function(){
        var menu = $(this).attr("data-toggle")
        $(menu).show();
    },
    'data-item':function(){
        var item = $(this).html();
        $("#menu_name").html(item);
        $(this).parent().parent().parent().hide();
    },
    'collapse':function(){
        var item_id = $(this).attr('href');
        if($(item_id).is(":visible")){
            $(item_id).removeClass('in');
        }
        else{
            $(item_id).addClass('in');
        }
       $(this).parent().parent().parent().siblings().find('.panel-collapse').removeClass('in');
    }
}
