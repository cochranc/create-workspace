import React, { useState } from "react";
import { Rect, Group, Text, Shape } from "react-konva";
import Konva from 'konva';
import Portal from './Portal';
import gui from './mistgui-globals.js';
import MISTImage from './MISTImage';

/**
 * 
 * @param props 
 */
function FunNode(props) {
    const name = props.name;
    const index = props.index;
    const x = props.x;
    const y = props.y;
    const numInputs = props.numInputs;
    const maxInputs = gui.functions[name].max;
	const minInputs = gui.functions[name].min;
    const [lineOut, setLineOut] = useState([]);
    const rep = gui.functions[name].rep;
    const prefix = gui.functions[name].prefix;
    const separator = gui.functions[name].separator;
    const renderFunction = props.findRF(index);
    const numOutlets = props.numOutlets;
    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState(null);
    /*
      let rCanvas = layers.render.canvas._canvas;
  let rAnimator;

  /**
   * renderPopCanvas takes a renderFunction and renders that image on the save screen
   * at a resolution of (width * (2 / 9))
   */
  /*function renderPopCanvas(renderFunction) {
    rAnimator = new MIST.ui.Animator(renderFunction, [], {}, 
      rCanvas, function() { });
    rAnimator.bounds(saveStyle.canvasShiftX, saveStyle.canvasShiftY, 
                     saveStyle.canvasSide, saveStyle.canvasSide);
    rAnimator.setResolution(saveStyle.canvasResolution, saveStyle.canvasResolution);
    rAnimator.frame();
    }*/

    function handleDragStart(e) {
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
            },
            scaleX: 1.1,
            scaleY: 1.1
        });
    }
    
    function handleDragEnd(e) {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    }

    function handleDrag(e) {
        props.handler(index, e.currentTarget.x(), e.currentTarget.y())
    }

    function handleClick(e) {
        props.clickHandler(index);
    }

    function handleDblClick(e) {
        props.dblClickHandler(index);
    }

    return (
        <Group
            draggable
            dragBoundFunc={function(pos) {
                if(pos.x < 10) {
                    return {y:pos.y, x:0};
                }
                else if(pos.x > window.innerWidth - 10) {
                    return {y:pos.y, x:window.innerWidth}
                }
                else if(pos.y < 10) {
                    return {x:pos.x, y:0}
                }
                else if(pos.y > window.innerHeight - 10) {
                    return {x:pos.x, y:window.innerHeight}
                }
                else { return pos }
            }}
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            onDragMove={handleDrag} onClick={handleClick}
            onDblClick={handleDblClick}
            x={x}
            y={y}
        >
            <Rect
                x={gui.functionHalfStrokeWidth}
                y={gui.functionHalfStrokeWidth}
                width={gui.functionRectSideLength}
                height={(props.numInputs <= gui.functions[props.name].min)
                    ? gui.functionRectSideLength
                    : gui.functionRectSideLength +
                    (props.numInputs - gui.functions[props.name].min) * gui.outletYOffset}
                fill={gui.functions[name].color}
                lineJoin={'round'}
                stroke={gui.functions[name].color}
                strokeWidth={gui.functionStrokeWidth}
                _useStrictMode
            />
            <Text
                text={rep}
                fontFamily={gui.globalFont}
                fill={'black'}
                fontSize={gui.nodeFontSize}
                x={0}
                y={(props.numInputs <= gui.functions[props.name].min)
                    ? gui.functionTotalSideLength / 2 - gui.functionHalfStrokeWidth
                    : (gui.functionTotalSideLength + (props.numInputs - gui.functions[props.name].min) * gui.outletYOffset) / 2 -
                    gui.functionHalfStrokeWidth}
                width={gui.functionTotalSideLength}
                align={'center'}
                _useStrictMode
            />
            {showImage 
                ? <Portal>
                    <MISTImage
                        onClick={() => setShowImage(!showImage)}
                        x={x + gui.functionRectSideLength + gui.functionImageBoxOffset}
                        y={y + gui.functionRectSideLength + gui.functionImageBoxOffset}
                        width={gui.renderSideLength}
                        height={gui.renderSideLength}
                        renderFunction={renderFunction}
                    />
                </Portal>
                : <Rect
                    onClick={() => setShowImage(!showImage)}
                    name={'imageBox'}
                    x={gui.functionRectSideLength + gui.functionImageBoxOffset}
                    y={(props.numInputs <= gui.functions[props.name].min)
                        ? gui.functionRectSideLength + gui.functionImageBoxOffset
                        : gui.functionRectSideLength + gui.functionImageBoxOffset +
                        (props.numInputs - gui.functions[props.name].min) * gui.outletYOffset}
                    width={gui.imageBoxSideLength}
                    height={gui.imageBoxSideLength}
                    fill={gui.imageBoxColor}
                    stroke={'black'}
                    strokeWidth={.5}
                    expanded={false}
                />
            }
            {[...Array(numOutlets)].map((u, i) =>
                <Shape
                    sceneFunc={function (context) {
                    context.beginPath();
                    context.moveTo(0, 0);
                    context.bezierCurveTo(-gui.bezPoint, -gui.bezPoint, -gui.bezPoint, gui.bezPoint, 0, 0);
                    context.closePath();
                    context.fillStrokeShape(this);
                    }}
                    name = {'outlet' + (i+1)}
                    x = {gui.outletXOffset}
                    y = {(i+1) * gui.outletYOffset + gui.functionHalfStrokeWidth}
                    fill={gui.outletColor}
                    opacity={1}
                    stroke='black'
                    strokeWidth={1}
                    lineIn={null}
                    outletIndex={i}
                />
            )}
        </Group>
    );
}
export default FunNode;
