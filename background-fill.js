class backgroundFill extends PaintFunction {

    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, event) {
        this.contextReal.fillStyle = rgbaColor;
        //backGC = rgbaColor;
        //this.contextDraft.fillStyle = rgbaColor;
        this.origX = coord[0];
        this.origY = coord[0];
    }

    onMouseLeave() { }
    onMouseEnter() {
        this.contextReal.fillStyle = rgbaColor;

        //this.contextDraft.fillStyle = rgbaColor; 
        //this.contextDraft.fillRect(0,0,canvasDraft.width,canvasDraft.height);\
        this.contextReal.fillRect(0, 0, canvasReal.width, canvasReal.height);
    }
}
