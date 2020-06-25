class Paint {
    constructor(){
        this.strokeWidth = 10
        this.color = "black"
    }

    draw(context, e){
        context.lineWidth = this.strokeWidth
        context.lineCap = "round"
        context.strokeStyle = this.color

        context.lineTo(e.clientX, e.clientY);
        context.stroke()
        context.beginPath()
        context.moveTo(e.clientX, e.clientY)
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector("#draw")
    const context = canvas.getContext("2d")

    canvas.height = window.innerHeight - 10
    canvas.width = window.innerWidth - 10

    let drawing = false
    let paint = new Paint()

    var slider = document.getElementById("strokeWidth")
    slider.oninput = function() {
        paint.strokeWidth = this.value
    }

    var btnred = document.getElementById("btnred")
    btnred.onclick = function () {
        paint.color = "red"
    }
    var btngreen = document.getElementById("btngreen")
    btngreen.onclick = function () {
        paint.color = "green"
    }
    var btnblue = document.getElementById("btnblue")
    btnblue.onclick = function () {
        paint.color = "blue"
    }
    var btnblack = document.getElementById("btnblack")
    btnblack.onclick = function () {
        paint.color = "black"
    }
    var btnwhite = document.getElementById("btnwhite")
    btnwhite.onclick = function () {
        paint.color = "white"
    }

    // Mouse handle
    canvas.addEventListener("mousedown", e => {
        drawing = true
        paint.draw(context, e)
    })
    canvas.addEventListener("mouseup", e => {
        drawing = false
        context.beginPath()
    })
    canvas.addEventListener("mousemove", e => {
        if (drawing)
            paint.draw(context, e)
    })

    //Touch handle
    canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
    }, false);

    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: touchEvent.touches[0].clientX - rect.left,
          y: touchEvent.touches[0].clientY - rect.top
        };
      }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, {passive: false});
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, {passive: false});
    document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, {passive: false});
})

window.addEventListener('resize', () => {
    const canvas = document.querySelector("#draw")
    
    canvas.height = window.innerHeight - 10
    canvas.width = window.innerWidth - 10
})