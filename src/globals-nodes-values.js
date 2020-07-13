
const SQRT2 = 1.414;

var width = window.innerWidth / 25;

// rectangle side length
var sideLength = width * SQRT2 / 2;

// 
var rectX = width / 2;

var imageBoxSideLength = window.innerWidth / 80;

var imageBoxOffset = 3 * width / 4;

var renderSideLength = window.innerWidth / 18;

var editableTextWidth = window.innerWidth / 15;
var editableTextHeight = window.innerWidth / 30;
var editableTextFont = window.innerWidth / 69;

export default {width, sideLength, rectX,
    imageBoxSideLength, imageBoxOffset, renderSideLength}