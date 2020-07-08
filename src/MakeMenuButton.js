import React, { useState } from "react";
import { Rect, Group, Text, Shape, useStrictMode } from "react-konva";
import Konva from "konva";
import gui from "./mistgui-globals.js";

function MakeMenuButton(props) {

  function handleClick() {
    if(props.text === "Reset Workspace") {
      props.handleClick();
    }
  }

  return (
    <Group x={props.x} y={props.y} onClick={handleClick}>
      <Rect
        x={0}
        y={0}
        width={gui.menuCornerWidth - 2 * gui.menuOffset}
        height={gui.menuControlHeight}
        fill={gui.menuControlColor}
        shadowColor={"black"}
        shadowEnabled={false}
      />
      {/*<Shape
        sceneFunc={function (context) {
          context.beginPath();
          context.moveTo(gui.menuCornerWidth - 2 * gui.menuOffset, 0);
          context.bezierCurveTo(
            gui.menuCornerWidth - gui.menuOffset, 10,
            gui.menuCornerWidth - gui.menuOffset, gui.menuControlHeight - 10,
            gui.menuCornerWidth - 2 * gui.menuOffset, gui.menuControlHeight);
          context.closePath();
          context.fillStrokeShape(this);
        }}
        x={0}
        y={0}
        fill={'red'}
      />*/}
      <Text
        x={0}
        y={gui.menuTextOffset}
        width={gui.menuCornerWidth - 2 * gui.menuOffset}
        height={gui.menuControlHeight}
        text={props.text}
        align={"center"}
        fill={gui.menuControlTextColor}
        fontFamily={gui.globalFont}
        fontSize={gui.menuFontSize}
      />
    </Group>
  );
}

 export default MakeMenuButton;
