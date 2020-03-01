var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var lineWidth = 5

autoSetCanvasArea(canvas);

listenToUser();

/**************************************************/

var eraserEnabled = false;

pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
    clear.classList.add('active')
    setTimeout(() => clear.classList.remove('active'), 300)
}

save.onclick = function () {
    var url = canvas.toDataURL('image/png')
    save.classList.add('active')
    setTimeout(() => save.classList.remove('active'), 300)
    var a = document.createElement('a')
    a.href = url
    a.download = '作品'
    a.click()
}

black.onclick = function () {
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

red.onclick = function () {
    context.strokeStyle = 'red'
    context.fillStyle = 'red'
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}

blue.onclick = function () {
    context.strokeStyle = 'blue'
    context.fillStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}

green.onclick = function () {
    context.strokeStyle = 'green'
    context.fillStyle = 'green'
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.add('active')
    black.classList.remove('active')
}

thin.onclick = function () {
    lineWidth = 5
}

strong.onclick = function () {
    lineWidth = 10
}

/************************************************* */

function autoSetCanvasArea(canvas) {
    setCanvasArea();

    window.onresize = function () {
        setCanvasArea();
    };

    function setCanvasArea() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function listenToUser() {


    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    };
    // 特性检测
    if (document.body.ontouchstart !== undefined) {
        // 触屏设备
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;

            using = true;

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    x: x,
                    y: y
                };
                drawCircle(x, y, 2.5);
            }
        }

        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;

            if (!using) { return; }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                newPoint = {
                    x: x,
                    y: y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }

        canvas.ontouchend = function () {
            using = false;
        }
    } else {
        // 非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX;
            var y = a.clientY;

            using = true;

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    x: x,
                    y: y
                };
                drawCircle(x, y, 2.5);
            }
        };

        canvas.onmousemove = function (a) {
            var x = a.clientX;
            var y = a.clientY;

            if (!using) { return; }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                newPoint = {
                    x: x,
                    y: y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        };

        canvas.onmouseup = function () {
            using = false;
        };
    }
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 6);
    context.fill();
}