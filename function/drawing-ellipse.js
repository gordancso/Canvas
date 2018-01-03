class DrawingEllipse extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.strokeStyle = "#000";
        this.contextDraft.strokeStyle = "#000";
        this.contextReal.lineWidth = 2;
        this.contextDraft.lineWidth = 2;
    }

    onMouseDown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.draw(this.contextDraft, coord[0], coord[1]);
    }

    onMouseMove() { }

    onMouseUp(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.draw(this.contextReal, coord[0], coord[1]);
    }

    onMouseLeave() { }

    onMouseEnter() { }

    draw(ctx, x, y) {
        let xcenter;
        let ycenter;
        let radiusX;
        let radiusY;

        xcenter = (x + this.origX) / 2;
        ycenter = (y + this.origY) / 2;

        if (x > this.origX) radiusX = (x - this.origX) / 2;
        else radiusX = (this.origX - x) / 2;

        if (y > this.origY) radiusY = (y - this.origY) / 2;
        else radiusY = (this.origY - y) / 2;

        ctx.beginPath();
        ctx.ellipse(xcenter, ycenter, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.fillStyle = '#8ED6FF';
        ctx.fill();
        ctx.stroke();
    }
}