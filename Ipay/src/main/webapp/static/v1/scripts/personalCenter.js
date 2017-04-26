function drawVisitorLineChart(canvasID,scale,dataList,horizonalLabel)
{
	//寻找数组最大值，确定纵轴高度
	var maxValue=Math.max.apply(null,dataList);
	var height=Math.floor(maxValue/scale)*50+100;
	//确定横向宽度
	var width=horizonalLabel.length*80;
	var canvas=document.getElementById(canvasID);
	var context=canvas.getContext("2d");
	//添加LineChart背景
	context.beginPath();
	context.moveTo(85,height);
	for(var i=0;i<horizonalLabel.length;i++)
	{
		context.lineTo(85+i*80,height-((dataList[i]/scale)*50));
	}
	context.lineTo(width+5,height);
	context.closePath();
	context.fillStyle='rgba(253,244,243,0.5)';
	context.fill();
	//添加网格线与坐标轴
	context.beginPath();
	context.moveTo(30,height);
	context.lineTo(width+60,height);
	context.closePath();
	context.strokeStyle='rgb(234,234,234)';
	context.lineWidth=2;
	context.stroke();
	context.strokeStyle='rgb(237,237,237)';
	context.lineWidth=1;
	for(var i=0;i<Math.floor(maxValue/scale);i++)
	{
		context.font="200 14px 微软雅黑";
	    context.fillStyle='rgb(167,167,167)';
		context.fillText((i+1)*scale,0,height-(i+1)*50+5);
		horizontalDashlineTo(context,30,height-(i+1)*50,60+width,height-(i+1)*50);
	}

	for(var i=0;i<horizonalLabel.length+1;i++)
	{
		context.beginPath();
		context.moveTo(45+i*80,height);
		context.lineTo(45+i*80,height+8);
		context.strokeStyle='rgb(237,237,237)';
		context.lineWidth=1;
		context.closePath();
		context.stroke();
		verticalDashlineTo(context,45+i*80,0,45+i*80,height);
	}
	context.font="600 15px 微软雅黑";
	context.fillStyle='rgb(167,167,167)';
	for(var i=0;i<horizonalLabel.length;i++)
	{
		context.fillText(horizonalLabel[i],60+i*80,height+30);
	}
	//绘制Line Chart
	context.beginPath();
	context.moveTo(85,height-((dataList[0]/scale)*50));
	context.strokeStyle='rgb(220,97,102)';
	context.lineWidth=2;
	context.stroke();
	for(var i=0;i<horizonalLabel.length;i++)
	{
		context.strokeStyle='rgb(220,97,102)';
		context.lineWidth=2;
		context.lineTo(85+i*80,height-((dataList[i]/scale)*50));
		context.stroke();
	}
	//绘制数据点
	for(var i=0;i<horizonalLabel.length;i++)
	{
		context.beginPath();
		context.arc(85+i*80,height-((dataList[i]/scale)*50),4,0,Math.PI*2,false);
		context.closePath();
		context.fillStyle="rgba(255,255,255,1)";
		context.strokeStyle='rgb(220,97,102)';
		context.lineWidth=3;
		context.fill();
		context.stroke();
		context.font="600 16px 微软雅黑";
	    context.fillStyle='rgb(212,123,127)';
		context.fillText(dataList[i],75+i*80,height-20-((dataList[i]/scale)*50));

	}

}
//绘制横向虚线
function horizontalDashlineTo(context,x1,y1,x2,y2)
{
	context.beginPath();
	var horizontal=Math.floor((x2-x1)/8);
	for(var i=0;i<horizontal;i++)
	{
		context.moveTo(x1+i*8,y1);
		context.lineTo(x1+i*8+4,y2);
	}
	context.moveTo(x1+horizontal*8,y1);
	context.lineTo(x2,y2);
	context.closePath();
	context.stroke();
}
//绘制纵向虚线
function verticalDashlineTo(context,x1,y1,x2,y2)
{
	context.beginPath();
	var vertical=Math.floor((y2-y1)/8);
	for(var i=0;i<vertical;i++)
	{
		context.moveTo(x1,y1+i*8);
		context.lineTo(x2,y1+i*8+4);
	}
	context.moveTo(x1,y1+vertical*8);
	context.lineTo(x2,y2);
	context.closePath();
	context.stroke();
}
drawVisitorLineChart('menuClickCount',10,[20,40,25,6,7],['vago画展','菜单1','菜单2','菜单3','菜单4']);

$(function(){
	//聊天记录里面的滚动条
	$(".perRecord > ul").niceScroll({
		cursorcolor:"rgba(035,052,069,.7)",
		cursoropacitymin:0,
		cursoropacitymax:1,
		touchbehavior:false,
		cursorwidth:"5px",
		cursorborder:"none",
		cursorborderradius:"5px" ,
		scrollspeed:100,
	});
	//点击展开和关闭发消息次数的弹出框
	$('.perMessTime > ul > li > a').click(function(){
		$('.personalMask').show();
	});
	$('.perClose').click(function(){
		$('.personalMask').hide();
	});
});
