

/**
 * YDUI 可伸缩布局方案
 * rem计算方式：设计图尺寸px / 100 = 实际rem  例: 100px = 1rem
 */
!function (window) {

    /* 设计图文档宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* 添加倍屏标识，安卓为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);

/*消息提示弹框*/       
function showToast(text, duration, icon, callback) {
    var _box = '<div class="showModal_box">'+text+'</div>';
    if (icon) {
      var _iconType = 'icon-weibiaoti14';
      if (icon == "loading") { _iconType = 'icon-jiazaizhong1'; }
      _box = '<div class="showModalBox iconBox">'+  
                '<i class="iconfont '+_iconType+'"></i>'+
               '<p>'+text+'</p >'+ 
              '</div>';    
    }
    var _str = '<div id="showModal">'+ _box +'</div>';
    $("body").append(_str);
    if (icon && duration === "none") {return;}
    setTimeout(function(){$("#showModal").css("zIndex", 9999).fadeOut(400,function(){$("#showModal").remove();if(callback){callback();}});}, duration ? duration : 1500);        
}


//上传照片
var p = $(".apply").prompt21();
$(".show-apply").on("click", function () {
    roll(true);
    let c = $(".flex_content").children();
    p.getData(function (err, data) {
        console.log(data);
        if(verify(data)){ return false; }
        var imgs = '';
        let c = $(".flex_content").children();
        for (let i = 0; i< c.length ;i++){
            if( ($(c[i]).children().eq(0).data('img')==undefined) || ($(c[i]).children().eq(0).data('img')=='') ){
                showToast('请上传完整的个人照片');
                return false;
            };
            imgs += $(c[i]).children().eq(0).data('img') + ',';
        }
        imgs=imgs.slice(0,imgs.length-1);
        roll(false);
        console.log(imgs)
        data.img_path = imgs;
        $('.apply').css({'display':'none'});
        Updata(data,'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/sy_mtxm/public/api/index/leave_information');
        console.log(data)
    });
});
var k = $(".rush").prompt21();

//
$(".show-rush").on("click", function () {
    k.getData(function (err, data) {
        if(verify(data)){ return false; }
        roll(false);
        console.log(data);
        $('.rush').css({'display':'none'});
        Updata(data,'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/sy_mtxm/public/api/index/leave_information_1');
    });
    roll(true);
});

var r = $(".rules").prompt21();
$(".show-rules").on("click", function () {
    r.getData(function (err, data) {
        roll(false);
    });
    roll(true);
});
var c = $(".coupon").prompt21();
$(".show-coupon").on("click", function () {
    c.getData(function (err, data) {
        roll(false);
    });
    roll(true);
});


//正则验证
function verify(data){
    console.log(data.work_number.length);
    //手机号正则
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(data.phone))){ 
        showToast("手机号码有误，请重填");  
        return true; 
    }
    //工号验证
    if(data.work_number.length<8 || data.work_number.length>10 ){ 
        showToast("请输入正确工号"); 
        return true; 
    }
    //邮箱验证
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if( (data.email!=undefined) && (!reg.test(data.email)) ){
        showToast("邮箱格式不正确");
        return true; 
    }
    return false;
}

//监听删除
$(".remove_img").on("click", function () {
    $(this).siblings().eq(0).css("background-image",'');
    $(this).siblings().eq(0).data("img",'');
    $(this).hide();
});
//图片更换触发
$(".img_border").on("click", function () {
    console.log($(this).siblings())
    $(this).siblings().eq(1).trigger("click");
});
//读取图片
$(".imgfile").on("change",function(){
    let $this = this;
    let file = this.files[0];
    // 检查是否是图片
    //添加一层过滤
    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    if(!rFilter.test(file.type)) {
        showToast("文件格式必须为图片");
        return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {    //成功读取文件
        $($this).siblings().eq(0).css("background-image",'url('+e.target.result+')');
        $($this).siblings().eq(1).show();
        updataImg(e.target.result,$this);//上传图片
    };
})



var _top = 0;
var _top2 = 0;
$(window).scroll(function(event){
    _top = $(window).scrollTop();
})
//遮罩滚动
function roll(is){
    
    if(is){
        //document.querySelector('body').addEventListener('touchmove', this.bodyScroll,false);//阻止默认滑动事件
        //$('body').css({'overflow':'hidden'});
        _top2 = _top;
        //$("#app .img_style").css({"marginTop": -_top + 'px'});
        $("body .img_style").css({'filter': "blur(5px)"});
        $("html,body").css({"overflow": "hidden", "height": "100vh"});
   
    }else{
        //document.querySelector('body').removeEventListener('touchmove', this.bodyScroll, false);//浮层关闭时解除事件处理程序
        //$('body').css({'overflow':''});
        $("html,body").css({"overflow": "", "height": "auto"});
        $("html,body").animate({"scrollTop": _top2}, 0);
        //$("#app .img_style").css({"marginTop": 0});
        $("body .img_style").css({'filter': "blur(0px)"});
    }
    
}
function bodyScroll(event){  
    event.preventDefault();  
} 

//图片提交
//ds数据
//url地址
function updataImg(ds,e){
    let event = e;
    console.log($(event).siblings().eq(0))
    $.ajax({
        type: "post",
        url: 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/sy_mtxm/public/api/index/img_upload_base64',
        data: {'file':ds},
        cache: false,
        async : false,
        dataType: "json",
        success: function (data ,textStatus, jqXHR)
        {
            console.log(data);
            //上传图片成功
            if(data.code == 200){
                $(event).siblings().eq(0).data('img',data.data.url);
            }else{
                showToast('上传图片失败，请重新上传图片！');
                $(event).siblings().eq(1).trigger("click");
            }
            return ; 
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {      
            showToast("请求失败！上传图片失败，请重新上传图片！");
            $(event).siblings().eq(1).trigger("click");
        }
    });
    
}

//提交数据
//ds数据
//url地址
function Updata(ds,url){
    $.ajax({
        type: "post",
        url: url,
        data: ds,
        cache: false,
        async : false,
        dataType: "json",
        success: function (data ,textStatus, jqXHR)
        {
            //
            console.log(data);
            //留资成功
            if(data.code == 200){
                callback(data.msg);
            }
            //留资失败
            if(data.code == 400){
                callback(data.msg);
            }
            //工号已存在
            if(data.code == 401){
                callback(data.msg);
            }
            return ; 
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {      
            showToast("请求失败！");
        }
    });
    
}

//数据
function callback(text)
{
    showToast(text);
    $("#save").attr("disabled","disabled");
    $("#save1").attr("disabled","disabled");
    setTimeout(function(){
        window.location.reload();
    },2000)
}

//获取分享配置
$.ajax({url:"http://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=npyINNocxB6kRtw6L0I",success:function(result){
    if(result.data.status == 200){
        let info = JSON.parse(decodeURIComponent(result.data.content.info))
        document.title = info.docTitle;
        //分享标题
        window.Title = info.shareTitle;
        //分享地址
        window.ShareUrl = window.location.href;
        //分享图标
        window.ShareImage = info.shareImg;
        //分享内容
        window.Desc = info.shareContent;
        console.log(parseInt(new Date().getTime()/1000))
        console.log((new Date(info["online-date"].replace(/\-/g, '/')).getTime()/1000))
        if( (new Date(info["online-date"].replace(/\-/g, '/')).getTime()/1000) > (parseInt(new Date().getTime()/1000)) ){
            if(window.location.href.indexOf('127')==-1){
                var vConsole = new VConsole();
            }
        }
        return '';
    }
    showToast("获取信息失败！");
}});


function marginTop(is){
    is ? $(".popup > form").css({"margin-top":"0.5rem"}) : $(".popup > form").css({"margin-top":""});
}