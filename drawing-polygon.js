class DrawingPolygon extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    this.reset();
  }

  onMouseDown(coord, event) {
    if (window.screen.availWidth < 767) {
      this.xArr.push(coord[0]);
      this.yArr.push(coord[1]);
      this.draft = true;
    }
  }

  onDragging(coord, event) {}

  onMouseMove(coord, event) {
    if (this.draft) {
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

      // check if users click the starting point
      if (Math.abs(coord[0] - this.xArr[0]) < 20 && Math.abs(coord[1] - this.yArr[0]) < 20)
        this.redraw(this.contextDraft, this.xArr[0], this.yArr[0]); // yes -> redraw until the starting point
      else
        this.redraw(this.contextDraft, coord[0], coord[1]); // no -> redraw until the temporary point
    }
  }

  onMouseUp(coord, event) {
    // store all the anchor points
    this.xArr.push(coord[0]);
    this.yArr.push(coord[1]);
  
    // redraw in real canvas
    if (this.firstClick) {
      this.firstClick = false;
      this.draft = true;
      this.lineStyleReset();
    } 
    else if (Math.abs(coord[0] - this.xArr[0]) < 20 && Math.abs(coord[1] - this.yArr[0]) < 20) {
      this.xArr.pop(coord[0]); // remove the final temporary point
      this.yArr.pop(coord[1]);
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.redraw(this.contextReal, this.xArr[0], this.yArr[0]);
      this.capture();
      this.draft = false;
      this.reset();
    }
  }

  onMouseLeave() {}
  onMouseEnter() {}

  // redraw all the points until (x,y)
  redraw(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = rgbaColor;
    ctx.moveTo(this.xArr[0], this.yArr[0]);
    for (let i = 0; i < this.xArr.length; i++)
      ctx.lineTo(this.xArr[i], this.yArr[i]);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.stroke();
  }

  reset() {
    this.firstClick = true;
    this.xArr = [];
    this.yArr = [];
  }

  lineStyleReset(){
    this.contextReal.strokeStyle = this.contextDraft.strokeStyle = '#000';
    this.contextReal.lineJoin = this.contextDraft.lineJoin = "round";
    this.contextReal.lineWidth = this.contextDraft.lineWidth = 2;
    this.contextReal.shadowBlur = this.contextDraft.shadowBlur = 0;
    this.contextReal.setLineDash([]);
    this.contextDraft.setLineDash([]);
  }
}
