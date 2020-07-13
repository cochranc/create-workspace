import { Rect, Group, Text } from "react-konva";
import gui from "./mistgui-globals";
import React, { useState } from "react";
import Konva from "konva";
import { Spring, animated } from 'react-spring/renderprops-konva';

function FuncGroup(props) {

  const funName = props.funName;
  const [x, setX] = useState(props.x - gui.functionHalfStrokeWidth);
  const [y, setY] = useState(props.y);
  const vis = props.vis;

  return (
    <Group
      name={funName}
      x={x}
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
      onDragStart = {(e)=>{
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
          },
          scaleX: 1.1,
          scaleY: 1.1
        });
      }}
      onDragEnd={(e)=>{
        e.target.to({
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          scaleX: 1,
          scaleY: 1,
          shadowOffsetX: 5,
          shadowOffsetY: 5
        });
        if(e.currentTarget.y() > gui.menuHeight) {
          props.addNode('fun', funName, e.currentTarget.x(), e.currentTarget.y());
        }
        setX(props.x - gui.functionHalfStrokeWidth);
        setY(props.y);
      }}
    >
    <Spring native 
    from = {{x: -300, scaleX : 0, scaleY : 0}}
    to = {{x : vis? gui.functionHalfStrokeWidth : -300, scaleX : vis? 1:0, scaleY : vis? 1:0}}>
      {props => (<animated.Rect
        {...props}
        name={funName}
        y={gui.functionHalfStrokeWidth + 10}
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
        y={y + gui.functionTotalSideLength / 2 - gui.functionHalfStrokeWidth}
        width={gui.functionTotalSideLength}
        align={"center"}
      />)}
      </Spring>
    </Group>
  )
}

export default FuncGroup;