class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.strokeStyle = "#f44";
        this.contextDraft.strokeStyle = "#f44";
        this.contextReal.lineJoin = "miter";
        this.contextDraft.lineJoin = "miter";
        this.contextReal.lineWidth = 5;
        this.contextDraft.lineWidth = 5;
        this.firstClick = true;
        this.mouseup = false;
        this.xArr = [];
        this.yArr = [];
    }

    onMouseDown(coord, event) { }

    onDragging(coord, event) {

    }

    onMouseMove(coord, event) {
        if (this.mouseup) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.xArr[0], this.yArr[0]);

            for (let i = 0; i < this.xArr.length; i++)
                this.contextDraft.lineTo(this.xArr[i], this.yArr[i]);

            
            this.contextDraft.fillStyle = 'red';
            this.contextDraft.fill();
            this.contextDraft.stroke();
        }
    }

    onMouseUp(coord, event) {
        // this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        // this.draw(this.contextReal, coord[0], coord[1]);
        // this.contextDraft.moveTo(this.tempX, this.tempY);
        this.xArr.push(coord[0]);
        this.yArr.push(coord[1]);

        if (this.firstClick) {
            this.contextReal.moveTo(this.xArr[0], this.yArr[0]);
        }
        else {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.lineTo(coord[0], coord[1]);
        }

        for (let i=0; i < this.coordArr.length; i++){
            this.contextReal.stroke();
        }

        this.firstClick = false;
        this.mouseup = true;
        
    }

    onMouseLeave() { }
    onMouseEnter() { }

    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(this.tempX, this.tempY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
}