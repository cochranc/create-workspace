import React, { useState } from "react";
import "./styles/menu.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import VariableMenu from "./VariableMenu";
import FunctionMenu from "./FunctionMenu";
import { Stage, Layer, Rect, Group, Line, Text, Shape } from "react-konva";
import gui from "./mistgui-globals";
import FunNode from "./FunNode";
import MakeMenuButton from "./MakeMenuButton";
import { funcGroup } from "./MakeFunctions";
import {
  canMoveLeft,
  canMoveRight,
  expandFunctionNodes,
  moveFunctionsButtonLeft,
  moveFunctionNodesIn
} from "./tween";

function Menu(props) {
  //keeps track if the menus are open

  const [isValueMenuOpen, setIsValueMenuOpen] = useState(false);
  const [isFunctionMenuOpen, setIsFunctionMenuOpen] = useState(false);

  var leftArrowVisible = false
  var rightArrowVisible = false

  function onClick(clicked) {
    //toggles value menu
    if (clicked == "valueIcon") {
      //makes sure two menus aren't open at once
      if (!isValueMenuOpen && isFunctionMenuOpen) {
        setIsFunctionMenuOpen(false);
      }
      setIsValueMenuOpen(!isValueMenuOpen);
    }

    //toggles function menu
    if (clicked == "functionIcon") {
      //makes sure two menus aren't open at once
      if (!isFunctionMenuOpen && isValueMenuOpen) {
        setIsValueMenuOpen(false);
      }
      setIsFunctionMenuOpen(!isFunctionMenuOpen);
    }
  }

  function updateFunNodes(index, x, y) {}

  var menuFunctions = [];
  for (var i = 0; i < gui.funNames.length; i++) {
    menuFunctions[i] = funcGroup(
      gui.funNames[i],
      gui.menuFunctsXStart,
      gui.menuYspacing
    );
  }

  /**
   * addScrollArrows creates and returns an array of two groups
   * (left arrow and right arrow)
   * takes "type" (either functions or values)
   */
  var addScrollArrows = function(type) {
    var leftX =
      type == "values"
        ? gui.menuCornerWidth + gui.buttonWidth
        : gui.menuCornerWidth + gui.buttonWidth + gui.buttonWidth;
    var rightX =
      type == "values"
        ? gui.width - gui.buttonWidth - gui.arrowWidth
        : gui.width - gui.arrowWidth;
    /* make left arrow group */
    var leftArrow = (
      <Group x={leftX} y={0} direction={"left"} type={type} visible={leftArrowVisible}>
        <Rect
          x={0}
          y={0}
          width={gui.arrowWidth}
          height={gui.menuHeight}
          fill={gui.arrowBoxFill}
          opacity={0.1}
        />
        <Shape
          sceneFunc={function(context) {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(gui.triX, -gui.triY);
            context.lineTo(gui.triX, gui.triY);
            context.closePath();
            context.fillStrokeShape(this);
          }}
          x={gui.width / 250}
          y={gui.menuHeight / 2}
          fill={gui.arrowFill}
          opacity={0.2}
        />
      </Group>
    );
    /* make right arrow group */
    var rightArrow = (
      <Group
        x={rightX}
        y={0}
        direction={"right"}
        type={type}
        visible={rightArrowVisible}
        functional={false}
      >
        <Rect
          x={0}
          y={0}
          width={gui.arrowWidth}
          height={gui.menuHeight}
          fill={gui.arrowBoxFill}
          opacity={0.1}
        />
        <Shape
          sceneFunc={function(context) {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(-gui.triX, -gui.triY);
            context.lineTo(-gui.triX, gui.triY);
            context.closePath();
            context.fillStrokeShape(this);
          }}
          x={gui.width / 65}
          y={gui.menuHeight / 2}
          fill={gui.arrowFill}
          opacity={0.2}
        />
      </Group>
    );
    return { left: leftArrow, right: rightArrow };
  };

  var functionsArrows = addScrollArrows("functions");

  var menuArrowLayer = (
    <Group>functionsArrows['left'] functionsArrows['right']</Group>
  );

  /**
   * showScrollArrows changes visibility of the scroll arrows to true depending
   * on the type given. type is either 'values' or 'functions'
   */
  var showScrollArrows = function(type) {
    setTimeout(function() {
      leftArrowVisible = true
      rightArrowVisible = true
    }, 1000);
  };

  /**
   * hideScrollArrows changes visibility of the scroll arrows to false depending
   * on the type given. type is either 'values' or 'functions'
   */
  var hideScrollArrows = function(type) {
    leftArrowVisible = false
    rightArrowVisible = false
  };

  /**
   * updateArrows changes the opacity of the arrows based on if they are functional.
   */
  var updateArrows = function(type) {
    setTimeout(function() {
      if (type == "functions") {
        var leftArrow = functionsArrows["left"];
        var rightArrow = functionsArrows["right"];
        if (canMoveRight("functions", menuFunctions)) {
          leftArrow.setAttr("functional", true);
          leftArrow.children[0].setAttr("opacity", 0.3);
          leftArrow.children[1].setAttr("opacity", 0.5);
        } // if left functional
        else {
          leftArrow.setAttr("functional", false);
          leftArrow.children[0].setAttr("opacity", 0);
          leftArrow.children[1].setAttr("opacity", 0);
        } // else left non-functional

        if (canMoveLeft("functions")) {
          rightArrow.setAttr("functional", true);
          rightArrow.children[0].setAttr("opacity", 0.3);
          rightArrow.children[1].setAttr("opacity", 0.5);
        } // if right functional
        else {
          rightArrow.setAttr("functional", false);
          rightArrow.children[0].setAttr("opacity", 0);
          rightArrow.children[1].setAttr("opacity", 0);
        } // else right non-funcitonal
      } // else if functions
    }, 1050);
  }; // updateArrows

  function handleClick() {
    if (!gui.functionExpanded) {
      if (!gui.valueExpanded) {
        expandFunctionNodes(menuFunctions);
        gui.functionExpanded = true;
        showScrollArrows("functions");
        updateArrows("functions");
      } // functions and values not expanded
      else {
        //moveValueNodesIn();
        moveFunctionsButtonLeft();
        expandFunctionNodes();
        gui.functionExpanded = true;
        showScrollArrows("functions");
        updateArrows("functions");
        gui.valueExpanded = false;
        hideScrollArrows("values");
      } // functions not expanded, values expanded
    } else {
      moveFunctionNodesIn();
      gui.functionExpanded = false;
      hideScrollArrows("functions");
    } // functions are expanded
  }

  return (
    <Layer width={window.innerWidth} height={gui.menuHeight}>
      <Line
        points={[0, gui.menuHeight, window.innerWidth, gui.menuHeight]}
        stroke={"black"}
        strokeWidth={2}
      />
      <Group x={gui.menuCornerWidth}>
        <Rect
          x={0}
          y={0}
          width={gui.buttonWidth}
          height={gui.menuHeight}
          fill={gui.valueMenuColorLight}
          stroke={"black"}
          strokeWidth={2}
        />
        <Rect
          x={gui.buttonWidth / 2}
          y={gui.menuHeight / 6}
          width={gui.valueSideLength}
          height={gui.valueSideLength}
          fill={gui.valueMenuColor}
          rotation={45}
        />
        <Text
          text={"Add a value"}
          x={0}
          y={3 * (gui.menuHeight / 4)}
          width={gui.buttonWidth}
          height={gui.menuHeight / 4}
          fill={"black"}
          align={"center"}
          fontFamily={gui.globalFont}
          fontSize={gui.menuFontSize}
        />
      </Group>
      <Group x={gui.menuCornerWidth + gui.buttonWidth} onClick = {handleClick}>
        <Rect
          x={0}
          y={0}
          width={gui.buttonWidth}
          height={gui.menuHeight}
          fill={gui.functionColorLight}
          stroke={"black"}
          strokeWidth={2}
        />
        <Rect
          x={gui.buttonWidth / 2 - gui.functionRectSideLength / 2}
          y={gui.menuHeight / 6}
          width={gui.functionRectSideLength}
          height={gui.functionRectSideLength}
          fill={gui.functionColor}
        />
        <Text
          text={"Add a function"}
          x={0}
          y={3 * (gui.menuHeight / 4)}
          width={gui.buttonWidth}
          height={gui.menuHeight / 4}
          fill={"black"}
          align={"center"}
          fontFamily={gui.globalFont}
          fontSize={gui.menuFontSize}
        />
      </Group>
      <Group>{menuFunctions.map(node => node)}</Group>
      <Group>
        <MakeMenuButton
          text={"Reset Workspace"}
          x={gui.menuOffset}
          y={gui.menuOffset}
        />
        <MakeMenuButton
          text={"Open Workspace"}
          x={gui.menuOffset}
          y={2 * gui.menuOffset + gui.menuControlHeight}
        />
        <MakeMenuButton
          text={"Save Workspace"}
          x={gui.menuOffset}
          y={3 * gui.menuOffset + 2 * gui.menuControlHeight}
        />
      </Group>
    </Layer>
  );
}

export default Menu;
