import { Rect, Group, Text } from "react-konva";
import gui from "./mistgui-globals";
import React, { useState } from "react";
import Konva from "konva";
import { Spring, animated } from 'react-spring/renderprops-konva';

export var funcGroup = function makeFunctionGroup(addNode, funName, x, y, vis) {
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
    addNode('fun', funName, e.currentTarget.x(), e.currentTarget.y());
  }

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
      visible={true}
      renderLayer={null}
      scaleX={1}
      scaleY={1}
      draggable
      onDragStart = {handleDragStart}
      onDragEnd={handleDragEnd}
    >
    <Spring native 
    from = {{x: vis? -300 : gui.functionHalfStrokeWidth, scaleX : vis? 0 : 1, scaleY : vis? 0:1}}
    to = {{x : vis? gui.functionHalfStrokeWidth : -300, scaleX : vis? 1:0, scaleY : vis? 1:0}}>
      {props => (<animated.Rect
        {...props}
        name={funName}
        //x={gui.functionHalfStrokeWidth}
        y={gui.functionHalfStrokeWidth}
        width={gui.functionRectSideLength}
        height={gui.functionRectSideLength}
        fill={gui.functions[funName].color}
        lineJoin={"round"}
        stroke={gui.functions[funName].color}
        strokeWidth={gui.functionStrokeWidth}
      />)}
      </Spring>
      <Spring native from = {{x : vis? -300 : 0, fontSize : vis? 0 : gui.nodeFontSize}}
      to = {{x : vis? 0 : -300, fontSize : vis? gui.nodeFontSize : 0}}>
      {props => (<animated.Text
        {...props}
        text={gui.functions[funName].rep}
        fontFamily={gui.globalFont}
        fill={"white"}
        //fontSize={gui.nodeFontSize}
        //x={0}
        y={gui.functionTotalSideLength / 2 - gui.functionHalfStrokeWidth}
        width={gui.functionTotalSideLength}
        align={"center"}
      />)}
      </Spring>
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