import React, { useState } from "react";
import Konva from "konva";
import {
  Layer,
  Rect,
  Group,
  Text,
  Line,
  Shape,
  useStrictMode
} from "react-konva";
import "./styles/node.css";
import gui from "./mistgui-yike.js";

//import { Stage, Layer, Rect, Text } from 'react-konva';

// function nodes - for defined functions
function FunNode(props) {
  const name = props.name;
  const x = props.x;
  const y = props.y;
  const numInputs = props.numInputs;
  const maxInputs = gui.functions[name].max;
  const minInputs = gui.functions[name].min;
  const [lineOut, setLineOut] = useState([]);
  const rep = gui.functions[name].rep;
  const prefix = gui.functions[name].prefix;
  const separator = gui.functions[name].separator;
  const [isShown, setIsShown] = useState(false);
  const renderFunction = null;
  const visible = false;
  const renderLayer = null;
  const scaleX = 1;
  const scaleY = 1;
  const color = props.color;

  var somelistofstuff = [];

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
  }

  return (
    <Group draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Rect
        x={x}
        y={y}
        //x={gui.functionHalfStrokeWidth}
        //y={gui.functionHalfStrokeWidth}
        width={gui.functionRectSideLength}
        height={gui.functionRectSideLength}
        fill={color}
        lineJoin={"round"}
        stroke={color}
        strokeWidth={gui.functionStrokeWidth}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        _useStrictMode
      />
      <Text
        text={rep}
        fontFamily={gui.globalFont}
        fill={"black"}
        fontSize={gui.nodeFontSize}
        x={x + gui.functionTotalSideLength / 20}
        y={y + gui.functionTotalSideLength / 5}
        //width={gui.functionTotalSideLength}
        //align={"center"}
        _useStrictMode
      />
      {somelistofstuff.map(item => item)}
    </Group>
  );
}

export default FunNode;
