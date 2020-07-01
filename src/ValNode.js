import React, { useState } from 'react';
import Konva from 'konva';
import { Layer, Rect, Group, Text, Line, Shape, useStrictMode } from 'react-konva';
import './styles/node.css';
//import gui from './mistgui-yike.js';
import gui from './mistgui-globals.js';

//import { Stage, Layer, Rect, Text } from 'react-konva';


// function nodes - for defined functions
function ValNode(props) {
    const name = props.name;
    const x = props.x;
    const y = props.y;
    const index = props.index;
    const [lineOut, setLineOut] = useState([]);
    const rep = gui.values[name].rep;
    const renderFunction = gui.values[name].rep;
    const visible = false;
    const renderLayer = null;
    const scaleX = 1;
    const scaleY = 1;
    //var showImage = false;
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
            onDrag={handleDrag} onClick={handleClick}
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
        </Group>
    );
    
}


export default ValNode; 