const idraw = function () {
    let draw = {};
    let canvasId;
    let ctx;

    draw.draw = function (data, callback) {
        canvasId = data.canvasId;
        ctx = wx.createCanvasContext(canvasId);
        ctx.clearRect(0, 0, width, height);
        let width = data.width;
        let height = data.height;
        let list = [];
        if (data.hasOwnProperty('data') && (typeof data.data == 'object') && data.data.length > 0) { // 如果存在draw数据
            list = data.data
            for (let i = 0; i < list.length; i++) {
                let data = list[i]
                let type = data.type || 'image';
                switch (type) {
                    case 'image':
                        draw_image(data);
                        break;
                    case 'imageCircle':
                        draw_imageCircle(data);
                        break;
                    case 'imageRound':
                        draw_imageRound(data);
                        break;
                    case 'text':
                        draw_text(data);
                        break;
                    case 'rect':
                        draw_rect(data);
                        break;
                    case 'rectRound':
                        draw_rectRound(data);
                        break;
                    case 'arc':
                        draw_arc(data);
                        break;
                    case 'path':
                        draw_path(data);
                        break;
                    case 'line':
                        draw_line(data);
                        break;
                } //edn switch

            } //end for
            // 生成图片
            ctx.draw(true, function () {
                wx.canvasToTempFilePath({
                    canvasId: canvasId,
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    destWidth: width,
                    destHeight: height,
                    success: function (res) {
                        callback(res.tempFilePath)
                    },
                    fail: function () {
                        // 导出图片错误
                        wx.showModal({
                            title: '导出图片时出错',
                            content: '请重新尝试！',
                        })
                    },
                    complete: function () { }
                }, this)
            }) //edn draw
        } //edn if
        else {
            console.error('没有绘制数据存在')
        } //end else        
    }

    function draw_image(data) { //绘制图片
        if (data.hasOwnProperty('source') && typeof data.source == 'string' && data.hasOwnProperty('x') && typeof data.x == 'number' && data.hasOwnProperty('y') && typeof data.y == 'number' && data.hasOwnProperty('width') && typeof data.width == 'number' && data.hasOwnProperty('height') && typeof data.height == 'number') {
            ctx.save()
            if (data.shadow) {
                draw_shadow(data.shadow);
            } //edn if
            ctx.drawImage(data.source, data.x, data.y, data.width, data.height)
            ctx.restore()
            if (data.hasOwnProperty('borderColor') && typeof data.borderColor == 'string') {
                let borderWidth = 1;
                if (data.hasOwnProperty('borderWidth') && typeof data.borderWidth == 'number') {
                    borderWidth = data.borderWidth
                }
                ctx.save()
                ctx.setStrokeStyle(data.borderColor)
                ctx.setLineWidth(borderWidth)
                ctx.strokeRect(data.x, data.y, data.width, data.height)
                ctx.restore()
            }
        } //end if
    } //end func

    function draw_imageCircle(data) { //绘制图片
        if (data.hasOwnProperty('source') && typeof data.source == 'string' && data.hasOwnProperty('x') && typeof data.x == 'number' && data.hasOwnProperty('y') && typeof data.y == 'number' && data.hasOwnProperty('radius') && typeof data.radius == 'number') {
            ctx.save()
            //先画个圆 前两个参数确定了圆心 （x,y） 坐标 第三个参数是圆的半径 四参数是绘图方向 默认是false，即顺时针
            ctx.beginPath()
            ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 2, false);
            ctx.clip(); //画好了圆 剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
            ctx.drawImage(data.source, data.x - data.radius, data.y - data.radius, data.radius * 2, data.radius * 2)
            ctx.restore()
            if (data.hasOwnProperty('borderColor') && typeof data.borderColor == 'string') {
                let borderWidth = 1;
                if (data.hasOwnProperty('borderWidth') && typeof data.borderWidth == 'number') {
                    borderWidth = data.borderWidth
                }
                ctx.save()
                ctx.beginPath()
                ctx.arc(data.x, data.y, data.radius, 0, 2 * Math.PI)
                ctx.setStrokeStyle(data.borderColor)
                ctx.setLineWidth(borderWidth)
                ctx.stroke()
                ctx.restore()
            }
        } //end if
    } //end func

    function draw_imageRound(data) { //绘制图片
        if (data.hasOwnProperty('source') && typeof data.source == 'string' && data.hasOwnProperty('x') && typeof data.x == 'number' && data.hasOwnProperty('y') && typeof data.y == 'number' && data.hasOwnProperty('width') && typeof data.width == 'number' && data.hasOwnProperty('height') && typeof data.height == 'number' && data.hasOwnProperty('radius') && typeof data.radius == 'number') {
            if (data.hasOwnProperty('borderColor') && typeof data.borderColor == 'string') {
                let borderWidth = 1;
                if (data.hasOwnProperty('borderWidth') && typeof data.borderWidth == 'number') {
                    borderWidth = data.borderWidth
                }
                console.log('borderWidth:' + borderWidth);
                ctx.save()
                drawRectRound(data.x - borderWidth, data.y - borderWidth, data.width + borderWidth * 2, data.height + borderWidth * 2, data.radius, data.borderColor)
                ctx.restore()
            }
            ctx.save()
            drawRectRound(data.x, data.y, data.width, data.height, data.radius)
            ctx.clip()
            ctx.drawImage(data.source, data.x, data.y, data.width, data.height)
            ctx.restore()
        } //end if
    } //end func

    function draw_rectRound(data) {
        if (data.hasOwnProperty('x') && typeof data.x == 'number' && data.hasOwnProperty('y') && typeof data.y == 'number' && data.hasOwnProperty('width') && typeof data.width == 'number' && data.hasOwnProperty('height') && typeof data.height == 'number' && data.hasOwnProperty('radius') && typeof data.radius == 'number') {
            let borderColor = 'transparent';
            let borderWidth = 1;
            if (data.hasOwnProperty('borderColor') && typeof data.borderColor == 'string') {
                if (data.hasOwnProperty('borderWidth') && typeof data.borderWidth == 'number') {
                    borderWidth = data.borderWidth
                }
            }
            ctx.save()
            drawRectRound(data.x, data.y, data.width, data.height, data.radius, data.color, data.borderColor, borderWidth)
            ctx.restore()
        } //end if
    }//edn func

    function drawRectRound(x, y, w, h, r, fillColor = 'transparent', borderColor = 'transparent', borderWidth = 1) {
        // 开始绘制圆角矩形
        ctx.beginPath()
        ctx.setFillStyle(fillColor)
        if (borderColor != 'transparent') {
            ctx.setLineWidth(borderWidth)
            ctx.setStrokeStyle(borderColor)
        }//edn if
        // 左上角
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
        // border-top
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.lineTo(x + w, y + r)
        // 右上角
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
        // border-right
        ctx.lineTo(x + w, y + h - r)
        ctx.lineTo(x + w - r, y + h)
        // 右下角
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
        // border-bottom
        ctx.lineTo(x + r, y + h)
        ctx.lineTo(x, y + h - r)
        // 左下角
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
        // border-left
        ctx.lineTo(x, y + r)
        ctx.lineTo(x + r, y)
        ctx.closePath()
        // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
        ctx.fill()
        if (borderColor != 'transparent') {
            ctx.stroke()
        }//edn if
    }//edn func

    function draw_text(data) { //绘制文字
		data.text = data.text.toString()
        if (data.hasOwnProperty('text') && typeof data.text == 'string') {
            let color = 'black'
            if (data.hasOwnProperty('textColor') && (typeof data.textColor == 'string')) {
                color = data.textColor
            }
            let font = 35
            if (data.hasOwnProperty('font') && (typeof data.font == 'number')) {
                font = data.font
            }
            let textAlign = 'left'
            if (data.hasOwnProperty('textAlign') && (typeof data.textAlign == 'string')) {
                textAlign = data.textAlign
            }
            let textBaseLine = 'middle'
            if (data.hasOwnProperty('textBaseLine') && (typeof data.textBaseLine == 'string')) {
                textBaseLine = data.textBaseLine
            }
            ctx.save()
            if (data.shadow) {
                draw_shadow(data.shadow);
            } //edn if
            ctx.setFillStyle(color)
            ctx.setFontSize(font)
            ctx.setTextAlign(textAlign)
            ctx.setTextBaseline(textBaseLine)
            ctx.fillText(data.text, data.x, data.y)
            if(data.style=='bold'){
                ctx.fillText(data.text, data.x, data.y+0.5)
                ctx.fillText(data.text, data.x-0.5, data.y)
            }
            if (data.hasOwnProperty('textWeight') && (typeof data.textWeight == 'string') && (data.textWeight == 'blod')) {
                ctx.setStrokeStyle(color)
                ctx.strokeText(data.text, data.x, data.y)
            }
            ctx.restore()
        } //end if
    } //end func

    function draw_rect(data) { //绘制矩形
        if (data.hasOwnProperty('x') && typeof data.x == 'number' && data.hasOwnProperty('y') && typeof data.y == 'number' && data.hasOwnProperty('width') && typeof data.width == 'number' && data.hasOwnProperty('height') && typeof data.height == 'number') {
            if (data.hasOwnProperty('color') && typeof data.color == 'string') {
                ctx.save()
                if (data.shadow && (data.shadow.type == null || data.shadow.type == 'fill')) {
                    draw_shadow(data.shadow);
                } //edn if
                ctx.setFillStyle(data.color)
                ctx.fillRect(data.x, data.y, data.width, data.height)
                ctx.restore()
            }
            if (data.hasOwnProperty('borderColor') && typeof data.borderColor == 'string') {
                let borderWidth = 1;
                if (data.hasOwnProperty('borderWidth') && typeof data.borderWidth == 'number') {
                    borderWidth = data.borderWidth
                }
                ctx.save()
                if (data.shadow && data.shadow.type == 'border') {
                    draw_shadow(data.shadow);
                } //edn if
                ctx.setStrokeStyle(data.borderColor)
                ctx.setLineWidth(borderWidth)
                ctx.strokeRect(data.x, data.y, data.width, data.height)
                ctx.restore()
            }
        } //end if
    } //end func

    function draw_arc(data) { //绘制圆或弧
        if (data.hasOwnProperty('x') && typeof data.x == 'number' && data.hasOwnProperty('y') && typeof data.y == 'number' && data.hasOwnProperty('radius') && typeof data.radius == 'number') {
            let start = 0
            if (data.hasOwnProperty('start') && typeof data.start == 'number') {
                start = data.start
            }
            let end = 360
            if (data.hasOwnProperty('end') && typeof data.end == 'number') {
                end = data.end
            }
            if (data.hasOwnProperty('color') && typeof data.color == 'string') {
                ctx.save()
                ctx.beginPath()
                ctx.arc(data.x, data.y, data.radius, start * Math.PI / 180, end * Math.PI / 180)
                if (data.shadow && (data.shadow.type == null || data.shadow.type == 'fill')) {
                    draw_shadow(data.shadow);
                } //edn if
                ctx.setFillStyle(data.color)
                ctx.fill()
                ctx.restore()
            }
            if (data.hasOwnProperty('borderColor') && typeof data.borderColor == 'string') {
                let borderWidth = 1;
                if (data.hasOwnProperty('borderWidth') && typeof data.borderWidth == 'number') {
                    borderWidth = data.borderWidth
                }
                ctx.save()
                ctx.arc(data.x, data.y, data.radius, start * Math.PI / 180, end * Math.PI / 180)
                if (data.shadow && data.shadow.type == 'border') {
                    draw_shadow(data.shadow);
                } //edn if
                ctx.setStrokeStyle(data.borderColor)
                ctx.setLineWidth(borderWidth)
                ctx.stroke()
                ctx.restore()
            }
        } //edn if
    } //end func

    function draw_line(data) { //绘制连续路径形成得不规则形状
        if (data.hasOwnProperty('x1') && typeof data.x1 == 'number' && data.hasOwnProperty('y1') && typeof data.y1 == 'number' && data.hasOwnProperty('x2') && typeof data.x2 == 'number' && data.hasOwnProperty('y2') && typeof data.y2 == 'number') {
            ctx.beginPath()
            ctx.moveTo(data.x1, data.y1)
            ctx.lineTo(data.x2, data.y2)
            if (data.hasOwnProperty('color') && typeof data.color == 'string') {
                let width = 1;
                if (data.hasOwnProperty('width') && typeof data.width == 'number') {
                    width = data.width
                }
                ctx.save()
                if (data.shadow) {
                    draw_shadow(data.shadow);
                } //edn if
                ctx.setStrokeStyle(data.color)
                ctx.setLineWidth(width)
                ctx.stroke()
                ctx.restore()
            }
        }
    } //end func

    function draw_path(data) { //绘制连续路径形成得不规则形状
        if (data.hasOwnProperty('path') && typeof data.path == 'object' && data.path.length > 1) {
            let pathList = data.path
            ctx.beginPath()
            ctx.moveTo(pathList[0].x, pathList[0].y)
            for (let j = 1; j < pathList.length; j++) {
                ctx.lineTo(pathList[j].x, pathList[j].y)
            }
            if (data.closePath) {
                ctx.closePath()
            }
            if (data.hasOwnProperty('color') && typeof data.color == 'string') {
                ctx.save()
                if (data.shadow && (data.shadow.type == null || data.shadow.type == 'fill')) {
                    draw_shadow(data.shadow);
                } //edn if
                ctx.setFillStyle(data.color)
                ctx.fill()
                ctx.restore()
            }
            if (data.hasOwnProperty('borderColor') && typeof data.borderColor == 'string') {
                let borderWidth = 1;
                if (data.hasOwnProperty('borderWidth') && typeof data.borderWidth == 'number') {
                    borderWidth = data.borderWidth
                }
                ctx.save()
                if (data.shadow && data.shadow.type == 'border') {
                    draw_shadow(data.shadow);
                } //edn if
                ctx.setStrokeStyle(data.borderColor)
                ctx.setLineWidth(borderWidth)
                ctx.stroke()
                ctx.restore()
            }
        } //edn if
    } //end func

    function draw_shadow(data) {
        console.log('shadow data', data)
        let offsetX = data.offsetX || 0;
        let offsetY = data.offsetY || 0;
        let blur = data.blur || 10;
        let color = data.color || '#000000';
        ctx.setShadow(offsetX, offsetY, blur, color);
    } //edn func

    return draw;
};

module.exports = idraw();