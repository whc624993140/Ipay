<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
td{border:solid #add9c0; border-width:0px 1px 1px 0px; }
table{border:solid #add9c0; border-width:1px 0px 0px 1px;}
</style>
<table style="border:solid #add9c0; border-width:1px 0px 0px 1px;">
	<#list feedbacks as fb>
	<tr>
		<td style="border:solid #add9c0; border-width:0px 1px 1px 0px; ">${fb.createTime?if_exists?string("yyyy-MM-dd HH:mm:ss")}</td>
		<td style="border:solid #add9c0; border-width:0px 1px 1px 0px; ">${fb.fullName?if_exists?html}</td>
		<td style="border:solid #add9c0; border-width:0px 1px 1px 0px; ">${fb.content?if_exists?html}</td>
    </tr>
    </#list> 
</table>
