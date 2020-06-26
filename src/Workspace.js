import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Group} from 'react-konva';
import MIST from './mist.js';
import Menu from './Menu';
import FunctionForm from './FunctionForm';
import FunNode from './FunNode';
import ValNode from './ValNode';
import DrawArrow from './line';
import {width, height} from './mistgui-globals';
import { useStrictMode } from 'react-konva';

//container for everything related to the create workspace
export default function Workspace(props) {

    //hmm does this actually do anything?
    useStrictMode(true);

    //example layouts for testing
    var layout1 = new MIST.Layout();
    var mult = layout1.addOp("add", 125, 100);
    var x = layout1.addVal("x", 50, 100);
    var y = layout1.addVal("y", 50, 150);
    layout1.addEdge(x, mult, 0);
    layout1.addEdge(y, mult, 0);

    const [layouts, setLayouts] = useState([
        layout1
    ]);
    const [functionNodes, setFunctionNodes] = useState([
        //["add", 100, 100, '#3FAAA0', 0, 0],
        //["multiply", 50, 10, '#3FAAA0', 0, 2]
    ]);
    const [variableNodes, setVariableNodes] = useState([
        //["x", 50, 100],
        //["y", 50, 200]
    ]);
    const [valueNodes, setValueNodes] = useState([
        //["x", 50, 100],
        //["y", 50, 200]
    ]);
    const [lines, setLines] = useState([
        //[0, 0], // index of variable, index of function
        //[1, 0]
    ]);

    // idea for the future
    // keep track of things added/deleted to enable the redo/undo button
    const [history, setHistory] = useState([]);

    function displayLayout() {
        for(var i = 0; i < layouts.length; i++) {
            var funIDs = [];
            var valIDs = [];
            const funIDoffset = functionNodes.length;
            const valIDoffset = valueNodes.length;
            var layout = layouts[i];
            for (var id in layout.operations) {
                funIDs.push(id);
                var op = layout.operations[id];
                var funNodes = [...functionNodes];
                const node = [op.name, op.x, op.y, '#3FAAA0', 0, 0];
                funNodes.push(node);
                setFunctionNodes(funNodes);
            }
            for (id in layout.values) {
                valIDs.push(id);
                var val = layout.values[id];
                var valNodes = [...valueNodes];
                const node = [val.name, val.x, val.y];
                valNodes.push(node);
                console.log("valNodes: "+valNodes);
                setValueNodes(valNodes);
                console.log("updated variable nodes: "+valueNodes);
            }
            for (var j = 0; j < layout.edges.length; j++) {
                var edge = layout.edges[i];
                var source = layout.operations[edge.source] || layout.values[edge.source];
                if (!source) {
                    throw "Invalid source in edge from " + edge.source + " to " + edge.sink;
                }
                var sink = layout.operations[edge.sink];
                if (!sink) {
                    throw "Invalid sink in edge from " + edge.source + " to " + edge.sink;
                }
                let newLines = [...lines];
                newLines.push([
                    valIDs.indexOf(source.id) + valIDoffset, // index of source in valueNodes
                    funIDs.indexOf(sink.id) + funIDoffset]); // index of sink in functionNodes
                setLines(newLines);
            }
        }
    }
    
    function pushFunctionNode(name, x, y) {
        let newNodes = [...functionNodes];
        const node = [name, x, y, '#3FAAA0', 0, 0];
        newNodes.push(node);
        setFunctionNodes(newNodes);
        return newNodes.length - 1;
    }

    function pushVariableNode(name, x, y) {
        let newNodes = [...variableNodes];
        const node = [name, x, y];
        newNodes.push(node);
        setVariableNodes(newNodes);
        return newNodes.length - 1;
    }

    function pushLine(source, sink) {
        let newLines = [...lines];
        newLines.push([source, sink]);
        setLines(newLines);
    }

    function updateFunNodes(index, x, y) {
        var newLst = [...functionNodes];
        newLst[index][1] = x;
        newLst[index][2] = y;
        setFunctionNodes(newLst);
    }
    function updateValNodes(index, x, y) {
        var newLst = [...valueNodes];
        newLst[index][1] = x;
        newLst[index][2] = y;
        setValueNodes(newLst);
    }

    function checkState(index) {
        console.log(functionNodes[index])
    }

    useEffect(() => {
        displayLayout();
    }, []);

    

    // Note: I rewrote MakeFunctionGroup and MakeValueGroup but
    // not makeLine and makeOutlet. Now that the state is here, we might be able
    // to bring back most of the code that was commented out back
    return (
        <div id="workspace">
            <Menu />
            <FunctionForm />
            <Stage width={width} height={height - 200}>
                <Layer>
                    {lines.map((item, index) =>
                        <DrawArrow
                            index={index}
                            sourceX={valueNodes[item[0]][1]} // x-coord of the source
                            sourceY={valueNodes[item[0]][2]} // y-coord of the source
                            sinkX={functionNodes[item[1]][1]} // x-coord of the sink
                            sinkY={functionNodes[item[1]][2]} // y-coord of the sink
                        />
                    )}
                    {functionNodes.map((item, index) =>
                        <FunNode
                            name={item[0]}
                            index={index}
                            x={item[1]}
                            y={item[2]}
                            numInputs={item[4]}
                            numOutlets={item[5]}
                            handler={updateFunNodes}
                            check={checkState}
                        />
                    )}
                    {valueNodes.map((item, index) =>
                        <ValNode
                            name={item[0]}
                            index={index}
                            x={item[1]}
                            y={item[2]}
                            handler={updateValNodes}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );

}


