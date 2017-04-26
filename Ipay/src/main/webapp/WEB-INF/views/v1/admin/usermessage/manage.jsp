<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/CSS.inc" %>
	<title>首页</title>
	<style type="text/css">
		.refresh1{margin-left:130px;height:90px;}
		.refresh2{height:90px;float:left;}
		.refresh-item1,.refresh-item2{font-size:15px;display:inline-block;margin-right:10px;}
		.refresh-line1{line-height:90px;float:left;}
		.refresh-line2{line-height:30px;margin-top:10px;}
		.refresh-line2 p{font-size:13px;}
		#reTime{height:25px;line-height:25px;border:1px solid #ddd;margin-right:10px;}
		#resetre,#stopre{padding:5px 6px;background-color:#002b5c;color:#ffffff;font-size:12px;margin-right:10px;cursor:pointer;border-radius:3px;}
		.refresh-item2 li{float:left;text-align:center;border:1px solid #ddd;margin-right:10px;border-radius:5px;padding:0 10px;background-color:#ffffff;}
		.refresh-left{display:inline-block;line-height:30px;margin-top:-30px;}
        .img_show li{    width: 300px; /* height: 200px; */ border-radius: 4px;border: 1px solid #ddd;margin: 20px; cursor: pointer;position: relative; float: left;}
        #checknews_btn,#clearnews_btn{margin:10px; display: inline-block;padding: 5px 10px;margin-bottom: 0;font-size: 12px;font-weight: 400;line-height: 1.5;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 3px;    background-color: #002b5c;color:#fff;}
	    .itmListOper1{    width: 100%;height: 40px;border-top: 1px solid #ddd;}
        .item_oper{position:relative;height:40px;}

        .btn{
    display: inline-block;
    padding: 5px 10px;
    margin-bottom: 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: #002b5c;
    color: #fff;
    }
    </style>
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
		<div class="pageTitle fl">消息管理</div>
		<div class="refresh1">
		
			<div class="refresh-item1 refresh-line1">
				刷新间隔：<input id="reTime" style='width:50px' value='15'><input type="button" id="resetre" value="重置"><input type="button" id="stopre" value="停止">
				
			</div>
		
			<div class="refresh2">
		
		<ul class="refresh-item2 refresh-line2">
				<li>
					<span id="c1"></span>
					<p>今日新消息</p>
				</li>
				<li>
					<span id="c2"></span>
					<p>今日总消息</p>
				</li>
				<li>
					<span id="c3"></span>
					<p>今日总回复</p>
				</li>
				<!--今日新消息：<span id="c1"></span>&nbsp;&nbsp;今日总消息：<span id="c2"></span>&nbsp;&nbsp;今日总回复：<span id="c3"></span> -->
			</ul>
		</div>
			
		
		</div>
		
		
		<div class="label-body fl">
			<div class="news-left model-fl">
				<div class="news-head news-box">最新消息</div>
				<div class="news-search">
					<input type="text" placeholder="搜索粉丝名称" class="news-box" id="userNickName"/>
					<div class="news-box" style="cursor: pointer" id="searchUser"><i class="icon-search" ></i></div>
				</div>
				<div class="news-users" id="newsuser">
					<ul>
					</ul>
				</div>
				<div class="news-users"   style="font-size:12px;text-align:center;line-height:32px;">
					<span id="userCount">共0条</span>
					<a class="user_fir" >首页</a>
					<a class="user_previous">上一页</a>
					<a class="user_next">下一页</a>
					<a class="user_end">尾页</a>
				</div>
			</div>
			<div class="news-right model-fl">
				<div class="news-head news-box">与<span id="curchouser"></span>对话中</div>
				<div class="news-reply label-body">
<!-- 					<div class="reply-link" id="linkreply"><div><i class="icon-text-width"></i></div></div> -->
				<div class="messgeRelease_t">
				<input type="hidden" id="checktype" value="text" />
				<ul id="reply_mes">
					<li class="messgeRelease_t_liAdd"><i class="icon-text-width"></i><span style="display: none;">文字</span></li>
					<li class="news_msg"><i class="icon-picture"></i><span style="display: none;">图文消息</span></li>
				</ul>
			</div>
					<div id="checktext" class="reply-conent">
						<textarea style="width:100%;height: 100%;border:none;"  placeholder="请输入回复内容" id="textcontent"></textarea>
					</div>
					<div id="checknews" style="display: none;">
						<input value="请选择" id='checknews_btn' type="button"/>
						<input value="清空" id='clearnews_btn' type="button"/>
						<input id="checked_news_hide" type="hidden"/>
                        <ul class="img_show" id="news_show_ul">
                        </ul>
					</div>
				</div>
				<div class="reply-btn label-body">
					<input type="hidden" id="current_openid"></input>
					<ul>
						<li class="reply-choose text">发送消息</li>
<!-- 						<li>回复素材</li> -->
<!-- 						<li>模板消息</li> -->
					</ul>
				</div>
				<div class="news-record">
					<div class="users-desc users-desc-record">
						<div class="users-p1 up">
							<span>聊天记录</span>
<!-- 							<div class="users-time"><input type="checkbox" />仅显示图片消息</div> -->
						</div>
						<div class="users-p2 up">
							<span id="dataCount">共0条</span>
							<a class="page_fir" >首页</a>
							<a class="page_previous">上一页</a>
							<a class="page_next">下一页</a>
							<a class="page_end">尾页</a>
						</div>
					</div>
				</div>
				<div class="msgbox"  id="messages">
				</div>
			</div>
		</div>
		<div class="footer fl">
			<p>&copy;北京爱思赛博提供技术支持</p>
		</div>
		<div class="link-box">
		<div class="box-model">
			<div class="box-head">
				<span>超链接</span>
				<div class="box-cacell-top btncancell">
					<i class="icon-remove-circle"></i>
				</div>
			</div>
			<div class="box-body">
				<div class="box-content"><div>文本内容：</div><input type="text" /></div>
				<div class="box-content"><div>链接内容：</div><input type="text" /></div>
				<div class="box-content"><div>标题：</div><input type="text" /></div>
				<div class="box-content">
<!-- 					是否在新窗口打开：<input type="checkbox" class="box-ckb" /> -->
				</div>
			</div>
			<div class="box-btn">
				<div class="btncancell">取消</div>
				<div class="btnok">确定</div>
			</div>
		</div>
	</div>
	<div class="meng-mask"></div>
	
	
	
<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
<%@ include file="/WEB-INF/views/v1/include/JqueryUI.inc" %>
<link rel="stylesheet" href="static/v1/css/usermessage.css"></link>
<script src="static/v1/scripts/util/checkNews.js"></script>
<script src="static/v1/scripts/usermessage.js"></script>
<script src="static/v1/scripts/util/dialog.js"></script>
</body>
</html>