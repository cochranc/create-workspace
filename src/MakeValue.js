import React from "react";
import gui from "./mistgui-globals";
import { Group, Rect, Text } from "react-konva";

export var valGroup = function(valName, x, y, vis) {
  return (
    <Group
      name={valName}
      x={x}
      y={y}
      lineOut={[]}
      visible={vis}
      renderFunction={gui.values[valName].rep}
      rep={gui.values[valName].rep}
      renderLayer={null}
      scaleX={1}
      scaleY={1}
    >
      <Rect
        x={gui.functionRectSideLength / 2}
        y={0}
        width={gui.valueSideLength}
        height={gui.valueSideLength}
        fill={gui.values[valName].color}
        rotation={45}
        name={valName}
      />

      <Text
        text={gui.values[valName].rep}
        fontFamily={gui.globalFont}
        fill={"black"}
        fontSize={gui.nodeFontSize}
        x={0}
        y={gui.valueSideLength / 2}
        width={gui.functionRectSideLength}
        align={"center"}
      />
    </Group>
  );
};
