
var layerAction = {
    'open':function(expr){
        $(expr).addClass('in');
        $('body').addClass('layer-open');
    },
    'close':function(expr){
        $(expr).removeClass('in');
        $('body').removeClass('layer-open');
    }
}