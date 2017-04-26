<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
	<%@ include file="/WEB-INF/views/v2/include/JSP.inc" %>
    <meta charset="UTF-8">
    <title>首页</title>
    <link rel="stylesheet" href="static/v2/css/reset.css" type="text/css"/>
    <link rel="stylesheet" href="static/v2/css/commen_login.css" type="text/css"/>
	<style type="text/css">
		.res-img{
    display: block;
    width:100%
    height:auto;
    position: absolute;
    left: 0;
    bottom: 0;
}
.response-img{
    display:inline-block;
}
.home_center{
    position: absolute;
    text-align: center;
    top:50%;
    left:50%;
    z-index: 10;
	</style>
</head>
<body style="width: 100%;background:#fff;">
<div class="home_center">
    <img src="static/v2/img/logo.png" alt="" class="response-img" style="width:220px;"/>

</div>
<script type="text/javascript" src="static/v2/js/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        var home_h = $(".home_center").height();
        var home_w = $(".home_center").width();
        $(".home_center").css("margin-top",-home_h)
        $(".home_center").css("margin-left",-home_w/2)
    })
    
    	var userList = new Array();  
		userList.push({"oid": "12312331","orderNum": "11"});   
		userList.push({"oid": "232323","orderNum": "12"});
		$(function(){
			var params = {
					"problem":"12121需要融资顾问吗12121?",
					"proType":"radio",
					"surveyId":"100010",
					"OID":"e14f257739224119afd26167ae0ba2d6",
					"orderNum":3,
					"checkType":"radio",
					"item":'[{ "value": "需要","related": "2","mark": "1","sentence":""},{"value": "不需要","related": "4","mark": "1","sentence":""},{"value": "其他","related": "","mark": "0","sentence":"请重新再说一遍"}]'
		}
		 	$.ajax({  
			    type: "get", 
			    traditional: true,
			    url: "/surveyweb_v2/login",  
			   // data: JSON.stringify(userList),//将对象序列化成JSON字符串  
			    data : {"username":"123123","password":"4135436456"},
			    dataType:"json",  
			    //contentType : 'application/json;charset=utf-8', //设置请求头信息  
			    success: function(data){  
			        console.info(data); 
			    }
			});  
		})
		
</script>
</body>
</html>
