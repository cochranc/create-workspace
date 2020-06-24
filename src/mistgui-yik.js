import React from 'react';
import Konva from 'konva';
import FunNode from './FunNode';
import { Rect } from 'react-konva';

/* Global Variables */
var width = window.innerWidth;
var height = window.innerHeight;
var globalFont = 'Arial';
var functionFont = 'Courier New';

var functionStrokeWidth = width / 90;
var functionHalfStrokeWidth = functionStrokeWidth / 2;
var functionTotalSideLength = width / 20;
var functionRectSideLength = functionTotalSideLength - functionStrokeWidth;
var functionColor = '#3FAAA0';
var functionColorLight = '#C6F1ED';
var functionMultColor = '#5EC783';
var functionSingleColor = '#77C9E2';
var functionRGBcolor = '#AE88D6';

var lineStrokeWidth = 2;

var menuFontSize = width / 75; //12 when width = 900
var valueSideLength = functionTotalSideLength / 1.414;
var valueMenuColor = '#F2937C';
var valueMenuColorLight = '#FDE6DD';
var valueXYColor = '#EFDC5C';
var valueTimeColor = '#FD9E54'
var valueMouseColor = '#E46868';
var valueConstantColor = '#F17C9D';

var outletXOffset = width / 400;
var outletYOffset = functionRectSideLength / 3;
var outletColor = '#C4C4C4';

var menuFontSize = width / 75; //12 when width = 900
var nodeFontSize = width / 56.25; //16 when width = 900
var globalScale = width / 900; // for elements that are more difficult to scale (undo/redo)

var imageBoxSideLength = width / 80;
var imageBoxColor = 'white';
var functionImageBoxOffset = width / 300;
var valueImageBoxOffset = width / 31;
var renderSideLength = width / 18;

var functions = {
    add: { rep: 'sum', max: 20, min: 2, prefix: 'sum', color: functionMultColor },
    multiply: { rep: 'mult', max: 20, min: 2, prefix: 'mult', color: functionMultColor },
    square: { rep: 'sqr', max: 1, min: 1, prefix: 'square', color: functionSingleColor },
    negate: { rep: 'neg', max: 1, min: 1, prefix: 'neg', color: functionSingleColor },
    sine: { rep: 'sin', max: 1, min: 1, prefix: 'sin', color: functionSingleColor },
    cosine: { rep: 'cos', max: 1, min: 1, prefix: 'cos', color: functionSingleColor },
    absolute: { rep: 'abs', max: 1, min: 1, prefix: 'abs', color: functionSingleColor },
    average: { rep: 'avg', max: 20, min: 2, prefix: 'avg', color: functionMultColor },
    sign: { rep: 'sign', max: 1, min: 1, prefix: 'sign', color: functionSingleColor },
    wrapsum: { rep: 'wsum', max: 20, min: 2, prefix: 'wsum', color: functionMultColor },
    rgb: { rep: 'rgb', max: 3, min: 3, prefix: 'rgb', color: functionRGBcolor },
    mistif: { rep: 'if', max: 3, min: 3, prefix: 'mistif', color: functionSingleColor }
};


var values = {
    x: { rep: 'x', color: valueXYColor },
    y: { rep: 'y', color: valueXYColor },
    second: { rep: 't.s', color: valueTimeColor },
    minute: { rep: 't.m', color: valueTimeColor },
    hour: { rep: 't.h', color: valueTimeColor },
    day: { rep: 't.d', color: valueTimeColor },
    constant: { rep: '#', color: valueConstantColor },
    mouseX: { rep: 'm.x', color: valueMouseColor },
    mouseY: { rep: 'm.y', color: valueMouseColor }
};
/* Global Variables */



/* 
  makeFunctionGroup takes a string funName, a key in the functions object above,
  an integer x, and an integer y, and returns the corresponding function node object,
  with top right corner at the given x, y coordinate.
*/
var makeFunctionGroup = function(funName, x, y) {
    /* create group that will contain information on the function and the shapes 
      making up the representation on screen. */
    var newGroup = new FunNode
    var newGroup = new Konva.Group({
      name: funName,
      x: x - functionHalfStrokeWidth,
      y: y,
      numInputs: 0, 
      maxInputs: functions[funName].max, 
      minInputs: functions[funName].min, 
      lineOut: [], 
      rep: functions[funName].rep,
      prefix: functions[funName].prefix, 
      separator: functions[funName].separator,
      renderFunction: null,
      visible: false,
      renderLayer: null,
      scaleX: 1,
      scaleY: 1
    });
    /* create rectangle shape */
    var newRect = new Konva.Rect({
      name: funName,
      x: functionHalfStrokeWidth,
      y: functionHalfStrokeWidth,
      width: functionRectSideLength,
      height: functionRectSideLength,
      fill: functions[funName].color,
      lineJoin: 'round',
      stroke: functions[funName].color,
      strokeWidth: functionStrokeWidth
    });
    newGroup.add(newRect);
    /* create text to be displayed on top of rectangle */
    var newText = new Konva.Text({
      text: functions[funName].rep,
      fontFamily: globalFont,
      fill: 'black',
      fontSize: nodeFontSize,
      x: 0,
      y: functionTotalSideLength/2 - functionHalfStrokeWidth,
      width: functionTotalSideLength,
      align: 'center'
    });
    newGroup.add(newText);
    /* create small box in the bottom right corner. Initially, it is not visible.*/
    var newBox = new Konva.Rect({
      name: 'imageBox',
      x: functionRectSideLength + functionImageBoxOffset,
      y: functionRectSideLength + functionImageBoxOffset,
      width: imageBoxSideLength,
      height: imageBoxSideLength,
      fill: imageBoxColor,
      stroke: 'black',
      strokeWidth: .5,
      visible: false,
      expanded: false
    });
    newGroup.add(newBox);
  
    return newGroup;
};

export {makeRect};

export default {
height, globalFont, functionFont, functions, functionStrokeWidth,
functionHalfStrokeWidth, functionTotalSideLength, functionRectSideLength, functionColor, functionColorLight,
functionMultColor, functionSingleColor, functionRGBcolor, menuFontSize, nodeFontSize, globalScale,
imageBoxSideLength, imageBoxColor, functionImageBoxOffset, valueImageBoxOffset, renderSideLength,
};