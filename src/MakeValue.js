// +----------------------------+------------------------------------
// | All dependent files        |
// +----------------------------+
import React, {useState} from "react";
import gui from "./mistgui-globals";
import { Group, Rect, Text } from "react-konva";
import Konva from "konva";
import { Spring, animated } from 'react-spring/renderprops-konva';

export var valGroup = function(addNode,valName, x, y, vis, key, changeKey) {

  

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
    if(e.currentTarget.y() > gui.menuHeight){
      addNode('val', valName, e.currentTarget.x(), e.currentTarget.y());
    } else {
      changeKey();
    }
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
      dragBoundFunc={function (pos) {
        if (pos.x < 0) {
          pos.x = 0;
        }
        if (pos.x > window.innerWidth - gui.functionTotalSideLength) {
          pos.x = window.innerWidth - gui.functionTotalSideLength;
        }
        if (pos.y < 0) {
          pos.y = 0;
        }
        if (
          pos.y >
          window.innerHeight - gui.funBarHeight - gui.functionTotalSideLength
        ) {
          pos.y =
            window.innerHeight - gui.funBarHeight - gui.functionTotalSideLength;
        }
        return pos;
      }}
      key = {key}
    >
    <Spring
    native
    from = {{x :vis? -300 : gui.functionRectSideLength / 2, width : vis? 0 : gui.valueSideLength, height : vis? 0 : gui.valueSideLength}} 
    to = {{
      x : vis? gui.functionRectSideLength / 2 : -300,
      width : vis? gui.valueSideLength : 0,
      height : vis? gui.valueSideLength : 0 
    }}>
      {props => (<animated.Rect
        {...props}
        y={0}
        fill={gui.values[valName].color}
        rotation={45}
        name={valName}
      />)}
    </Spring>
    <Spring 
    native
    from = {{x : vis? -300 : 0, fontSize : vis? 0 : gui.nodeFontSize}} 
    to = {{
      x : vis? 0:-300,
      fontSize : vis? gui.nodeFontSize : 0
    }}>
     {props => (<animated.Text
        {...props}
        text={gui.values[valName].rep}
        fontFamily={gui.globalFont}
        fill={"black"}
        y={gui.valueSideLength / 2}
        width={gui.functionRectSideLength}
        align={"center"}
      />)}
      </Spring>
    </Group>
  );
};