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
    if(e.currentTarget.y() > gui.menuHeight) {
      addNode('fun', funName, e.currentTarget.x(), e.currentTarget.y());
    }
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
      renderFunction={""}
      visible={true}
      renderLayer={null}
      scaleX={1}
      scaleY={1}
      draggable
      dragBoundFunc={function(pos) {
        if(pos.x < 0) {
            pos.x = 0;
        }
        if(pos.x > gui.width - gui.functionTotalSideLength) {
            pos.x = gui.width - gui.functionTotalSideLength;
        }
        if(pos.y < gui.menuHeight) {
            pos.y = gui.menuHeight;
        }
        if(pos.y > gui.height - gui.funBarHeight - gui.functionTotalSideLength) {
            pos.y = gui.height - gui.funBarHeight - gui.functionTotalSideLength;
        }
        return pos;
    }}
      onDragStart = {handleDragStart}
      onDragEnd={handleDragEnd}
    >
    <Spring native 
    from = {{x: -300, scaleX : 0, scaleY : 0}}
    to = {{x : vis? gui.functionHalfStrokeWidth : -300, scaleX : vis? 1:0, scaleY : vis? 1:0}}>
      {props => (<animated.Rect
        {...props}
        name={funName}
        y={gui.functionHalfStrokeWidth}
        width={gui.functionRectSideLength}
        height={gui.functionRectSideLength}
        fill={gui.functions[funName].color}
        lineJoin={"round"}
        stroke={gui.functions[funName].color}
        strokeWidth={gui.functionStrokeWidth}
      />)}
      </Spring>
      <Spring native from = {{x : -300, fontSize : 0}}
      to = {{x : vis? 0 : -300, fontSize : vis? gui.nodeFontSize : 0}}>
      {props => (<animated.Text
        {...props}
        text={gui.functions[funName].rep}
        fontFamily={gui.globalFont}
        fill={"black"}
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