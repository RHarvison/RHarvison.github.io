// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(reddify)

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

function applyFilter(filterFunction) {
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[j].length; j++) {
      rgbString = image[i][j]
      rgbNumbers = rgbStringToArray(rgbString)
      filterFunction(rgbNumbers)
      rgbString = rgbArrayToString(rgbNumbers)
      image[i][j] = rgbString
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction) {
  backGroundColor = image[0][0]
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[j].length; j++) {
      if (image[i][j] !== backGroundColor) {
        rgbString = image[i][j]
        rgbNumbers = rgbStringToArray(rgbString)
        filterFunction(rgbNumbers)
        rgbString = rgbArrayToString(rgbNumbers)
        image[i][j] = rgbString
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(a) {
  return a < 0 ? 0 : a > 255 ? 255 : a
}

// TODO 3: Create reddify function

function reddify(arr) {
  arr[RED] = 200
}

// TODO 6: Create more filter functions
function decreaseBlue(a){
  a[BLUE] = keepInBounds(a[BLUE] - 50);
}
function increaseGreenByBlue(a) {
  a[GREEN] = keepInBounds(a[BLUE] + a[GREEN]);
}

// CHALLENGE code goes below herew