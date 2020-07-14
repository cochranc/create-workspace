import React, { useState } from "react";
import { Rect, Group, Text, Shape, Image } from "react-konva";
import Konva from "konva";
import Portal from "./Portal";
import gui from "./mistgui-globals.js";
import MISTImage from "./MISTImage";
import useImage from "use-image";

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
  const [mainRectState, setMainRectState] = useState("none");
  const [hovered, setHovered] = useState(false);
  const [trashHovered, setTrashHovered] = useState(false);
  const [image] = useImage(require("./trash.png"));
  function Trashcan() {
    return (
      <Image
        image={image}
        x={0} //60}
        y={0} //-5}
        width={14}
        height={14}
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
      />
    );
  }

  function handleDragStart(e) {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  }

  function handleDragEnd(e) {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  }

  function handleDrag(e) {
    props.handler(index, e.currentTarget.x(), e.currentTarget.y());
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
      dragBoundFunc={function (pos) {
        if (pos.x < 0 - gui.functionStrokeWidth) {
          pos.x = 0;
        }
        if (
          pos.x >
          window.innerWidth -
            gui.functionTotalSideLength -
            gui.functionStrokeWidth
        ) {
          pos.x = window.innerWidth - gui.functionTotalSideLength;
        }
        if (pos.y < gui.menuHeight) {
          pos.y = gui.menuHeight;
        }
        if (
          pos.y >
          window.innerHeight - gui.funBarHeight - gui.functionTotalSideLength
        ) {
          pos.y =
            window.innerHeight - gui.funBarHeight - gui.functionTotalSideLength;
        }
        return pos;
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDrag}
      onClick={handleClick}
      onDblClick={handleDblClick}
      onMouseEnter={(e) => {
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
      }}
      x={x}
      y={y}
    >
      <Rect
        x={gui.functionRectSideLength / 2}
        y={0}
        width={gui.valueSideLength}
        height={gui.valueSideLength}
        fill={gui.values[name].color}
        lineJoin={"round"}
        rotation={45}
        stroke={gui.values[name].color}
        strokeWidth={gui.functionStrokeWidth}
        shadowColor={"gray"}
        shadowBlur={2}
        shadowOffsetX={1}
        shadowOffsetY={1}
        _useStrictMode
      />
      <Trashcan/>
      <Text
        text={rep}
        fontFamily={gui.globalFont}
        fill={"black"}
        fontSize={gui.nodeFontSize}
        x={0}
        y={gui.valueSideLength / 2.2}
        width={gui.functionRectSideLength}
        align={"center"}
        _useStrictMode
      />
      {showImage ? (
        <Portal>
          <MISTImage
            onClick={() => setShowImage(!showImage)}
            x={x + gui.valueImageBoxOffset}
            y={y + gui.valueImageBoxOffset}
            width={gui.renderSideLength}
            height={gui.renderSideLength}
            renderFunction={renderFunction}
          />
        </Portal>
      ) : (
        <Rect
          onClick={() => setShowImage(!showImage)}
          name={"imageBox"}
          x={gui.valueImageBoxOffset}
          y={gui.valueImageBoxOffset}
          width={gui.imageBoxSideLength}
          height={gui.imageBoxSideLength}
          fill={gui.imageBoxColor}
          expanded={false}
          shadowColor={"gray"}
          shadowBlur={2}
          shadowOffsetX={1}
          shadowOffsetY={1}
        />
      )}
      {[...Array(numOutlets)].map((u, i) => (
        <Shape
          sceneFunc={function (context) {
            context.beginPath();
            context.moveTo(0, 0);
            context.bezierCurveTo(
              -gui.bezPoint,
              -gui.bezPoint,
              -gui.bezPoint,
              gui.bezPoint,
              0,
              0
            );
            context.closePath();
            context.fillStrokeShape(this);
          }}
          name={"outlet" + (i + 1)}
          x={gui.outletXOffset}
          y={(i + 1) * gui.outletYOffset + gui.functionHalfStrokeWidth}
          fill={gui.outletColor}
          opacity={1}
          stroke="black"
          strokeWidth={1}
          lineIn={null}
          outletIndex={i}
        />
      ))}
    </Group>
  );
}

export default ValNode;
