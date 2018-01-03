class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.strokeStyle = "#f44";
        this.contextDraft.strokeStyle = "#f44";
        this.contextReal.lineWidth = 2;
        this.contextDraft.lineWidth = 2;
    }

    onMouseDown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.strokeRect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
    }

    onMouseMove() { }

    onMouseUp(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.strokeRect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
    }

    onMouseLeave() { }
    onMouseEnter() { }
}