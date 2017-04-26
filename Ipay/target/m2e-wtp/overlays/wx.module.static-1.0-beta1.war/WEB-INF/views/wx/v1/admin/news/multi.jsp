<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<%@ include file="/WEB-INF/views/wx/v1/include/JSP.inc"%>
<%@ include file="/WEB-INF/views/wx/v1/include/CSS.inc"%>
<title><fmt:message key="page.key264"/></title>
</head>
<body>
	<div class="dateTime fr">
		<div class="nowdate fl">
			<div class="nowdate_m1"></div>
			<div class="nowdate_m2"></div>
			<div class="nowdate_m3"></div>
		</div>
		<div class="nowtime fl"></div>
	</div>
	<div class="pageTitle fl"><fmt:message key="page.key87"/></div>
	<input type="hidden" name="OID" id="OID"></input>
	<div class="itMessDisp">

		<div class="fl">
			<div class="itFace itMuch">
				<div class="itFace_t"></div>
				<div class="faceCnt muchFace">
					<i class='icon-pencil'></i>
				</div>
			</div>
			<div class="faceTitleList"></div>
			<div class="addMoreMuch">
				<i class="icon-plus"></i><fmt:message key="page.key149"/>
			</div>

			<button class="allBtn itOneBtnConf"><fmt:message key="page.key331"/></button>


		</div>






		<div class="itListShow fl" style="margin-top: 20px;">
			<div class="itFace_t "><fmt:message key="page.key148"/></div>
			<ul>

			</ul>
			<div style="width: 100%;text-align: center;" class="paging fl">
        			<div id="news_page" class="pager"></div>
       		</div> 
		</div>
	</div>
	</div>
	<%@ include file="/WEB-INF/views/wx/v1/include/Javascript.inc"%>
	<script src="static/wx/module/scripts/multiNews.js"></script>
	<script type="text/javascript">
		var id = '${id}';
		if (id != "") {
			multi.loadData(id);
		}
	</script>
</body>
</html>
