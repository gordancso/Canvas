class backgroundFill extends PaintFunction {

    constructor(contextReal) {
        super();
        this.contextReal = contextReal;
    }

    onMouseDown(coord, event) {
    }

    onMouseLeave() { }
    onMouseEnter() {
        this.contextReal.fillStyle = rgbaColor;
        this.contextReal.fillRect(0, 0, canvasReal.width, canvasReal.height);
    }
}
