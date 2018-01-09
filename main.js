$(document).ready(function (){
    let canvas_width, canvas_height;
    

    if ($(window).width() < 576){
        canvas_width = $(window).width();
        canvas_height = $(window).height() - 100;
        $('#control-panel').css({'width':`${canvas_width}`,'height':'100px'});
        $('#canvas-real')[0].width = $('#canvas-draft')[0].width = canvas_width;
        $('#canvas-real')[0].height = $('#canvas-draft')[0].height = canvas_height;
        $('#canvas-real').css({'left':'0px', 'top':'100px'});
        $('#canvas-draft').css({'left':'0px', 'top':'100px'});
        $('i').removeClass('fa-2x');
        $('.btn-sq-xs').css({'width':'24px','height':'24px','padding':'3px'});
        $('.icon').css('textAlign','left');
    }
        
    else{
        canvas_width = $(window).width() - 200;
        canvas_height = $(window).height();
        $('#control-panel').css({'width': '200px','height':`${canvas_height}`});
        $('#canvas-real')[0].width = $('#canvas-draft')[0].width = canvas_width;
        $('#canvas-real')[0].height = $('#canvas-draft')[0].height = canvas_height;
        $('#canvas-real').css({'left':'200px', 'top':'0px'});
        $('#canvas-draft').css({'left':'200px', 'top':'0px'});
    }
})

$(window).resize(function() {
    let canvas_width, canvas_height;

    if ($(window).width() < 576){
        canvas_width = $(window).width();
        canvas_height = $(window).height() - 100;
        $('#control-panel').css({'width':`${canvas_width}`,'height':'100px'});
        $('#canvas-real')[0].width = $('#canvas-draft')[0].width = canvas_width;
        $('#canvas-real')[0].height = $('#canvas-draft')[0].height = canvas_height;
        $('#canvas-real').css({'left':'0px', 'top':'100px'});
        $('#canvas-draft').css({'left':'0px', 'top':'100px'});
        $('i').removeClass('fa-2x');
        $('.btn-sq-xs').css({'width':'24px','height':'24px','padding':'3px'});
        $('.icon').css('textAlign','left');
    }
        
    else{
        canvas_width = $(window).width() - 200;
        canvas_height = $(window).height();
        $('#control-panel').css({'width': '200px','height':`${canvas_height}`});
        $('#canvas-real')[0].width = $('#canvas-draft')[0].width = canvas_width;
        $('#canvas-real')[0].height = $('#canvas-draft')[0].height = canvas_height;
        $('#canvas-real').css({'left':'200px', 'top':'0px'});
        $('#canvas-draft').css({'left':'200px', 'top':'0px'});
        $('i').addClass('fa-2x');
        $('.btn-sq-xs').css({'width':'48px','height':'48px','padding':'6px'});
        $('.icon').css('textAlign','center');
    }
});