var slider = document.getElementById('pixel');
var output = document.getElementById("displayVal1");
noUiSlider.create(slider, {
  start: 5,
  step: 1,
  connect: true,
  range: {
    'min': 1,
    'max': 50
  },
  format: wNumb({
      decimals: 0,
    })
});
pixel.noUiSlider.on('update', function( values, handle ){
  output.innerHTML = values[handle];
});
output.innerHTML = slider.noUiSlider.get()
