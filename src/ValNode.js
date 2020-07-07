import React, { useState } from 'react';
import { Rect, Group, Text, Shape } from 'react-konva';
import Konva from 'konva';
import Portal from './Portal';
import gui from './mistgui-globals.js';
import MISTImage from './MISTImage';

/**
 * 
 * @param props 
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
    const numOutlets = 0;

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

    function handleDrag(e) {
        props.handler(index, e.currentTarget.x(), e.currentTarget.y())
    }

    function handleClick(e) {
        props.clickHandler(index);
    }

    function handleDblClick(e) {
        props.dblClickHandler(index);
    }

    return (
        <Group
            draggable
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            onDragMove={handleDrag} onClick={handleClick}
            onDblClick={handleDblClick}
            x={x}
            y={y}
        >
            <Rect
                x={gui.functionRectSideLength/2}
                y={0}
                width={gui.valueSideLength}
                height={gui.valueSideLength}
                fill={gui.values[name].color}
                lineJoin={'round'}
                rotation={45}
                stroke={gui.values[name].color}
                strokeWidth={gui.functionStrokeWidth}
                shadowBlur = {5}
                _useStrictMode
            />
            <Text
                text={rep}
                fontFamily={gui.globalFont}
                fill={'black'}
                fontSize={gui.nodeFontSize}
                x={0}
                y={gui.valueSideLength/2.2}
                width={gui.functionRectSideLength}
                align={'center'}
                _useStrictMode
            />
            {showImage
                ? <Portal>
                    <MISTImage
                        onClick={() => setShowImage(!showImage)}
                        x={x + gui.valueImageBoxOffset}
                        y={y + gui.valueImageBoxOffset}
                        width={gui.renderSideLength}
                        height={gui.renderSideLength}
                        renderFunction={renderFunction}
                    />
                </Portal>
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