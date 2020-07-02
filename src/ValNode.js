import React, { useState } from 'react';
import { Rect, Group, Text } from 'react-konva';
import Konva from 'konva';
import gui from './mistgui-globals.js';

/**
 * 
 * @param {*} props 
 */
function ValNode(props) {
    const name = props.name;
    const x = props.x;
    const y = props.y;
    const index = props.index;
    const [lineOut, setLineOut] = useState([]);
    const rep = gui.values[name].rep;
    const renderFunction = gui.values[name].rep;
    const [showImage, setShowImage] = useState(false);
    const numOutlets = props.numOutlets;

    function handleDragStart(e) {
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
            },
            scaleX: 1.1,
            scaleY: 1.1
        });
        props.handler(index, e.currentTarget.x(), e.currentTarget.y())
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

    function handleDrag(e) {
        props.handler(index, e.currentTarget.x(), e.currentTarget.y())
    }

    function handleClick(e) {
        props.clickHandler(index);
    }

    return (
        <Group
            draggable
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            onDragMove={handleDrag} onClick={handleClick}
            x={x - gui.functionHalfStrokeWidth}
            y={y}
        >
            <Rect
                x={gui.functionRectSideLength/2}
                y={0}
                width={gui.valueSideLength}
                height={gui.valueSideLength}
                fill={gui.values[name].color}
                rotation={45}
                //lineJoin={'round'}
                _useStrictMode
            />
            <Text
                text={rep}
                fontFamily={gui.globalFont}
                fill={'black'}
                fontSize={gui.nodeFontSize}
                x={0}
                y={gui.valueSideLength / 2}
                width={gui.functionRectSideLength}
                align={'center'}
                _useStrictMode
            />
            {showImage
                ? <Text onClick={() => setShowImage(!showImage)} text={"function image here"}/>
                : <Rect
                    onClick={() => setShowImage(!showImage)}
                    name={'imageBox'}
                    x={gui.valueImageBoxOffset}
                    y={gui.valueImageBoxOffset}
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
                    //onclick={handleOnClick}
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


export default ValNode; 