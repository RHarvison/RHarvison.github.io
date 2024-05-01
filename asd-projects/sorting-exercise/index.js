/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array){
    for(var i = 0; i <= array.length - 1; i++){
        for(var j = 0; j <= array.length - 1; j++){
            if (array[j].value > array[i].value){
                swap(array, i, j)
                updateCounter(bubbleCounter);
                await sleep();
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if((right - left) > 0){
        index = await partition(array, left, right)
        if(left < (index - 1)){
            quickSort(array, left, index - 1)
        }
        if (index < right){
            quickSort(array, index, right)
        }
    }
}

// TODOs 4 & 5: Implement partition

async function partition(array, left, right){
    var pivot = array[Math.floor((right + left)/2)].value;
    while(left < right){
        while (array[left].value < pivot) { left++ }
        while(array[right].value > pivot) { right--}
        if(left < right){
            swap(array, left, right)
            updateCounter(quickCounter)
            await sleep()
        }
    }
    return left + 1
}

// TODO 1: Implement swap
function swap(array, i, j){
    [array[i], array[j]] = [array[j], array[i]]
    drawSwap(array, i, j)
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}
/////////////////////////////////////////////////
//////////////// Define variables ///////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// THE CONSTANTS BELOW MAY BE ALTERED FOR EXPERIMENTATION PURPOSES

// set the delay between each sort step
const SLEEP_AMOUNT = 0.001;

// set the max number of squares
const MAX_SQUARES = 200;

// set constants for pseudo-random number generation
const SEED = 2;
const FACTOR = 1774339;
const INCREASE = 7181930;


/////////////////////////////////////////////////
// ALL CONSTANTS BELOW HERE SHOULD NOT BE ALTERED

// values related to drawing the sorting grid
const IMAGE_SIZE = 256;                         // pixels
const MAX_SQUARE_WIDTH = 25;                    // percentage of width
const MAX_SQUARE_HEIGHT = 1/MAX_SQUARES*100;    // percentage of height

// define the arrays that will store all created HTML elements
const bubbleList = [];
const quickList = [];

// define the ids of the divs containing the created elements
const bubbleId = "#displayBubble";
const quickId = "#displayQuick";
const bubbleContainer = "#bubbleArea";
const quickContainer = "#quickArea";
const bubbleCounter = "#bubbleCounter";
const quickCounter = "#quickCounter";

// define the base ids of the created elements (numbers will be added to make them unique)
const bubbleElementBaseId = "bubble";
const quickElementBaseId = "quick";

// define the classes of the elements
const elementClass = "sortElement";
const bubbleClass = "bubbleElement";
const quickClass = "quickElement";


// create undefined functions so that the program won't crash pre-function creation
var bubbleSort, quickSort;

/////////////////////////////////////////////////
///////////////// Run the setup /////////////////
/////////////////////////////////////////////////

$(document).ready(function(){
    // resize the containers to fit everything
    let squareHeight = $(bubbleId).width() * (Math.min((1 / MAX_SQUARES * 100), MAX_SQUARE_WIDTH)/100);
   
    $(bubbleId).height(squareHeight*MAX_SQUARES);
    $(quickId).height(squareHeight*MAX_SQUARES);
   
    // create the two lists and all elements
    generateList(bubbleList, bubbleId, bubbleClass, bubbleElementBaseId);
    generateList(quickList, quickId, quickClass, quickElementBaseId);
});


/////////////////////////////////////////////////
/////////////// Helper functions ////////////////
/////////////////////////////////////////////////

// generate all elements in a list
function generateList(list, listId, cssClass, baseId){
    let numbers = [];

    // start by making an array of numbers
    // this will be used to keep track of which values have already
    // been assigned to created elements
    for (var i = 1; i <= MAX_SQUARES; i++){
        numbers.push(i);
    }

    // next, create the elements "randomly"
    let nextIndex = SEED;
    for (var i = 0; i < MAX_SQUARES; i++){
        // choose the next element to create randomly (by grabbing an unused value for the element)
        nextIndex = chooseIndex(nextIndex, numbers);

        // create the element
        createAndAddElement(list, listId, cssClass, baseId, numbers[nextIndex]);

        // remove the chosen value from the list of numbers;
        // this way, every created element will have a unique value associated with it
        numbers.splice(nextIndex, 1);
    }
}

// choose a "random" index
function chooseIndex(startIndex, array){
    return (startIndex * FACTOR + INCREASE) % array.length;
}

// create an element and add it to the specified list of elements
function createAndAddElement(list, listId, cssClass, baseId, value){
    let newElement = makeElement(baseId + value, value);

    let offset = list.length / MAX_SQUARES * 100;
    list.push(newElement);
   
    $("<div>").addClass(cssClass)
              .addClass(elementClass)
              .attr("id", baseId+value)
              .css("height", MAX_SQUARE_HEIGHT + "%")
              .css("width", MAX_SQUARE_HEIGHT * value + "%")
              .css("background-size", 100/value + '% '+ 100 + '%')
              .css("top", offset + "%")
              .appendTo(listId);
}

// factory function for elements
function makeElement(id, value){
    return {
        id: "#" + id,
        value: value
    };
}
