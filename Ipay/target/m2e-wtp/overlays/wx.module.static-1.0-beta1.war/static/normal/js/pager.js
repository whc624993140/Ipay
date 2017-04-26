;(function($,window,document,undefined){
    "use strict";
    var defaults={
        pageIndex:0,
        pageSize:6,
        itemCount:50,
        maxButtonCount:7,
        prevText:normal_lang.page_key3,
        nextText:normal_lang.page_key4,
        buildPageUrl:null,
        backFn:function(){}
    }
    function Pager($ele,options){
        this.$ele = $ele;
        this.options = options = $.extend(defaults,options || {});
        this.init();
    }
    Pager.prototype = {
        constructor:Pager,
        init:function(){
            this.renderHtml();
            this.bindEvent();
        },
        renderHtml:function(){
            var options = this.options
            options.pageCount = Math.ceil(options.itemCount / options.pageSize);
            var html=[];
            if(options.pageIndex > 0){
                html.push('<a page="'+ (options.pageIndex -1) +'" href="'+ this.buildPageUrl(options.pageIndex- 1) +'" class="flip">'+options.prevText +'</a>')
            }else{
                html.push('<span class="flip noPage">'+ options.prevText +'</span>')
            }
            var tempStartIndex = options.pageIndex - Math.floor(options.maxButtonCount/2) + 1;
            var endIndex = Math.min(options.pageCount,Math.max(0,tempStartIndex) + options.maxButtonCount ) - 1;
            var startIndex = Math.max(0,endIndex - options.maxButtonCount + 1)
            if(startIndex >0){
                html.push('<a page="'+ 0 +'" href="'+this.buildPageUrl(0)+'">'+1+'</a>');
                html.push("<span>...</span>")
            }
            for(var i = startIndex ;i<=endIndex;i++){
                if(options.pageIndex == i){
                     html.push('<span class="curPage">'+(i+1)+'</span>')
                }else{
                     html.push('<a page="'+ i +'" href="'+this.buildPageUrl(i)+'">'+(i+1) +'</a>')
                }
            }
            if(endIndex<options.pageCount-1){
                html.push("<span>...</span>");
                html.push('<a page="'+(options.pageCount -1) +'" href="'+this.buildPageUrl(options.pageCount -1)+'">'+options.pageCount+'</a>')
            }
            if(options.pageIndex<options.pageCount-1){
                html.push('<a page="'+(options.pageIndex+1)+'" href="'+this.buildPageUrl(options.pageIndex +1)+'" class="flip">'+options.nextText +'</a>')
            }else{
                html.push('<span class="flip noPage">'+options.nextText+'</span>')
            }
            html.push(' <span>'+normal_lang.page_key6+'</span> <span class="page_input_border"><input type="text" class="page_input_nation"/></span> <span> '+normal_lang.page_key7+' </span> <input type="button" class="setIndex" value="GO"  />')
            this.$ele.html(html.join(""));
        },
        bindEvent:function(){
            var that = this;
            that.$ele.on("click","a",function(){
                that.options.pageIndex = parseInt($(this).attr('page'),10);
                console.log($(this))
                console.info(that.$ele);
                //console.info($ele);
                that.renderHtml();
                that.options.backFn && that.options.backFn(that.options.pageIndex)
            });
            that.$ele.on("click",".setIndex",function(){
            	  var s = /^[0-9]*$/;
                  var val = $(this).parent().find(".page_input_nation").val();
                  if(val =="" ){
                     return false;
                  }else if(!(s.test(val))){
                      return false;
                  }else{
                      that.options.pageIndex =  parseInt(val)-1;
                      that.renderHtml();
                      that.options.backFn && that.options.backFn(that.options.pageIndex)
                  }
            });
        },
        buildPageUrl:function(){
            if($.isFunction(this.options.buildPageUrl)){
                return options.buildPageUrl(pageIndex)
            }
            return 'javascript:void(0);';
        },
        getPageIndex:function(){
            return this.options.pageIndex;
        },
        setPageIndex:function(pageIndex){
            this.options.pageIndex = pageIndex;
            this.renderHtml();
        },
        setItemCount:function(itemCount){
            this.options.pageIndex = 0;
            this.options.itemCount= itemCount;
            this.renderHtml();
        },
    }
    
    $.fn.pager = function(options){
       options = $.extend(defaults,options||{});
        return new Pager($(this),options);
    }
})(jQuery,window,document);