$(function(){
    $(document).on('click','[data-action]',function(){
        var actionName = $(this).data('action');
        var context = $(this)
        _handle(actionName,context)
    })

});
function _handle(actionName,context){
    var fn = actionList[actionName];
    if(fn && $.isFunction(fn)){
        return fn.call(context || window)
    }
}

var actionList = {
    'remark':function(){
    var edit = $(this).attr('toggle');
        $(edit).attr('readonly',false);
        $(edit).addClass('border_color');
    },
    'remark1':function(){
        var edit1 = $(this).attr('toggle');
        $(edit1).attr('readonly',false);
        $(edit1).addClass('border_color');
    },
    'tap':function(){
        var oIndex = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(".edit-content>.edit-item").eq(oIndex).addClass('active').siblings().removeClass('active');
    },
    'func':function(){
        var oIndex = $(this).index();
        if(oIndex == 1){
            $(".filter_by").show();
        }else{
            $(".filter_by").hide();
        }
        $(this).addClass('active').siblings().removeClass('active');
        $(".analyse_content>.analyse-item").eq(oIndex).show().siblings().hide();

    },
    'office':function(){
      var x = $(this).offset().top ;
        $("#label1 > a").each(function(i){
            var that = $(this)
            var str = '<div style="width:100%" class="kong"><a href="javascript:void(0);" class="btn btn-green">2015年12月-国贸店1214</a> <a href="javascript:void(0);" class="btn btn-green">2015年12月-国贸店1214</a> <a href="javascript:void(0);" class="btn btn-green">2015年12月-国贸店1214</a> </div>'
            if(x < that.offset().top ) {
                $('.kong').remove();
                that.before(str);
                return false
            }
            if(x == $("#label1>a:last").offset().top){
                $('.kong').remove();
                $("#label1").append(str)
            }

        })

    },
    //'layer':function(){
    //    var layer = $(this).attr('toggle');
    //    $(layer).addClass('in');
    //    $('body').addClass('layer-open');
    //},
    //'close':function(){
    //    var layer = $(this).attr('data-layer');
    //    $(layer).removeClass('in');
    //    $('body').removeClass('layer-open');
    //},
    'pack_up':function(){
        var that = $(this).find('i')
        var pack = $(this).attr('toggle')
        if($(pack).is(":visible")){
            $(pack).hide();
            that.addClass('tri_down');
        }
        else{
            $(pack).show();
            that.removeClass('tri_down');
        }
    },
    'tag_group_item':function(){
        var oIndex = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(".label_classify>.label_group").eq(oIndex).show().siblings().hide();
    },
    'list_item':function(){
        $(this).addClass('active').siblings().removeClass('active');
    },
    'list_group_item':function(){
        $(this).addClass('active').parent().siblings().find('a').removeClass('active');
    },
    'login_up':function(){
      var login_up = $(this).attr('toggle')
        if($(login_up).is(":visible")){
            $(login_up).hide();
            that.addClass('tri_down');
        }
        else{
            $(login_up).show();
            that.removeClass('tri_down');
        }
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
    'loading':function() {
        var list = [
            {
                "role": 0,
                "name": "abc",
                "mes": "你好",
                "time": "2016"
            }, {
                "role": 11,
                "name": "EnsonH",
                "mes": "你好",
                "time":"2016"

            }
        ]
        var html = [];
       for(var i=0 ,k = list.length;i<=k-1;i++){
           if(list[i].role <= 10 ){
               if(list[i].hasOwnProperty('image')){
                var str='<div class="left_ms clearfix">'+
                       '<img src="'+list[i].image+'" alt="" class="l_avatar"/>'+
                       '<div class="ms_text text_left fl">'+
                           '<div class="ms_time">'+ list[i].time +'</div>'+
                           '<div class="ms_txt_r clearfix">'+
                               '<img src="list[i].image" alt="" class="r_avatar_r fl"/>'+
                               '<div class="img_txt fl">'+list[i].mes+'</div>'+
                            '</div>'+
                       '</div>'+
                   '</div>';
                   html.push(str)
               }
               else{
                  var str=' <div class="left_ms clearfix">'+
                       '<img src="images/avatar.png" alt="" class="l_avatar"/>'+
                       '<div class="ms_text">'+
                           '<div class="ms_time">'+list[i].time+'</div>'+
                           '<div class="ms_txt">'+list[i].mes+'</div>'+
                       '</div>'+
                   '</div>';
                   html.push(str)
           }
           }else{
               if(list[i].hasOwnProperty('image')){
               var str =' <div class="right_ms clearfix">'+
                      ' <img src="images/avatar.png" alt="" class="r_avatar"/>'+
                      ' <div class="ms_text1 text_right fr">'+
                           '<div class="ms_time">'+list[i].time+'</div>'+
                           '<div class="ms_txt_r clearfix">'+
                              ' <img src= "'+list[i].image+'" alt="" class="r_avatar_r fl"/>'+
                               '<div class="img_txt fl">'+list[i].mes+'</div>'+
                          '</div>'+
                           '<div class="manage">'+
                               '<div class="in_block mar_r30">'+
                                   '<label for="" class="in_block">管理员:</label>'+
                                   '<div class="in_block">'+list[i].name+'</div>'+
                               '</div>'+
                               '<div class="in_block">'+
                                   '<label for="" class="in_block">状态:</label>'+
                                   '<div class="in_block">发送成功</div>'+
                               '</div>'+
                           '</div>'+
                       '</div>'+
                   '</div>';
                   html.push(str)
               }
               else{
                   var str =' <div class="right_ms clearfix">'+
                       '<img src="images/avatar.png" alt="" class="r_avatar"/>'+
                       '<div class="ms_text1 text_right fr">'+
                           '<div class="ms_time">'+list[i].time+'</div>'+
                          '<div class="ms_txt">'+list[i].mes+'</div>'+
                           '<div class="manage">'+
                               '<div class="in_block mar_r30">'+
                                   '<label for="" class="in_block">管理员:</label>'+
                                   '<div class="in_block">'+list[i].name+'</div>'+
                               '</div>'+
                               '<div class="in_block">'+
                                   '<label for="" class="in_block">状态:</label>'+
                                   '<div class="in_block">发送成功</div>'+
                               '</div>'+
                           '</div>'+
                       '</div>'+
                       '</div>'
                   html.push(str)
               }
           }
       }
    $('.dialogue').append(html.join(""))
    }
}
