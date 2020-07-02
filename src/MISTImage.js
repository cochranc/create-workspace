import React, { useState, useEffect } from "react";
import Konva from 'konva';
import gui from './mistgui-globals.js'
import MIST from "./mistui.js";

function MISTImage(props) {

    const [image, setImage] = useState(null);
    var exp1 = new MIST.App("plus", new MIST.Val("x"), new MIST.Val("y"));
    var fun1 = MIST.expToRGB("thing", exp1, {});
    var canvasRef = React.createRef();
    /*var animator = new MIST.ui.Animator(props.renderFunction, [], {}, 
        canvasRef.current, function() { });*/

    useEffect(() => {
        loadImage();
        
        }, [])

    function loadImage() {
        const img = new window.Image();
        img.src = "https://konvajs.org/assets/lion.png";
        img.crossOrigin="Anonymous";
        setImage(img);
    }

    return (
        <canvas ref={canvasRef} width={100} onClick={props.onClick}>
            
        </canvas>
        
    )
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