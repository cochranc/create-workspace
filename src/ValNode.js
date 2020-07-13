import React, { useState } from 'react';
import { Rect, Group, Text, Shape, Image } from 'react-konva';
import Konva from 'konva';
import Portal from './Portal';
import gui from './mistgui-globals.js';
import valueNodeGlobals from './globals-nodes-values';
import MISTImage from './MISTImage';
import useImage from 'use-image';

/**
 * 
 * @param props 
 */
function ValNode(props) {
    const name = props.name;
    const x = props.x;
    const y = props.y;
    const index = props.index;
    const [lineOut, setLineOut] = useState([]);
    const rep = gui.values[name].rep;
    const renderFunction = gui.values[name].rep;
    const [showImage, setShowImage] = useState(false);
    const numOutlets = 0;
    const [hovered, setHovered] = useState(false);
    const [trashHovered, setTrashHovered] = useState(false);
    const [image] = useImage(require('./trash.png'));
    
    function Trashcan() {
        return <Image
          image={image}
          x={0}//{60}
          y={0}//-5}
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

    function handleClick(e) {
        props.clickHandler(index);
    }

    function handleDblClick(e) {
        props.dblClickHandler(index);
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
                if(pos.x > gui.width - gui.functionRectSideLength) {
                    pos.x = gui.width - gui.functionRectSideLength;
                }
                if(pos.y < 0) {
                    pos.y = 0;
                }
                if(pos.y > gui.width - gui.functionRectSideLength) {
                    pos.y = gui.width - gui.functionRectSideLength;
                }
                return pos;
            }}
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            onDragMove={handleDrag} onClick={handleClick}
            onDblClick={handleDblClick}
            onMouseEnter={(e) => {
                setHovered(true);
            }}
            onMouseLeave={(e) => {
                setHovered(false);
            }}
        >
            <Rect
                x={valueNodeGlobals.rectX}
                y={0}
                width={valueNodeGlobals.sideLength}
                height={valueNodeGlobals.sideLength}
                fill={gui.values[name].color}
                lineJoin={'round'}
                rotation={45}
                stroke={gui.values[name].color}
                strokeWidth={gui.functionStrokeWidth}
                shadowEnabled={hovered}
                shadowColor={trashHovered ? "red" : "cyan"}
                shadowBlur = {3}
                shadowOffsetX={!hovered ? 1 : 0}
                shadowOffsetY={!hovered ? 1 : 0}
            />
            <Trashcan/>
            <Text
                text={rep}
                fontFamily={gui.globalFont}
                fill={'black'}
                fontSize={gui.nodeFontSize}
                x={0}
                y={valueNodeGlobals.width / 2 - gui.functionHalfStrokeWidth}
                width={valueNodeGlobals.width}
                align={'center'}
                _useStrictMode
            />
            {showImage
                ? <Portal>
                    <MISTImage
                        onClick={() => setShowImage(!showImage)}
                        x={x + valueNodeGlobals.imageBoxOffset}
                        y={y + valueNodeGlobals.mageBoxOffset}
                        width={valueNodeGlobals.renderSideLength}
                        height={valueNodeGlobals.renderSideLength}
                        renderFunction={renderFunction}
                    />
                </Portal>
                : <Rect
                    onClick={() => setShowImage(!showImage)}
                    name={'imageBox'}
                    x={valueNodeGlobals.imageBoxOffset}
                    y={valueNodeGlobals.imageBoxOffset}
                    width={valueNodeGlobals.imageBoxSideLength}
                    height={valueNodeGlobals.imageBoxSideLength}
                    fill={gui.imageBoxColor}
                    expanded={false}
                    shadowColor={"gray"}
                    shadowBlur={2}
                    shadowOffsetX={1}
                    shadowOffsetY={1}
                />
            }
        </Group>
    );
    
}


export default ValNode; 