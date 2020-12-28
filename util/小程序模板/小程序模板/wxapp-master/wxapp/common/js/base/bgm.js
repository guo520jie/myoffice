const ibgm = function () {
    let bgm = {};
    let _this;

    bgm.init=function(src) { //播放背景音乐
        console.log('bgmInit');
        _this=this;
        this.pausedByUser = false;
        this.audio = wx.createInnerAudioContext();
        this.audio.loop = true;
        this.audio.autoplay = true;
        this.audio.src = src;
        this.audio.onPlay(bgm_play);
        this.audio.onPause(bgm_pause);
        this.audio.onStop(bgm_pause);
    }
    bgm.click= function() { //背景音乐按钮控制
        if (_this.audio.paused) {
            _this.audio.play();
            _this.pausedByUser = false;
        } //edn if
        else {
            _this.audio.pause();
            _this.pausedByUser = true;
        } //edn else

    }
    
    bgm.show= function(play = true) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        setTimeout(function() {
            page.bgmBtn.showSet(true);
            page.bgmBtn.playSet(play);
            if(play) _this.audio.play();
        }, 100);

    }
    bgm.hide= function(play = false) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        setTimeout(function() {
            page.bgmBtn.showSet(false);
            page.bgmBtn.playSet(play);
            if(!play) _this.audio.pause();
        }, 100);
    }

    function bgm_play(e) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        console.log(page.bgmBtn)
        setTimeout(function() {
            page.bgmBtn.playSet(true);
        }, 100);
    }
    function bgm_pause(e) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        setTimeout(function() {
            page.bgmBtn.playSet(false);
        }, 100);
    }

    return bgm;

};

module.exports = ibgm();