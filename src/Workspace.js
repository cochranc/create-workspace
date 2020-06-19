import React, {Component} from 'react'
import Menu from './Menu';
import FunctionForm from './FunctionForm';
import './styles/workspace.css';
import MIST, { Layout } from './mist.js';
import VarNode from './VarNode';
import FunNode from './FunNode';

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
      }

    componentDidMount() {
        /*const script = document.createElement("script");
        script.src = "./mist.js";
        script.async = true;
        document.body.appendChild(script);*/
    }

    
    addOp(name, x, y) {
        console.log("put "+name+" at "+x+", "+y);
    }

    addVal(name, x, y) {
        console.log("put "+name+" at "+x+", "+y);
        x = x + 'px';
        y = y + 'px';
        return <VarNode name={name} style={{x, y, position:'absolute'}}/>;
    }

    addEdge(source, sink, edgeNum) {
        console.log("put edge from "+source+" to "+sink+", with id="+edgeNum);
    }


    // we should probably have the menu, the workspace, the function bar, and the settings here
    render() {
        return (
            <div id="workspace" ref="workspace">
                <Menu/>
                <FunctionForm/>
                {MIST.displayLayout(this.layout, )}
            </div>
        );
    }
}


