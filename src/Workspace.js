import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import MIST from './mist.js';
import gui from './mistgui-yike.js';
import VarNode from './VarNode';
import FunNode from './FunNode';
import Menu from './Menu';
import FunctionForm from './FunctionForm';
import './styles/workspace.css';


//container for everything related to the create workspace
export default class Workspace extends Component {

    constructor(props) {
        super(props)

        // this layout would be brought back from past sessions
        this.layout = new MIST.Layout();
        var mult = this.layout.addOp("mult", 50, 50);
        var x = this.layout.addVal("x", 25, 100);
        var y = this.layout.addVal("y", 75, 100);
        this.layout.addEdge(x, mult, 0);
        this.layout.addEdge(y, mult, 0);
        this.nodeList = [];
    }

    componentDidMount() {
    }


    addOpToList(name, x, y) {
        console.log("put " + name + " at " + x + ", " + y);
        x = x + 'px';
        y = y + 'px';
        //this.nodeList.push(gui.makeFunctionGroup(name, x, y));
        this.nodeList.push(<FunNode name={name} style={{ x, y, position: 'absolute' }} />);
    }

    addValToList(name, x, y) {
        console.log("put " + name + " at " + x + ", " + y);
        x = x + 'px';
        y = y + 'px';
        //this.nodeList.push(gui.makeValueGroup(name, x, y));
        this.nodeList.push(<VarNode name={name} style={{ x, y, position: 'absolute' }} />);
    }

    addEdgeToList(source, sink, edgeNum) {
        console.log("put edge from " + source + " to " + sink + ", with id=" + edgeNum);
    }




    // we should probably have the menu, the workspace, the function bar, and the settings here
    render() {

        function handleDragStart(e) {
            e.target.setAttrs({
                shadowOffset: {
                    x: 15,
                    y: 15
                },
                scaleX: 1.1,
                scaleY: 1.1
            });
        };
    
        function handleDragEnd(e) {
            e.target.to({
                duration: 0.5,
                easing: Konva.Easings.ElasticEaseOut,
                scaleX: 1,
                scaleY: 1,
                shadowOffsetX: 5,
                shadowOffsetY: 5
            });
        };

        return (
            <div id="workspace">
                <Menu />
                <FunctionForm />
                <Stage width={window.innerWidth} height={window.innerHeight - 100}>
                    <Layer>
                        <gui.MakeFunctionGroup
                            name="add"
                            x={100}
                            y={100}
                            onDragStart={() => handleDragStart}
                            onDragEnd={() => handleDragEnd}
                        />
                    </Layer>
                </Stage>
            </div>
            /*<div id="workspace">
                <Menu/>
                <FunctionForm/>
                {MIST.displayLayout(this.layout, this)}
                <ls>{this.nodeList}</ls>
                {initializeStage("workspace")}
                {this.nodeList.push(gui.makeFunctionGroup("add", 100, 100))}
                <ls>{this.nodeList}</ls>
            </div>*/
        );
    }
}


