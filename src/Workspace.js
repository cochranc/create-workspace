import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Group, Portal } from "react-konva";
import MIST from "./mist.js";
import Menu from "./Menu";
import FunctionForm from "./FunctionForm";
import FunNode from "./FunNode";
import ValNode from "./ValNode";
import DrawArrow from "./line";
import FunBar from "./FunBar";
import { width, height } from "./mistgui-globals";
import { useStrictMode } from "react-konva";

//container for everything related to the create workspace
export default function Workspace(props) {
  //hmm does this actually do anything?
  useStrictMode(true);

  //example layouts for testing
  var layout1 = new MIST.Layout();
  var add = layout1.addOp("add", 325, 325);
  var x = layout1.addVal("x", 250, 450);
  var y = layout1.addVal("y", 400, 450);
  layout1.addEdge(x, add, 0);
  layout1.addEdge(y, add, 1);
  var mult = layout1.addOp("multiply", 450, 300);
  var k = layout1.addVal("x", 450, 175);
  layout1.addEdge(add, mult, 2);
  layout1.addEdge(k, mult, 3);
  var sin = layout1.addOp("sine", 550, 350);
  layout1.addEdge(mult, sin, 4);
  var square = layout1.addOp("square", 650, 250);
  layout1.addEdge(sin, square, 5);

  const [layouts, setLayouts] = useState([layout1]);
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);

  const [history, setHistory] = useState([]);

  function displayLayout() {
    for (var i = 0; i < layouts.length; i++) {
      var IDindices = [];
      const IDoffset = nodes.length;
      var layout = layouts[i];
      let tempNodes = [...nodes];
      for (var id in layout.operations) {
        IDindices.push(id);
        var op = layout.operations[id];
        const node = { name: op.name, type: 'fun',
          x: op.x, y: op.y,
          numInputs: 0,numOutlets: 0 };
          tempNodes.push(node);
      }
      for (id in layout.values) {
        IDindices.push(id);
        var val = layout.values[id];
        const node = { name: val.name, type: 'val',
          x: val.x, y: val.y };
          tempNodes.push(node);
      }
      setNodes(tempNodes);
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
        var sourceIndex = IDindices.indexOf(source.id) + IDoffset;
        var sinkIndex = IDindices.indexOf(sink.id) + IDoffset;
        newLines.push({
          sourceIndex: sourceIndex, // index of source in valueNodes
          sinkIndex: sinkIndex
        }); // index of sink in functionNodes
      }
      setLines(newLines);
    }
  }

  function updateNodes(index, x, y) {
    var newLst = [...nodes];
    newLst[index].x = x;
    newLst[index].y = y;
    setNodes(newLst);
  }

  useEffect(() => {
    displayLayout();
  }, []);

  return (
    <div id="workspace">
    
      <Stage width={width} height={height}>
      <Menu />
        <Layer>
          {lines.map((line, index) => (
            <DrawArrow
              index={index}
              sourceX={nodes[line.sourceIndex].x} // x-coord of the source
              sourceY={nodes[line.sourceIndex].y} // y-coord of the source
              sinkX={nodes[line.sinkIndex].x} // x-coord of the sink
              sinkY={nodes[line.sinkIndex].y} // y-coord of the sink
            />
          ))}
          {nodes.map((node, index) => (
            (node.type === 'fun')
            ? <FunNode
              name={node.name}
              index={index}
              x={node.x}
              y={node.y}
              numInputs={node.numInputs}
              numOutlets={node.numOutlets}
              handler={updateNodes}
            />
            : <ValNode
              name={node.name}
              index={index}
              x={node.x}
              y={node.y}
              handler={updateNodes}
            />
          ))}
          <FunBar/>
        </Layer>
      </Stage>
    </div>
  );
}
