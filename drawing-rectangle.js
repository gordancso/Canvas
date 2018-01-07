class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
// define initial color
        this.contextReal.fillStyle = this.contextDraft.fillStyle = rgbaColor;

// condition
        this.mousedown = false;
// define origin
        this.clickedArea = {box: -1, pos:'o'};
// dummy
        this.x1 = -1;
        this.y1 = -1;
        this.x2 = -1;
        this.y2 = -1;
// to store coordinated
        this.boxes = [];
// temp box to store coord.
        this.tmpBox = null;

        this.lineOffset = 2;
        this.anchrSize = 2;
    }

    onMouseDown(coord, event) {
      this.mousedown = true;
      this.clickedArea = this.findCurrentArea(event.offsetX, event.offsetY)
      this.x1 = event.offsetX;
      this.y1 = event.offsetY;
      this.x2 = event.offsetX;
      this.y2 = event.offsetY;

      console.log("mouseDown: " + this.x1 + " " + this.y1  + " " + this.x2 + " "+ this.y2)

    }

    onMouseMove(coord, event) {
      if (this.mousedown && this.clickedArea.box == -1) {
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;
        console.log("mouseMove: " + this.x1 + " " + this.y1  + " " + this.x2 + " "+ this.y2);
        this.redraw();
      }
      else if (this.mousedown && this.clickedArea.box != -1) {
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;
        this.xOffset = this.x2 - this.x1;
        this.yOffset = this.y2 - this.y1;
        this.x1 = this.x2;
        this.y1 = this.y2;

        if (this.clickedArea.pos == 'i'  ||
            this.clickedArea.pos == 'tl' ||
            this.clickedArea.pos == 'l'  ||
            this.clickedArea.pos == 'bl') {
          this.boxes[this.clickedArea.box].x1 += this.xOffset;
        }
        if (this.clickedArea.pos == 'i'  ||
            this.clickedArea.pos == 'tl' ||
            this.clickedArea.pos == 't'  ||
            this.clickedArea.pos == 'tr') {
          this.boxes[this.clickedArea.box].y1 += this.yOffset;
        }
        if (this.clickedArea.pos == 'i'  ||
            this.clickedArea.pos == 'tr' ||
            this.clickedArea.pos == 'r'  ||
            this.clickedArea.pos == 'br') {
          this.boxes[this.clickedArea.box].x2 += this.xOffset;
        }
        if (this.clickedArea.pos == 'i'  ||
            this.clickedArea.pos == 'bl' ||
            this.clickedArea.pos == 'b'  ||
            this.clickedArea.pos == 'br') {
          this.boxes[this.clickedArea.box].y2 += this.yOffset;
        }
        this.redraw();
        console.log(this.boxes)
      }

    }


    onMouseUp(coord, event) {
      if (this.clickedArea.box == -1 && this.tmpBox != null) {
      	this.boxes.push(this.tmpBox);
      } else if (this.clickedArea.box != -1) {
      	var selectedBox = this.boxes[this.clickedArea.box];
        if (selectedBox.x1 > selectedBox.x2) {
        	var previousX1 = selectedBox.x1;
          selectedBox.x1 = selectedBox.x2;
          selectedBox.x2 = previousX1;
        }
        if (selectedBox.y1 > selectedBox.y2) {
        	var previousY1 = selectedBox.y1;
          selectedBox.y1 = selectedBox.y2;
          selectedBox.y2 = previousY1;
        }
      }
      this.clickedArea = {box: -1, pos:'o'};
      this.tmpBox = null;
      this.mousedown = false;

    }

    onDragging(coord, event) { }

    onMouseLeave(coord, event) { }

    onMouseEnter(coord, event) { }

    // draw the shape without control points in real canvas
    onDoubleClick(coord, event) {
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height)
      for (var i = 0; i < this.boxes.length; i++){
        this.contextReal.fillStyle = rgbaColor;
        this.contextReal.fillRect(this.boxes[i].x1, this.boxes[i].y1, this.boxes[i].x2 - this.boxes[i].x1, this.boxes[i].y2 - this.boxes[i].y1);
        this.contextReal.fill();
      }
      this.reset();
    }

//function
    redraw(){
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.fillStyle = rgbaColor;
      this.contextDraft.fill();
      this.contextDraft.beginPath();
      for (var i = 0; i < this.boxes.length; i++) {
        this.createCP(this.boxes[i], this.contextDraft);
      }
      if (this.clickedArea.box == -1) {
        this.tmpBox = this.newBox(this.x1, this.y1, this.x2, this.y2);
        if (this.tmpBox != null) {
          this.createCP(this.tmpBox, this.contextDraft);
        }
      }
    }


    createCP(box, context){
      this.xCenter = box.x1 + (box.x2 - box.x1) / 2;
      this.yCenter = box.y1 + (box.y2 - box.y1) / 2;

      context.strokeStyle = box.lineWidth;
      context.fillStyle = box.color;

      context.rect(box.x1, box.y1, (box.x2 - box.x1), (box.y2 - box.y1));
      context.setLineDash([3]);
      context.stroke();

      context.fillRect(box.x1 - this.anchrSize, box.y1 - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(box.x1 - this.anchrSize, this.yCenter - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(box.x1 - this.anchrSize, box.y2 - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(this.xCenter - this.anchrSize, box.y1 - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(this.xCenter - this.anchrSize, this.yCenter - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(this.xCenter - this.anchrSize, box.y2 - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(box.x2 - this.anchrSize, box.y1 - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(box.x2 - this.anchrSize, this.yCenter - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(box.x2 - this.anchrSize, box.y2 - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
    }


    newBox(x1, y1, x2, y2) {
      this.boxX1 = x1 < x2 ? x1 : x2;
      this.boxY1 = y1 < y2 ? y1 : y2;
      this.boxX2 = x1 > x2 ? x1 : x2;
      this.boxY2 = y1 > y2 ? y1 : y2;
      if (this.boxX2 - this.boxX1 > this.lineOffset * 2 && this.boxY2 - this.boxY1 > this.lineOffset * 2) {
        return {x1: this.boxX1,
                y1: this.boxY1,
                x2: this.boxX2,
                y2: this.boxY2,
                lineWidth: 0.5,
                color: "#000000"};
      } else {
        return null;
      }
    }


    findCurrentArea(x, y) {
      for (var i = 0; i < this.boxes.length; i++) {
        var box = this.boxes[i];
        this.xCenter = box.x1 + (box.x2 - box.x1) / 2;
        this.yCenter = box.y1 + (box.y2 - box.y1) / 2;
        if (box.x1 - this.lineOffset <  x && x < box.x1 + this.lineOffset) {
          if (box.y1 - this.lineOffset <  y && y < box.y1 + this.lineOffset) {
            return {box: i, pos:'tl'};
          } else if (box.y2 - this.lineOffset <  y && y < box.y2 + this.lineOffset) {
            return {box: i, pos:'bl'};
          } else if (this.yCenter - this.lineOffset <  y && y < this.yCenter + this.lineOffset) {
            return {box: i, pos:'l'};
          }
        } else if (box.x2 - this.lineOffset < x && x < box.x2 + this.lineOffset) {
          if (box.y1 - this.lineOffset <  y && y < box.y1 + this.lineOffset) {
            return {box: i, pos:'tr'};
          } else if (box.y2 - this.lineOffset <  y && y < box.y2 + this.lineOffset) {
            return {box: i, pos:'br'};
          } else if (this.yCenter - this.lineOffset <  y && y < this.yCenter + this.lineOffset) {
            return {box: i, pos:'r'};
          }
        } else if (this.xCenter - this.lineOffset <  x && x < this.xCenter + this.lineOffset) {
          if (box.y1 - this.lineOffset <  y && y < box.y1 + this.lineOffset) {
            return {box: i, pos:'t'};
          } else if (box.y2 - this.lineOffset <  y && y < box.y2 + this.lineOffset) {
            return {box: i, pos:'b'};
          } else if (box.y1 - this.lineOffset <  y && y < box.y2 + this.lineOffset) {
            return {box: i, pos:'i'};
          }
        } else if (box.x1 - this.lineOffset <  x && x < box.x2 + this.lineOffset) {
          if (box.y1 - this.lineOffset <  y && y < box.y2 + this.lineOffset) {
            return {box: i, pos:'i'};
          }
        }
      }
      return {box: -1, pos:'o'};
    }

    reset(){

// reset everything after double click
      this.mousedown = false;
      this.clickedArea = {box: -1, pos:'o'};
      this.x1 = -1;
      this.y1 = -1;
      this.x2 = -1;
      this.y2 = -1;
      this.boxes = [];
      this.tmpBox = null;
      this.lineOffset = 4;
      this.anchrSize = 2;
    }


}
