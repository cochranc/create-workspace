import gui from "./mistgui-globals";
import Kinetic from "kinetic";
import React from "react"
import Tween from "react-konva"
/*
makeMenuTween takes a node (target), an integer (xEnd), and a boolean (visibility).
It returns a kinetic tween that will move target to xEnd, without changing y value,
and with the visibility to the specified boolean values.
*/
var makeMenuTween = function(target, xEnd, visibility) {
    return <Tween
      node = {target}
      duration = {gui.menuAnimDuration}
      x = {xEnd}
      visible = {visibility}
    />
  };

export var expandFunctionNodes = function(menuFunctions) {
  for (var i = 0; i < menuFunctions.length; i++) {
    var moveFunction = makeMenuTween(
      menuFunctions[i],
      gui.menuCornerWidth +
        2 * gui.buttonWidth +
        gui.functMenuXSpacing +
        i * (gui.functMenuXSpacing + gui.functionTotalSideLength),
      true
    );
    
  }
};

/* move the functionGroups to their original position. */
export var moveFunctionNodesIn = function() {
    for (var i = 0; i < gui.menuFunctions.length; i++) {
        var moveFunction = makeMenuTween(gui.menuFunctions[i], gui.menuFunctsXStart, false);

    }
};

/* move the functionsButon to it's original position. */
export var moveFunctionsButtonLeft = function() {
    var moveButton = makeMenuTween(gui.functionsButton, gui.menuCornerWidth + gui.buttonWidth, true)
    moveButton.play();
};

/**
 * canMoveRight tests if either the functions or values in the menu can be moved
 * to the right and returns a boolean.
 */
export var canMoveRight = function(type) {
  return (
    (type === "functions" &&
      gui.menuFunctions[0].x() <
        gui.menuCornerWidth + 2 * gui.buttonWidth + gui.functMenuXSpacing)
  );
};
/**
 * canMoveLeft tests if either the functions or values in the menu can be moved
 * to the left and returns a boolean.
 */
export var canMoveLeft = function(type) {
  return (
    (type === "values" &&
      gui.menuValues[gui.menuValues.length - 1].x() >
        gui.width - gui.buttonWidth) ||
    (type === "functions" &&
      gui.menuFunctions[gui.menuFunctions.length - 1].x() > gui.width)
  );
};
