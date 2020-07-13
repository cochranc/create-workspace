import React, { useState, useEffect } from "react";
import "./styles/menu.css";
import { Rect, Group, Text, Shape } from "react-konva";
import gui from "./mistgui-globals";
import MakeMenuButton from "./MakeMenuButton";
import { funcGroup } from "./MakeFunction";
import { valGroup } from "./MakeValue";

function Menu(props) {

  // true if the function tab is expanded
  const [isFunctionMenuOpen, setIsFunctionMenuOpen] = useState(false);

  // true if the value tab is expanded
  const [isValueMenuOpen, setIsValueMenuOpen] = useState(false);

  /**
   * Makes all the value nodes in the menu with toggled visibility
   */
  function makeMenuValues() {
    return Array.from(new Array(gui.valNames.length), (val, index) =>
      valGroup(
        props.addNode,
        gui.valNames[index],
        gui.menuFunctsXStart + 200 + index * 80,
        gui.menuYspacing - 20,
        isValueMenuOpen
      )
    );
  }

   /**
   * Makes all the function nodes in the menu with toggled visibility
   */
  function makeMenuFunctions() {
    return Array.from(new Array(gui.funNames.length), (val, index) =>
      funcGroup(
        props.addNode,
        gui.funNames[index],
        gui.menuFunctsXStart + 100 + index * 80,
        gui.menuYspacing - 20,
        isFunctionMenuOpen
      )
    );
  }

  /**
   * Opens or closes the value tab
   */
  function handleValueClick() {
    if(isFunctionMenuOpen) {
      setIsFunctionMenuOpen(false);
    }
    setIsValueMenuOpen(!isValueMenuOpen);
  }

  /**
   * Opens or closes the function tab
   */
  function handleFunctionClick() {
    if(isValueMenuOpen) {
      setIsValueMenuOpen(false);
    }
    setIsFunctionMenuOpen(!isFunctionMenuOpen);
  }

  return (
    <Group width={window.innerWidth} height={gui.menuHeight}>
      <Rect
        width={window.innerWidth} height={gui.menuHeight}
        fill={props.bgColor} shadowColor={'black'} shadowBlur={5}
      />
        <Group>
          <Rect // rectangle behind the arrow
            x={gui.menuFunctsXStart - 150} y={0}
            width={gui.arrowWidth} height={gui.menuHeight}
            fill={gui.arrowBoxFill} opacity={0.1}
          />
          <Shape // the arrow for the values
            sceneFunc={function(context) {
              context.beginPath();
              context.moveTo(0, 0);
              context.lineTo(gui.triX, -gui.triY);
              context.lineTo(gui.triX, gui.triY);
              context.closePath();
              context.fillStrokeShape(this);
            }}
            x={gui.menuFunctsXStart - 140} y={gui.menuHeight / 2}
            fill={gui.arrowFill} opacity={0.2} onClick={handleValueClick}
          />
          {makeMenuValues()}
        </Group>
        <Group // value button
          name={"valueIcon"} x={gui.menuCornerWidth}
          onClick={handleValueClick} visible = {!isValueMenuOpen}  
        >
          <Rect // big rectangle background in the button
            x={0} y={0} width={gui.buttonWidth} height={gui.menuHeight}
            fill={gui.valueMenuColorLight}
          />
          <Rect // the diamond shape
            x={gui.buttonWidth / 2} y={gui.menuHeight / 6}
            width={gui.valueSideLength} height={gui.valueSideLength}
            fill={gui.valueMenuColor} rotation={45}
          />
          <Text
            text={"Add a value"}
            x={0} y={3 * (gui.menuHeight / 4)}
            width={gui.buttonWidth} height={gui.menuHeight / 4}
            fill={"black"} align={"center"}
            fontFamily={gui.globalFont} fontSize={gui.menuFontSize}
          />
        </Group>
        <Group>
          <Rect // rectangle behind the arrow
            x={gui.menuFunctsXStart} y={0}
            width={gui.arrowWidth} height={gui.menuHeight}
            fill={gui.arrowBoxFill}
            opacity={0.1}
          />
          <Shape // the arrow for the functions
            sceneFunc={function(context) {
              context.beginPath();
              context.moveTo(0, 0);
              context.lineTo(gui.triX, -gui.triY);
              context.lineTo(gui.triX, gui.triY);
              context.closePath();
              context.fillStrokeShape(this);
            }}
            x={gui.menuFunctsXStart + 10} y={gui.menuHeight / 2}
            fill={gui.arrowFill} opacity={0.2} onClick={handleFunctionClick}
          />
          {makeMenuFunctions()}
        </Group>
        <Group // function button
          name={"functionIcon"} x={gui.menuCornerWidth + gui.buttonWidth}
          onClick={handleFunctionClick} visible = {!isFunctionMenuOpen}
        >
          <Rect // button's background rectangle
            x={0} y={0} width={gui.buttonWidth} height={gui.menuHeight}
            fill={gui.functionColorLight}
          />
          <Rect // square function node shape
            x={gui.buttonWidth / 2 - gui.functionRectSideLength / 2} y={gui.menuHeight / 6}
            width={gui.functionRectSideLength} height={gui.functionRectSideLength}
            fill={gui.functionColor}
          />
          <Text
            text={"Add a function"}
            x={0} y={3 * (gui.menuHeight / 4)}
            width={gui.buttonWidth} height={gui.menuHeight / 4}
            fill={"black"} align={"center"}
            fontFamily={gui.globalFont} fontSize={gui.menuFontSize}
          />
        </Group>
      <Group>
        {[{name: "Reset Workspace", func: props.clearWorkspace},
          {name: "Open Workspace"},
          {name: "Save Workspace"}].map((u, i) =>
          <MakeMenuButton
            text={u.name}
            x={0} y={(i+1)*gui.menuOffset + i*gui.menuControlHeight}
            handleClick={u.func}
            buttonColor={props.wsButtonColor}
          />
        )}
      </Group>
    </Group>
  );
}

export default Menu;