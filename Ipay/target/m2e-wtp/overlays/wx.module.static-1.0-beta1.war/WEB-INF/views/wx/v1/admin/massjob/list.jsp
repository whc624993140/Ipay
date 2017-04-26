<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc"%>
<%@ include file="/static/normal/skin/normal/css.inc"%>
    <style type="text/css">
        .mar_t{
            margin-top:15px;
        }
		.center{
		text-align:center
	}
        .layer{	position:absolute;width:960px;height:500px;border:1px solid #ccc;background:#efefef; display:none;}
        .layer .tit{ background:#f4f5f9; display:block; height:50px;line-height: 50px;font-size: 16px;text-indent: 35px; cursor:move;}
        .layer .tit i{ float:right; line-height:50px; padding:0 18px;cursor:default;font-size: 24px;}
    </style>
<title>群发任务列表</title>
</head>
<body>
	<div class="wrap">
		<div class="mar_t">
			<table class="table table-hover" tableid=massjob_table>
				<thead>
					<tr class="success">
						<th><fmt:message key="page.key311"/></th>
						<th><fmt:message key="page.key506"/></th>
						<th><fmt:message key="page.key507"/></th>
						<th><fmt:message key="page.key508"/></th>
						<th><fmt:message key="page.key284"/></th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		<div class="mar_t center">
			<div class="pager" form-id="massjob_pager"></div>
		</div>
	</div>
	<div class="layer" id='massjob_record_div'>
		<div class="tit">
			<fmt:message key="page.key97"/><i class="close">×</i>
		</div>
		<div class="wrap">
			<div class="mar_t">
				<table class="table table-hover"  tableid="massjob_record_table" >
					<thead>
						<tr class="success">
							<th><fmt:message key="page.key311"/></th>
							<th><fmt:message key="page.key280"/></th>
							<th><fmt:message key="page.key508"/></th>
							<th>时间</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
	<script src="static/normal/js/normalinit.js"></script>
	<script src="static/normal/js/normal.js"></script>
	<script src="static/normal/js/LockScreen.js"></script>
	<script src="static/normal/js/ajax_plugin.js"></script>
	<script src="static/normal/js/map.js"></script>
	<script src="static/normal/js/dialog.js"></script>
	<script src='static/normal/js/lang/lang_<fmt:message key="page.key0"/>.js'></script>
	<script src="static/normal/js/pager.js"></script>
	<script src="static/normal/skin/normal/js/drag.js"></script>
	<script type="text/javascript">
		$(function() {

			settingActionList(massjobAction);
			massjob.page();
		});

		var massjobAction = {
			'showProcessRecord' : function() {
				var id=$(this).parent().parent().data("id");
				popWin("massjob_record_div");
				$("#massjob_record_div").css("top","10px");
				massjob_record.get(id);
			}
		}
		
		
		var massjob_record = {
				get : function(id) {
					var url = "wx/admin/massjob/" + id + "/record/list.json";
					$.get(url, null, function(json) {
						if (!json.success) {
							dialogAlertShow("", json.errmsg);
							return;
						}
						massjob_record.loadPage(json.data);
					}, "json");
				},
				loadPage : function(datas) {
					massjob_record.clear();
					$(datas).each(function(index) {
						var node = datas[index];
						massjob_record.addNode(node);
					});
				},
				addNode : function(node) {
					var str = "<tr data-id='{98}'  class='success'>"
							+ "<td>{1}</td>" + "<td>{2}</td>" + "<td>{3}</td>"
							+ "<td>{4}</td>" + "</tr>";
					str = str.replace("{98}", node.oid);
					str = str.replace("{1}", node.type);
					str = str.replace("{2}", node.describe);
					str = str.replace("{3}", '');
					str = str.replace("{4}", node.timePoint==""?"":(new Date(node.timePoint)).Format("yyyy-MM-dd hh:mm:ss"));
					$("[tableid=massjob_record_table] > tbody").append(str);
				},
				clear : function() {
					$("[tableid=massjob_record_table] > tbody").empty();
				}
			}

		var massjob = {
			condition : {},
			page : function() {
				$.ajax({
					url : 'wx/admin/massjob/page.json',
					data : massjob.condition,
					cache : false,
					traditional : true,
					type : 'get',
					success : function(data, status, xhr) {
						if (!data.success) {
							dialogAlertShow("", data.errmsg);
							return;
						}
						massjob.clear();
						massjob.loadPage(data.data);
					},
					dataType : 'json'
				});
			},
			loadPage : function(ps) {
				$(ps.items).each(function(index) {
					var node = ps.items[index];
					massjob.addNode(node);
				});
				$("[form-id='massjob_pager']").pager({
					itemCount : ps.totalCount,
					pageSize : ps.pageSize,
					maxButtonCount : 5,
					pageIndex : ps.currentPage - 1,
					backFn : function(p) {
						massjob.conditions.pageNum = p + 1;
						massjob.clear();
						massjob.page();
					}
				});
			},
			addNode : function(node) {
				var str = "<tr data-id='{98}'  class='success'>"
						+ "<td>{1}</td>" + "<td>{2}</td>" + "<td>{3}</td>"
						+ "<td>{4}</td>" + "<td>{5}</td>" + "</tr>";
				str = str.replace("{98}", node.oid);
				str = str.replace("{1}", node.type);
				str = str.replace("{2}", node.sendType);
				str = str.replace("{3}", node.status);
				str = str.replace("{4}", '');
				var linkstr = "<a  data-click='showProcessRecord'  href='javascript:void(0);'><fmt:message key="page.key511"/></a> ";
				str = str.replace("{5}", linkstr);
				$("[tableid=massjob_table] > tbody").append(str);
			},
			clear : function() {
				$("[tableid=massjob_table] > tbody").empty();
			}
		}
	</script>



</body>
</html>
