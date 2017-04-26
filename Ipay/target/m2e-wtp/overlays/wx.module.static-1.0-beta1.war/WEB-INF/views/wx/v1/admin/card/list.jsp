<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc"%>
<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc"%>

<title>card list</title>
</head>
<body>

	<div class="wraper">
		<div class="pageTitle"><fmt:message key="page.key14"/></div>
		<div class="new_title">
			<span class="title_item"><fmt:message key="page.key383"/></span><span><input type="text" class="text_input" id="search_title" /> <a href="javascript:void(0)" class="btn_search" data-action="btn_search"><fmt:message key="page.key252"/></a></span>
		</div>
		<div class="new_card_btn">
			<a href="javascript:void(0)" class="btn_search" data-action="new-card" data-layer="#layer">新建卡券</a>
		</div>
		<div class="table_center" id="table_new_card" style="overflow-y:auto;">
			<table class="table" id="card_list_table">
			</table>
		</div>
		<div style="width: 100%;text-align: center;">
        	<div id="qrcode_page" class="pager"></div>
        </div>
  <!--   <div id="card_list_page"></div>
	</div> -->


	<div id="layer" class="layer fade" style="display:none;">
		<div class="modal_layer">
			<div class="layer-content">
				<div class="layer-header">
					<div class="layer-title">创建优惠券</div>
					<a data-layer="#layer" data-action="close" class="close" href="javascript:void(0)">×</a>
				</div>
				<div class="layer-body layer_minH">
					<ul class="layer_ul">
						<li><input type="radio" data-action="radio_card"  data-click="true" >创建普通优惠券
							<div class="card_item">
								<div class="card_item_header">传统优惠券的电子版，可在微信中收购、传播和使用。只可能领取<fmt:message key="page.key214"/>我的卡券自己使用</div>
								<div class="card_item_content">
<!-- 									<label><input type="radio" name="radio_card_normal"><span>折扣券</span><p>可为<fmt:message key="page.key487"/>提供消费折扣</p></label> -->
<!-- 									<label><input type="radio" name="radio_card_normal"><span>代金券</span><p>可为<fmt:message key="page.key487"/>提供抵扣现金服务。可设置成为"满*元，减*元"</p></label> -->
<!-- 									<label><input type="radio" name="radio_card_normal"><span>兑换券</span><p>可为<fmt:message key="page.key487"/>提供消费送赠品服务</p></label> -->
									<label><input type="radio" name="radio_card_normal" value="GROUPON" data-click="true"><span>团购券</span><p>可为<fmt:message key="page.key487"/>提供团购套餐服务</p></label>
									<label><input type="radio" name="radio_card_normal" value="MEETING_TICKET"><span>会议/演出门票</span><p>门票</p></label>
<!-- 									<label><input type="radio" name="radio_card_normal"><span>优惠券</span><p>即"通用券",建议当以上四种无法满足需求时采用</p></label> -->
								</div>
							</div></li>
<!-- 						<li><input type="radio" data-action="radio_card">会员卡 -->
<!-- 							<div class="card_item"> -->
<!-- 								<div class="card_item_header">传统优惠券的电子版，可在微信中收购、传播和使用。只可能领取<fmt:message key="page.key214"/>我的卡券自己使用</div> -->
<!-- 								<div class="card_item_content"> -->
<!-- 									<label><input type="radio"><span>折扣券</span> -->
<!-- 									<p>可为<fmt:message key="page.key487"/>提供消费折扣</p></label><label><input type="radio"><span>代金券</span> -->
<!-- 									<p>可为<fmt:message key="page.key487"/>提供抵扣现金服务。可设置成为"满*元，减*元"</p></label><label><input type="radio"><span>兑换券</span> -->
<!-- 									<p>可为<fmt:message key="page.key487"/>提供消费送赠品服务</p></label><label><input type="radio"><span>团购券</span> -->
<!-- 									<p>可为<fmt:message key="page.key487"/>提供团购套餐服务</p></label> -->
<!-- 								</div> -->
<!-- 							</div></li> -->
<!-- 						<li><input type="radio" data-action="radio_card">朋友的券 -->
<!-- 							<div class="card_item"> -->
<!-- 								<div class="card_item_header">传统优惠券的电子版，可在微信中收购、传播和使用。只可能领取<fmt:message key="page.key214"/>我的卡券自己使用</div> -->
<!-- 								<div class="card_item_content"> -->
<!-- 									<label><input type="radio" name=""><span>折扣券</span> -->
<!-- 									<p>可为<fmt:message key="page.key487"/>提供消费折扣</p></label><label><input type="radio"><span>代金券</span> -->
<!-- 									<p>可为<fmt:message key="page.key487"/>提供抵扣现金服务。可设置成为"满*元，减*元"</p></label><label><input type="radio"><span>兑换券</span> -->
<!-- 									<p>可为<fmt:message key="page.key487"/>提供消费送赠品服务</p></label> -->
<!-- 								</div> -->
<!-- 							</div></li> -->
					</ul>
				</div>
				<div class="layer-footer">
					<a id="sure" data-layer="#layer" data-action="sure" class="btn_search btn_margin" href="javascript:void(0)"><fmt:message key="page.key341"/></a><a data-layer="#layer" data-action="close" class="btn_search btn_margin"
						href="javascript:void(0)"><fmt:message key="page.key405"/></a>
				</div>
			</div>
		</div>
	</div>
	
	<div id="stock_layer" class="layer fade" style="display:none;">
		<div class="modal_layer">
			<div class="layer-content">
				<div class="layer-header">
					<div class="layer-title"><fmt:message key="page.key480"/>库存</div>
					<a data-layer="#stock_layer" data-action="close" class="close" href="javascript:void(0)">×</a>
				</div>
				<div class="layer-body layer_minH">
                    <div class="layer_content" style="font-size:14px;">
   <!--  增加/减少库存:<input type="text" id="stock" class="stock_input" maxlength=10 onkeyup="this.value=this.value.replace(/[^\d]/g,'')"  onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"/>（减少填入负数） -->
             增加/减少库存:<input type="text" id="stock" class="stock_input" maxlength=10 onkeyup="this.value=this.value.replace(/[^\- \d]/g,'')"  onafterpaste="this.value=this.value.replace(/[^\- \d]/g,'')"/>（减少填入负数）
                    </div>

				</div>
				<div class="layer-footer">
					<a data-layer="#stock_layer" data-action="stock_sure" class="btn_search btn_margin" href="javascript:void(0)"><fmt:message key="page.key341"/></a><a data-layer="#stock_layer" data-action="close" class="btn_search btn_margin"
						href="javascript:void(0)"><fmt:message key="page.key405"/></a>
				</div>
			</div>
		</div>
	</div>


	<link rel="stylesheet" href="static/wx/module/css/card/card.css" />
	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc" %>

	<script src="static/wx/dataexchange/module/qr/card/qrcard.js"></script>
	<script src="static/wx/module/scripts/card/list.js"></script>


<script type="text/javascript">
$(document).ready(function(){
    winHeight();
    $(window).bind("resize",function(){
        winHeight();
    })
    function winHeight(){
        var h = $(window).height();
        $(".wraper").height(h-15);
        $("#table_new_card").height(h-280)
    }
    })
</script>
</body>
</html>
