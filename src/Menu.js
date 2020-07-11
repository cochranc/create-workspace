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
import { Rect, Group, Line, Text, Shape } from "react-konva";
import gui from "./mistgui-globals";
import FunNode from "./FunNode";
import MakeMenuButton from "./MakeMenuButton";
import { funcGroup } from "./MakeFunction";
import { valGroup } from "./MakeValue";
import { Spring, animated } from 'react-spring/renderprops-konva';
//import tween from './tween';

function Menu(props) {
  //keeps track if the menus are open

  const [funcTog, setFuncTog] = useState(false);
  const [valTog, setValTog] = useState(false);
  const [isValueMenuOpen, setIsValueMenuOpen] = useState(false);
  const [isFunctionMenuOpen, setIsFunctionMenuOpen] = useState(false);


  function updateFunNodes(index, x, y) {}


  function handleMenuValues() {
    return Array.from(new Array(gui.valNames.length), (val, index) =>
      valGroup(
        props.addNode,
        gui.valNames[index],
        gui.menuFunctsXStart + 200 + index * 80,
        gui.menuYspacing - 20,
        valTog
      )
    );
  }

  function handleValueClick() {
    if (funcTog === false) {
      setValTog(!valTog);
      setIsValueMenuOpen(!isValueMenuOpen);
    } else {
      setFuncTog(!funcTog);
      setIsFunctionMenuOpen(!isFunctionMenuOpen);
      setValTog(!valTog);
      setIsValueMenuOpen(!isValueMenuOpen);
    }
  }

  function handleFunctionClick() {
    if (valTog === false) {
      setFuncTog(!funcTog);
      setIsFunctionMenuOpen(!isFunctionMenuOpen);
    } else {
      setValTog(!valTog);
      setIsValueMenuOpen(!isValueMenuOpen)
      setFuncTog(!funcTog);
      setIsFunctionMenuOpen(!isFunctionMenuOpen);
    }
  }

  function handleMenuFunctions() {
    return Array.from(new Array(gui.funNames.length), (val, index) =>
      funcGroup(
        props.addNode,
        gui.funNames[index],
        gui.menuFunctsXStart + 100 + index * 80,
        gui.menuYspacing - 20,
        funcTog
      )
    );
  }



  
  return (
    <Group width={window.innerWidth} height={gui.menuHeight}>
      <Rect
        width={window.innerWidth} height={gui.menuHeight}
        fill={'#EEF0FF'} shadowColor={'black'} shadowBlur={5}
      />
      {/*<Line
        points={[0, gui.menuHeight, window.innerWidth, gui.menuHeight]}
        stroke={"black"}
        strokeWidth={2}
      />*/}
      
        <Group visible={isValueMenuOpen}>
          <Rect
            x={gui.menuFunctsXStart - 150}
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
            x={gui.menuFunctsXStart - 140}
            y={gui.menuHeight / 2}
            fill={gui.arrowFill}
            opacity={0.2}
            onClick={handleValueClick}
          />
          {handleMenuValues()}
        </Group>
        <Group
          name={"valueIcon"}
          x={gui.menuCornerWidth}
          onClick={handleValueClick}
          visible = {!isValueMenuOpen}  
        >

          <Rect
            x={0}
            y={0}
            width={gui.buttonWidth}
            height={gui.menuHeight}
            fill={gui.valueMenuColorLight}
            visible={false}
          />
          <Rect
            {...props}
            x={gui.buttonWidth / 2}
            y={gui.menuHeight / 6}
            width={gui.valueSideLength * 1.5}
            height={gui.valueSideLength * 1.5}
            fill={gui.valueMenuColor}
            rotation={45}
          />
          <Text
            text={"Value"}
            x={0}
            y={(gui.menuHeight / 2.3)}
            width={gui.buttonWidth}
            height={gui.menuHeight / 4}
            fill={"black"}
            align={"center"}
            fontFamily={gui.globalFont}
            fontSize={20}
          />
        </Group>
        <Group visible={isFunctionMenuOpen}>
          <Rect
            x={gui.menuFunctsXStart}
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
            x={gui.menuFunctsXStart + 10}
            y={gui.menuHeight / 2}
            fill={gui.arrowFill}
            opacity={0.2}
            onClick={handleFunctionClick}
          />
          {handleMenuFunctions()}
        </Group>
        <Group
          name={"functionIcon"}
          x={gui.menuCornerWidth + gui.buttonWidth}
          onClick={handleFunctionClick}
          visible = {!isFunctionMenuOpen}
        >
          <Rect
            x={0}
            y={0}
            width={gui.buttonWidth*1.5}
            height={gui.menuHeight*1.5}
            fill={gui.functionColorLight}
            visible={false}
          />
          <Rect
            x={gui.buttonWidth / 2 - gui.functionRectSideLength*.75}
            y={gui.menuHeight / 6}
            width={gui.functionRectSideLength*1.5}
            height={gui.functionRectSideLength*1.5}
            fill={gui.functionColor}
          />
          <Text
            text={"Function"}
            x={0}
            y={(gui.menuHeight / 2.3)}
            width={gui.buttonWidth}
            height={gui.menuHeight / 4}
            fill={"black"}
            align={"center"}
            fontFamily={gui.globalFont}
            fontSize={gui.menuFontSize}
          />
        </Group>
      <Group>
        {[{name: "Reset Workspace", func: props.clearNode}, {name: "Open Workspace"}, {name: "Save Workspace"}].map((u, i) =>
          <MakeMenuButton
            text={u.name}
            x={0}//gui.menuOffset}
            y={(i+1)*gui.menuOffset + i*gui.menuControlHeight}
            handleClick={u.func}
          />
        )}
      </Group>
    </Group>
  );
}

export default Menu;