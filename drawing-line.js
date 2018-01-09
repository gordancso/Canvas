class DrawingLine extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
        this.context.strokeStyle = rgbaColor;
        this.context.lineJoin = "round";
        this.context.lineWidth = slider.value;
    }

    onMouseDown(coord, event) {
        this.context.strokeStyle = rgbaColor;
        this.context.lineJoin = this.context.lineCap = "round";
        this.context.lineWidth = slider.value;
        this.context.beginPath();
        this.context.moveTo(coord[0], coord[1]);
    }

    onDragging(coord, event) {
        this.draw(coord[0], coord[1]);
    }

    onMouseMove() { }
    onMouseUp(coord, event) {
        this.draft = false;
        this.capture();
        this.context.beginPath();
    }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(x, y) {
        this.context.lineTo(x, y);
        this.context.moveTo(x, y);
        this.context.closePath();
        this.context.stroke();
    }

    reset(){}
}

class LinePatternBrush extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
        this.context.strokeStyle = rgbaColor;
        this.context.lineJoin = "round";
    }

    onMouseDown(coord, event) {
        this.context.strokeStyle = this.getPattern();
        this.context.lineJoin = this.context.lineCap = "round";
        this.context.lineWidth = slider.value;
        this.context.beginPath();
        this.context.moveTo(coord[0], coord[1]);
    }

    onDragging(coord, event) {
        this.draw(coord[0], coord[1]);
    }

    onMouseMove() { }
    onMouseUp(coord, event) {
        this.draft = false;
        this.capture();
    }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(x, y) {
        this.context.lineTo(x, y);
        this.context.stroke();
    }

    getPattern() {
        let patternCanvas = document.createElement('canvas');
        let ctx = patternCanvas.getContext('2d');
        patternCanvas.width = patternCanvas.height = 10;

        ctx.fillStyle = rgbaColor2;
        ctx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        ctx.strokeStyle = rgbaColor;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5); // the maximum size of canvas
        ctx.closePath();
        ctx.stroke();
        return ctx.createPattern(patternCanvas, 'repeat');
    }

    reset(){}
}

class LineShadowBrush extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;

        this.contextReal.lineJoin = this.contextReal.lineCap = this.contextDraft.lineJoin = this.contextDraft.lineCap = 'round';

        this.contextReal.shadowColor = this.contextDraft.shadowColor = 'rgb(0, 0, 0)';
        this.reset();
    }

    onMouseDown(coord, event) {
        this.contextReal.lineWidth = this.contextDraft.lineWidth = slider.value;
        this.contextReal.shadowBlur = this.contextDraft.shadowBlur = blur.value;
        this.pointArr.push({ x: coord[0], y: coord[1] })
    }

    onDragging(coord, event) {
        this.pointArr.push({ x: coord[0], y: coord[1] });
        this.draw(this.contextDraft);
    }

    onMouseMove() { }

    onMouseUp(coord, event) {
        this.draw(this.contextReal);
        this.draft = false;
        this.capture();
        this.reset();
    }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(ctx) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        ctx.strokeStyle = rgbaColor;
        ctx.beginPath();
        ctx.moveTo(this.pointArr[0].x, this.pointArr[0].y);
        for (let i = 1; i < this.pointArr.length; i++)
            ctx.lineTo(this.pointArr[i].x, this.pointArr[i].y);
        ctx.stroke();
    }

    reset() {
        this.pointArr = [];
    }
}
