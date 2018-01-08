class Selectors extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
// condition
        this.mousedown = false;
// define origin
        this.clickedArea = {box: -1, pos:'o'};
// dummy
        this.x1 = -1;
        this.y1 = -1;
        this.x2 = -1;
        this.y2 = -1;
// to store coordinates
        this.boxes = [];
// temp box to store coord.
        this.tmpBox = null;

        this.lineOffset = 4;
        this.anchrSize = 4;
    }

    onMouseDown(coord, event) {
// dummy store for mousedown
      this.mousedown = true;
      this.clickedArea = this.findCurrentArea(event.offsetX, event.offsetY)
      this.x1 = event.offsetX;
      this.y1 = event.offsetY;
      this.x2 = event.offsetX;
      this.y2 = event.offsetY;
//      console.log("mouseDown: " + this.x1 + " " + this.y1  + " " + this.x2 + " "+ this.y2)

    }

    onMouseMove(coord, event) {
      if (this.mousedown && this.clickedArea.box == -1) {
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
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
            this.clickedArea.pos == 'bl') {
          this.boxes[this.clickedArea.box].x1 += this.xOffset;
        }
        if (this.clickedArea.pos == 'i'  ||
            this.clickedArea.pos == 'tl' ||
            this.clickedArea.pos == 'tr') {
          this.boxes[this.clickedArea.box].y1 += this.yOffset;
        }
        if (this.clickedArea.pos == 'i'  ||
            this.clickedArea.pos == 'tr' ||
            this.clickedArea.pos == 'br') {
          this.boxes[this.clickedArea.box].x2 += this.xOffset;
        }
        if (this.clickedArea.pos == 'i'  ||
            this.clickedArea.pos == 'bl' ||
            this.clickedArea.pos == 'br') {
          this.boxes[this.clickedArea.box].y2 += this.yOffset;
        }
        this.redraw();
        this.contextDraft.clearRect(0,0,canvasDraft.width, canvasDraft.height)

        console.log("fuck")
      }

    }


    onMouseUp(coord, event) {
      console.log(this.boxes);
      console.log(this.tmpBox);
      this.boxes.push(this.tmpBox)
      this.mousedown = false

      console.log("this.boxes" + this.boxes[0].x1 + this.boxes[0].y1);
      this.imgdt = this.contextReal.getImageData(this.tmpBox.x1, this.tmpBox.y1, this.tmpBox.x2-this.tmpBox.x1, this.tmpBox.y2-this.tmpBox.y1)
      console.log("true")
    }

    onDragging(coord, event) { }

    onMouseLeave(coord, event) { }

    onMouseEnter(coord, event) { }

    // draw the shape without control points in real canvas
    onDoubleClick(coord, event) {
        this.contextReal.clearRect(this.tmpBox.x1,this.tmpBox.y1, this.tmpBox.x2-this.tmpBox.x1, this.tmpBox.y2-this.tmpBox.y1)
        console.log(this.imgdt);
        this.contextReal.putImageData(this.imgdt, 100, 100)
        this.reset();
    }

//function
    redraw(){
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.beginPath();
      for (var i = 0; i < this.boxes.length; i++) {
        this.createCP(this.boxes[i], this.contextDraft);
      }
      console.log(this.boxes)
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
      context.fillRect(box.x1 - this.anchrSize, box.y2 - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(this.xCenter - this.anchrSize, this.yCenter - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
      context.fillRect(box.x2 - this.anchrSize, box.y1 - this.anchrSize, 2 * this.anchrSize, 2 * this.anchrSize);
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
          }
        } else if (box.x2 - this.lineOffset < x && x < box.x2 + this.lineOffset) {
          if (box.y1 - this.lineOffset <  y && y < box.y1 + this.lineOffset) {
            return {box: i, pos:'tr'};
          } else if (box.y2 - this.lineOffset <  y && y < box.y2 + this.lineOffset) {
            return {box: i, pos:'br'};
          }
        } else if (this.xCenter - this.lineOffset <  x && x < this.xCenter + this.lineOffset) {
          if (box.y1 - this.lineOffset <  y && y < box.y2 + this.lineOffset) {
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
      this.anchrSize = 4;
    }


}
