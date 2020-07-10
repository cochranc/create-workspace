import React from "react";
import gui from "./mistgui-globals";
import { Group, Rect, Text } from "react-konva";
import Konva from "konva";
import { Spring, animated } from 'react-spring/renderprops-konva';

export var valGroup = function(addNode,valName, x, y, vis) {
  function handleDragStart(e) {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  }

  function handleDragEnd(e) {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
    addNode('val', valName, e.currentTarget.x(), e.currentTarget.y());
  }
  return (
    <Group
      name={valName}
      x={x}
      y={y}
      lineOut={[]}
      visible={true}
      renderFunction={gui.values[valName].rep}
      rep={gui.values[valName].rep}
      renderLayer={null}
      scaleX={1}
      scaleY={1}
      draggable
      onDragStart = {handleDragStart}
      onDragEnd = {handleDragEnd}
    >
    <Spring
    native
    from = {{x : -300, width : 0, height : 0}} 
    to = {{
      x : gui.functionRectSideLength / 2,
      width : gui.valueSideLength,
      height : gui.valueSideLength 
    }}>
      {props => (<animated.Rect
        {...props}
        //x={gui.functionRectSideLength / 2}
        y={0}
        //width={gui.valueSideLength}
        //height={gui.valueSideLength}
        fill={gui.values[valName].color}
        rotation={45}
        name={valName}
      />)}
    </Spring>
    <Spring 
    native
    from = {{x : -300, fontSize : 0}} 
    to = {{
      x : 0,
      fontSize : gui.nodeFontSize
    }}>
     {props => (<animated.Text
        {...props}
        text={gui.values[valName].rep}
        fontFamily={gui.globalFont}
        fill={"black"}
        //fontSize={gui.nodeFontSize}
        //x={0}
        y={gui.valueSideLength / 2}
        width={gui.functionRectSideLength}
        align={"center"}
      />)}
      </Spring>
    </Group>
  );
};