<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/WEB-INF/views/v1/include/JSP.inc" %>
	<%@ include file="/WEB-INF/views/v1/include/CSS.inc" %>
	<title>首页</title>
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
		<div class="pageTitle fl">个人用户中心</div>
		<div class="personalUser">
			<div class="personalUserPhoto fl">
				<img src="images/my.png" alt="" />
			</div>
			<div class="personalUserInfo fl" >
				<p>用户昵称：迪利努尔泰山</p>
				<p>性别：男</p>
				<p>省份：新疆维吾尔族自治区</p>
			</div>
			<div class="personalUserLast fl">
				<p>最后一次互动时间：2015-12-31</p>
			</div>
			<div class="perMessTime">
				<ul>
					<li>发消息次数：<a>3</a></li>
					<li>平均阅读市时长：<a>3</a></li>
					<li>领取卡券：<a>3</a></li>
					<li>使用卡券数量：<a>3</a></li>
				</ul>
			</div>
		</div>
		<div class="perAttentionWay">
			<div class="perAttentionWay_t">关注渠道</div>
			<div class="perAttentionWay_cnt">
				<span>2015-4-18来源于线下推广活动vago活动现场青春傲然扫二维码关注</span>
			</div>
		</div>
		<div class="perAttentionWay">
			<div class="perAttentionWay_t">所属标签</div>
			<div class="perAttentionWay_cnt">
				<span><a>梵高</a><a>吃货</a></span>
			</div>
		</div>
		<div class="perAttentionWay">
			<div class="perAttentionWay_t">用户行为分析</div>
			<div class="perAttentionWay_cnt">
				<canvas id="menuClickCount" width="1024" height="350"></canvas>
			</div>
		</div>
		<div class="personalMask">
			<div class="personalMaskCnt">
				<div class="perClose">
					<i class="icon-remove"></i>
				</div>
				<div class="perMessage">
					<div class="perMessage_t">
						<i class="icon-link"></i>
					</div>
					<input type="text" class='perLink' placeholder='http://'/>
					<div class="perBtnArea">
						<button>模板消息</button>
						<button>回复素材</button>
						<button>发送消息</button>
					</div>
				</div>
				<div class="perRecord">
					<div class="perRecord_t">聊天记录<span>(共999+条)</span>
						<div class="imgOnly">
							<input type="checkbox" />
							仅显示图片消息
						</div>
					</div>
					<ul>
						<li>
							<div class="messImg_per fl">
								<img src="images/my.png" alt="." />
							</div>
							<div class="messCnt_per fl">
								<p>宜家俱乐部测试号</p>
								<a>验证成功！您的公众号已经成功迁移到微信后斯特！</a>
								<div class="messCnt_time">03-18 10:44</div>
							</div>
						<li>
							<div class="messImg_per fl">
								<img src="images/my.png" alt="." />
							</div>
							<div class="messCnt_per fl">
								<p>aaa</p>
								<a>bbb</a>
								<div class="messCnt_time">03-18 10:44</div>
							</div>
						</li>
						<li>
							<div class="messImg_per fl">
								<img src="images/my.png" alt="." />
							</div>
							<div class="messCnt_per fl">
								<p>ccc</p>
								<a>ddd</a>
								<div class="messCnt_time">03-18 10:44</div>
							</div>
						</li>
						<li>
							<div class="messImg_per fl">
								<img src="images/my.png" alt="." />
							</div>
							<div class="messCnt_per fl">
								<p>miss Zhao</p>
								<a>验证成功！您的公众号已经成功迁移到微信后斯特！</a>
								<div class="messCnt_time">03-18 10:44</div>
							</div>
						</li>
						</li>
					</ul>
					
				</div>
				<div class="paging">
					<a href="">首页</a>
					<a href="">上一页</a>
					<a href="">下一页</a>
					<a href="">末页</a>
					<a href="">GO</a>
				</div>
			</div>
			
		</div>
<%@ include file="/WEB-INF/views/v1/include/Javascript.inc" %>
<script src="static/v1/scripts/personalCenter.js"></script>
</body>
</html>