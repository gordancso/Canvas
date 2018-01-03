class DrawingStraightLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.strokeStyle = "#f44";
        this.contextDraft.strokeStyle = "#f44";
        this.contextReal.lineJoin = "round";
        this.contextDraft.lineJoin = "round";
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

    onMouseUp(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.draw(this.contextReal, coord[0], coord[1]);
    }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(this.origX, this.origY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
}