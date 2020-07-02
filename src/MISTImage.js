import React, { useState, useEffect } from "react";
import { Rect, Group, Text, Shape, Image } from "react-konva";
import Konva from 'konva';
import gui from './mistgui-globals.js'
import MIST from "./mistui.js";

function MISTImage(props) {

    const [image, setImage] = useState(null);
    var exp1 = new MIST.App("plus", new MIST.Val("x"), new MIST.Val("y"));
    var fun1 = MIST.expToRGB("thing", exp1, {});
    var animator = null;

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
        <Image
            x={gui.functionRectSideLength + gui.functionImageBoxOffset}
            y={gui.functionRectSideLength + gui.functionImageBoxOffset}
            width={gui.renderSideLength}
            height={gui.renderSideLength}
            image={image}
        />
    )
}