var slider = document.getElementById("pixel");
var output = document.getElementById("displayVal1");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

var blur = document.getElementById("blur");
var output2 = document.getElementById("displayVal2");
output2.innerHTML = blur.value;

blur.oninput = function() {
  output2.innerHTML = this.value;
}
