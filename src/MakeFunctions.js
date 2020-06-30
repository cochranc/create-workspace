import {Rect, Group, Text } from "react-konva";
import gui from "./mistgui-globals";
import React from "react";

export var funcGroup = function makeFunctionGroup(funName, x, y) {
  return (
    <Group
      name={funName}
      x={x - gui.functionHalfStrokeWidth}
      y={y}
      numInputs={0}
      maxInputs={gui.functions[funName].max}
      minInputs={gui.functions[funName].min}
      lineOut={[]}
      rep={gui.functions[funName].rep}
      prefix={gui.functions[funName].prefix}
      separator={gui.functions[funName].separator}
      renderFunction={null}
      visible={false}
      renderLayer={null}
      scaleX={1}
      scaleY={1}
      draggable
    >
      <Rect
        name={funName}
        x={gui.functionHalfStrokeWidth}
        y={gui.functionHalfStrokeWidth}
        width={gui.functionRectSideLength}
        height={gui.functionRectSideLength}
        fill={gui.functions[funName].color}
        lineJoin={"round"}
        stroke={gui.functions[funName].color}
        strokeWidth={gui.functionStrokeWidth}
      />

      <Text
        text={gui.functions[funName].rep}
        fontFamily={gui.globalFont}
        fill={"black"}
        fontSize={gui.nodeFontSize}
        x={0}
        y={gui.functionTotalSideLength / 2 - gui.functionHalfStrokeWidth}
        width={gui.functionTotalSideLength}
        align={"center"}
      />

      <Rect
        name={"imageBox"}
        x={gui.functionRectSideLength + gui.functionImageBoxOffset}
        y={gui.functionRectSideLength + gui.functionImageBoxOffset}
        width={gui.imageBoxSideLength}
        height={gui.imageBoxSideLength}
        fill={gui.imageBoxColor}
        stroke={"black"}
        strokeWidth={0.5}
        visible={false}
        expanded={false}
      />
    </Group>
  );
};
