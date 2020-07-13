import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Group, Text } from "react-konva";
import { MIST } from "./mist.js";
import Menu from "./Menu";
import gui from "./mistgui-globals";
import FunNode from "./FunNode";
import ValNode from "./ValNode";
import DrawArrow from "./line";
import FunBar from "./FunBar";
import { width, height } from "./mistgui-globals";
import colors from  './globals-themes';

//container for everything related to the create workspace
export default function Workspace(props) {

  //example layouts for testing
  var layout1 = new MIST.Layout();
  
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);

  // (indices of) the nodes starting from which the render function should be updated
  const [redoFromIndices, setRedoFromIndices] = useState([]);

  useEffect(() => {
    for(var i=0; i<redoFromIndices.length; i++) {
      renderFunctionRedo(redoFromIndices[i]);
    }
  }, [redoFromIndices]);

  // index of the node that was double-clicked and has a temporary line coming out of it
  const [newSource, setNewSource] = useState(null);

  const [mouseListenerOn, setMouseListenerOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  // { sourceX: nodes[index].x, sourceY: nodes[index].y }
  const [tempLine, setTempLine] = useState(null);
  
  // text displayed in FunBar
  const [currText, setCurrText] = useState();
  const [layouts, setLayouts] = useState([layout1]);

  const themes = ['classic', 'dusk'];
  const [themeIndex, setThemeIndex] = useState(0);
  const [theme, setTheme] = useState('dusk');

  function displayLayout(layout) {
    var IDindices = [];
    const IDoffset = nodes.length;
    let tempNodes = [...nodes];
    for (var id in layout.operations) {
      IDindices.push(id);
      var op = layout.operations[id];
      const node = {
        name: op.name,
        type: "fun",
        x: op.x,
        y: op.y,
        renderFunction: "",
        lineOut: [],
        numInputs: 0,
        numOutlets: gui.functions[op.name].min,
        activeOutlets: Array(gui.functions[op.name].min).fill(false)
      };
      tempNodes.push(node);
    }
    for (id in layout.values) {
      IDindices.push(id);
      var val = layout.values[id];
      const node = {
        name: val.name,
        type: "val",
        x: val.x,
        y: val.y,
        renderFunction: val.name,
        lineOut: []
      };
      tempNodes.push(node);
    }
    let newLines = [...lines];
    let lineIndex = newLines.length;
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
      var outletIndex = tempNodes[sinkIndex].activeOutlets.length;
      newLines.push({
        sourceIndex: sourceIndex,
        sinkIndex: sinkIndex,
        outletIndex: outletIndex
      });
      tempNodes[sourceIndex].lineOut.push(lineIndex);
      tempNodes[sinkIndex].numInputs += 1;
      if(tempNodes[sinkIndex].numOutlets === outletIndex) {
        tempNodes[sinkIndex].numOutlets += 1;
        tempNodes[sinkIndex].activeOutlets.push(lineIndex);
      }
      else {
        tempNodes[sinkIndex].activeOutlets[outletIndex] = lineIndex;
      }
    }
    setNodes(tempNodes);
    setLines(newLines);
  }

  /**
   * Adds a node to the node array
   * @param {String} type 
   * @param {String} name 
   * @param {float} x 
   * @param {float} y 
   */
  function pushNode(type, name, x, y) {
    var newLst = [...nodes];
    const node = {
      name: name,
      type: type,
      x: x,
      y: y,
      renderFunction: type === "fun" ? "" : name,
      lineOut: [],
      numInputs: 0,
      numOutlets: type === "fun" ? gui.functions[name].min : 0,
      activeOutlets: type === "fun" ? Array(gui.functions[name].min).fill(false) : null
    };
    newLst.push(node);
    setNodes(newLst);
  }

  /**
   * Pushes a new line to 'lines'. Updates information for the sink node.
   * @param {int} source
   * @param {int} sink
   */
  function pushLine(source, sink, outletIndex) {
    let newLines = [...lines];
    let lineIndex = newLines.length;
    newLines.push({
      sourceIndex: source,
      sinkIndex: sink,
      outletIndex: outletIndex
    });
    console.log("newLines.length:"+newLines.length);
    var newNodes = [...nodes];
    newNodes[source].lineOut.push(lineIndex);
    newNodes[sink].numInputs += 1; // updating the number of inputs for sink node
    if(newNodes[sink].numInputs >= newNodes[sink].numOutlets &&
      gui.functions[newNodes[sink].name].color === gui.functionMultColor) {
      newNodes[sink].numOutlets += 1;
      newNodes[sink].activeOutlets.push(false);
    }
    newNodes[sink].activeOutlets[outletIndex] = lineIndex;
    console.log("outletIndex:"+outletIndex);
    // waits for setNodes and setLines to take effect
    fetch(setNodes(newNodes))
      .then(fetch(setLines(newLines)))
      .then(setRedoFromIndices([sink]))
  }

  function removeNode(index) {
    var newNodes = [...nodes];
    var newLines = [...lines];
    console.log("newNodes at beginning of removeNode: "+newNodes);
    console.log("newLines at beginning of removeNode: "+newLines);
    const node = nodes[index];
    console.log("node.lineOut at beginning of removeNode: "+node.lineOut);
    // update info for the incoming lines
    if(node.type === 'fun') {
      console.log("node.activeOutlets.length:"+node.activeOutlets.length);
      for(var i = 0; i < node.activeOutlets.length; i++) {
        const lineIndex = node.activeOutlets[i];
        console.log("lineIndex "+lineIndex);
        if(typeof(lineIndex) === "number") {
          const source = newNodes[newLines[lineIndex].sourceIndex];
          var temp = source.lineOut;
          for(var j = 0; j < temp.length; j++) {
            if(temp[j] === lineIndex) {
              temp[j] = false;
            }
          }
          newNodes[newLines[lineIndex].sourceIndex].lineOut = temp;
          newLines[lineIndex] = false;
          console.log("newLines["+lineIndex+"] set to: "+newLines[lineIndex]);
        }
      }
    }
    var newRedoIndices = [];
    // update info for the outgoing lines and sink nodes
    for(var i = 0; i < node.lineOut.length; i++) {
      const lineIndex = node.lineOut[i];
      if(typeof(lineIndex) === "number") {
        const sinkIndex = lines[lineIndex].sinkIndex;
        const outletIndex = lines[lineIndex].outletIndex;
        newNodes[sinkIndex].activeOutlets[outletIndex] = false;
        newNodes[sinkIndex].numInputs -= 1;
        redoFromIndices.push(sinkIndex);
        newLines[lineIndex] = false;
      }
    }
    newNodes[index] = false;
    console.log("newLines at the end: "+newLines);
    console.log("newNodes at the end: "+newNodes);
    fetch(setNodes(newNodes))
      .then(fetch(setLines(newLines)))
      .then(setRedoFromIndices(newRedoIndices))
  }

  function removeLine(index) {
    const source = lines[index].sourceIndex;
    const sink = lines[index].sinkIndex;
    const outletIndex = lines[index].outletIndex;
    var newNodes = [...nodes];
    newNodes[source].lineOut[newNodes[source].lineOut.indexOf(index)] = false;
    newNodes[sink].activeOutlets[outletIndex] = false;
    newNodes[sink].numInputs -= 1;
    ////TO-DO: only remove an outlet if there's more than one free outlet at the bottom
    /*if (newNodes[sink].numOutlets > gui.functions[newNodes[sink].name].min) {
      newNodes[sink].numOutlets -= 1;
    }*/
    //subtract 1 from every outletIndex of every line going into sink
    newNodes[sink].renderFunction = "";
    var newLines = [...lines];
    newLines[index] = false;
    fetch(setNodes(newNodes))
      .then(fetch(setLines(newLines)))
      .then(setRedoFromIndices([sink]))
  }

  /**
   * Updates the render function of the node at index as well as all the nodes that branch out of it
   * @param {int} index 
   */
  function renderFunctionRedo(index) {
    var node = nodes[index];
    console.log("node.name:"+node.name);
    console.log("node.lineOut.length:"+node.lineOut.length);
    console.log("lines.length:"+lines.length);
    for(var i=0; i<lines.length; i++) {
      console.log("lines["+i+"]:"+lines[i]);
    }
    console.log("renderFunctionRedo node.activeoutlets[1]:"+node.activeOutlets[1]);
    console.log("node.activeOutlets[1]:"+node.activeOutlets[1]);
    findRenderFunction(index);
    for(var i = 0; i < node.lineOut.length; i++) {
      const lineIndex = node.lineOut[i];
      if(typeof(lineIndex) === "number") {
        renderFunctionRedo(lines[lineIndex].sink);
      }
    }
  }

  /**
   * Finds and sets the render function of the node of given index.
   * @param {int} index
   */
  function findRenderFunction(index) {
    const node = nodes[index];
    console.log("node.name:"+node.name+"###");
    if(node.type === 'val') {
      return node.renderFunction;
    }
    var rf = "";
    if(node.type === 'fun') { // checking all the incoming lines
      var lineCount = 0;
      for (var i = 0; i < node.activeOutlets.length; i++) {
        console.log("node.activeOutlets["+i+"]:"+node.activeOutlets[i]);
        const lineIndex = node.activeOutlets[i];
        console.log("lines["+lineIndex+"]: "+lines[lineIndex]);
        if(typeof(lineIndex) === "number") {
          lineCount++;
          rf += findRenderFunction(lines[lineIndex].sourceIndex);
          console.log("rf+"+findRenderFunction(lines[lineIndex].sourceIndex));
          rf += ",";
        }
      }
      for(var i = 0; i < Math.max(0, gui.functions[node.name].min) - lineCount; i++) {
        rf += "__,";
      }
      if(rf != "") { rf = rf.substring(0, rf.length - 1) };
    }
    console.log(rf);
    if(node.type === 'fun' && rf != "") { // prevent parentheses with nothing in them
      rf = gui.functions[node.name].prefix + "(" + rf + ")";
    }
    var newNodes = [...nodes];
    newNodes[index].renderFunction = rf;
    setNodes(newNodes);
    console.log("node index:"+index+" rf:"+rf);
    return rf;
  }

  /**
   * Updates the position of a node
   * @param {int} index 
   * @param {float} x 
   * @param {float} y 
   */
  function updatePosition(index, x, y) {
    var newLst = [...nodes];
    newLst[index].x = x;
    newLst[index].y = y;
    setNodes(newLst);
  }

  /**
   * When a function node gets clicked, its render function gets displayed in FunBar.
   * @param {int} index
   */
  function funClicked(index) {
    setCurrText(nodes[index].renderFunction);
  }

  /**
   * When a value node gets clicked, its name gets displayed in FunBar.
   * @param {int} index
   */
  function valClicked(index) {
    setCurrText(nodes[index].renderFunction);
  }

  function updateMousePosition(x, y) {
    setMousePosition({ x: x, y: y });
  }

  /**
   * If the connection is valid, clicking the outlet pushes a new line
   * @param {*} sinkIndex 
   * @param {*} outletIndex 
   */
  function outletClicked(sinkIndex, outletIndex) {
    if (
      newSource != null &&
      newSource != sinkIndex &&
      nodes[sinkIndex].activeOutlets[outletIndex] === false &&
      nodes[sinkIndex].numInputs < gui.functions[nodes[sinkIndex].name].max
    ) {
      // a line coming out of source
      pushLine(newSource, sinkIndex, outletIndex);
    }
  }

  /**
   * When a node is double-clicked, a line comes out of it with the end on the cursor
   * @param {int} index
   */
  function dblClicked(index) {
    if (!tempLine) {
      setNewSource(index);
      setMouseListenerOn(true);
      setMousePosition({
        x: nodes[index].x + gui.functionRectSideLength / 2,
        y: nodes[index].y + gui.functionRectSideLength / 2
      });
      setTempLine({ sourceX: nodes[index].x, sourceY: nodes[index].y });
    }
  }

  /**
   * Clears all nodes and lines
   */
  function clearWorkspace() {
    setNodes([]);
    setLines([]);
  }

  /**
   * Called when the background is clicked.
   */
  function bgClicked(e) {
    setNewSource(null);
    setTempLine(null);
    setMouseListenerOn(false);
  }

  return (
    <div id="workspace">
      <Stage
        width={width}
        height={height}
        onClick={bgClicked}
        onMouseMove={e => {
          if (mouseListenerOn) {
            updateMousePosition(e.evt.clientX, e.evt.clientY);
          }
        }}
      >
        <Layer>
          <Group>
            <Rect
              y={gui.menuHeight}
              width={width}
              height={height-gui.menuHeight}
              fill={(theme === 'classic') && colors.background1 ||
                (theme === 'dusk') && colors.background2}
            />
            {tempLine &&
            <DrawArrow
              sourceX={tempLine.sourceX + gui.functionRectSideLength / 2}
              sourceY={tempLine.sourceY + gui.functionRectSideLength / 2}
              sinkX={mousePosition.x}
              sinkY={mousePosition.y}
              fill={(theme === 'classic') && colors.lineFill1 ||
                (theme === 'dusk') && colors.lineFill2}
            />
            }
          </Group>
          <Menu
            addNode={pushNode} clearWorkspace={clearWorkspace}
            bgColor={(theme === 'classic') && colors.menuBg1 ||
              (theme === 'dusk') && colors.menuBg2}
            wsButtonColor={(theme === 'classic') && colors.wsButtonColor1 ||
              (theme === 'dusk') && colors.wsButtonColor2}
            valueMenuColor={(theme === 'classic') && colors.valueMenuColor1 ||
              (theme === 'dusk') && colors.valueMenuColor2}
          />
          {nodes.length !== 0 && lines.map((line, index) => line &&
            <DrawArrow
              index={index}
              sourceX={ // x-coord of the source
                nodes[line.sourceIndex].x + gui.functionRectSideLength / 2
              }
              sourceY={ // y-coord of the source
                nodes[line.sourceIndex].y + gui.functionRectSideLength / 2
              }
              sinkX={nodes[line.sinkIndex].x - 4 * gui.outletXOffset} // x-coord of the sink
              sinkY={ // y-coord of the sink
                nodes[line.sinkIndex].y + line.outletIndex * gui.outletYOffset + 17}
              removeLine={removeLine}
              fill={(theme === 'classic') && colors.lineFill1 ||
                (theme === 'dusk') && colors.lineFill2}
              hoverShadowColor={(theme === 'classic') && colors.hoverShadowColor1 ||
                (theme === 'dusk') && colors.hoverShadowColor2}
            />
          )}
          {nodes.map((node, index) =>
            (node && node.type === "fun") &&
              <FunNode
                name={node.name}
                index={index}
                x={node.x}
                y={node.y}
                numInputs={node.numInputs}
                numOutlets={node.numOutlets}
                renderFunction={node.renderFunction}
                //findRF={findRenderFunction}
                handler={updatePosition}
                funClicked={funClicked}
                outletClicked={outletClicked}
                dblClickHandler={dblClicked}
                removeNode={removeNode}
              /> ||
              (node && node.type === "val") &&
              <ValNode
                name={node.name}
                index={index}
                x={node.x}
                y={node.y}
                renderFunction={node.renderFunction}
                handler={updatePosition}
                clickHandler={valClicked}
                dblClickHandler={dblClicked}
                removeNode={removeNode}
              />
          )}
          <FunBar
            text={currText}
            bg={(theme === 'classic') && colors.funBarBg1 ||
              (theme === 'dusk') && colors.funBarBg2}
          />
          <Text
            x={10} y={130}
            width={200} height={50}
            text={"CHANGE THEME"}
            fill={'black'}
            fontSize={14}
            onClick={() => {
              var i = (themeIndex + 1) % themes.length;
              setThemeIndex(i);
              setTheme(themes[i]);
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}
