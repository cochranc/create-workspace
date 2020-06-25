import React, { useState } from "react";
import {
  Rect,
  Group,
  Text,
  Shape,
  useStrictMode
} from "react-konva";
import Konva from 'konva';
import gui from './mistgui-globals.js';

/**
 * 
 * @param {name, index, x, y, numInputs, numOutlets} props 
 */
function FunNode(props) {
    const name = props.name;
    const index = props.index;
    const x = props.x;
    const y = props.y;
    const numInputs = props.numInputs;
    const maxInputs = gui.functions[name].max;
    const minInputs = gui.functions[name].min;
    const [lineOut, setLineOut] = useState([]);
    const rep = gui.functions[name].rep;
    const prefix = gui.functions[name].prefix;
    const separator = gui.functions[name].separator;
    const renderFunction = null;
    const visible = false;
    const renderLayer = null;
    const scaleX = 1;
    const scaleY = 1;
    const numOutlets = props.numOutlets;
    const [showImage, setShowImage] = useState(false);

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
        props.handler(index, e.currentTarget.x(), e.currentTarget.y())
    }

    return (
        <Group
            draggable
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            x={x - gui.functionHalfStrokeWidth}
            y={y}
        >
            <Rect
                x={gui.functionHalfStrokeWidth}
                y={gui.functionHalfStrokeWidth}
                width={gui.functionRectSideLength}
                height={gui.functionRectSideLength}
                fill={gui.functions[name].color}
                lineJoin={'round'}
                stroke={gui.functions[name].color}
                strokeWidth={gui.functionStrokeWidth}
                _useStrictMode
            />
            <Text
                text={rep}
                fontFamily={gui.globalFont}
                fill={'black'}
                fontSize={gui.nodeFontSize}
                x={0}
                y={gui.functionTotalSideLength / 2 - gui.functionHalfStrokeWidth}
                width={gui.functionTotalSideLength}
                align={'center'}
                _useStrictMode
            />
            {showImage
                ? <Text onClick={() => setShowImage(!showImage)} text={"function image here"}/>
                : <Rect
                    onClick={() => setShowImage(!showImage)}
                    name={'imageBox'}
                    x={gui.functionRectSideLength + gui.functionImageBoxOffset}
                    y={gui.functionRectSideLength + gui.functionImageBoxOffset}
                    width={gui.imageBoxSideLength}
                    height={gui.imageBoxSideLength}
                    fill={gui.imageBoxColor}
                    stroke={'black'}
                    strokeWidth={.5}
                    //visible={false}
                    expanded={false}
                />
            }
            {[...Array(numOutlets)].map((u, i) =>
                <Shape
                    sceneFunc={function (context) {
                    context.beginPath();
                    context.moveTo(0, 0);
                    context.bezierCurveTo(-gui.bezPoint, -gui.bezPoint, -gui.bezPoint, gui.bezPoint, 0, 0);
                    context.closePath();
                    context.fillStrokeShape(this);
                    }}
                    name = {'outlet' + (i+1)}
                    x = {gui.outletXOffset}
                    y = {(i+1) * gui.outletYOffset + gui.functionHalfStrokeWidth}
                    fill={gui.outletColor}
                    opacity={1}
                    stroke='black'
                    strokeWidth={1}
                    lineIn={null}
                    outletIndex={i}
                />
            )}
        </Group>
    );
}
export default FunNode;
