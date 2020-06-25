import React, { useState } from 'react';
import { Stage, Layer, Rect, Group} from 'react-konva';
import Konva from 'konva';
//import MIST from './mist.js';
//import gui, { makeRect } from './mistgui-yik.js';
//import gui, {MakeFunctionGroup, MakeValueGroup} from './mistgui-yike.js';
import Menu from './Menu';
import FunctionForm from './FunctionForm';
import FunNode from './FunNode';
import ValNode from './ValNode';
import './styles/workspace.css';
import { useStrictMode } from 'react-konva';

/* Global Variables */
var width = window.innerWidth;
var height = window.innerHeight;
var globalFont = 'Arial';
var functionFont = 'Courier New';

var functionStrokeWidth = width / 90;
var functionHalfStrokeWidth = functionStrokeWidth / 2;
var functionTotalSideLength = width / 20;
var functionRectSideLength = functionTotalSideLength - functionStrokeWidth;
var functionColor = '#3FAAA0';
var functionColorLight = '#C6F1ED';
var functionMultColor = '#5EC783';
var functionSingleColor = '#77C9E2';
var functionRGBcolor = '#AE88D6';

var lineStrokeWidth = 2;

var menuFontSize = width / 75; //12 when width = 900
var valueSideLength = functionTotalSideLength / 1.414;
var valueMenuColor = '#F2937C';
var valueMenuColorLight = '#FDE6DD';
var valueXYColor = '#EFDC5C';
var valueTimeColor = '#FD9E54'
var valueMouseColor = '#E46868';
var valueConstantColor = '#F17C9D';

var outletXOffset = width / 400;
var outletYOffset = functionRectSideLength / 3;
var outletColor = '#C4C4C4';

var menuFontSize = width / 75; //12 when width = 900
var nodeFontSize = width / 56.25; //16 when width = 900
var globalScale = width / 900; // for elements that are more difficult to scale (undo/redo)

var imageBoxSideLength = width / 80;
var imageBoxColor = 'white';
var functionImageBoxOffset = width / 300;
var valueImageBoxOffset = width / 31;
var renderSideLength = width / 18;


var functions = {
    add: { rep: 'sum', max: 20, min: 2, prefix: 'sum', color: functionMultColor },
    multiply: { rep: 'mult', max: 20, min: 2, prefix: 'mult', color: functionMultColor },
    square: { rep: 'sqr', max: 1, min: 1, prefix: 'square', color: functionSingleColor },
    negate: { rep: 'neg', max: 1, min: 1, prefix: 'neg', color: functionSingleColor },
    sine: { rep: 'sin', max: 1, min: 1, prefix: 'sin', color: functionSingleColor },
    cosine: { rep: 'cos', max: 1, min: 1, prefix: 'cos', color: functionSingleColor },
    absolute: { rep: 'abs', max: 1, min: 1, prefix: 'abs', color: functionSingleColor },
    average: { rep: 'avg', max: 20, min: 2, prefix: 'avg', color: functionMultColor },
    sign: { rep: 'sign', max: 1, min: 1, prefix: 'sign', color: functionSingleColor },
    wrapsum: { rep: 'wsum', max: 20, min: 2, prefix: 'wsum', color: functionMultColor },
    rgb: { rep: 'rgb', max: 3, min: 3, prefix: 'rgb', color: functionRGBcolor },
    mistif: { rep: 'if', max: 3, min: 3, prefix: 'mistif', color: functionSingleColor }
};


var values = {
    x: { rep: 'x', color: valueXYColor },
    y: { rep: 'y', color: valueXYColor },
    second: { rep: 't.s', color: valueTimeColor },
    minute: { rep: 't.m', color: valueTimeColor },
    hour: { rep: 't.h', color: valueTimeColor },
    day: { rep: 't.d', color: valueTimeColor },
    constant: { rep: '#', color: valueConstantColor },
    mouseX: { rep: 'm.x', color: valueMouseColor },
    mouseY: { rep: 'm.y', color: valueMouseColor }
};
/* Global Variables */


//container for everything related to the create workspace
export default function Workspace(props) {

    useStrictMode(true);

    // keep track of current nodes and lines in workspace
    const [functionNodes, setFunctionNodes] = useState([
        ["add", 100, 100, '#3FAAA0', 0, 0],
        ["multiply", 50, 10, '#3FAAA0', 0, 2]
    ]);
    const [variableNodes, SetVariableNodes] = useState([
        ["x", 50, 100],
        ["y", 50, 200]
    ]);
    const [valueNodes, SetValueNodes] = useState([
        ["x", 50, 100],
        ["y", 50, 200]
    ]);
    const [lines, setLines] = useState([]);

    // idea for the future
    // keep track of things added/deleted to enable the redo/undo button
    const [history, setHistory] = useState([]);

    function handler(index, x, y) {
        return functionNodes.map((lst, i) => {
            if(i != index) return lst;
            lst[1] = x;
            lst[2] = y;
            return lst;
        })
        /*var lst = functionNodes;
        lst[index][1] = x;
        lst[index][2] = y;
        setFunctionNodes(lst);
        console.log('from handler, lst='+lsts);*/
    }
    function checkState(index) {
        console.log(functionNodes[index])
    }

    // writing functions that don't mutate the data directly
    // will make it easier to redo/undo actions
    function pushFunctionNode(node) {
        let newNodes = functionNodes;
        newNodes.push(node);
        setFunctionNodes(newNodes);
        console.log(functionNodes.length);
        return node;
    }

    function pushVariableNode(node) {
        let newNodes = variableNodes;
        newNodes.push(node);
        setFunctionNodes(newNodes);
        return node;
    }

    function pushLine(line) {
        let newLines = lines;
        newLines.push(line);
        setLines(newLines);
        return line;
    }

    // Note: I rewrote MakeFunctionGroup and MakeValueGroup but
    // not makeLine and makeOutlet. Now that the state is here, we might be able
    // to bring back most of the code that was commented out back
    return (
        <div id="workspace">
            <Menu />
            <FunctionForm />
            <Stage width={width} height={height - 200}>
                <Layer>
                    {functionNodes.map((item, index) =>
                        <FunNode
                            name={item[0]}
                            index={index}
                            x={item[1]}
                            y={item[2]}
                            numInputs={item[4]}
                            numOutlets={item[5]}
                            handler={handler}
                            check={checkState}
                        />
                    )}
                    {valueNodes.map((item, index) =>
                        <ValNode
                            name={item[0]}
                            index={index}
                            x={item[1]}
                            y={item[2]}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );

}


