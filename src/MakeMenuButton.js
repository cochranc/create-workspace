import React, { useState } from "react";
import { Rect, Group, Text, Shape, useStrictMode } from "react-konva";
import Konva from "konva";
import gui from "./mistgui-globals.js";

function MakeMenuButton(props) {

  const [click, setClick] = useState(true);

  function handleMouse(e) {
    e.target.to({
      duration : 0.2,
      shadowBlur : 2,
      shadowColor : 'blue'
    })
  }

  function handleMouseOut(e) {
    e.target.to({
      duration : 0.2,
      shadowBlur : 0
    })
  }

  function handleClick(e) {
    if(props.text === "Reset Workspace") {
        props.handleClick();
      }
    }
  

  return (
    <Group x={props.x} y={props.y} onClick={handleClick} onMouseOver={handleMouse} onMouseOut = {handleMouseOut}>
      <Rect
        x={5}
        y={0}
        width={gui.menuCornerWidth - 2 * gui.menuOffset}
        height={gui.menuControlHeight}
        fill={gui.menuControlColor}
        shadowColor={"black"}
        shadowEnabled={false}
      />
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
