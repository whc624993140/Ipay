<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc"%>
<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc"%>
<title>card manage</title>

<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />
    <link rel="stylesheet" href="static/wx/module/css/card/card.css" />
    <link rel="stylesheet" href="static/normal/thirdparty/bootstrap/daterangepicker/daterangepicker.css" />
<style type="text/css">
    .cart-liuc1{
    background: url("static/wx/module/images/card/cart-liuc.png") no-repeat;
    height: 28px;
    overflow: hidden;
    width: 480px;
    position:absolute;
    top:2px;
    left:50%;
    margin-left:-240px;
    background-position: 0 0;
    }
    .cart-liuc2{
    background: url("static/wx/module/images/card/cart-liuc.png") no-repeat;
    height: 28px;
    overflow: hidden;
    width: 480px;
    position:absolute;
    top:2px;
    left:50%;
    margin-left:-240px;
    background-position: 0 -28px;
    }
    .cart-liuc3{
    background: url("static/wx/module/images/card/cart-liuc.png") no-repeat;
    height: 28px;
    overflow: hidden;
    width: 480px;
    position:absolute;
    top:2px;
    left:50%;
    margin-left:-240px;
    background-position: 0 -56px;
    }
</style>
</head>

<body>

	<div class="wrap" id="baseInfo1">


		<h3 class="title clearfix">
        <span style="float:left;">基本信息</span>

            <div class="cart-liuc1" style="float:left;">
                 <ul>
                    <li>1.基本信息</li>
                    <li>2.使用设置</li>
                    <li>3.提交审核</li>
                 </ul>
            </div>
       </h3>
		<div class="group_control clearfix">
			<label class="group_label">商户</label>
			<div class="input_msg">
				<div class="msg_name clearfix">
					<span class="input_msg_item"> <input type="radio" name='brand' value="nor" data-click-action="radio_change_brand" data-layer="#normal_brand" checked="checked" /> <span name="nor_brand"></span></span>
					<span class="input_msg_item"> <input type="radio" name='brand' value="new" data-click-action="radio_change_brand" data-layer="#new_brand" /> <span>新建商户<fmt:message key="page.key316"/></span></span>
				</div>
				<div class="msg_com_name">
					<div class="com_msg clearfix" id="normal_brand">
						<img width="80" height="80" name="nor_card_logo" />
						<div class="com_name" name="nor_brand"></div>
					</div>
					<div class="" id="new_brand" style="display: none;">
						<div class="input_com_name">
							<input type="text" placeholder="<fmt:message key="page.key429"/>商户<fmt:message key="page.key316"/>" class="com_input" id="new_brand_name" />
						</div>
						<div class="logo_com_name clearfix">
							<img width="80" height="80" id="brand_img_show" style='display: none;' />
							<div class="upload_logo">
								<input type="button" value="<fmt:message key="page.key129"/>" class="btn_search" /> <input type="file" id="file"
									style="position: absolute; top: 20px; left: 30px; width: 52px; height: 33px; filter: alpha(opacity : 0); opacity: 0; cursor: pointer;" data-change-action="logo_upload" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="group_control">
			<label class="group_label">卡券颜色</label>
			<div class="dropdown_menus">
				<a href="javascript:void(0)" class="dropdown_switch" data-click-action="dropdown_menu" data-toggle="#menu"> <label style="background-color: #63b359" id="bg_color">#63b359</label> <i
					class="arrow"></i>
				</a>
				<div class="dropdown_data_container" style="display: none;" id="menu">
					<ul class="dropdown_data_list">
						<li class="dropdown_data_item tr1td1"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#63b359</a></li>
						<li class="dropdown_data_item tr1td2"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#2c9f67</a></li>
						<li class="dropdown_data_item tr1td3"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#509fc9</a></li>
						<li class="dropdown_data_item tr1td4"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#5885cf</a></li>
						<li class="dropdown_data_item tr1td5"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#9062c0</a></li>
						<li class="dropdown_data_item tr1td6"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#d09a45</a></li>
						<li class="dropdown_data_item tr1td7"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#e4b138</a></li>
						<li class="dropdown_data_item tr1td8"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#ee903c</a></li>
						<li class="dropdown_data_item tr1td9"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#f08500</a></li>
						<li class="dropdown_data_item tr1td10"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#a9d92d</a></li>
						<li class="dropdown_data_item tr1td7"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#dd6549</a></li>
						<li class="dropdown_data_item tr1td8"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#cc463d</a></li>
						<li class="dropdown_data_item tr1td9"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#cf3e36</a></li>
						<li class="dropdown_data_item tr1td10"><a href="javascript:void(0)" onclick="return false" data-click-action="data-item">#5E6671</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="group_control">
			<label class="group_label"><fmt:message key="page.key383"/></label> <span class="group_title_input"> <input type="text" class="title_input caption" maxlength="18" id="title" /> <span class="title_num"> <span
					class="title_num_item">0</span>/9
			</span>
			</span>
			<p class="warning_title" style="display: none;">
				<span>卡券<fmt:message key="page.key316"/>不能为空且长度不超过9个汉字或18个英<fmt:message key="page.key185"/>母</span>
			</p>
			<p class="msg">建议填写优惠券提供的服务或商品<fmt:message key="page.key316"/>，<fmt:message key="page.key280"/>卡券提供的具体优惠</p>
		</div>

		<div class="group_control ">
			<label class="group_label" style="line-height: 15px;">副<fmt:message key="page.key383"/><br /> <span class="choose_fill">(选填)</span></label> <span class="group_retitle_input"> <input type="text" class="retitle_input"
				maxlength="36" id="sub_title" /> <span class="retitle_num"> <span class="retitle_num_item">0</span>/18
			</span>
			</span>
			<p class="warning_retitle" style="display: none;">
				<span>副<fmt:message key="page.key383"/>长度不超过18个汉字或36个英<fmt:message key="page.key185"/>母</span>
			</p>
		</div>

		<div class="group_control clearfix">
			<label class="group_label">有效期</label>
			<ul class="choose_date">
				<li style="margin-top: 0;"><input type="radio" style="margin-top: 1px;" name="date_type" value="DATE_TYPE_FIX_TIME_RANGE" data-click-action="date_type" />固定日期
					<div class="ta_date" id="reservation">
						<input class="date_title" name="reservation" value="" id="begin_end_timestamp"/> <a href="javascript:void (0)" class="opt_sel"> <i class="i_orderd"> </i>
						</a>
					</div>
				</li>
				<li><input type="radio" name="date_type" value="DATE_TYPE_FIX_TERM" data-click-action="date_type" /> 领取后 <input type="text" class="date_select date1" 
					id="fixed_begin_term" /> 天生效,有效天数 <input type="text" class="date_select date2" id="fixed_term"  /> 统一过期时间: <input type="text" class="date_select date1" id="end_time" style="width:100px;"/>
				</li>
			</ul>
		</div>


		<h3 class="title1">自定义入口</h3>
		<div class="group_control clearfix" id="entry_item">

			<div class="add_msg">
				<div class="entry">
					<h3 class="title2">
						顶部居中的按钮<input type="checkbox" id="isopen_center" />
					</h3>
					<div class="group_control1 clearfix">
						<label class="group_label">入口<fmt:message key="page.key316"/></label><span class="group_title_input1"><input type="text" maxlength="10" class="title_input1 entry_name_input" id="center_title"><span
							class="title_num1"><span class="title_num_item6">0</span>/5</span></span>
						<p class="textarea_warn4">
							<span>入口<fmt:message key="page.key316"/>长度不超过5个汉字</span>
						</p>
					</div>
					<div class="group_control1 clearfix">
						<label class="group_label">引导语<span class="choose_fill">(选填)</span></label><span class="group_title_input2"><input type="text" maxlength="12" class="title_input2 guide_input"
							id="center_sub_title"><span class="title_num2"><span class="title_num_item7">0</span>/6</span></span>
						<p class="textarea_warn5">
							<span>引导语长度不超过6个汉字</span>
						</p>
					</div>
					<div class="group_control1 clearfix">
						<label class="group_label"> 点击<fmt:message key="page.key324"/></label>
						<ul class="choose_msg">
<!-- 							<li><input type="radio" checked=""><fmt:message key="page.key187"/></li> -->
<!-- 							<li><input type="radio">卡券货架</li> -->
							<li><input type="radio" checked="checked">网<fmt:message key="page.key325"/><fmt:message key="page.key76"/></li>
						</ul>
						<div class="choose_cont">
<!-- 							<div class="group_control1 clearfix"> -->
<!-- 								<label class="group_label"><fmt:message key="page.key187"/></label><a class="btn_search" href="javascript:void(0)">选择<fmt:message key="page.key187"/></a> -->
<!-- 							</div> -->
<!-- 							<div style="display: none;" class="group_control1 clearfix"> -->
<!-- 								<label class="group_label">卡券货架</label><a class="btn_search" href="javascript:void(0)">选择卡券货架</a> -->
<!-- 							</div> -->
							<div  class="group_control1 clearfix">
								<label class="group_label">网<fmt:message key="page.key325"/><fmt:message key="page.key76"/></label><span class="http_left">http://</span><input type="text" class="retitle_input_link" id="center_url">
							</div>
						</div>
					</div>
				</div>
				<div class="entry">
					<h3 class="title2">
						自定义<fmt:message key="page.key324"/><input type="checkbox" id="isopen_custom" />
					</h3>
					<div class="group_control1 clearfix">
						<label class="group_label">入口<fmt:message key="page.key316"/></label><span class="group_title_input1"><input type="text" maxlength="10" class="title_input1 entry_name_input2" id="custom_url_name"><span
							class="title_num1"><span class="title_num_item6">0</span>/5</span></span>
						<p class="textarea_warn42">
							<span>入口<fmt:message key="page.key316"/>长度不超过5个汉字</span>
						</p>
					</div>
					<div class="group_control1 clearfix">
						<label class="group_label">引导语<span class="choose_fill">(选填)</span></label><span class="group_title_input2"><input type="text" maxlength="12" class="title_input2 guide_input2"
							id="custom_url_sub_title"><span class="title_num2"><span class="title_num_item72">0</span>/6</span></span>
						<p class="textarea_warn52">
							<span>引导语长度不超过6个汉字</span>
						</p>
					</div>
					<div class="group_control1 clearfix">
						<label class="group_label"> 点击<fmt:message key="page.key324"/></label>
						<ul class="choose_msg">
<!-- 							<li><input type="radio" ><fmt:message key="page.key187"/></li> -->
<!-- 							<li><input type="radio">卡券货架</li> -->
							<li><input type="radio" checked="checked">网<fmt:message key="page.key325"/><fmt:message key="page.key76"/></li>
						</ul>
						<div class="choose_cont">
<!-- 							<div style="display: none;" class="group_control1 clearfix"> -->
<!-- 								<label class="group_label"><fmt:message key="page.key187"/></label><a class="btn_search" href="javascript:void(0)">选择<fmt:message key="page.key187"/></a> -->
<!-- 							</div> -->
<!-- 							<div style="display: none;" class="group_control1 clearfix"> -->
<!-- 								<label class="group_label">卡券货架</label><a class="btn_search" href="javascript:void(0)">选择卡券货架</a> -->
<!-- 							</div> -->
							<div  class="group_control1 clearfix">
								<label class="group_label">网<fmt:message key="page.key325"/><fmt:message key="page.key76"/></label><span class="http_left">http://</span><input type="text" class="retitle_input_link" id="custom_url">
							</div>
						</div>
					</div>
				</div>

				<div class="entry">
					<h3 class="title2">
						营销场景自定义<input type="checkbox" id="isopen_promotion" />
					</h3>
					<div class="group_control1 clearfix">
						<label class="group_label">入口<fmt:message key="page.key316"/></label><span class="group_title_input1"><input type="text" maxlength="10" class="title_input1 entry_name_input3" id="promotion_url_name"><span
							class="title_num1"><span class="title_num_item6">0</span>/5</span></span>
						<p class="textarea_warn43">
							<span>入口<fmt:message key="page.key316"/>长度不超过5个汉字</span>
						</p>
					</div>
					<div class="group_control1 clearfix">
						<label class="group_label">引导语<span class="choose_fill">(选填)</span></label><span class="group_title_input2"><input type="text" maxlength="12" class="title_input2 guide_input3"
							id="promotion_url_sub_title"><span class="title_num2"><span class="title_num_item73">0</span>/6</span></span>
						<p class="textarea_warn53">
							<span>引导语长度不超过5个汉字</span>
						</p>
					</div>
					<div class="group_control1 clearfix">
						<label class="group_label"> 点击<fmt:message key="page.key324"/></label>
						<ul class="choose_msg">
<!-- 							<li><input type="radio" ><fmt:message key="page.key187"/></li> -->
<!-- 							<li><input type="radio">卡券货架</li> -->
							<li><input type="radio" checked="checked">网<fmt:message key="page.key325"/><fmt:message key="page.key76"/></li>
						</ul>
						<div class="choose_cont">
<!-- 							<div style="display: none;" class="group_control1 clearfix"> -->
<!-- 								<label class="group_label"><fmt:message key="page.key187"/></label><a class="btn_search" href="javascript:void(0)">选择<fmt:message key="page.key187"/></a> -->
<!-- 							</div> -->
<!-- 							<div style="display: none;" class="group_control1 clearfix"> -->
<!-- 								<label class="group_label">卡券货架</label><a class="btn_search" href="javascript:void(0)">选择卡券货架</a> -->
<!-- 							</div> -->
							<div  class="group_control1 clearfix">
								<label class="group_label">网<fmt:message key="page.key325"/><fmt:message key="page.key76"/></label><span class="http_left">http://</span><input type="text" class="retitle_input_link" id="promotion_url">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="next">
			<a href="javascript:void(0);" class="btn_search btn_azure" id="next" data-click-action="next" data-layer="baseInfo1">下一步</a>
		</div>

	</div>
	<div class="wrap" id="baseInfo2">
		<h3 class="title">

    <span style="float:left;">使用设置</span>

    <div class="cart-liuc2" style="float:left;">
    <ul>
    <li>1.基本信息</li>
    <li>2.使用设置</li>
    <li>3.提交审核</li>
    </ul>
    </div>

    </h3>
		<div class="group_control clearfix">
			<label class="group_label"> 库存 </label> <span class="group_title_input33"> <input type="text" class="title_input3" id="quantity"> <span class="title_num10"> 张 </span>
			</span>
		</div>
		<div class="group_control">
			<label class="group_label" style="line-height: 15px;"> 领取限制<br /> <span class="choose_fill">(选填)</span>
			</label> <span class="group_title_input33"> <input type="text" class="title_input3" id="get_limit"> <span class="title_num10"> 张 </span>
			</span> <span style="margin-left: 25px;"> 每个<fmt:message key="page.key487"/>领券上限，如不填，则默认为1 </span>
		</div>
		<div class="group_control clearfix">
			<ul class="user_link">
				<li><input type="checkbox" id="can_share" /><fmt:message key="page.key487"/>可以分享领券<fmt:message key="page.key76"/></li>
				<li><input type="checkbox" id="can_give_friend" /><fmt:message key="page.key487"/>领券后可转增给<fmt:message key="page.key508"/>好友</li>
			</ul>
		</div>
		<div class="group_control clearfix">
			<label class="group_label"> 核销方式 </label>
			<ul class="cancel_card clearfix">
				<li><input type="radio" name="code_type" value="CODE_TYPE_TEXT" />文本</li>
				<li><input type="radio" name="code_type" value="CODE_TYPE_BARCODE" />一维码</li>
				<li><input type="radio" name="code_type" value="CODE_TYPE_QRCODE" /><fmt:message key="page.key308"/></li>
				<li><input type="radio" name="code_type" value="CODE_TYPE_ONLY_QRCODE" /><fmt:message key="page.key308"/>无code显示</li>
				<li><input type="radio" name="code_type" value="CODE_TYPE_ONLY_BARCODE" />一维码无code显示</li>
				<li><input type="radio" name="code_type" value="CODE_TYPE_NONE" />不显示code和<fmt:message key="page.key464"/>形码<fmt:message key="page.key311"/>，须<fmt:message key="page.key412"/>发者传入"立即使用"自定义cell<fmt:message key="page.key510"/>线上券核销</li>
			</ul>
		</div>

		<h3 class="title1">卡卷<fmt:message key="page.key280"/></h3>

		<div class="group_control">
			<label class="group_label" style="line-height:15px;"> 客服电话 <br><span class="choose_fill">(选填)</span></label> <span class="group_title_input5"> <input type="text"  maxlength="18" id="service_phone" style="width:100%;height:100%;">
			</span>
			<p class="textarea_warn6">
				<span><fmt:message key="page.key284"/><fmt:message key="page.key339"/>长度不超过5个汉字</span>
			</p>
		</div>
		<div class="group_control">
			<label class="group_label"> 使用提醒 </label> <span class="group_title_input5"> <input type="text" class="title_input5" maxlength="18" id="notice"> <span class="title_num5"> <span
					class="title_num_item5">0</span>/9
			</span>
			</span>
			<p class="textarea_warn6">
				<span><fmt:message key="page.key284"/><fmt:message key="page.key339"/>长度不超过5个汉字</span>
			</p>
		</div>

		<div class="group_control">
			<label class="group_label" style="line-height:15px;"> 来源 <br><span class="choose_fill">(第三方来源名)</span><span class="choose_fill">(选填)</span> </label> <span class="group_title_input5"> <input type="text" maxlength="18"  id="source" style="width:100%;height:100%;">
			</span>
			<p class="textarea_warn6">
				<span><fmt:message key="page.key284"/><fmt:message key="page.key339"/>长度不超过5个汉字</span>
			</p>
		</div>
		<div class="group_control">
			<label class="group_label"> 使用说明 </label> <span class="group_title_input5"> 
			<textarea id="description"></textarea> 
			</span>
			<p class="textarea_warn6">
				<span><fmt:message key="page.key284"/><fmt:message key="page.key339"/>长度不超过5个汉字</span>
			</p>
		</div>
		<div class="next">
			<a href="javascript:void(0)" class="btn_search btn_margin defauts" data-click-action="prev" data-layer="baseInfo2">上一步</a> <a href="javascript:void(0);" class="btn_search btn_azure"
				data-click-action="next" data-layer="baseInfo2">下一步</a>
		</div>
	</div>

	<div class="wrap" id="meeting_ticket_div">
    <h3 class="title">

    <div class="cart-liuc3" style="float:left;">
    <ul>
    <li>1.基本信息</li>
    <li>2.使用设置</li>
    <li>3.提交审核</li>
    </ul>
    </div>

    </h3>
		<div class="group_control">
			<label class="group_label"> 会议详情 </label> 
			<span class="group_title_input5"> 
				<textarea id="meeting_detail"></textarea> 
			</span>
		</div>
		<div class="group_control">
			<label class="group_label"> 会场导览图（选填）</label> 
			<span class="group_title_input5"> 
				<input type="text"  id="map_url">
			</span>
		</div>
	</div>
	
	<div class="wrap" id="groupon_div">
    <h3 class="title">

    <div class="cart-liuc3" style="float:left;">
    <ul>
    <li>1.基本信息</li>
    <li>2.使用设置</li>
    <li>3.提交审核</li>
    </ul>
    </div>

    </h3>
		<div class="group_control">
			<label class="group_label"> 团购详情</label> 
			<span class="group_title_input5"> 
				<input type="text"  id="deal_detail">
			</span>
		</div>
	</div>
	
	<div class="wrap" id="sure_div">
		<div class="next">
			<a href="javascript:void(0)" class="btn_search btn_margin defauts" data-click-action="prev" data-layer="sure_div">上一步</a> 
			<a href="javascript:void(0)" class="btn_search btn_margin btn_azure" data-click-action="gogogo">提交审核</a>
		</div>
	</div>




	<%--<link href="//cdn.bootcss.com/bootstrap-daterangepicker/2.1.17/daterangepicker.min.css" rel="stylesheet">--%>
	<%--<link href="//cdn.bootcss.com/bootstrap-datetimepicker/4.17.37/css/bootstrap-datetimepicker-standalone.min.css" rel="stylesheet">--%>
	<%--<link href="//cdn.bootcss.com/bootstrap-datetimepicker/4.17.37/css/bootstrap-datetimepicker.min.css" rel="stylesheet">--%>
	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc"%>
    <script src="static/normal/js/simpleAjaxFileUpload.js"></script>
    <script src="static/wx/dataexchange/module/card/card.js"></script>
    <script src="static/normal/thirdparty/bootstrap/daterangepicker/moment.js"></script>
    <script src="static/normal/thirdparty/bootstrap/daterangepicker/daterangepicker.js"></script>

	<%--<script src="//cdn.bootcss.com/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js"></script>--%>
	<%--<script src="//cdn.bootcss.com/bootstrap-daterangepicker/2.1.17/daterangepicker.min.js"></script>--%>
	<script src="static/normal/js/simpleAjaxFileUpload.js"></script>
	<script src="static/wx/dataexchange/module/card/card.js"></script>
	<script src="static/wx/module/scripts/card/manage.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
    $('#reservation').daterangepicker(null,
    function(start, end) {
    $("#begin_end_timestamp").val(
    start.format('YYYY.MM.D') + ' - '
    + end.format('YYYY.MM.D'));
    $("#begin_end_timestamp").data("begin_timestamp",start.format('YYYY/MM/DD') );
    $("#begin_end_timestamp").data("end_timestamp",end.format('YYYY/MM/DD'));
    });


    $('#end_time').daterangepicker({
    singleDatePicker: true
    },
    function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    });
    });



    	<%--$('#reservation').daterangepicker(--%>
    			<%--null,--%>
    			<%--function(start, end) {--%>
    				<%--$("#begin_end_timestamp").val(--%>
    						<%--start.format('YYYY.MM.D') + ' - '--%>
    								<%--+ end.format('YYYY.MM.D'));--%>
    				<%--$("#begin_end_timestamp").data("begin_timestamp",start.format('YYYY/MM/DD') );--%>
    				<%--$("#end_timestamp").data("end_timestamp",end.format('YYYY/MM/DD'));--%>
    			<%--});--%>
    	<%--$('#end_timestamp').datetimepicker({--%>
            <%--format: 'yyyy/MM/dd',--%>
            <%--language: 'en',--%>
            <%--pickDate: true,--%>
            <%--pickTime: false--%>
        <%--});--%>



    </script>
</body>
</html>
