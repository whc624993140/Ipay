<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>登录<fmt:message key="page.key325"/>面</title>
    <link rel="stylesheet" href="static/v2/css/commen_login.css" type="text/css"/>
    <link rel="stylesheet" href="static/v2/css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="static/v2/css/compiled/theme_styles.css" type="text/css"/>

</head>
<body class="contain" style="">
  <div class="mains" style="width:100%;height:100%;position:absolute;border-top:6px solid #002b5c;">
    <div class="center_login clearfix">

        <img src="static/v2/img/login_logo.png" style="display:block;height:auto;width:40%; margin-left:25%;"/>

    <form id="loginForm"  class="form-top" action="login" method="post">
    <div class="center-login" style="width:416px;">
    <div class="center-content form-list">
    <div class="form-input">
    <label class="item item-input">
    <span class="input-label"><fmt:message key="page.key487"/>名</span>
    <input type="text" id="username" name="username" class="input-text" value=""  />
    <span class="icon_user"></span>
    </label>
    </div>
    <div class="form-input">
    <label class="item item-input">
    <span class="input-label">密码</span>
    <input type="password" id="password" name="password" class="input-text"/>
    <span class="  icon_key"></span>
    </label>

    </div>
    <!--             <div class="form-input"> -->
    <!--                 <label class="item item-input"> -->
    <!--                     <span class="input-label">验证码</span> -->
    <!--                     <input type="text" name="code" class="input-text1 fl"/> -->
    <!--                     <span class="coder fr"> -->

    <!--                     </span> -->

    <!--                 </label> -->
    <!--             </div> -->

    </div>
    </div>



    <!--     <div class="remember"> -->
    <!--         <input type="checkbox" class="check_rem" checked/>下次自动登录 -->
    <!--     </div> -->
    <a href="javascript:void(0);" class="btn-item">登录</a>
    <%--<div class="btn-group1">--%>
    <%--<a href="javascript:void(0);" class="btn-item1">--%>
    <%--提交--%>
    <%--</a>--%>
    <%--<a href="javascript:void(0);" class="btn-item2">--%>
    <%--重置--%>
    <%--</a>--%>
    <%--</div>--%>
    </form>
    </div>
    </div>



<script type="text/javascript" src="static/v2/js/jquery.min.js"></script>
<script type="text/javascript">
	var alertmessage='${requestScope.shiroErrMsg}';
	if(alertmessage!=''){
		alert(alertmessage);
	}
	
    $(document).ready(function(){
    	if(location.href!=parent.location.href ){
    		top.location.href = location.href; 
    	}
        winHeight();
        $(window).bind("resize",function(){
            winHeight();
        });
        function winHeight(){
            var h = $(window).height();
            $('body').height(h);
        }
        
        $(".btn-item").click(function(){
        	document.getElementById("loginForm").submit();
        })
        document.onkeydown = function(e){
            var ev =document.all?window.event:e;
                if(ev.keyCode == 13){
    document.getElementById("loginForm").submit();
                 }
                }
        $(".btn-item2").click(function(){
        	document.getElementById("loginForm").reset();
        })
        
    })
</script>
</body>
</html>

