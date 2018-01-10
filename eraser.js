class Eraser extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
        this.reset();
//        this.context.strokestyle = backgroundColortest
        console.log(backgroundColortest)
        console.log(rgbaColor)
    }

    onMouseDown(coord, event) {
//      if (backgroundColortest == undefined){
//        this.context.strokeStyle = '#FFFFFF';
//      } else {
//        this.context.strokeStyle = backgroundColortest;
//      }
        this.context.strokeStyle = "rgba(255,0,0,0.5)";
        this.context.lineJoin = this.context.lineCap = "round";
        this.context.lineWidth = slider.value;
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]);
    }

    onDragging(coord, event) {
        this.draw(coord[0], coord[1]);
        this.earsing = true;
    }

    onMouseMove() { }
    onMouseUp(coord, event) {
        if (this.earsing){
            this.capture();
            this.earsing = false;
        }

    }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(x, y) {
        this.context.globalCompositeOperation = "destination-out";
        this.context.lineTo(x, y);
        this.context.stroke();
        this.context.globalCompositeOperation = "source-over";
    }

    reset(){
        this.firstUp = true;
    }
}
