
const cookie={
    get:function(c_name){
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return false;
    },
    set:function(c_name, value, expiredays){   //保存cookie,删除cookie--->值空(name,value,time)设置过期时间-1
        if(expiredays){
            var exdate = new Date();
            exdate.setDate(exdate.getTime() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            // console.log("cookie is -------------------->");
            // console.log(document.cookie);
        }else{
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + 7);
            document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        }
    },
    clear: function (c_name) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + -1);
        document.cookie = c_name + "=" + escape("") + (";expires=" + exdate.toGMTString());
    }
}
export default cookie;