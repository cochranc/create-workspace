import React, { useState } from "react";
import { Rect, Group, Text, Shape, Image } from "react-konva";
import Konva from 'konva';
import Portal from './Portal';
import gui from './mistgui-globals.js';
import MISTImage from './MISTImage';
import useImage from 'use-image';

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
    const renderFunction = props.renderFunction; //props.findRF(index); 
    const numOutlets = props.numOutlets;
    const [showImage, setShowImage] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [trashHovered, setTrashHovered] = useState(false);
    const [image] = useImage(require('./trash.png'));
    
    function Trashcan() {
        return <Image
          image={image}
          x={60}
          y={-5}
          width={14} height={14}
          shadowColor={trashHovered ? "red" : "cyan"}
          shadowBlur={5}
          visible={hovered}
          onMouseEnter={() => {
            setTrashHovered(true);
          }}
          onMouseLeave={() => {
            setTrashHovered(false);
            setHovered(false);
          }}
          onClick={() => props.removeNode(props.index)}
        />;
      }

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

    function handleDblClick(e) {
        props.dblClickHandler(index);
    }

    function outletHovered(e) {
        e.target.to({
            duration: 0.3,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1.2,
            scaleY: 1.2,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    }

    function outletExited(e) {
        e.target.to({
            duration: 0.3,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    }

    return (
        <Group
            x={x}
            y={y}
            draggable
            dragBoundFunc={function(pos) {
                if(pos.x < 0) {
                    pos.x = 0;
                }
                if(pos.x > gui.width - gui.functionTotalSideLength) {
                    pos.x = gui.width - gui.functionTotalSideLength;
                }
                if(pos.y < gui.menuHeight) {
                    pos.y = gui.menuHeight;
                }
                if(pos.y > gui.height - gui.funBarHeight - gui.functionTotalSideLength) {
                    pos.y = gui.height - gui.funBarHeight - gui.functionTotalSideLength;
                }
                return pos;
            }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragMove={handleDrag}
            onDblClick={handleDblClick}
            onMouseEnter={(e) => {
                setHovered(true);
            }}
            onMouseLeave={(e) => {
                setHovered(false);
            }}
        >
            <Group onClick={() => {
                console.log("onclick");
                props.funClicked(index);
            }}>
                <Rect
                    name={"mainRect"}
                    x={gui.functionHalfStrokeWidth}
                    y={gui.functionHalfStrokeWidth}
                    width={gui.functionRectSideLength}
                    height={(props.numOutlets <= 3)
                        ? gui.functionRectSideLength
                        : gui.functionRectSideLength +
                        (props.numOutlets - 3) * gui.outletYOffset}
                    fill={gui.functions[name].color}
                    lineJoin={'round'}
                    stroke={gui.functions[name].color}
                    strokeWidth={gui.functionStrokeWidth}
                    shadowEnabled={hovered}
                    shadowColor={trashHovered ? "red" : "cyan"}
                    shadowBlur = {3}
                    shadowOffsetX={!hovered ? 1 : 0}
                    shadowOffsetY={!hovered ? 1 : 0}
                />
                <Text
                    text={rep}
                    fontFamily={gui.globalFont}
                    fill={'black'}
                    fontSize={gui.nodeFontSize}
                    x={0}
                    y={(props.numOutlets <= 3)
                        ? gui.functionTotalSideLength / 2 - gui.functionHalfStrokeWidth
                        : (gui.functionTotalSideLength + (props.numOutlets - 3) * gui.outletYOffset) / 2 -
                        gui.functionHalfStrokeWidth}
                    width={gui.functionTotalSideLength}
                    align={'center'}
                    _useStrictMode
                />
            </Group>
            <Trashcan/>
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
                    y={(props.numOutlets <= 3)
                        ? gui.functionRectSideLength + gui.functionImageBoxOffset
                        : gui.functionRectSideLength + gui.functionImageBoxOffset +
                        (props.numOutlets - 3) * gui.outletYOffset}
                    width={gui.imageBoxSideLength}
                    height={gui.imageBoxSideLength}
                    fill={gui.imageBoxColor}
                    shadowColor={"gray"}
                    shadowBlur={2}
                    shadowOffsetX={1}
                    shadowOffsetY={1}
                    expanded={false}
                />
            }
            {(name === "rgb")
            ? ["red", "green", "blue"].map((u, i) =>
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
                    y = {(i) * gui.outletYOffset + 17}
                    fillRadialGradientStartPoint={{ x: -19, y: -5 }}
                    fillRadialGradientStartRadius={3}
                    fillRadialGradientEndPoint={{ x: -15, y: -5 }}
                    fillRadialGradientEndRadius={15}
                    fillRadialGradientColorStops={[0, u, 1, 'dark'+u]}
                    lineIn={null}
                    outletIndex={i}
                    onMouseOver={(e) => {
                        if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "o") {
                            outletHovered(e);
                        }
                    }}
                    onMouseOut={(e) => {
                        if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "o") {
                            outletExited(e);
                        }
                    }}
                    onClick={(e) => {
                        props.outletClicked(index, parseInt(e.target.attrs.name.substring(6))-1);
                    }}
                />
            )
            : [...Array(numOutlets)].map((u, i) =>
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
                    y = {(i) * gui.outletYOffset + 17}
                    fillRadialGradientStartPoint={{ x: -19, y: -5 }}
                    fillRadialGradientStartRadius={3}
                    fillRadialGradientEndPoint={{ x: -15, y: -5 }}
                    fillRadialGradientEndRadius={15}
                    fillRadialGradientColorStops={[0, gui.outletColor, 1, gui.outletColor2]}
                    opacity={1}
                    lineIn={null}
                    outletIndex={i}
                    onMouseOver={(e) => {
                        if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "o") {
                            outletHovered(e);
                        }
                    }}
                    onMouseOut={(e) => {
                        if(e.target.attrs.name && e.target.attrs.name.substring(0, 1) === "o") {
                            outletExited(e);
                        }
                    }}
                    onClick={(e) => {
                        props.outletClicked(index, parseInt(e.target.attrs.name.substring(6))-1);
                    }}
                />
            )}
        </Group>
    );
}
export default FunNode;
