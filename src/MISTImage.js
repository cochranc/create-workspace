import React, { Component } from "react";
import Konva from 'konva';
import gui from './mistgui-globals.js'
import MIST from "./mistui.js";

class MISTImage extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.exp = MIST.parse(props.renderFunction);
        this.fun = MIST.expToRGB("thing", this.exp, {});
    }

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

        var region = ctx.createImageData(width, height);
        var deltaX = 2.0/width;
        var deltaY = 2.0/height;
        var m = {
            x: MIST.mouseX,
            y: MIST.mouseY,
            X: MIST.clickX,
            Y: MIST.clickY
        };
        var x = -1;
        var y = -1 - deltaY;
        for (var i = 0; i < region.data.length; i+= 4) {
            // When we reach the end of the row, move on to the next row
            if ((i % (4*width)) == 0)
                { 
                    x = -1;
                    y += deltaY;
                } // if (i % (4*imgWidth)) == 0

            // Evaluate the function
            var rgb = this.fun(x,y,0,m); //t=0

            // Exploration
            // if (i < 4*imgWidth) { console.log("i",i, "x",x, "y",y, "rgb",rgb); }
        
            // Copy the pixels
            region.data[i+0] = rgb[0];
            region.data[i+1] = rgb[1];
            region.data[i+2] = rgb[2];
            region.data[i+3] = 255;
        
            // And advance to the next pixel
            x += deltaX;
        }
        ctx.putImageData(region, 0, 0);

        //MIST.renderAt(0, this.exp1, ctx, canvas, width, height, 0, 0);
        //exptoRGB causes an error at line 1034. It doesn't recognize stuff
        //like "[object HTMLCanvasElement]"

        /*var animator = new MIST.ui.Animator("sum(x,y)", [], ctx, 
            this.canvasRef.current, function() { });
        animator.bounds(this.props.x,this.props.y,this.props.width,this.props.height);
        animator.setResolution(this.props.width,this.props.height);
        animator.frame();
        animator.start();*/
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