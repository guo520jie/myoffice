const imath = require('math.js');

const icom = function () {
    let com = {};

    com.page = function () {
        let pages = getCurrentPages();
        return pages[pages.length - 1];
    } //edn func

    com.pages = function () {
        return getCurrentPages();
    } //edn func

    com.ajax = function (url, data, onSucces = function () { }, onFail = function () { }, method = 'POST') {
        if (url && data) {
            wx.request({
                url: url,
                data: data,
                method: method,
                header: {
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
                success: function success(res) {
                    onSucces(res.data);
                },
                fail: function fail(err) {
                    onFail(err);
                }
            });
        } //end if
    } //end func

    com.get = function (url, data, onSucces = function () { }, onFail = function () { }) {
        this.ajax(url, data, onSucces, onFail, 'GET');
    } //end func

    com.post = function (url, data, onSucces = function () { }, onFail = function () { }) {
        this.ajax(url, data, onSucces, onFail, 'POST');
    } //end func

    com.toggle = function (show, showKey, animationKey, animationClass, animationTime) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        if (showKey) {
            if (animationKey && animationClass && animationTime > 0) {
                if (show) {
                    page.setData({
                        [showKey]: show,
                        [animationKey]: 'showTransparent'
                    });
                    setTimeout(function () {
                        page.setData({
                            [animationKey]: animationClass
                        });
                    }, 20);
                } //edn if
                else {
                    page.setData({
                        [animationKey]: animationClass
                    });
                    setTimeout(function () {
                        page.setData({
                            [showKey]: show
                        });
                    }, animationTime);
                } //edn else
            } //edn if
            else {
                page.setData({
                    [showKey]: show
                });
            } //end else
        } //end if
    } //end func

    com.show = function (showKey, animationKey, animationClass = 'fadeIn', animationTime = 350) {
        this.toggle(true, showKey, animationKey, animationClass, animationTime);
    } //end func

    com.hide = function (showKey, animationKey, animationClass = 'fadeOut', animationTime = 300) {
        this.toggle(false, showKey, animationKey, animationClass, animationTime);
    } //end func

    com.loadBox = function (show = true, loadBox = 'loadBox') {
        if (show) {
            this.show(loadBox);
        } //edn if
        else {
            com.hide(loadBox);
        } //edn else
    } //end func

    com.loading = function (title = '') {
        let opts = {
            title: title,
            mask: true
        };
        wx.showLoading(opts);
    } //end func

    com.loadingHide = function () {
        wx.hideLoading();
    } //end func

    com.sign = function (title = '', icon = 'none', duration = 1000, callback = function () { }) {
        let opts = {
            title: title,
            icon: icon,
            duration: duration,
            mask: true
        };
        wx.showToast(opts);
        setTimeout(callback, duration);
    } //end func

    com.signHide = function () {
        wx.hideToast();
    } //end func

    com.alert = function (content = '', callback = function () { }) {
        let opts = {
            content: content,
            success: callback,
            showCancel: false
        };
        wx.showModal(opts);
    } //end func

    com.dilaog = function (options = {}) {
        let opts = {};
        let defaults = {
            title: '',
            content: '',
            showCancel: true,
            cancelText: '??????',
            cancelColor: '#000000',
            confirmText: '??????',
            confirmColor: '#3CC51F'
        };
        Object.assign(opts, defaults, options);
        wx.showModal(opts);
    } //end func

    com.actionSheet = function (options = {}) {
        wx.showActionSheet(options);
    } //end func

    com.getBound = function (selector, callback = function () { }) {
        if (selector && selector != '') {
            wx.createSelectorQuery().select(selector).boundingClientRect((rect) => {
                callback(rect);
            }).exec();
        } //end if
    } //end func

    com.getUrl = function (url = '', canBack = false) {
        if (url != '') {
            if (canBack) {
                wx.navigateTo({
                    url: url
                });
            } //edn if
            else {
                wx.redirectTo({
                    url: url
                });
            } //edn if
        } //edn if
    } //end func

    com.backUrl = function (delta = 1) {
        wx.navigateBack({
            delta: delta
        });
    } //end func

    com.reLaunch = function (url = '../index/index') {
        wx.reLaunch({
            url: url
        });
    } //end func

    com.checkStr = function (str = '', type = 0) {
        if (str != '') {
            let reg;
            switch (type) {
                case 0:
                    reg = new RegExp(/^1\d{10}$/); //??????????????????
                    break;
                case 1:
                    reg = new RegExp(/^\d{6}$/); //6??????????????????
                    break;
                case 2:
                    reg = new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/); //??????EMAIL
                    break;
                case 3:
                    reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/); //???????????????
                    break;
                case 4:
                    reg = new RegExp(/^\d+$/); //?????????0-9?????????
                    break;
                case 5:
                    reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/); //??????????????????????????????
                    break;
                case 6:
                    reg = new RegExp(/^\w+$/); //??????????????????26????????????????????????????????????????????????
                    break;
                case 7:
                    reg = new RegExp(/^[\u0391-\uFFE5]+$/); //????????????
                    break;
                case 8:
                    reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/); //???????????????????????????
                    break;
            } //end switch
            if (reg.exec(str)) return true;
            else return false;
        } //end if
        else return false;
    } //end func

    com.trim = function (str = '') {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    } //end func

    com.storage = function (key, value) {
        if (key) {
            if (value != null && value != undefined) {
                wx.setStorageSync(key, value);
            } //edn func
            else {
                return wx.getStorageSync(key);
            } //end else
        } //edn if
    } //end func

    com.removeStorage = function (key) {
        if (key) wx.removeStorageSync(key);
    } //end func

    com.clearStorage = function () {
        wx.clearStorage();
    } //end func

    com.storageInfo = function () {
        return wx.getStorageInfoSync();
    } //end func

    com.shake = function (xName, yName, options) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        console.log(xName + '/' + yName);
        if (xName && yName) {
            let defaults = {
                rx: 5,
                ry: 5,
                delay: 33,
                now: 0,
                max: 5,
                restore: true
            };
            let opts = {};
            Object.assign(opts, defaults, options);
            console.log(opts);
            let x = imath.randomRange(-opts.rx, opts.rx);
            let y = imath.randomRange(-opts.ry, opts.ry);
            console.log(x + '/' + y);
            page.setData({
                [xName]: x + 'px',
                [yName]: y + 'px'
            });
            opts.now++;
            if (opts.now > opts.max) {
                if (opts.restore) {
                    page.setData({
                        [xName]: 0,
                        [yName]: 0
                    });
                } //edn if
                if (opts.onComplete) opts.onComplete();
            } //end if
            else setTimeout(com.shake, opts.delay, xName, yName, opts);
        } //end if
    } //end func

    com.vibrate = function (long = true) {
        if (long) {
            wx.vibrateLong();
        } //end if
        else {
            wx.vibrateShort();
        } //end else
    } //end func

    com.clipboardData = function (vc, callback = function () { }) {
        if (vc != null) {
            wx.setClipboardData({
                data: vc,
                success: callback
            })
        } //end if
        else if (typeof (vc) === 'function') {
            wx.getClipboardData({
                success: function (res) {
                    vc(res.data);
                }
            })
        } //end else
    } //end func

    com.setData = function (data) {
        let pages = getCurrentPages();
        pages[pages.length - 1].setData(data);
    } //end func

    com.animation = function (style = '', name = '', duration = 1000, timingFunction = 'ease', delay = 0, iterationCount = 1, direction = 'normal', fillMode = 'forwards', callback = function () { }) {
        if (style != '' && name != '') {
            let pages = getCurrentPages();
            let page = pages[pages.length - 1];
            let css = '';
            css += 'animation-name:' + name + ';';
            css += 'animation-duration:' + duration + 'ms;';
            css += 'animation-timing-function:' + timingFunction + ';';
            css += 'animation-iteration-count:' + iterationCount + ';';
            css += 'animation-direction:' + direction + ';';
            css += 'animation-fill-mode:' + fillMode + ';';
            page.setData({
                [style]: css
            });
            setTimeout(callback, duration + delay);
        } //end if
    } //end func

    com.timeRange = function (today, start, end) {
        let list = today.split('/');
        let isBefore, isAfter;
        for (let i = 0; i < list.length; i++) {
            list[i] = parseInt(list[i]);
        } //edn if
        if (start) {
            isBefore = (list[0] < start[0]) || (list[0] == start[0] && list[1] < start[1]) || (list[0] == start[0] && list[1] == start[1] && list[2] < start[2]);
        } //end if
        if (end) {
            isAfter = (list[0] > end[0]) || (list[0] == end[0] && list[1] > end[1]) || (list[0] == end[0] && list[1] == end[1] && list[2] >= end[2]);
        } //edn if
        if (isBefore) return ('before');
        else if (isAfter) return ('after');
        else return ('in');
    } //edn func

    //??????????????????
    com.imageLoad = function (src, onComplete = function () { }, onProgress = function () { }) {
        let list = [];
        let loaded = 0;
        if (src) {
            if (typeof (src) === 'string' && src != '') {
                list = [src];
            } //edn if
            else if (typeof (src) === "object" && src.constructor && src.length > 0) {
                for (let i = 0; i < src.length; i++) {
                    if (src[i] && src[i] != '') {
                        list.push(src[i]);
                    } //edn if
                } //edn for
            } //end else
            images_load();
        } //end if
        function images_load() {
            for (let i = 0; i < list.length; i++) {
                image_load(i);
            } //edn for
        } //edn func
        function image_load(id) {
            wx.getImageInfo({
                src: list[id],
                success(res) {
                    loaded++;
                    if (loaded == list.length) {
                        onProgress(100);
                        onComplete(src);
                    } //edn if
                    else {
                        onProgress(Math.floor(loaded / list.length * 100));
                    } //edn else
                }
            });
        } //edn func
    } //end func

    //???????????????????????????,?????????canvas???????????????????????????
    com.imageDownload = function (src, onComplete = function () { }, onProgress = function () { }) {
        let list = [];
        let path = [];
        let loaded = 0;
        if (src) {
            if (typeof (src) === 'string') {
                list = [src];
            } //edn if
            else if (typeof (src) === "object" && src.constructor && src.length > 0) {
                for (let i = 0; i < src.length; i++) {
                    list.push(src[i]);
                } //edn for
            } //end else
            images_load();
        } //end if
        function images_load() {
            for (let i = 0; i < list.length; i++) {
                if (list[i].indexOf('wxfile://') != -1 || list[i].indexOf('tmp/') != -1) {
                    image_jump(i);
                } else {
                    image_load(i);
                }
            } //end for
        } //edn func
        function image_jump(id) {
            path[id] = list[id];
            load_add();
        }//edn func
        function image_load(id) {
            wx.downloadFile({
                url: list[id],
                complete(res) {
                    if (res.statusCode === 200) {
                        path[id] = res.tempFilePath;
                    } else {
                        console.log('error code:' + res.statusCode);
                    }
                    load_add();
                }
            });
        } //edn func
        function load_add() {
            loaded++;
            if (loaded == list.length) {
                onProgress(100);
                onComplete(path);
            } //edn if
            else {
                onProgress(Math.floor(loaded / list.length * 100));
            } //end else
        }//edn func
    } //end func

    //?????????????????????
    com.imageSave = function (file, callback) {
        if (file) {
            if (file.indexOf('wxfile://') != -1 || file.indexOf('tmp/') != -1) {
                saveFile(file);
            }//edn if
            else {
                downLoadFile(file);
            }//end else
        }//edn if

        function downLoadFile(file) {
            wx.downloadFile({
                url: file,
                success: function (res) {
                    saveFile(res.tempFilePath);
                },
                fail: function () {
                    console.log('download image fail')
                }
            });
        }//edn func

        function saveFile(file) {
            wx.saveImageToPhotosAlbum({
                filePath: file,
                success: function (res) {
                    if (callback) {
                        callback();
                    } else {
                        com.alert('??????????????????????????????');
                    }
                },
                fail: function (res) {
                    console.log('save image fail')
                }
            });
        }//edn func

    } //edn func

    //hover??????
    com.hover = function (hoverClass = '', hoverClassName = '', callback = function () { }, delay = 200) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        if (hoverClass != '' && hoverClassName != '') {
            page.setData({
                [hoverClass]: hoverClassName
            });
            setTimeout(function () {
                page.setData({
                    [hoverClass]: ''
                });
                callback();
            }, delay);
        } //end if
    } //end func

    //???????????????????????????
    com.textToMulti = function (str, col) {
        if (str != '' && col > 1) {
            if (str.length > col) {
                let strs = [];
                var line = Math.ceil(str.length / col);
                console.log('line:' + line);
                for (var i = 0; i < line; i++) {
                    if (i < line - 1) strs.push(str.substr(i * col, col));
                    else strs.push(str.substr(i * col));
                } //edn for
                return strs;
            } //end if
            else {
                return [str];
            }//end else
        }//edn if
        else return [];
    } //edn func

    return com;
};

module.exports = icom();