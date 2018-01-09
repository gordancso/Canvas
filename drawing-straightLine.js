class DrawingStraightLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.setLineDash([]);
        this.contextDraft.setLineDash([]);
        this.contextReal.fillStyle = this.contextDraft.fillStyle = rgbaColor;
        this.contextReal.lineJoin = this.contextDraft.lineJoin = "round";
        this.contextReal.lineWidth = this.contextDraft.lineWidth = slider.value;
        this.reset();
    }

    onMouseDown(coord, event) {
        if (this.firstClick) {
            this.startpoint = coord.slice(0);
            this.endpoint = coord.slice(0);
            this.firstClick = false;
            this.draft = true;
            this.createCP(this.startpoint); // create first control point
        }

        // check if users click the control or select the line
        this.clickCP['startpoint'] = this.selectCP(coord, this.startpoint, 20);
        this.clickCP['endpoint'] = this.selectCP(coord, this.endpoint, 20);
        this.clickLine = this.selectLine(coord, this.startpoint, this.endpoint, 20);

        if (this.clickCP['startpoint'] || this.clickCP['endpoint'] || this.clickLine)
            this.selected = true;

        this.previouspoint = coord.slice(0);
    }

    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

        // assign the current point to startpoint or endpoint
        if (this.clickCP['startpoint']) {
            this.startpoint = coord.slice(0);
        }
        else if (this.clickCP['endpoint']) {
            this.endpoint = coord.slice(0);
        }
        else if (this.clickLine) {
            this.startpoint[0] = this.startpoint[0] + (coord[0] - this.previouspoint[0]);
            this.startpoint[1] = this.startpoint[1] + (coord[1] - this.previouspoint[1]);
            this.endpoint[0] = this.endpoint[0] + (coord[0] - this.previouspoint[0]);
            this.endpoint[1] = this.endpoint[1] + (coord[1] - this.previouspoint[1]);
        }

        this.previouspoint = coord.slice(0);
        this.createCP(this.startpoint);
        this.createCP(this.endpoint);
        this.drawLine(this.contextDraft, this.startpoint, this.endpoint);
    }

    onMouseMove(coord, event) {
        if (this.selected) {
            this.movement = true;
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

            if (this.clickCP['startpoint']) {
                this.startpoint = coord.slice(0);
            }
            else if (this.clickCP['endpoint']) {
                this.endpoint = coord.slice(0);
            }
            else if (this.clickLine) {
                this.startpoint[0] = this.startpoint[0] + (coord[0] - this.previouspoint[0]);
                this.startpoint[1] = this.startpoint[1] + (coord[1] - this.previouspoint[1]);
                this.endpoint[0] = this.endpoint[0] + (coord[0] - this.previouspoint[0]);
                this.endpoint[1] = this.endpoint[1] + (coord[1] - this.previouspoint[1]);
            }

            this.previouspoint = coord.slice(0);
            this.createCP(this.startpoint);
            this.createCP(this.endpoint);
            this.drawLine(this.contextDraft, this.startpoint, this.endpoint);
        }
    }

    onMouseUp(coord, event) {
        if (this.movement) {
            this.selected = false;
            this.movement = false;
        }
    }
    onMouseLeave(coord, event) { }
    onMouseEnter(coord, event) { }

    // draw the shape without control points in real canvas
    onDoubleClick(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.drawLine(this.contextReal, this.startpoint, this.endpoint);
        this.draft = false;
        this.capture();
        this.reset();
        console.log(slider.value)
    }

    // Internal function

    // create control points in draft canvas
    createCP(point) {
        this.contextDraft.beginPath();
        this.contextDraft.arc(point[0], point[1], 5, 0, 2 * Math.PI);
        this.contextDraft.fillStyle = "#000";
        this.contextDraft.fill();
        this.contextDraft.strokeStyle = "#000";
        this.contextDraft.stroke();
    }

    // check if selecting the control points
    selectCP(coord, point, tolerance) {
        if (Math.abs(coord[0] - point[0]) < tolerance && Math.abs(coord[1] - point[1]) < tolerance)
            return true;
        else
            return false;
    }

    // check if selecting the line
    selectLine(coord, start, end, tolerance) {
        function bigger(value1, value2) {
            if (value1 > value2)
                return value1;
            else
                return value2;
        }

        function smaller(value1, value2) {
            if (value1 < value2)
                return value1;
            else
                return value2;
        }

        // define the line equation: y = mx + c
        let smallx = smaller(start[0], end[0]);
        let bigx = bigger(start[0], end[0]);
        let smally = smaller(start[1], end[1]);
        let bigy = bigger(start[1], end[1]);
        let slope;
        let intercept;

        if (start[0] != end[0]) {
            slope = (end[1] - start[1]) / (end[0] - start[0]);
            intercept = start[1] - slope * start[0];
        }

        // make sure the point bound by start point and end point with tolerance
        if (end[1] - start[1] == 0 && Math.abs(coord[1] - end[1]) < tolerance && coord[0] > (smallx - tolerance) && coord[0] < (bigx + tolerance)) // case: horizontal line
            return true;
        else if (end[0] - start[0] == 0 && Math.abs(coord[0] - end[0]) < tolerance && coord[1] > (smally - tolerance) && coord[1] < (bigy + tolerance)) // case: vertical line
            return true;
        else if (Math.abs((coord[1] - slope * coord[0]) - intercept) < tolerance && coord[0] > (smallx - tolerance) && coord[0] < (bigx + tolerance) && coord[1] > (smally - tolerance) && coord[1] < (bigy + tolerance)) // normal case
            return true;
        else return false;
    }

    // draw the line with start point and end point
    drawLine(ctx, start, end) {
        ctx.strokeStyle = rgbaColor;
        ctx.beginPath();
        ctx.moveTo(start[0], start[1]);
        ctx.lineTo(end[0], end[1]);
        ctx.closePath();
        ctx.stroke();
    }

    // reset the checking attribute
    reset() {
        this.startpoint = [];
        this.endpoint = [];
        this.previouspoint = [];
        this.firstClick = true;
        this.clickCP = { startpoint: false, endpoint: false };
        this.clickLine = false;
        this.contextReal.lineWidth = this.contextDraft.lineWidth = slider.value;
    }
}
