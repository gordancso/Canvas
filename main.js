$(document).ready(function (){
    let canvas_width, canvas_height;

    if ($(window).width() < 576){
        canvas_width = $(window).width();
        canvas_height = $(window).height() - 100;
        $('#control-panel').css({'width':`${canvas_width}`,'height':'100px'});
        $('#canvas-container').css({'width':`${canvas_width}`,'height':`${canvas_height}`, 'left':'0px', 'top':'100px'});
        $('#canvas-real').css({'width':`${canvas_width}`,'height':`${canvas_height}`});
        $('#canvas-draft').css({'width':`${canvas_width}`,'height':`${canvas_height}`});
    }
        
    else{
        canvas_width = $(window).width() - 200;
        canvas_height = $(window).height();
        $('#control-panel').css({'width': '200px','height':`${canvas_height}`});
        $('#canvas-container').css({'width':`${canvas_width}`,'height':`${canvas_height}`, 'left':'200px', 'top':'0px'});
        $('#canvas-real').css({'width':`${canvas_width}`,'height':`${canvas_height}`});
        $('#canvas-draft').css({'width':`${canvas_width}`,'height':`${canvas_height}`});
    }
})

$(window).resize(function() {
    let canvas_width, canvas_height;

    if ($(window).width() < 576){
        canvas_width = $(window).width();
        canvas_height = $(window).height() - 100;
        $('#control-panel').css({'width':`${canvas_width}`,'height':'100px'});
        $('#canvas-container').css({'width':`${canvas_width}`,'height':`${canvas_height}`, 'left':'0px', 'top':'100px'});
        $('#canvas-real').css({'width':`${canvas_width}`,'height':`${canvas_height}`});
        $('#canvas-draft').css({'width':`${canvas_width}`,'height':`${canvas_height}`});
    }
        
    else{
        canvas_width = $(window).width() - 200;
        canvas_height = $(window).height();
        $('#control-panel').css({'width': '200px','height':`${canvas_height}`});
        $('#canvas-container').css({'width':`${canvas_width}`,'height':`${canvas_height}`, 'left':'200px', 'top':'0px'});
        $('#canvas-real').css({'width':`${canvas_width}`,'height':`${canvas_height}`});
        $('#canvas-draft').css({'width':`${canvas_width}`,'height':`${canvas_height}`});
    }
});