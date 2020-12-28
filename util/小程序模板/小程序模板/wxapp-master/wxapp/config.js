const os = require('common/js/base/os.js');
module.exports = {
    testMode:true,//是否开启本地调试模式，所有ajax请求都将使用本地测试数据
    domain: 'h5.be-x.com', //域名
    shareData: { //默认分享设置
        title: '默认分享文案',
        path: '/pages/index/index',
        imageUrl: '/images/share.jpg'
    },
    navigationStyle: 'custom', //是否开启自定义navigationBar,custom开启，default关闭
    // bgm: 'http://t.cloud.h5-x.com:2018/framework/wxapp/sound/bgm.mp3',//背景音乐的mp3地址，存在就会自动出现背景音乐按钮和相关功能
    userInfoTest:{
        HeadImage: 'https://ugc.elixir.com.cn/ugc/public/index/images/morenheadimg.png',
        NickName: '测试用户',
        Phone:null,
    },
};