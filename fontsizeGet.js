var slider = document.getElementById("pixel");
var output = document.getElementById("displayVal");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
