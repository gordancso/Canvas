class DrawingEllipse extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, event) {
        this.contextReal.fillStyle = rgbaColor;
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord, event) {
        this.contextDraft.beginPath();
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.ellipse(this.origX, this.origY, Math.sqrt(Math.pow(coord[0] - this.origX, 2)), Math.sqrt(Math.pow(coord[1] - this.origY , 2)), 0, 0, 2*Math.PI)
        this.contextDraft.strokeStyle = rgbaColor;
        this.contextDraft.fillStyle = rgbaColor;
        this.contextDraft.lineWidth = 0.1;
        this.contextDraft.closePath();
        this.contextDraft.stroke();
        this.contextDraft.fill();
    }

    onMouseMove() { }

    onMouseUp(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.ellipse(this.origX, this.origY, Math.sqrt(Math.pow(coord[0] - this.origX, 2)), Math.sqrt(Math.pow(coord[1] - this.origY , 2)), 0, 0, 2*Math.PI)
        this.contextReal.strokeStyle = rgbaColor;
        this.contextReal.fillStyle = rgbaColor;
        this.contextReal.lineWidth = 0.1;
        this.contextReal.closePath();
        this.contextReal.stroke();
        this.contextReal.fill();
    }

    onMouseLeave() { }

    onMouseEnter() { }
}
