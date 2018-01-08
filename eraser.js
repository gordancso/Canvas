class Eraser extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
    }

    onMouseDown(coord, event) {
        this.context.strokeStyle = "rgba(255,0,0,0.5)";
        this.context.lineJoin = this.context.lineCap = "round";
        this.context.lineWidth = slider.value;
        this.context.beginPath();
        this.context.moveTo(coord[0], coord[1]);
        this.draw(coord[0], coord[1]);
    }

    onDragging(coord, event) {
        this.context.globalCompositeOperation = "destination-out";
        this.draw(coord[0], coord[1]);
        this.context.globalCompositeOperation = "source-over";
    }

    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(x, y) {
        this.context.lineTo(x, y);
        this.context.moveTo(x, y);
        this.context.closePath();
        this.context.stroke();
    }
}
