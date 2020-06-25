class Paint {
    constructor(){
        this.strokeWidth = 10
    }

    draw(context, e){
        context.lineWidth = this.strokeWidth
        context.lineCap = "round"

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
        //mousePos = getTouchPos(canvas, e);
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