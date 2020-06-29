import React, { useState } from "react";
import { Rect, Group, Text, Shape, useStrictMode } from "react-konva";
import Konva from "konva";
import gui from "./mistgui-globals.js";

function MakeMenuButton(props) {
  return (
    <Group x={props.x} y={props.y}>
      <Rect
        x={0}
        y={0}
        width={gui.menuCornerWidth - 2 * gui.menuOffset}
        height={gui.menuControlHeight}
        fill={gui.menuControlColor}
        stroke={"black"}
        strokeWidth={0.5}
        shadowColor={"black"}
        shadowEnabled={false}
      />
      <Text
        x={0}
        y={gui.menuTextOffset}
        width={gui.menuCornerWidth - 2 * gui.menuOffset}
        height={gui.menuControlHeight - gui.menuTextOffset}
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
