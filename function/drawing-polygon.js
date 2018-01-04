class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.strokeStyle = "#000";
        this.contextDraft.strokeStyle = "#000";
        this.contextReal.lineJoin = "miter";
        this.contextDraft.lineJoin = "miter";
        this.contextReal.lineWidth = 2;
        this.contextDraft.lineWidth = 2;
        this.contextReal.fillStyle = '#ddd';
        this.contextDraft.fillStyle = '#ddd';
        this.reset();
    }

    onMouseDown(coord, event) { }

    onDragging(coord, event) { }

    onMouseMove(coord, event) {
        if (this.mouseup) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            
            if (Math.abs(coord[0] - this.xArr[0]) < 20 && Math.abs(coord[1] - this.yArr[0]) < 20)
                this.redraw(this.contextDraft, this.xArr[0], this.yArr[0]);
            else 
                this.redraw(this.contextDraft, coord[0], coord[1]);
        }
    }

    onMouseUp(coord, event) {
        this.xArr.push(coord[0]);
        this.yArr.push(coord[1]);
 
        console.log(coord[0], coord[1]);

        if (!this.firstClick && Math.abs(coord[0] - this.xArr[0]) < 20 && Math.abs(coord[1] - this.yArr[0]) < 20) {
            this.xArr.pop(coord[0]);
            this.yArr.pop(coord[1]);
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.redraw(this.contextReal, this.xArr[0], this.yArr[0])
            this.reset();
        }
        else {
            this.firstClick = false;
            this.mouseup = true;
        }
    }

    onMouseLeave() { }
    onMouseEnter() { }

    redraw(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(this.xArr[0], this.yArr[0]);
        for (let i = 0; i < this.xArr.length; i++)
            ctx.lineTo(this.xArr[i], this.yArr[i]);
        ctx.lineTo(x, y);
        ctx.fill();
        ctx.stroke();
    }

    reset(){
        this.firstClick = true;
        this.mouseup = false;
        this.xArr = [];
        this.yArr = [];
    }
}