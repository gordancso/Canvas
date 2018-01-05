class DrawingEllipse extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextReal.fillStyle = this.contextDraft.fillStyle = "#f44";
        this.contextReal.lineJoin = this.contextDraft.lineJoin = "round";
        this.contextReal.lineWidth = this.contextDraft.lineWidth = 2;
        this.reset();
    }

    onMouseDown(coord, event) {
        if (this.firstClick) {
            this.xcenter = coord[0];
            this.ycenter = coord[1];
            this.firstClick = false;
            this.createCP(coord[0], coord[1], 7);
        }

        let i = 0;
        for (const prop in this.CPobj) {
            this.clickCP[i++] = this.selectCP(coord, this.CPobj[prop], 20);
        }

        if (this.clickCP.some(x => x == true)){
            this.click = true;
        }

        this.previousCoord = coord.slice(0);
        
    }

    onDragging(coord, event) {
        if (this.click){
            if (this.clickCP.some(x => x == true)) {
                this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    
                if (this.clickCP[1] || this.clickCP[6]) {
                    this.radiusY = Math.abs(coord[1] - this.ycenter);
                }
                else if (this.clickCP[4] || this.clickCP[5]) {
                    this.radiusX = Math.abs(coord[0] - this.xcenter);  
                }
                else {
                    this.calculation(coord[0],coord[1]);
                }
    
                this.drawEllipse(this.contextDraft);
                this.final = coord.slice(0);
            }

            this.dragging = true;
        }
    }

    onMouseMove(coord, event) {
        if (this.click){
            if (this.clickCP.some(x => x == true)) {
                this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    
                if (this.clickCP[1] || this.clickCP[6]) {
                    this.radiusY = Math.abs(coord[1] - this.ycenter);
                }
                else if (this.clickCP[4] || this.clickCP[5]) {
                    this.radiusX = Math.abs(coord[0] - this.xcenter);  
                }
                else {
                    this.calculation(coord[0],coord[1]);
                }
    
                
                this.drawEllipse(this.contextDraft);
                this.final = coord.slice(0);
            }
        }
        
    }

    onMouseUp(coord, event) {
        this.createAllCP();
        this.drawRect(this.contextDraft);
        if (this.dragging){
            this.click = false;
            this.dragging = false;
        }
            
    }

    onMouseLeave() { }

    onMouseEnter() { }

    onDobuleClick(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.drawEllipse(this.contextReal, this.final[0], this.final[1]);
        this.firstClick = true;
    }

    // Internal Function
    calculation(x, y) {
        this.radiusX = Math.abs(x - this.xcenter);
        this.radiusY = Math.abs(y - this.ycenter);
    }

    drawEllipse(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.xcenter, this.ycenter, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
        ctx.fillStyle = '#8ED6FF';
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

    // reset the checking attribute 
    reset() {
        this.firstClick = true;
        this.xcenter;
        this.ycenter;
        this.radiusX;
        this.radiusY;
        this.clickCP = [];
        this.CPobj = {};
        this.click = false; // Determine the clicking of control point 
        this.dragging = false; 
    }

}