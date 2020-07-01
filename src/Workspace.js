import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Group, Portal } from "react-konva";
import MIST from "./mist.js";
import Menu from "./Menu";
import FunctionForm from "./FunctionForm";
import FunNode from "./FunNode";
import ValNode from "./ValNode";
import DrawArrow from "./line";
import { width, height } from "./mistgui-globals";
import { useStrictMode } from "react-konva";

//container for everything related to the create workspace
export default function Workspace(props) {
  //hmm does this actually do anything?
  useStrictMode(true);

  //example layouts for testing
  var layout1 = new MIST.Layout();
  var add = layout1.addOp("add", 325, 325);
  var x = layout1.addVal("x", 250, 300);
  var y = layout1.addVal("y", 250, 350);
  layout1.addEdge(x, add, 0);
  layout1.addEdge(y, add, 1);
  var mult = layout1.addOp("multiply", 350, 325);
  var k = layout1.addVal("x", 375, 325);
  layout1.addEdge(add, mult, 2);
  layout1.addEdge(k, mult, 3);
  //console.log("LAYOUT"+layout1);

  const [layouts, setLayouts] = useState([layout1]);
  const [functionNodes, setFunctionNodes] = useState([
    //{name: "add", x: 100, y: 100, color: '#3FAAA0', numInput: 0, numOutlets: 0}
  ]);
  const [variableNodes, setVariableNodes] = useState([
    //{name: "x", x: 50, y: 100},
    //{name: "y", x: 50, y: 200}
  ]);
  const [valueNodes, setValueNodes] = useState([
    //{name: "x", x: 50, y: 100},
    //{name: "y", x: 50, y: 200}
  ]);
  const [lines, setLines] = useState([
    //{sourceIndex: 0, sinkIndex: 0}, // index of variable, index of function
    //{sourceIndex: 1, sinkIndex: 0}
  ]);

  // idea for the future
  // keep track of things added/deleted to enable the redo/undo button
  const [history, setHistory] = useState([]);

  function displayLayout() {
    console.log("displayLayout");
    for (var i = 0; i < layouts.length; i++) {
      var funIDs = [];
      var valIDs = [];
      const funIDoffset = functionNodes.length;
      const valIDoffset = valueNodes.length;
      var layout = layouts[i];
      var funNodes = [...functionNodes];
      for (var id in layout.operations) {
        funIDs.push(id);
        var op = layout.operations[id];
        const node = {
          name: op.name,
          x: op.x,
          y: op.y,
          numInputs: 0,
          numOutlets: 2
        };
        funNodes.push(node);
      }
      setFunctionNodes(funNodes);
      var valNodes = [...valueNodes];
      for (id in layout.values) {
        valIDs.push(id);
        var val = layout.values[id];
        const node = { name: val.name, x: val.x, y: val.y };
        valNodes.push(node);
      }
      setValueNodes(valNodes);
      let newLines = [...lines];
      for (var j = 0; j < layout.edges.length; j++) {
        var edge = layout.edges[j];
        var source =
          layout.operations[edge.source] || layout.values[edge.source];
        if (!source) {
          throw "Invalid source in edge from " +
            edge.source +
            " to " +
            edge.sink;
        }
        var sink = layout.operations[edge.sink];
        if (!sink) {
          throw "Invalid sink in edge from " + edge.source + " to " + edge.sink;
        }
        var sourceIndex =
          layout.operations[source.id] === undefined
            ? valIDs.indexOf(source.id) + valIDoffset // if source is a value
            : funIDs.indexOf(source.id) + funIDoffset; // if source is a function
        var sinkIndex = funIDs.indexOf(sink.id) + funIDoffset;
        newLines.push({
          sourceIndex: sourceIndex, // index of source in valueNodes
          sinkIndex: sinkIndex
        }); // index of sink in functionNodes
      }
      setLines(newLines);
    }
  }

  function pushFunctionNode(name, x, y) {
    let newNodes = [...functionNodes];
    const node = [name, x, y, "#3FAAA0", 2, 2];
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
    newLines.push({ sourceIndex: source, sinkIndex: sink });
    setLines(newLines);
  }

  function updateFunNodes(index, x, y) {
    var newLst = [...functionNodes];
    newLst[index].x = x;
    newLst[index].y = y;
    setFunctionNodes(newLst);
  }
  function updateValNodes(index, x, y) {
    var newLst = [...valueNodes];
    newLst[index].x = x;
    newLst[index].y = y;
    setValueNodes(newLst);
  }

  /*function checkState(index) {
        console.log(functionNodes[index])
    }*/

  useEffect(() => {
    displayLayout();
  }, []);

  //console.log("142: lines.length: "+lines.length);
  //console.log("143: functionNodes.length: "+functionNodes.length);
  //console.log("144: valueNodes.length: "+valueNodes.length);

  // Note: I rewrote MakeFunctionGroup and MakeValueGroup but
  // not makeLine and makeOutlet. Now that the state is here, we might be able
  // to bring back most of the code that was commented out back
  return (
    <div id="workspace">
    
      <FunctionForm />
      <Stage width={width} height={height - 200}>
      
        <Layer>
        <Menu />
          {functionNodes.map((node, index) => (
            <FunNode
              name={node.name}
              index={index}
              x={node.x}
              y={node.y}
              numInputs={node.numInputs}
              numOutlets={node.numOutlets}
              handler={updateFunNodes}
              //check={checkState}
            />
          ))}
          {valueNodes.map((node, index) => (
            <ValNode
              name={node.name}
              index={index}
              x={node.x}
              y={node.y}
              handler={updateValNodes}
            />
          ))} 
          {lines.map((line, index) => (
            <DrawArrow
              index={index}
              sourceX={valueNodes[line.sourceIndex].x} // x-coord of the source
              sourceY={valueNodes[line.sourceIndex].y} // y-coord of the source
              sinkX={functionNodes[line.sinkIndex].x} // x-coord of the sink
              sinkY={functionNodes[line.sinkIndex].y} // y-coord of the sink
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
