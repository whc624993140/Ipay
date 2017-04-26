$(function() {
	getScript("static/wx/dataexchange/module/config/config.js", function() {
		card_manage.config();
	}, true);
	
	$(document).on('click', '[data-click-action]', function() {
		var actionName = $(this).data('click-action');
		var context = $(this);
		_handle(actionName, context)
	});

	$(document).on('change', '[data-change-action]', function() {
		var actionName = $(this).data('change-action');
		var context = $(this);
		_handle(actionName, context)
	});
	
	$(".wrap").hide();
	$("#baseInfo1").show();
	
	$("input[value='DATE_TYPE_FIX_TIME_RANGE']").click();
	
	$("input[value='CODE_TYPE_QRCODE']").click();
	
	
	
	
	initEvent();
});

function _handle(actionName, context) {
	var fn = actionList[actionName];
	if (fn && $.isFunction(fn)) {
		return fn.call(context || window)
	}
}
var actionList = {
	radio_change_brand : function() {
		$('input[data-click-action=radio_change_brand]').each(function() {
			var target = $(this).data("layer");
			if ($(this).is(":checked")) {
				$(target).show();
			} else {
				$(target).hide();
			}
		});
	},
	logo_upload : function() {
		simpleAjaxFileUpload.upload('#file', null, function(data) {
			$("#brand_img_show").attr('src', data.uri);
			$("#brand_img_show").show();
		});
	},
	dropdown_menu : function() {
		var toggle = $(this).attr("data-toggle")
		if ($(toggle).is(":visible")) {
			$(toggle).hide();
		} else {
			$(toggle).show()
		}
	},
	'data-item' : function() {
		var bg = $(this).html();
		$('#bg_color').css('background-color', bg);
		$('#bg_color').html(bg);
		$(this).parent().parent().parent().hide();
	},next:function(){
		var layer = $(this).data("layer");
		$(".wrap").hide();
		if("baseInfo1"==layer){
			$("#baseInfo2").show();
		}else{
			var type=GetQueryString("type");
			if(type){
				$("#"+type.toLocaleLowerCase()+"_div").show();
				$("#sure_div").show();
			}
		}
	},prev:function(){
		var layer = $(this).data("layer");
		$(".wrap").hide();
		if("baseInfo2"==layer){
			$("#baseInfo1").show();
		}else{
			$("#baseInfo2").show();
		}
	},gogogo:function(){
		try{
			var type=GetQueryString("type");
			var cardType = cardAction[type.toLocaleLowerCase()];
			var typeInfo=cardType.call();
			var baseInfo=cardAction.getBaseInfo();
			var condition={baseInfo:baseInfo};
			condition['card_type']=type;
			if('MEETING_TICKET'==type){
				condition['meetingTicket']=typeInfo;
			}
			if('GROUPON'==type){
				condition['groupon']=typeInfo;
			}
			card_manage.create(condition);
		}catch (e) {
			dialogAlertShow('信息错误',e,null,wx_lang.page_key341);
		}
		
	},date_type:function(){
		var val=$(this).val();
		if('DATE_TYPE_FIX_TIME_RANGE'==val){
			$("#fixed_begin_term").attr("disabled","disabled");
			$("#fixed_term").attr("disabled","disabled");
			$("#end_timestamp").attr("disabled","disabled");
			$("#begin_end_timestamp").removeAttr("disabled");
		}else if('DATE_TYPE_FIX_TERM'==val){
			$("#fixed_begin_term").removeAttr("disabled");
			$("#fixed_term").removeAttr("disabled");
			$("#end_timestamp").removeAttr("disabled");
			$("#begin_end_timestamp").attr("disabled","disabled");
		}
	}
}





var card_manage = {
	config : function() {
		var obj = wxmconfig.get([ 'nor_brand', 'nor_card_logo' ]);
		if (obj['nor_brand']) {
			$("[name='nor_brand']").html(obj['nor_brand']);
		}
		if (obj['nor_card_logo']) {
			$("[name='nor_card_logo']").attr('src', obj['nor_card_logo']);
		}
	},create:function(condition){
		card.create(condition,function(data, status, xhr){
			//alert(JSON.stringify(data));
			if (data.success) {
				alert(wx_lang.page_key357);
			} else {
				alert(data.errmsg);
			}
		});
	}
}

















var cardAction={
		getBaseInfo:function(params){
			if(!params){
				params={};
			}
			var brandType=$('input[name="brand"]:checked').val();
			if('nor'==brandType){
				var logo_url =$("img[name='nor_card_logo']").attr("src");
				var brand_name =$("[name='nor_brand']").html();
				isEmpty(logo_url,"logo为空");
				isEmpty(brand_name,"商户名称为空");
				params['logo_url']=logo_url;
				params['brand_name']=brand_name ;
			}else if('new'==brandType){
				var logo_url=$("#brand_img_show").attr("src");
				var brand_name=$("#new_brand_name").val();
				isEmpty(logo_url,"logo为空");
				isEmpty(brand_name,"商户名称为空");
				params['logo_url']=logo_url;
				params['brand_name']=brand_name ;
			}else{
				throw "商户信息不正确";
			}
			var bg_color=$("#bg_color").html();
			params['color']=bg_color;
			
			var title=$("#title").val();
			isEmpty(title,"标题为空");
			params['title']=title;
			
			var sub_title=$("#sub_title").val();
//			isEmpty(sub_title,"副标题为空");
			params['sub_title']=sub_title;
			
			var date_type=$("input[name='date_type']:checked").val();
			var date_info={type:date_type};
			if('DATE_TYPE_FIX_TIME_RANGE'==date_type){
				var begin_timestamp=$("#begin_end_timestamp").data("begin_timestamp");
				var end_timestamp=$("#begin_end_timestamp").data("end_timestamp");
				isEmpty(begin_timestamp,"固定日期区间为空");
				isEmpty(end_timestamp,"固定日期区间为空");
				date_info['begin_timestamp']=new Date(begin_timestamp+" 00:00:00").getTime();
				date_info['end_timestamp']=new Date(end_timestamp+" 23:59:59").getTime();
			}else if('DATE_TYPE_FIX_TERM'==date_type){
				var fixed_term=$("#fixed_term").val();
				var fixed_begin_term=$("#fixed_begin_term").val();
				var end_timestamp=$("#end_timestamp").val();
				if(isEmpty(fixed_term)){
					fixed_term=0;
				}
				if(isEmpty(fixed_begin_term)){
					fixed_begin_term=0;
				}
				date_info['fixed_term']=fixed_term;
				date_info['fixed_begin_term']=fixed_begin_term;
				if(!isEmpty(end_timestamp)){
					date_info['end_timestamp']=new Date(end_timestamp+" 23:59:59").getTime();
				}
			}else{
				throw "卡券有效期"+wx_lang.page_key311+"错误";
			}
			params['date_info']=date_info;
			
			
			if($("#isopen_center").prop("checked")){
				var center_title=$("#center_title").val();
				var center_sub_title =$("#center_sub_title").val();
				var center_url=$("#center_url").val();
				params['center_title']=center_title;
				params['center_sub_title']=center_sub_title;
				params['center_url']=center_url;
			}
			
			if($("#isopen_custom").prop("checked")){
				var custom_url_name=$("#custom_url_name").val();
				var custom_url_sub_title =$("#custom_url_sub_title").val();
				var custom_url=$("#custom_url").val();
				params['custom_url_name']=custom_url_name;
				params['custom_url_sub_title']=custom_url_sub_title;
				params['custom_url']=custom_url;
			}
			
			if($("#isopen_promotion").prop("checked")){
				var promotion_url_name=$("#promotion_url_name").val();
				var promotion_url_sub_title =$("#promotion_url_sub_title").val();
				var promotion_url=$("#promotion_url").val();
				params['promotion_url_name']=promotion_url_name;
				params['promotion_url_sub_title']=promotion_url_sub_title;
				params['promotion_url']=promotion_url;
			}
			
			var sku={};
			var quantity=$("#quantity").val();
			isEmpty(quantity,"库存为空");
			sku['quantity']=quantity;
			params['sku']=sku;
			
			var get_limit=$("#get_limit").val();
			if(isEmpty(get_limit)){
				get_limit=1;
			}
			params['get_limit']=get_limit;
			
			params['can_share']=$("#can_share").prop("checked");
			params['can_give_friend']=$("#can_give_friend").prop("checked");
			var code_type=$("input[name='code_type']:checked").val();
			params['code_type']=code_type;
			
			params['service_phone']=$("#service_phone").val();
			
			var notice=$("#notice").val();
//			isEmpty(notice,"使用提醒为空");
			params['notice']=notice;
			
			var description=$("#description").val();
//			isEmpty(description,"卡券使用说明");
			params['description']=description;
			
			var source=$("#source").val();
//			isEmpty(description,"卡券使用说明");
			params['source']=source;
			return params;
		},meeting_ticket:function(params){
			if(!params){
				params={};
			}
			var meeting_detail=$('#meeting_detail').val();
			var map_url=$('#map_url').val();
			isEmpty(meeting_detail,"会议详情为空");
			params['meeting_detail']=meeting_detail;
			params['map_url']=map_url;
			return params;
		},groupon:function(params){
			if(!params){
				params={};
			}
			var deal_detail=$('#deal_detail').val();
			isEmpty(deal_detail,"团购详情为空");
			params['deal_detail']=deal_detail;
			return params;
		}
}







function initEvent() {

	function titleLenghtNeed(ctl, length, title, tip) {
		var title_input = $.trim($(ctl).val());
		if (title_input == '') {
			$(".warning_title").show();
		}

		if (title_input.match(/[^\x00-\xff]/ig) != null) {
			var title_length = title_input.length;
		} else {
			var title_length = Math.floor(title_input.length / 2);
		}

		if (title_length > length) {
			$(title).show();
			return false
		}

		$(tip).html(title_length);
	}

	function titleLenght(ctl, length, title, tip) {
		var title_input = $.trim($(ctl).val());
		if (title_input.match(/[^\x00-\xff]/ig) != null) {
			var title_length = title_input.length;
		} else {
			var title_length = Math.floor(title_input.length / 2);
		}

		if (title_length > length) {

			$(title).show();
			return false
		}

		$(tip).html(title_length);
	}

	var title_input = $(".title_input").on('blur', function() {
		$('.warning_title').hide();
		titleLenghtNeed($(this), 9, ".warning_title")
	})

	$(".title_input").on('keyup', function() {
		titleLenghtNeed($(this), 9, ".warning_title", ".title_num_item")
	})

	$(".retitle_input").on('blur', function() {

		titleLenght($(this), 18, ".warning_retitle")
	})

	$(".retitle_input").on('keyup', function() {
		titleLenght($(this), 18, ".warning_retitle", ".retitle_num_item")
	});
	
	$("#sub_title").keyup(function(){
	    //这就是输入值的个数
	    var length=this.value.length;
	    if(length<19){
	    	$('.warning_retitle').hide();
	    }
	});
	$(".frm_textarea").on('blur', function() {

		titleLenght($(this), 30, ".textarea_warn")
	})

	$(".frm_textarea").on('keyup', function() {

		titleLenght($(this), 30, ".textarea_warn", ".tip1")

	});
	$("#center_title").keyup(function(){
	    //这就是输入值的个数
	    var length=this.value.length;
	    if(length<6){
	    	$('.textarea_warn4').hide();
	    }
	});
	$("#custom_url_name").keyup(function(){
	    //这就是输入值的个数
	    var length=this.value.length;
	    if(length<6){
	    	$('.textarea_warn42').hide();
	    }
	});
	$("#promotion_url_name").keyup(function(){
	    //这就是输入值的个数
	    var length=this.value.length;
	    if(length<6){
	    	$('.textarea_warn43').hide();
	    }
	});
	$('#title').keyup(function(){
		 var length=this.value.length;
		    if(length<10){
		    	$('.warning_title').hide();
		    }
	})
	$("#center_sub_title").keyup(function(){
	    //这就是输入值的个数
	    var length=this.value.length;
	    if(length<7){
	    	$('.textarea_warn5').hide();
	    }
	});
	$("#custom_url_sub_title").keyup(function(){
	    //这就是输入值的个数
	    var length=this.value.length;
	    if(length<7){
	    	$('.textarea_warn52').hide();
	    }
	});
	$("#promotion_url_sub_title").keyup(function(){
	    //这就是输入值的个数
	    var length=this.value.length;
	    if(length<7){
	    	$('.textarea_warn53').hide();
	    }
	});
	var fre_textarea = $(".fre_textarea").on('blur', function() {
		$('.textarea_warn1').hide();
		titleLenghtNeed($(this), 300, ".textarea_warn1")
	})

	$(".fre_textarea").on('keyup', function() {
		titleLenghtNeed($(this), 300, ".textarea_warn1", ".fre_tip")
	});

	$(".fres_textarea").on('blur', function() {

		titleLenght($(this), 30, ".textarea_warn2")
	})

	$(".fres_textarea").on('keyup', function() {
		titleLenght($(this), 30, ".textarea_warn2", ".fres_tip")

	});
	$("body").on('blur', '.text_img_content', function() {
		$(".textarea_warn3").hide();
		titleLenghtNeed($(this), 5000, ".textarea_warn3")
	})
	$('body').on('keyup', '.text_img_content', function() {
		titleLenghtNeed($(this), 5000, ".textarea_warn3", ".freimg_tip1")
	})
	$('body').on('blur', '.entry_name_input', function() {
		titleLenght($(this), 5, ".textarea_warn4")
	})
	$('body').on('keyup', '.entry_name_input', function() {
		titleLenght($(this), 5, ".textarea_warn4", ".title_num_item6")
	});
	$('body').on('blur', '.entry_name_input2', function() {
		titleLenght($(this), 5, ".textarea_warn42")
	})
	$('body').on('keyup', '.entry_name_input2', function() {
		titleLenght($(this), 5, ".textarea_warn42", ".title_num_item6")
	});
	$('body').on('blur', '.entry_name_input3', function() {
		titleLenght($(this), 5, ".textarea_warn43")
	})
	$('body').on('keyup', '.entry_name_input3', function() {
		titleLenght($(this), 5, ".textarea_warn43", ".title_num_item6")
	});
	$('body').on('blur', '.guide_input', function() {
		titleLenght($(this), 6, ".textarea_warn5")
	})
	$('body').on('blur', '.guide_input2', function() {
		titleLenght($(this), 6, ".textarea_warn52")
	})
	$('body').on('blur', '.guide_input3', function() {
		titleLenght($(this), 6, ".textarea_warn53")
	})

	$('body').on('keyup', '.guide_input', function() {
		titleLenght($(this), 6, ".textarea_warn5", ".title_num_item7")
	});
	$('body').on('keyup', '.guide_input2', function() {
		titleLenght($(this), 6, ".textarea_warn52", ".title_num_item72")
	});
	$('body').on('keyup', '.guide_input3', function() {
		titleLenght($(this), 6, ".textarea_warn53", ".title_num_item73")
	});

	$('.title_input5').on('blur', function() {
		titleLenght($(this), 9, ".textarea_warn6")
	})
	$('.title_input5').on('keyup', function() {
		titleLenght($(this), 9, ".textarea_warn6", ".title_num_item5")
	});

	$(".section_date>li").find('input:radio').on(
			'click',
			function() {
				$(this).prop("checked", $(this).is(":checked")).parent()
						.siblings().find('input:radio').prop("checked", false);
				var date_name = $(this).attr("name")
				if (date_name == 'date_between1') {
					$(this).siblings('input').removeAttr("disabled");
					$(".choose_date_section").show();
				} else {
					$(this).parent().siblings().find('.date_section_dis').attr(
							"disabled", "disabled")
					$(".choose_date_section").hide();
				}
			})

	$("body").on(
			'click',
			'.choose_msg>li>input:radio',
			function() {
				var oIndex = $(this).parent().index();
				$(this).prop("checked", $(this).is(":checked")).parent()
						.siblings().find('input:radio').prop("checked", false);
				$(".choose_cont>div").eq(oIndex).show().siblings().hide();
			})

	$(".store_card>li").find('input:radio').on(
			'click',
			function() {
				$(this).prop("checked", $(this).is(":checked")).parent()
						.siblings().find('input:radio').prop("checked", false);
				var date_name = $(this).attr("name")
				if (date_name == 'appoint') {
					$(this).siblings('button').removeAttr("disabled");
				} else {
					$(this).parent().siblings().find('button').attr("disabled",
							"disabled")
				}
			})

	$(".cancel_card>li").find('input:radio').on(
			'click',
			function() {
				$(this).prop("checked", $(this).is(":checked")).parent()
						.siblings().find('input:radio').prop("checked", false);
				var date_name = $(this).attr("name")
				if (date_name == 'code') {
					$(this).siblings('.code_card').show();
				} else {
					$(this).parent().siblings().find('.code_card').hide();
				}
			});
//
//	$('#reservation').daterangepicker(
//			null,
//			function(start, end) {
//				$("#begin_end_timestamp").val(
//						start.format('YYYY.MM.D') + ' - '
//								+ end.format('YYYY.MM.D'));
//				$("#begin_end_timestamp").data("begin_timestamp",start.format('YYYY/MM/DD') );
//				$("#begin_end_timestamp").data("end_timestamp",end.format('YYYY/MM/DD'));
//			});
//	$('#end_timestamp').datetimepicker({
//        format: 'yyyy/MM/dd',
//        language: 'en',
//        pickDate: true,
//        pickTime: false
//    });

}






