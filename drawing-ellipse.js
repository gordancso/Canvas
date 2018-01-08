class DrawingEllipse extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.setLineDash([]);
        this.contextDraft.setLineDash([]);
        this.contextReal.lineJoin = this.contextDraft.lineJoin = "round";
        this.contextReal.lineWidth = this.contextDraft.lineWidth = slider.value;
        this.reset();
    }

    onMouseDown(coord, event) {
        if (this.firstClick) {
            this.xcenter = coord[0];
            this.ycenter = coord[1];
            this.firstClick = false;
            this.createCP(coord[0], coord[1], 7);
            this.draft = true;
        }

        // check if the users click the control points
        let i = 0;
        for (const prop in this.CPobj) {
            this.clickCP[i++] = this.selectCP(coord, this.CPobj[prop], 20);
        }

        // check if the users click the shape
        this.clickShape = this.selectShape(coord, 20);

        if (this.clickCP.some(x => x == true) || this.clickShape) {
            this.selected = true;
        }

        //store the temporary coord for dragging or reshape
        this.previousCoord = coord.slice(0);
    }

    onDragging(coord, event) { }

    onMouseMove(coord, event) {
        if (this.selected) {
            this.movement = true;
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

            if (this.clickCP.some(x => x == true)) {
                if (this.clickCP[1] || this.clickCP[6]) {
                    this.radiusY = Math.abs(coord[1] - this.ycenter); // only change the radiusY 
                }
                else if (this.clickCP[3] || this.clickCP[4]) {
                    this.radiusX = Math.abs(coord[0] - this.xcenter); // only change the radiusX 
                }
                else {
                    this.calculation(coord[0], coord[1]); //re-calculate the both radius
                }
            }
            else if (this.clickShape) {
                this.xcenter = this.xcenter + (coord[0] - this.previousCoord[0]);
                this.ycenter = this.ycenter + (coord[1] - this.previousCoord[1]);
            }

            this.drawEllipse(this.contextDraft);
            this.previousCoord = coord.slice(0);
        }
    }

    onMouseUp(coord, event) {
        this.createAllCP();
        this.drawRect(this.contextDraft);
        if (this.movement) {
            this.selected = false;
            this.movement = false;
        }
    }

    onMouseLeave() { }

    onMouseEnter(coord, event) { 
        
    }

    onDoubleClick(coord, event) {
        this.draft = false;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.drawEllipse(this.contextReal, this.previousCoord[0], this.previousCoord[1]);
        this.capture();
        this.reset();
    }

    // Internal Function
    calculation(x, y) {
        this.radiusX = Math.abs(x - this.xcenter);
        this.radiusY = Math.abs(y - this.ycenter);
    }

    drawEllipse(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.xcenter, this.ycenter, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
        ctx.fillStyle = rgbaColor;
        ctx.fill();
        ctx.stroke();
    }

    drawRect(ctx) {
        ctx.beginPath();
        ctx.strokeRect(this.xcenter - this.radiusX, this.ycenter - this.radiusY, this.radiusX * 2, this.radiusY * 2);
        ctx.closePath();
    }

    // create control points in draft canvas
    createCP(x, y, name) {
        this.contextDraft.beginPath();
        this.contextDraft.arc(x, y, 5, 0, 2 * Math.PI);
        this.contextDraft.fillStyle = "#000";
        this.contextDraft.fill();
        this.contextDraft.strokeStyle = "#000";
        this.contextDraft.stroke();
        this.CPobj[name] = [x, y];
    }

    createAllCP() {
        this.createCP(this.xcenter - this.radiusX, this.ycenter - this.radiusY, 0);
        this.createCP(this.xcenter, this.ycenter - this.radiusY, 1);
        this.createCP(this.xcenter + this.radiusX, this.ycenter - this.radiusY, 2);
        this.createCP(this.xcenter - this.radiusX, this.ycenter, 3);
        this.createCP(this.xcenter + this.radiusX, this.ycenter, 4);
        this.createCP(this.xcenter - this.radiusX, this.ycenter + this.radiusY, 5);
        this.createCP(this.xcenter, this.ycenter + this.radiusY, 6);
        this.createCP(this.xcenter + this.radiusX, this.ycenter + this.radiusY, 7);
    }

    selectCP(coord, point, tolerance) {
        if (Math.abs(coord[0] - point[0]) < tolerance && Math.abs(coord[1] - point[1]) < tolerance)
            return true;
        else
            return false;
    }

    selectShape(coord, tolerance) {
        let xmin = this.xcenter - this.radiusX - tolerance;
        let xmax = this.xcenter + this.radiusX + tolerance;
        let ymin = this.ycenter - this.radiusY - tolerance;
        let ymax = this.ycenter + this.radiusY + tolerance;

        if (coord[0] > xmin && coord[0] < xmax && coord[1] > ymin && coord[1] < ymax) {
            return true;
        }
        else
            return false;
    }

    // reset the checking attribute 
    reset() {
        this.firstClick = true;
        this.xcenter = 0;
        this.ycenter = 0;
        this.radiusX = 0;
        this.radiusY = 0;
        this.clickCP = [];
        this.CPobj = {};
        this.clickShape = false;
        this.selected = false; // Determine the clicking of control point 
        this.movement = false;
    }
}

    