import React, { Component } from "react";
import Konva from 'konva';
import gui from './mistgui-globals.js'
import MIST from "./mistui.js";

class MISTImage extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.exp1 = new MIST.App("plus", new MIST.Val("x"), new MIST.Val("y"));
        //var fun1 = MIST.expToRGB("thing", this.exp1, {});
    }

    /*loadImage() {
        const img = new window.Image();
        img.src = "https://konvajs.org/assets/lion.png";
        img.crossOrigin="Anonymous";
        this.state.image = img;
    }*/

    componentDidMount() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.save();
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(width / 2, height / 2);
        ctx.fillStyle = '#4397AC';
        ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
        ctx.restore();

        //MIST.renderAt(0, this.exp1, ctx, canvas, width, height, 0, 0);
        //exptoRGB causes an error at line 1034. It doesn't recognize stuff
        //like "[object HTMLCanvasElement]"

        var animator = new MIST.ui.Animator("sum(x,y)", [], ctx, 
            this.canvasRef.current, function() { });
        animator.bounds(this.props.x,this.props.y,this.props.width,this.props.height);
        animator.setResolution(this.props.width,this.props.height);
        animator.frame();
        animator.start();
    }

    render () {
        return <canvas
            ref={this.canvasRef}
            style={{
                position: 'absolute',
                top: this.props.y,
                left: this.props.x,
                width: this.props.width,
                height: this.props.height,
                border: '1px solid black'
            }}
            onClick={this.props.onClick}
        />;
        
        }
}
export default MISTImage


/*<Image
            onClick={props.onClick}
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            image={image}
        />*/