wx.config({
	debug: false,
	appId: wx_config['appId'],
	timestamp: wx_config['timestamp'],
	nonceStr: wx_config['nonceStr'],
	signature: wx_config['signature'],
	jsApiList: [
		'checkJsApi',
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'onMenuShareQQ',
		'onMenuShareWeibo',
		'onMenuShareQZone',
		'hideMenuItems',
		'showMenuItems',
		'hideAllNonBaseMenuItem',
		'showAllNonBaseMenuItem',
		'translateVoice',
		'startRecord',
		'stopRecord',
		'onVoiceRecordEnd',
		'playVoice',
		'onVoicePlayEnd',
		'pauseVoice',
		'stopVoice',
		'uploadVoice',
		'downloadVoice',
		'chooseImage',
		'previewImage',
		'uploadImage',
		'downloadImage',
		'getNetworkType',
		'openLocation',
		'getLocation',
		'hideOptionMenu',
		'showOptionMenu',
		'closeWindow',
		'scanQRCode',
		'chooseWXPay',
		'openProductSpecificView',
		'addCard',
		'chooseCard',
		'openCard'
	]
});

wx.ready(function() {
	// 2.1监听“分享到朋友”按钮点击、自定义分享内容及分享结果接口
	wx.onMenuShareAppMessage({
		title: window.Title,
		desc: window.Desc,
		link: window.ShareUrl,
		imgUrl: window.ShareImage,
		success: function(res) {
		},
		cancel: function(res) {},
		fail: function(res) {}
	});

	// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
	wx.onMenuShareTimeline({
		title: window.Title,
		desc: window.Desc,
		link: window.ShareUrl,
		imgUrl: window.ShareImage,
		success: function(res) {
		},
		cancel: function(res) {},
		fail: function(res) {}
	});
});

//重写alert 去除网址显示
window.alert  =   function(name) {             
	var  iframe  =  document.createElement("IFRAME");            
	iframe.style.display = "none";            
	iframe.setAttribute("src",  'data:text/plain,');            
	document.documentElement.appendChild(iframe);            
	window.frames[0].window.alert(name);            
	iframe.parentNode.removeChild(iframe);        
}