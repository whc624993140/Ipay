<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc"%>
<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc"%>
    <link rel="stylesheet" href="static/wx/module/css/card/card.css" />
    <link rel="stylesheet" href="static/normal/thirdparty/bootstrap/daterangepicker/daterangepicker.css" />
<title>card list</title>
    <style type="text/css">
    .layer-content1{padding:15px;list-type:none;}
    .layer-content1 li{
    display:block;
    padding:8px;
    font-size:14px;
    }
    .layer-content1 li label{
    text-align: right;
    min-width: 100px;
    width: 10%;
    display: inline-block;
    height: 33px;
    line-height: 33px;
    }
    .layer-content1 li input{
    margin-left:15px;
    }
    </style>
<script type="text/javascript">
	var cardid='${cardid}';
</script>

</head>
<body>

	<div class="wraper">
		<div class="pageTitle">领卡列表</div>
		<div class="table_center" id="table_list" style="overflow-y:auto;">
			<table class="table" id="user_card_list_table">
			</table>
		</div>
    <div id="user_card_list_page"></div>
	</div>

	
	<div  class="layer fade" id="meeting_ticket_update_div" style="display:none;">
		<div class="modal_layer">
			<div class="layer-content">
				<div class="layer-header">
					<div class="layer-title">更新门票</div>
					<a data-layer="#layer" data-action="update_meeting_ticket_cancel" class="close" href="javascript:void(0)">×</a>
				</div>

				<div class="layer-body layer_minH">
                    <ul class="layer-content1" id="metting_timer">
                        <li><label><fmt:message key="page.key412"/>场时间:</label><input type="text" id="meeting_begin_time" class="text_input"></li>
                        <li><label><fmt:message key="page.key250"/>:</label><input type="text" id="meeting_end_time" class="text_input"></li>
                        <li><label>区域:</label><input type="text" id="meeting_zone" class="text_input"></li>
                        <li><label>入口:</label><input type="text" id="meeting_entrance" class="text_input"></li>
                        <li><label>座位号:</label><input type="text" id="meeting_seat_number" class="text_input"></li>
                    </ul>

				</div>
				<div class="layer-footer">
					<a  data-action="update_meeting_ticket_sure" class="btn_search btn_margin" href="javascript:void(0)"><fmt:message key="page.key341"/></a><a  data-action="update_meeting_ticket_cancel" class="btn_search btn_margin"
						href="javascript:void(0)"><fmt:message key="page.key405"/></a>
				</div>
			</div>
		</div>
	</div>



	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc"%>
	<script src="static/wx/dataexchange/module/card/card.js"></script>
	<script src="static/wx/dataexchange/module/card/usercard.js"></script>
    <script src="static/normal/thirdparty/bootstrap/daterangepicker/moment.js"></script>
    <script src="static/normal/thirdparty/bootstrap/daterangepicker/daterangepicker.js"></script>
	<script src="static/wx/module/scripts/card/codelist.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
        winHeight();
        $(window).bind("resize",function(){
               winHeight();
         })
        function winHeight(){
            var h = $(window).height();
               H = h-170;
            $("#table_list").height(H);
            }


    $('#meeting_begin_time').daterangepicker({
    singleDatePicker: true
    },
    function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    });


    $('#meeting_end_time').daterangepicker({
    singleDatePicker: true
    },
    function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    });
    })
</script>
</body>
</html>
