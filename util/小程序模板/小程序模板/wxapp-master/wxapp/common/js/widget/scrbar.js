const imath = require('../base/math.js');
const icom = require('../base/com.js');

//--------------------------------------scroll
function Scrbar() {
    let scrollBound;
    let barBound;
    let contBound;
    let scrollHeight = 0;
    let scrollTop = 0;
    let $page;
    let scrbar = {};

    scrbar.on = function () {
        console.log('scrbar init');
        let pages = getCurrentPages();
        $page = pages[pages.length - 1];
        setTimeout(function () {
            icom.getBound('#scroll', function (rect) {
                scrollBound = rect;
                // console.log('scrollBound', scrollBound);
            });
            // icom.getBound('#scrollBar', function (rect) {
            //     barBound = rect;
            //     console.log('barBound', barBound);
            // });
            scrbar.reset();
            $page.onScroll = onScroll;
        }, 150);

        function onScroll(e) {
            scrollHeight = e.detail.scrollHeight;
            scrollTop = e.detail.scrollTop;
            scroll_handler(scrollHeight, scrollTop);
        }//end event

    }//edn func

    function scroll_handler(scrollHeight, scrollTop = 0) {
        if (scrollHeight > scrollBound.height) {
            // let barHt = barBound.height;//滚动条bar的高度从css里读取
            // let barHt=200;//手动设定滚动条bar的高度
            let barHt = (scrollBound.height / scrollHeight) * scrollBound.height;//滚动条bar高度根据显示区域占内容区域的比例显示
            //  console.log('barHt:' + barHt);
            let barTop = (scrollTop / (scrollHeight - scrollBound.height) * (scrollBound.height - barHt));
            //  console.log('barTop:' + barTop);
            $page.setData({
                barTop: barTop,
                barHt: barHt,
                scrollBarShow: true
            });
        }//end if
        else {
            $page.setData({
                scrollBarShow: false
            });
        }//end else
    }//end func

    scrbar.reset = function () {
        console.log('scrbar reset');
        icom.getBound('#scroll .cont', function (rect) {
            contBound = rect;
            // console.log('contBound', contBound);
            scroll_handler(contBound.height);
        });
    }//edn func

    return scrbar;

}//end class

module.exports = Scrbar;