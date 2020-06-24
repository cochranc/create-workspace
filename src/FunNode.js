import React, { useState } from 'react';
import { Layer, Rect, Group, Text, Line, Shape, useStrictMode } from 'react-konva';
import './styles/node.css';
import gui from './mistgui-yike.js';

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

    var somelistofstuff = []

    return (
        <Group
        draggable>
            <Rect
                x={x}
                y={y}
                //x={gui.functionHalfStrokeWidth}
                //y={gui.functionHalfStrokeWidth}
                width={gui.functionRectSideLength}
                height={gui.functionRectSideLength}
                fill={color}
                lineJoin={'round'}
                stroke={color}
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
            {somelistofstuff.map((item) =>
                (item)
            )}
        </Group>
    );
    
}


export default FunNode; 