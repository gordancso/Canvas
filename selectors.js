class Selectors extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    this.reset();
  }

  onMouseDown(coord, event) {
    if (this.firstClick) {
      this.origX = coord[0];
      this.origY = coord[1];
      this.firstClick = false;
    }
    this.selected = this.selectShape(coord, 20);
    this.previousCoord = coord;
  }

  onMouseMove(coord, event) { }

  onMouseUp(coord, event) {
    if (this.firstUp) {
      this.finalX = this.max(coord[0], this.origX);
      this.finalY = this.max(coord[1], this.origY);

      this.origX = this.min(coord[0], this.origX);
      this.origY = this.min(coord[1], this.origY);

      this.width = this.finalX - this.origX;
      this.height = this.finalY - this.origY;

      this.image = this.contextReal.getImageData(this.origX, this.origY, this.width, this.height);
      this.contextReal.clearRect(this.origX, this.origY, this.width, this.height);
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.putImageData(this.image, this.origX, this.origY);
      this.contextDraft.strokeRect(this.origX, this.origY, this.width, this.height);
      this.firstUp = false;
    }
  }

  onDragging(coord, event) {
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    if (this.selected) {
      this.origX = this.origX + (coord[0] - this.previousCoord[0]);
      this.origY = this.origY + (coord[1] - this.previousCoord[1]);
      this.finalX = this.finalX + (coord[0] - this.previousCoord[0]);
      this.finalY = this.finalY + (coord[1] - this.previousCoord[1]);
      this.contextDraft.putImageData(this.image, this.origX, this.origY);
    }
    else {
      this.finalX = coord[0];
      this.finalY = coord[1];
      this.width = this.finalX - this.origX;
      this.height = this.finalY - this.origY;
    }
    
    this.contextDraft.strokeRect(this.origX, this.origY, this.width, this.height);
    this.previousCoord = coord;
  }

  onMouseLeave(coord, event) { 
    this.finished = true;
  }

  onMouseEnter(coord, event) { }

  onDoubleClick(coord, event) {
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.contextDraft.putImageData(this.image, this.origX, this.origY);
    this.contextReal.drawImage(canvasDraft, 0, 0);
    this.capture();
    this.reset();
  }

  selectShape(coord, tolerance) {
    let xmin, xmax, ymin, ymax;
    xmin = this.min(this.origX,this.finalX);
    xmax = this.max(this.origX,this.finalX);
    ymin = this.min(this.origY,this.finalY);
    ymax = this.max(this.origY,this.finalY);

    if (coord[0] > xmin && coord[0] < xmax && coord[1] > ymin && coord[1] < ymax) {
      return true;
    }
    else
      return false;
  }

  max(value1, value2) {
    if (value1 > value2)
      return value1;
    else
      return value2;
  }

  min(value1, value2) {
    if (value1 < value2)
      return value1;
    else
      return value2;
  }

  reset() {
    this.firstClick = true;
    this.firstUp = true;
  }
}
