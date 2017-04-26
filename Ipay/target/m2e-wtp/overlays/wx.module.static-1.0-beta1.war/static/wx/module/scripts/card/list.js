$(function() {
	getScript("static/wx/dataexchange/module/card/card.js", function(){
		card_list.loadData();
	}, true);
	
	$(document).on('click','[data-action]',function(){
	    var actionName = $(this).data('action');
	    var context = $(this);
	    _handle(actionName,context)
	});
	
	$(document).find('[data-click]').each(function(){
		var click = $(this).data('click');
		if(click){
			$(this).click();
		}
	});

	$(".layer_ul>li").find('input:radio').on('click',function() {
		$(this).prop("checked", $(this).is(":checked")).parent().siblings().find('input:radio').prop("checked", false);
	});
	
	
});

var actionList = {
	'new-card' : function() {
		var layer = $(this).attr("data-layer")
        $(layer).addClass('in').show();
		$('body').addClass('layer-open');
		$(layer).find('.modal_layer').show();

	},
	'btn_search' : function() {
		card_list.conditions.title=$("#search_title").val();
		card_list.loadData();
	},
	'close' : function() {
		var layer = $(this).attr("data-layer");
        $(layer).removeClass('in').hide();
		$('body').removeClass('layer-open');
		$(layer).find('.modal_layer').hide();

	},
	'radio_card' : function() {
		var self = $(this);
		self.siblings('.card_item').show();
		self.parent().siblings().find('.card_item').hide();
		self.siblings('.card_item').find('input[name=radio_card]').on(
				'click',
				function() {
					$(this).prop("checked", $(this).is(":checked")).parent()
							.siblings('label').find('input').prop("checked",
									false)
				})
	},sure:function(){
		var val=$('input[name=radio_card_normal]:checked').val();
		window.location.href = 'wx/admin/card/manage.html?type='+val;
	},card_del:function(){
		var cardid=$(this).parent().parent().attr("id");
		card_list.del(cardid);
	},card_ticket:function(){
		var data=$(this).parent().parent().data("json");
//		var data=JSON.parse(json);
		if(data.ticket){
			window.open("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+data.ticket);      
			return;
		}
		var res=qrcard.getDefault(data.card_id);
		window.open(res.show_qrcode_url);
	},to_code_list:function(){
		var data=$(this).parent().parent().data("json");
		window.location.href='wx/admin/card/user/'+data.card_id+'/list.html'
	},card_sync:function(){
		var data=$(this).parent().parent().data("json");
		card_list.sync(data.card_id);
	},stock_sure:function(){
		var stock=$("#stock").val();
		var cardid=window['stock_current_cardid'];
		card_list.modifystock(cardid,stock);
	},card_stock:function(){
		var data=$(this).parent().parent().data("json");
		window['stock_current_cardid']=data.card_id;
		$('body').addClass('layer-open');
		$("#stock_layer").find('.modal_layer').show();
        $("#stock_layer").addClass('in').show();
	}
}
function _handle(actionName,context){
    var fn = actionList[actionName];
    if(fn && $.isFunction(fn)){
        return fn.call(context || window)
    }
}


var card_list = {
	conditions : {
		pageSize : 20
	},
	loadData : function() {
		card.page(card_list.conditions, function(json, status, xhr) {
			if (!json.success) {
				dialogAlertShow(wx_lang.page_key339,json.errmsg,null,wx_lang.page_key341);
				//alert(json.errmsg);
				return;
			}
			card_list.load(json.data);
			var datas = json.data
			$("#qrcode_page").pager({
				itemCount:datas.totalCount,
				pageSize:datas.pageSize,
				maxButtonCount:5,
				pageIndex:datas.currentPage-1,
		        backFn:function(p){
		        	card_list.conditions.pageNum=p+1;
		        	card_list.clear();
		        	card_list.loadData();
		        }
		    });
		});
	},del:function(cardid){
		card.del(cardid,function(json, status, xhr){
			if (!json.success) {
				dialogAlertShow(wx_lang.page_key339,json.errmsg,null,wx_lang.page_key341);
				//alert(json.errmsg);
				return;
			}
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key387,null,wx_lang.page_key341);
			card_list.loadData();
		});
		
	},
	load : function(data) {
		card_list.clear();
		card_list.addHead();
		if(!data.items){
			return;
		}
		for (var int = 0; int < data.items.length; int++) {
			var item = data.items[int];
			card_list.addNode(item);
		}
		$("#card_list_page").createPage({
			pageCount : data.pageCount,
			current : data.currentPage,
			backFn : function(p) {
				card_list.conditions.pageNum = p;
				card_list.clear();
				card_list.loadData();
			}
		});
	},
	addHead : function() {
		$("#card_list_table").append(	"<thead><tr><th>卡券标题</th><th>卡券ID</th><th>库存</th>"
								+ "<th>卡券类型</th><th>操作</th></tr></thead>");
	},
	addNode : function(item) {
		var str="<tr id='{6}' data-json='{7}'><td>{0}</td><td>{1}</td><td>{2}</td><td>{4}</td><td>{5}</td></tr>";
		str = str.replace("{7}", JSON.stringify(item));
		str = str.replace("{6}", item.card_id);
		str = str.replace("{0}", item.baseInfo.title);
		str = str.replace("{1}", item.card_id);
		str = str.replace("{2}", item.baseInfo.sku.quantity);
//		str = str.replace("{3}","");
		if('MEETING_TICKET'==item.card_type){
			str = str.replace("{4}","会议/演出门票");
		}else{
			str = str.replace("{4}","团购劵");
		}
		var fivep="";
		if(item.isValid){
			var del_str="<a href='javascript:void(0)' data-action='card_del'>删除</a> |";
			var nor_ticket=" <a href='javascript:void(0)' data-action='card_ticket'>普通二维码</a> |";
			var sync_str=" <a href='javascript:void(0)' data-action='card_sync'>同步</a> |";
			var stock_str=" <a href='javascript:void(0)' data-action='card_stock' >修改库存</a> |";
			fivep=del_str+nor_ticket+sync_str+stock_str;
		}else{
			var del_str="已删除 |";
			fivep=del_str;
		}
		var codelist=" <a href='javascript:void(0)' data-action='to_code_list'>领券列表</a>";
		
		str = str.replace("{5}",fivep+codelist);
		$("#card_list_table").append(	str);
	},
	clear : function() {
		$("#card_list_table").empty();
	},sync:function(cardid){
		card.sync(cardid,function(json){
			if (!json.success) {
				dialogAlertShow(wx_lang.page_key339,json.errmsg,null,wx_lang.page_key341);
				//alert(json.errmsg);
				return;
			}
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key387,null,wx_lang.page_key341);
			card_list.loadData();
		});
	},modifystock:function(cardid,stock){
		card.modifystock(cardid,stock,function(json){
			if (!json.success) {
				dialogAlertShow(wx_lang.page_key339,json.errmsg,null,wx_lang.page_key341);
				//alert(json.errmsg);
				return;
			}
			dialogAlertShow(wx_lang.page_key339,wx_lang.page_key387,null,wx_lang.page_key341);
			card_list.loadData();
		});
	}
}
