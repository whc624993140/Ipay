//本页面只用作一般页面初始化，如果有特殊需求，清自行参考API编写
var wconfig={
		config:{
			initLockTopScreen:true,
			initUrl:'wx/support/jssdk/config.json',
			initType:'json',
			configUrl:null,
			debug:false,
			jsApiList:['addCard','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','hideMenuItems','hideOptionMenu'],
			ready:function(){},
			error:function(){}	
		},
		menu:{
			hideall:true,
			hideItems:[]
		},
		share:{
			defined:false,
			param:{
    			success: function () {},
    			cancel: function () {}
    		}
		}
};


var wechat={
		init:function(params){
			try{
			if(params){
				extend(wconfig,params,true);
			}
				wechat.config();
			}catch(e){
				alert(e);
			}
		},config:function(){
			if(wconfig.config.initLockTopScreen){
					LockTopScreen();
			}
			wx.ready(function(){
				if(wconfig.config.initLockTopScreen){
					unLockTopScreen();
				}
				wconfig.config.ready();
				wechat.process();
			});
			wx.error(function(res){
				if(wconfig.config.initLockTopScreen){
					unLockTopScreen();
				}
				wconfig.config.error();
			});
			if(!wconfig.config.configUrl){
				wconfig.config.configUrl=location.href.split('#')[0];
			}
			if(wconfig.config.initType=='json'){
				$.ajax({  
		            type:'get',  
		            traditional :true,  
		            url:wconfig.config.initUrl,  
		            data:{url:wconfig.config.configUrl},  
					success:function(json) {
						wechat.wxInitConfigCallBack(json);
					},error:function(XMLHttpRequest, textStatus, errorThrown){
						 alert(XMLHttpRequest.status);
					},
					dataType: "json"
				});
			}else if(wconfig.config.initType=='jsonp' ){
				$.ajax({
					 url:wconfig.config.initUrl,
					 dataType:"jsonp",
					 jsonp:"jsonpcallback",
					 data:{url:wconfig.config.configUrl},  
					 success:function(json){
						wechat.wxInitConfigCallBack(json);
					 },error:function(XMLHttpRequest, textStatus, errorThrown){
						 alert(XMLHttpRequest.status);
					}
				});   
			}
		},wxInitConfigCallBack:function(json){
			if(!json.success){
				alert(json.errmsg);
			}
			wconfig.config.jsApiList.push('showOptionMenu');
			wx.config({
	    		debug: wconfig.config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	   	 		appId: json.data.appid, // 必填，公众号的唯一标识
	    		timestamp: json.data.timestamp, // 必填，生成签名的时间戳
	    		nonceStr:json.data.nonceStr, // 必填，生成签名的随机串
	   			signature: json.data.signature,// 必填，签名，见附录1
	    		jsApiList:wconfig.config.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		},process:function(){
			wechat.processMenu();
			wechat.processShare();
		},processMenu:function(){
			var config=wconfig.menu;
			if(config.hideall){
				wx.hideOptionMenu();
				return;
			}else{
				wx.showOptionMenu();
			}
			if(config.hideItems.length>0){
				wx.hideMenuItems({
	    			menuList: config.hideItems // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				});
			}
		},processShare:function(){
			if(!wconfig.share.defined){
				return ;
			}
			var params={};
			extend(params,wconfig.share.param,true);
			wx.onMenuShareTimeline(params);
			wx.onMenuShareAppMessage(params);		
			wx.onMenuShareQQ(params);
			wx.onMenuShareWeibo(params);	
		}
}

var cardConfig={
	initUrl:'wx/support/jssdk/cards.json',
	cardids:[],
	codes:[],
	success: function (res) {},
	fail: function () {}
}

var wechatCard={
	get:function(params){
		if(params){
			extend(cardConfig,params,true);
		}
		if(cardConfig.cardids.length==0){
			alert("cardid is empty");
			return ;
		}
		
		$.ajax({  
            type:'post',  
            traditional :true,  
            url:cardConfig.initUrl,  
            data:{cardids:cardConfig.cardids,cardCode:cardConfig.codes},  
			success:function(json) {
				if(!json.success){
					alert(json.errmsg);
					return;
				}
				wx.addCard({
					cardList:json.data, // 需要添加的卡券列表
					success: function (res) {
    					cardConfig.success(res);
					},fail: function (res) {
						cardConfig.fail();
					}
				});
			},
			dataType: "json"
		});
	}
}
 
 





