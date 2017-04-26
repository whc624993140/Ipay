function include(path) {
	var a = document.createElement("script");
	a.type = "text/javascript";
	a.src = path;
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(a);
}

var extend = function(o, n, override) {
	for ( var p in n) {
		if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) {
			if (typeof o[p] == 'object' && typeof n[p] == 'object') {
				o[p] = extend(o[p], n[p], override)
			} else {
				o[p] = n[p];
			}
		}
	}
	return o;
};

Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function playSound(url) {
	var html = playerAudio(url);
	$("[key='oncePlay']").remove();
	$("body").append(html);
	return;
}

function playMp3(url) {
	var borswer = window.navigator.userAgent.toLowerCase();
	if (borswer.indexOf("ie") >= 0) {
		// IE内核浏览器
		var strEmbed = '<embed name="embedPlay" src="'+ url+ '" autostart="true" hidden="true" loop="false" key="oncePlay"></embed>';
		$("[key='oncePlay']").remove();
		$("body").append(strEmbed);
		var embed = document.embedPlay;

		// 浏览器不支持 audion，则使用 embed 播放
		embed.volume = 100;
		embed.play();
	} else {
		// 非IE内核浏览器
		var strAudio = "<audio id='audioPlay' src='" + url + "' hidden='true' key='oncePlay' loop='false' >";
		$("[key='oncePlay']").remove();
		$("body").append(strAudio);
		var audio = document.getElementById("audioPlay");
		
		// 浏览器支持 audion
		audio.play();
		audio.loop = false;
		audio.addEventListener('ended', function () {  
    		$("[key='oncePlay']").remove();
		}, false);
	}
}

function playerAudio(url) {
	var str = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="1" height="1" key="oncePlay">';
	str += '<param name="src" value="' + url + '">';
	str += '<param name="controller" value="true">';
	str += '<param name="type" value="video/quicktime">';
	str += '<param name="autoplay" value="true">';
	str += '<param name="target" value="myself">';
	str += '<param name="bgcolor" value="black">';
	str += '<param name="pluginspage" value="http://www.apple.com/quicktime/download/index.html">';
	str += '<embed src="'
			+ url
			+ '" autostart="true" width="1" height="1" controller="true" align="middle" bgcolor="black" target="myself" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/index.html" ></embed>';
	str += '</object>';
	return str;
}

var titlemessage = {
	time : 0,
	title : document.title,
	timer : null,

	// 显示新消息提示
	show : function() {
		titlemessage.clear();
		playMp3("static/v1/sound/Cuetone/WindowsSystemCuetone.mp3");
		var title = titlemessage.title.replace("【　　　】", "")	.replace("【新消息】", "");
		// 定时器，设置消息切换频率闪烁效果就此产生
		titlemessage.timer = setInterval(function() {
			titlemessage.time++;
			if (titlemessage.time % 2 == 0) {
				document.title = "【新消息】" + title
			} else {
				document.title = "【　　　】" + title
			}
			;
		}, 1000 // 闪烁时间差
		);
		return [ titlemessage.timer, titlemessage.title ];
	},
	// 取消新消息提示
	clear : function() {
		clearInterval(titlemessage.timer);
		//document.title = titlemessage.title;
	}
};
