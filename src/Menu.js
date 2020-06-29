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
import { Stage, Layer, Rect, Group, Line, Text } from "react-konva";
import gui from "./mistgui-globals";
import FunNode from "./FunNode";
import MakeMenuButton from "./MakeMenuButton";
//import tween from './tween';


function Menu(props) {
  //keeps track if the menus are open
  const menuFunctions = [];

  const [isValueMenuOpen, setIsValueMenuOpen] = useState(false);
  const [isFunctionMenuOpen, setIsFunctionMenuOpen] = useState(false);

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

  /**
 * addScrollArrows creates and returns an array of two groups 
 * (left arrow and right arrow)
 * takes "type" (either functions or values)
 */
// var addScrollArrows = function(type) {
//     var leftX = (type=='values') ? valuesButton.x() + buttonWidth : 
//       functionsButton.x() + buttonWidth;
//     var rightX = (type=='values') ? width - buttonWidth - arrowWidth : 
//       width - arrowWidth
//     /* make left arrow group */  
//     var leftArrow = new Kinetic.Group({
//       x: leftX,
//       y: 0,
//       direction: 'left',
//       type: type,
//       visible: false
//     });
//     var leftArrowBox = new Kinetic.Rect({
//       x: 0,
//       y: 0,
//       width: arrowWidth,
//       height: menuHeight,
//       fill: arrowBoxFill,
//       opacity: .1
//     });
//     leftArrow.add(leftArrowBox);
//     var leftArrowTri = new Kinetic.Shape({
//       sceneFunc: function(context) {
//         context.beginPath();
//         context.moveTo(0,0);
//         context.lineTo(triX, -triY);
//         context.lineTo(triX, triY);
//         context.closePath();
//         context.fillStrokeShape(this);
//       },
//       x: width/250,
//       y: menuHeight / 2,
//       fill: arrowFill,
//       opacity: .2
//     });
//     leftArrow.add(leftArrowTri);
  
//     /* make right arrow group */
//     var rightArrow = new Kinetic.Group({
//       x: rightX,
//       y: 0,
//       direction: 'right',
//       type: type,
//       functional: false,
//       visible: false
//     });
//     var rightArrowBox = new Kinetic.Rect({
//       x: 0,
//       y: 0,
//       width: arrowWidth,
//       height: menuHeight,
//       fill: arrowBoxFill,
//       opacity: .1
//     });
//     rightArrow.add(rightArrowBox);
  
//     var rightArrowTri = new Kinetic.Shape({
//       sceneFunc: function(context) {
//         context.beginPath();
//         context.moveTo(0,0);
//         context.lineTo(-triX, -triY);
//         context.lineTo(-triX, triY);
//         context.closePath();
//         context.fillStrokeShape(this);
//       },
//       x: width / 65,
//       y: menuHeight / 2,
//       fill: arrowFill,
//       opacity: .2
//     });
//     rightArrow.add(rightArrowTri);
  
//     return {left: leftArrow, right: rightArrow};
//   };

//   function handleClick(){
//     if (!gui.functionExpanded) {
//       if (!gui.valueExpanded) {
//         tween.expandFunctionNodes();
//         gui.functionExpanded = true;
//         showScrollArrows('functions');
//         updateArrows('functions');
//     } // functions and values not expanded
//     else {
//       moveValueNodesIn();
//       moveFunctionsButtonLeft();
//       tween.expandFunctionNodes();
//       functionExpanded = true;
//       showScrollArrows('functions');
//       updateArrows('functions');
//       valueExpanded = false;
//       hideScrollArrows('values');
//     } // functions not expanded, values expanded
//   }
//   else {
//     moveFunctionNodesIn();
//     functionExpanded = false;
//     hideScrollArrows('functions');
//     } // functions are expanded
//   };

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
      <Group x={gui.menuCornerWidth + gui.buttonWidth} onClick = {onClick}>
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
      <Group>
        {gui.funNames.map((node) => (
          <FunNode
            name={node}
            x={gui.menuFunctsXStart}
            y={gui.menuYspacing}
            numInputs={0}
            numOutlets={0}
            handler={updateFunNodes}
            //check={checkState}
          />
        ))}
      </Group>
      <Group>
          <MakeMenuButton text = {"Reset Workspace"} x = {gui.menuOffset} y = {gui.menuOffset}/>
          <MakeMenuButton text = {"Open Workspace"} x = {gui.menuOffset} y = {(2*gui.menuOffset) + gui.menuControlHeight}/>
          <MakeMenuButton text = {"Save Workspace"} x = {gui.menuOffset} y = {3*gui.menuOffset + (2*gui.menuControlHeight)}/>
      </Group>
    </Layer>
  );
}

export default Menu;
