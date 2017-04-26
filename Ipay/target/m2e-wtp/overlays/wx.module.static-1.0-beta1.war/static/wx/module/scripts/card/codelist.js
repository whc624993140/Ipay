$(function() {
	
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

	
	user_card_list.loadData();
});

var actionList = {
		user_card_unavailable:function(){
			var data=$(this).parent().parent().data("json");
			user_card.unavailable(data.code,data.card_id,function(json, status, xhr) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key387,null,wx_lang.page_key341);
				user_card_list.loadData();
			});
		},user_card_sync:function(){
			var data=$(this).parent().parent().data("json");
			user_card.sync(data.code,data.card_id,function(json, status, xhr) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key387,null,wx_lang.page_key341);
				user_card_list.loadData();
			});
		},user_card_consumed:function(){
			var data=$(this).parent().parent().data("json");
			user_card.consume(data.code,data.card_id,function(json, status, xhr) {
				if (!json.success) {
					dialogAlertShow(wx_lang.page_key339,json.errmsg,null,wx_lang.page_key341);
					//alert(json.errmsg);
					return;
				}
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key387,null,wx_lang.page_key341);
				user_card_list.loadData();
			});
		},update_meeting_ticket_show:function(){
			var data=$(this).parent().parent().data("json");
			window['current_card_id']=data.card_id;
			window['current_code']=data.code;
			$('#meeting_zone').val('');
			$('#meeting_entrance').val('');
			$('#meeting_seat_number').val('');
            $("#meeting_ticket_update_div").addClass('in').show();
			$('body').addClass('layer-open');
			$("#meeting_ticket_update_div").find('.modal_layer').show();
		},update_meeting_ticket_sure:function(){
			var meeting_begin_time=$("#meeting_begin_time").val();
			var meeting_end_time=$("#meeting_end_time").val();
			var meeting_zone=$("#meeting_zone").val();
			var meeting_entrance=$("#meeting_entrance").val();
			var meeting_seat_number=$("#meeting_seat_number").val();
			var conditions={};
			if(meeting_begin_time!=''){
				conditions['begin_time']=new Date(meeting_begin_time).getTime();
			}
			if(meeting_end_time!=''){
				conditions['end_time']=new Date(meeting_end_time).getTime();
			}
			conditions['card_id']=window.current_card_id;
			conditions['code']=window.current_code;
			conditions['zone']=meeting_zone;
			conditions['entrance']=meeting_entrance;
			conditions['seat_number']=meeting_seat_number;
			if(!checkConditions(conditions)){
				return;
			}
			meeting_ticket_user_card.update(conditions, function(json){
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				dialogAlertShow(wx_lang.page_key339,wx_lang.page_key387,function(){
					$("#meeting_ticket_update_div").removeClass('in').hide();
					$('body').removeClass('layer-open');
					$("#meeting_ticket_update_div").find('.modal_layer').hide();
				},wx_lang.page_key341);
				user_card_list.loadData();
			});
		},update_meeting_ticket_cancel:function(){
           $("#meeting_ticket_update_div").removeClass('in').hide();
			$('body').removeClass('layer-open');
			$("#meeting_ticket_update_div").find('.modal_layer').hide();
		}
}
function checkConditions(conditions){
	if(conditions.begin_time>conditions.end_time){
		dialogAlertShow(wx_lang.page_key339,wx_lang.page_key413,function(){},wx_lang.page_key341);
		return false;
	}
	if(typeof (conditions.code) == "undefined"||conditions.code==""){
			return false;
	}
	if(typeof (conditions.zone) == "undefined"||conditions.zone==""){
			dialogAlertShow(wx_lang.page_key339,"区域不能为空！~",function(){},wx_lang.page_key341);
		return false;
	}
	if(typeof (conditions.entrance) == "undefined"||conditions.entrance==""){
				dialogAlertShow(wx_lang.page_key339,"入口不能为空！~",function(){},wx_lang.page_key341);
		return false;
	}
	if(typeof (conditions.seat_number) == "undefined"||conditions.seat_number==""){
			dialogAlertShow(wx_lang.page_key339,"座位号不能为空！~",function(){},wx_lang.page_key341);
		return false;
	}
	return true;
}

function _handle(actionName,context){
    var fn = actionList[actionName];
    if(fn && $.isFunction(fn)){
        return fn.call(context || window)
    }
}


var user_card_list = {
	card:null,
	conditions : {
		pageSize : 20,
		cardid:cardid
	},
	loadData : function() {
		user_card_list.card=card.get(cardid);
		user_card.card_page(cardid,user_card_list.conditions, function(json, status, xhr) {
			if (!json.success) {
				alert(json.errmsg);
				return;
			}
			user_card_list.load(json.data);
		});
	},
	load : function(data) {
		user_card_list.clear();
		user_card_list.addHead();
		if(!data.items){
			return;
		}
		for (var int = 0; int < data.items.length; int++) {
			var item = data.items[int];
			user_card_list.addNode(item);
		}
		$("#user_card_list_page").createPage({
			pageCount : data.pageCount,
			current : data.currentPage,
			backFn : function(p) {
				user_card_list.conditions.pageNum = p;
				user_card_list.clear();
				user_card_list.loadData();
			}
		});
	},
	addHead : function() {
		//if('MEETING_TICKET'==user_card_list.card.card_type){
			$("#user_card_list_table").append(	"<thead><tr><th>openid</th><th>code</th><th>区域</th><th>入口 </th>"
					+ "<th>座位号</th><th>"+wx_lang.page_key507+"</th><th>"+wx_lang.page_key284+"</th></tr></thead>");
		//}
	},
	addNode : function(item) {
		//if('MEETING_TICKET'==user_card_list.card.card_type){
			user_card_list.addMeetingTicketNode(item);
		//}
	},addMeetingTicketNode:function(item){
		var str="<tr id='{6}' data-json='{7}'><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{8}</td><td>{5}</td></tr>";
		str = str.replace("{7}", JSON.stringify(item));
		str = str.replace("{6}", out(item.code));
		str = str.replace("{0}", out(item.openid));
		str = str.replace("{1}", out(item.code));
		str = str.replace("{2}", out(item.meeting_zone));
		str = str.replace("{3}", out(item.meeting_entrance));
		str = str.replace("{4}", out(item.meeting_seat_number));
		if(item.user_card_status=='NORMAL'){
			str = str.replace("{8}", '正常');
		}else if(item.user_card_status=='CONSUMED'){
			str = str.replace("{8}", '已核销');
		}else if(item.user_card_status=='EXPIRE'){
			str = str.replace("{8}", '已过期');
		}else if(item.user_card_status=='GIFTING'){
			str = str.replace("{8}", '转赠中');
		}else if(item.user_card_status=='GIFT_SUCC'){
			str = str.replace("{8}", '转赠成功');
		}else if(item.user_card_status=='GIFT_TIMEOUT'){
			str = str.replace("{8}", '转赠超时');
		}else if(item.user_card_status=='UNAVAILABLE'){
			str = str.replace("{8}", '已失效');
		}else if(item.user_card_status=='INVALID_SERIAL_CODE'){
			str = str.replace("{8}", 'code未被添加或被转赠领取');
		}else if(item.user_card_status=='DELETE'){
			str = str.replace("{8}", '已删除');
		}
		
		var del_str="<a href='javascript:void(0)' data-action='user_card_unavailable'>作废</a> | ";
		var sync_str="<a href='javascript:void(0)' data-action='user_card_sync'>同步</a> | ";
		var consumed_str="<a href='javascript:void(0)' data-action='user_card_consumed'>核销</a>";
		var update_meeting_str="<a href='javascript:void(0)' data-action='update_meeting_ticket_show'>更新</a> | ";
		if(item.user_card_status=='NORMAL'){
			var operation_str="";
			if('MEETING_TICKET'==user_card_list.card.card_type){
				operation_str+=update_meeting_str;
			}
			str = str.replace("{5}",operation_str+del_str+sync_str+consumed_str);
		}else if(item.user_card_status=='CONSUMED'){
			str = str.replace("{5}",sync_str);
		}else if(item.user_card_status=='EXPIRE'){
			str = str.replace("{5}",sync_str);
		}else if(item.user_card_status=='GIFTING'){
			str = str.replace("{5}",sync_str);
		}else if(item.user_card_status=='GIFT_SUCC'){
			str = str.replace("{5}",sync_str);
		}else if(item.user_card_status=='GIFT_TIMEOUT'){
			str = str.replace("{5}",sync_str);
		}else if(item.user_card_status=='UNAVAILABLE'){
			str = str.replace("{5}",sync_str);
		}else if(item.user_card_status=='INVALID_SERIAL_CODE'){
			str = str.replace("{5}",sync_str);
		}else if(item.user_card_status=='DELETE'){
			str = str.replace("{5}",sync_str);
		}
		
		$("#user_card_list_table").append(	str);
	},
	clear : function() {
		$("#user_card_list_table").empty();
	}

}
