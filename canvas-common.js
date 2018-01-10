let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let mdragging = false;
let snapshot = [];
let index = 0;
snapshot[0] = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);

class PaintFunction {
  constructor() {}
  onMouseDown() {}
  onDragging() {}
  onMouseMove() {}
  onMouseUp() {}
  onMouseLeave() {}
  onMouseEnter() {}
  onDoubleClick() {}
  reset() {}
  capture() {
    snapshot.length = index + 1;
    snapshot[++index] = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
  }
}

function desktopMode() {
  $('#canvas-draft').mousedown(function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseDown([mouseX, mouseY], e);
    dragging = true;
    console.log(mouseX,mouseY);
  });

  $('#canvas-draft').mousemove(function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    if (dragging) {
      currentFunction.onDragging([mouseX, mouseY], e);
    }
    currentFunction.onMouseMove([mouseX, mouseY], e);
  });

  $('#canvas-draft').mouseup(function(e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseUp([mouseX, mouseY], e);
  });

  $('#canvas-draft').mouseleave(function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX, mouseY], e);
  });

  $('#canvas-draft').mouseenter(function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX, mouseY], e);
  });

  $('#canvas-draft').dblclick(function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onDoubleClick([mouseX, mouseY], e);
  });
}

function mobileMode() {
  var hammertime = new Hammer(canvasDraft);

  // panup and pandown will not mix with scroll
  hammertime.get('pan').set({
    direction: Hammer.DIRECTION_ALL
  });

  // swtich between single and double tap
  hammertime.add(new Hammer.Tap({
    event: 'doubletap',
    taps: 2
  }));
  hammertime.add(new Hammer.Tap({
    event: 'tap'
  }));
  hammertime.get('doubletap').recognizeWith('tap');
  hammertime.get('tap').requireFailure('doubletap');

  // console.log touch behavior
  hammertime.on('drag swipe tap doubletap press pan panstart panend panleft panright panmove panup pandown', function(ev) {
    console.log(ev.type);
  });

  hammertime.on('tap panstart', function(ev) {
    let mouseX = ev.center.x - canvasDraft.offsetLeft;
    let mouseY = ev.center.y - canvasDraft.offsetTop;
    currentFunction.onMouseDown([mouseX, mouseY], ev);
    mdragging = true;
  })

  hammertime.on('doubletap', function(ev) {
    let mouseX = ev.center.x - canvasDraft.offsetLeft;
    let mouseY = ev.center.y - canvasDraft.offsetTop;
    currentFunction.onDoubleClick([mouseX, mouseY], ev);
  })

  hammertime.on('panmove', function(ev) {
    let mouseX = ev.center.x - canvasDraft.offsetLeft;
    let mouseY = ev.center.y - canvasDraft.offsetTop;
    if (mdragging) {
      currentFunction.onDragging([mouseX, mouseY], ev);
    }
    currentFunction.onMouseMove([mouseX, mouseY], ev);
  });

  hammertime.on('panend', function(ev) {
    mdragging = false;
    let mouseX = ev.center.x - canvasDraft.offsetLeft;
    let mouseY = ev.center.y - canvasDraft.offsetTop;
    currentFunction.onMouseUp([mouseX, mouseY], ev);
  });
}

$(document).ready(function() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 768) {
    mobileMode();
  } else if ($(window).width() > 767) {
    desktopMode();
  }
});
