import React, { useState } from "react";
import { Rect, Group, Text, Shape, useStrictMode } from "react-konva";
import Konva from "konva";
import gui from "./mistgui-globals.js";
import { Spring, animated } from 'react-spring/renderprops-konva';

function MakeMenuButton(props) {

  const [click, setClick] = useState(true);
  const [hovered, setHover] = useState(false);

  function handleMouse(e) {
    e.target.to({
      duration : 0.2,
      shadowBlur : 2,
      shadowColor : 'blue'
    })
  }

  function handleMouseOut(e) {
    e.target.to({
      duration : 0.1,
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
      <Spring from={{fill: props.buttonColor}}
        to={{fill: hovered ? 'orange' : props.buttonColor}}>
      {props => (<animated.Rect
        {...props}
        x={5}
        y={0}
        width={gui.menuCornerWidth - 2 * gui.menuOffset}
        height={gui.menuControlHeight}
        shadowColor={"black"}
        shadowEnabled={false}
        cornerRadius={15}
      />)}
      </Spring>
      <Text
        x={0}
        y={gui.menuTextOffset}
        width={gui.menuCornerWidth - 2 * gui.menuOffset}
        height={gui.menuControlHeight}
        text={props.text}
        align={"center"}
        fill={'white'}
        fontFamily={gui.globalFont}
        fontSize={gui.menuFontSize}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      />
    </Group>
  );
}

 export default MakeMenuButton;
