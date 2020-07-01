import React, { useState, useEffect } from "react";
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
import { funcGroup } from "./MakeFunction";
//import tween from './tween';

function Menu(props) {
  //keeps track if the menus are open

  const [tog, setTog] = useState(false);
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

  var menuFunctions = [];

  function handleMenuFunctions() {
    for (var i = 0; i < gui.funNames.length; i++) {
      menuFunctions[i] = funcGroup(
        gui.funNames[i],
        gui.menuFunctsXStart,
        gui.menuYspacing,
        tog
      );
    }
  }

  function handleClick() {
    setTog(true);
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
      <Group x={gui.menuCornerWidth + gui.buttonWidth} onClick={handleClick}>
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
