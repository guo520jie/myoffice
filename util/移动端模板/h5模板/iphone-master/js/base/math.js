//2020.8.26
var imath = importMath();
function importMath() {
    var math = {};

    //获得范围内随机整数
    math.randomRange = function (min, max) {
        var randomNumber;
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    } //end func 
    
    //获得随机英文字母
    math.randomCode = function (len=4, lowercase=false) {
		var result = '';
		for(var i=0;i<len;i++){
	   		var ranNum = imath.randomRange(0,24);
	   		result+=String.fromCharCode((lowercase?97:65)+ranNum);
		}//end for
		return result;
    } //end func 

    //获得随机颜色
    math.randomColor = function () {
        var str = "0123456789abcdef";
        var s = "#";
        for (j = 0; j < 6; j++) s += str.charAt(Math.random() * str.length);
        return s;
    } //end func

    //随机打乱一个数组
    math.randomSort = function (ary) {
        if (ary && ary.length > 1) ary.sort(function () {
            return 0.5 - Math.random();
        });
    } //end func 
    
    //随机获得一个不重复的数组下标
    math.randomIndex = function (self=0,ary=[],repeat=false) {
        if (ary.length > 3){
        	var id=imath.randomRange(0,ary.length-1);
        	if(!repeat){
		    	if(id==self){
		    		id+=Math.random() < 0.5 ? -1 : 1;
		    		id=id<0?ary.length-1:id;
		    		id=id>ary.length-1?0:id;
		    	}//edn if
        	}//edn if
        	return id;
	      }else{
	      	return null;
	      }//end else
    } //end func 

    //随机正负
    math.randomPlus = function () {
        return Math.random() < 0.5 ? -1 : 1;
    } //end func 
    
    //是否在数组里
    math.inArray = function (item=0, ary=[]) {
    	var isIn=false;
    	if(item && ary.length>0){
    		for(var i=0; i<ary.length; i++){
    			if(item==ary[i]){
    				isIn=true;
    				break;
    			}//edn if
    		}//edn for
    	}//edn if
    	return isIn;
    } //end func 

    //等比缩放,分cover模式和contain模式
    math.autoSize = function (aryNum, aryMax, scaleMode) {
        if (scaleMode === 1 || scaleMode === 0) scaleMode = scaleMode === 1 ? 'cover' : 'contain';
        else scaleMode = scaleMode || 'cover';
        var aryNow = [];
        var aryRate = aryNum[0] / aryNum[1];
        aryNow[0] = aryMax[0];
        aryNow[1] = Math.ceil(aryNow[0] / aryRate);
        if (scaleMode == 'height') {
            aryNow[1] = aryMax[1];
            aryNow[0] = Math.ceil(aryNow[1] * aryRate);
        } //edn else if
        else if (scaleMode == 'contain') {
            if (aryNow[1] > aryMax[1]) {
                aryNow[1] = aryMax[1];
                aryNow[0] = Math.ceil(aryNow[1] * aryRate);
            } //end if
        } //edn else if
        else if (scaleMode == 'cover') {
            if (aryNow[1] < aryMax[1]) {
                aryNow[1] = aryMax[1];
                aryNow[0] = Math.ceil(aryNow[1] * aryRate);
            } //end if
        } //edn else if
        else if (scaleMode == 'full') aryNow = [aryMax[0], aryMax[1]];
        return aryNow;
    } //end func

    //缓动函数
    math.ease = function (_now=0, _tar=0, _speed=10, _space=0.1) {
        var _dis = _tar - _now;
        if (Math.abs(_dis) > _space) return _dis / _speed + _now;
        else return _tar;
    } //end func

    //角度转弧度
    math.toRadian = function (degree=0) {
        return degree * Math.PI / 180;
    } //end func 

    //弧度转角度
    math.toDegree = function (radian=0) {
        return radian / Math.PI * 180;
    } //end func 

    //获得2点之间的距离
    math.getDis = function (source, target) {
		if(source && target){
			var lineX = target[0] - source[0];
			var lineY = target[1] - source[1];
			return Math.sqrt(Math.pow(Math.abs(lineX), 2) + Math.pow(Math.abs(lineY), 2));
		}else{
			return null;
		}//end else
    } //end func 

    //获得2点之间的夹角
    math.getDeg = function (source, target) {
		if(source && target){
			var deg;
			if (source[0] == target[0] && source[1] == target[1]) {
			    deg = 0;
			} else {
			    var disX = target[0] - source[0];
			    var disY = target[1] - source[1];
			    deg = Math.atan(disY / disX) * 180 / Math.PI;
			    if (disX < 0) {
			        deg = 180 + deg;
			    }
			    else if (disY < 0) {
			        deg = 360 + deg;
			    }
			} //end else
			return deg;
		}else{
			return null;
		}//end else
    } //end func

    //测试2个jquery对象是否重合
    math.hitTest = function (source, target, scaleX=1, scaleY=1) {
        if (source && target) {
            var pos1 = [source.offset().left + source.outerWidth() * scaleX * 0.5, source.offset().top + source.outerHeight() * scaleY * 0.5];
            var pos2 = [target.offset().left + target.outerWidth() * scaleX * 0.5, target.offset().top + target.outerHeight() * scaleY * 0.5];
            var disX = Math.abs(pos2[0] - pos1[0]);
            var disY = Math.abs(pos2[1] - pos1[1]);
            var disXMin = (source.outerWidth() + target.outerWidth()) * scaleX * 0.5;
            var disYMin = (source.outerHeight() + target.outerHeight()) * scaleY * 0.5;
            if (disX <= disXMin && disY <= disYMin) return true;
            else return false;
        } //end if
        else return false;
    } //end func

    //测试2个带data().x,data().y的jquery对象是否重合
    math.hitObject = function (source, target) {
        if (source && target) {
            var pos1 = [source.data().x + source.outerWidth() * 0.5, source.data().y + source.outerHeight() * 0.5];
            var pos2 = [target.data().x + target.outerWidth() * 0.5, target.data().y + target.outerHeight() * 0.5];
            var disX = Math.abs(pos2[0] - pos1[0]);
            var disY = Math.abs(pos2[1] - pos1[1]);
            var disXMin = (source.outerWidth() + target.outerWidth()) * 0.5;
            var disYMin = (source.outerHeight() + target.outerHeight()) * 0.5;
            if (disX <= disXMin && disY <= disYMin) return true;
            else return false;
        } //end if
        else return false;
    } //end func

    //测试一个点和一个DOM对象是否重合
    math.hitPoint = function (source, target, scaleX=1, scaleY=1) {
        if (source && target) {
            var area = [target.offset().left, target.offset().left + target.outerWidth() * scaleX, target.offset().top, target.offset().top + target.outerHeight() * scaleY];
            if (source[0] >= area[0] && source[0] <= area[1] && source[1] >= area[2] && source[1] <= area[3]) return true;
            else return false;
        } //end if
        else return false;
    } //end func

    //把一个数组转成数字
    math.arrayToInt = function (ary=[]) {
		if(ary.length>0){
			var num = 0;
			for (var i = 0; i < ary.length; i++) num += ary[i] * Math.pow(10, (ary.length - 1 - i));
			return num;
		}else{
			return ary;
		}//end else
    } //end func

    //深度复制
    math.deepClone = function (source) {
        function getClone(_source) {
            var clone = math.dataType(_source) == "array" ? [] : {};
            for (var i in _source) {
                if (math.dataType(_source[i]) != 'object' && math.dataType(_source[i]) != 'array') clone[i] = _source[i];
                else clone[i] = getClone(_source[i]);
            } //end for
            return clone;
        } //edn func
        return getClone(source);
    } //end func

    //判断是数组还是对象
    math.dataType = function (o) {
        if (typeof (o) === 'object') return Array == o.constructor ? 'array' : 'object';
        else return null;
    } //end func

    //获得Object的长度
    math.objectLength = function (obj={}) {
        return Object.keys(obj).length;
    } //end func

    //截取小数点后几位，非四舍五入
    math.float = function (value=0, pt=2) {
        value = value.toString();
        if (value.indexOf('.') == -1) return value;
        else {
            var str1 = value.split('.');
            var str2 = str1[0] + '.' + str1[1].substr(0, pt);
            return Number(str2);
        } //end else
    } //edn func
    
    //给数字加上千分位
    math.thousandNumber = function (n=0) { 
        n = n.toString();
        var re = /\d{1,3}(?=(\d{3})+$)/g;
        var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { return s1.replace(re, "$&,") + s2; });
        return n1;
    }//end fun
	
    //格式化数字，用0补足不足的位数
    math.formatNumber = function (n=0,d=2) { 
        n = n.toString();
		if(n.length<d){
			var s='';
			for(var i=0; i<d-n.length; i++){
				s+='0';
			}//edn for
			s+=n;
			return s;
		}//edn if
		else return n;
    }//end fun
    
    //将毫秒转为天、小时、分、秒，ft参数可以吧数字不足10补0
    math.timeFormat = function (time=0,ft=true) {
        let format = { day:0, hour: 0, minute: 0, second: 0 };
        if (time>0){
            let second = Math.floor(time / 1000);
    		format.day = Math.floor(second / (24 * 60 * 60));
            format.hour = Math.floor((second - format.day * (24 * 60 * 60)) / (60 * 60));
            format.minute = Math.floor((second - format.day * (24 * 60 * 60) - format.hour * (60 * 60)) / 60);
            format.second = second - format.day * (24 * 60 * 60) - format.hour * (60 * 60) - format.minute * 60;
        }//edn if
    	if(ft){
    		format.day = this.formatNumber(format.day);
    		format.hour = this.formatNumber(format.hour);
    		format.minute = this.formatNumber(format.minute);
    		format.second = this.formatNumber(format.second);
    	}//end if
        return format;
    }//edn func
    
    //格式化时间
    math.formatTime = function (date) {
		if(date){
			const year = date.getFullYear()
			const month = date.getMonth() + 1
			const day = date.getDate()
			const hour = date.getHours()
			const minute = date.getMinutes()
			const second = date.getSeconds()
			return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
		}else{
			return null;
		}//end else
    }//end fun
    
    //将颜色值转换成rgb值
    math.colorToRgb = function (color) {
        if (color.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)) {
            var value = color.slice(color.indexOf('#') + 1),
				isShortNotation = (value.length === 3),
				r = isShortNotation ? (value.charAt(0) + value.charAt(0)) : value.substring(0, 2),
				g = isShortNotation ? (value.charAt(1) + value.charAt(1)) : value.substring(2, 4),
				b = isShortNotation ? (value.charAt(2) + value.charAt(2)) : value.substring(4, 6);
            return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
        } //end if
        else return [0, 0, 0];
    } //end func

    //获取路径
    math.path = function (path='') {
        if (path != '') return path.substr(0, path.lastIndexOf('/') + 1);
        else return false;
    } //edn func

    /**
     * 根据高宽数值计算高宽比例
     * @method
     * @param {widch} 宽度数值
     * @param {height} 高度数值
     * @return {vw:vh} 以vw:vh的形式返回比例值
     */
    math.aspect = function (width=0, height=0) {
        var vw = width,
            vh = height,
            vr = gcd(vw, vh);
        function gcd(a, b) {
            return (b == 0) ? a : gcd(b, a % b);
        }
        return vw / vr + ':' + vh / vr;
    } //edn func
    
    //根据日期获得星座名称，传入参数：month:1～12;  day:1～31。
    math.astro = function (month=1,day=1) {
    	var s="摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯";
	  	var arr=[20,19,21,20,21,22,23,23,23,24,23,22];
	  	return s.substr(month*2-(day<arr[month-1]?2:0),2);
    } //edn func
    
    //根据日期获得星座的序列号
    math.astroIndex = function (month=1,day=1) {
    	var arr=[20,19,21,20,21,22,23,23,23,24,23,22];
	  	return month-(day<arr[month-1]);
    } //edn func

    return math;

} //end import