import React, { useState } from "react";
import { Line, Group, Text, Image } from "react-konva";
import gui from './mistgui-globals';
import useImage from 'use-image';

function DrawArrow(props) {

  const [hovered, setHovered] = useState(false);
  const [trashHovered, setTrashHovered] = useState(false);
  const [image] = useImage(require('./trash.png'));

  function Trashcan() {
    return <Image
      image={image}
      x={props.sourceX + (props.sinkX - props.sourceX) * (3/5) - 7}
      y={props.sourceY + (props.sinkY - props.sourceY) * (3/5) - 7}
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
      onClick={() => props.removeLine(props.index)}
    />;
  }

  return (
    <Group
      onMouseEnter={(e) => {
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
      }}
    >
      <Line
        points={[
          props.sourceX,
          props.sourceY,
          props.sinkX,
          props.sinkY
        ]}
        pointerLength={0}
        pointerWidth={0}
        stroke={"black"}
        shadowColor={trashHovered ? "red" : "cyan"}
        shadowBlur={5}
        shadowEnabled={hovered}
        strokeWidth={3}
      />
      <Trashcan/>
    </Group>
  )
}
export default DrawArrow



/*   handleMouseDown() {

    setIsDrawing(true);

    // TODO: improve
    const stage = this.arrow.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();


    this.setState({
      posX: this.lastPointerPosition.x,
      poxY: this.lastPointerPosition.y
    });
  };

  handleMouseUp = () => {
    this.setState({ isDrawing: false });
  };

  handleMouseMove = () => {
    if (this.state.isDrawing) {
      const stage = this.arrow.parent.parent;
      this.lastPointerPosition = stage.getPointerPosition();
      var pos = stage.getPointerPosition();
      var oldPoints = this.arrow.points();
      this.arrow.points([oldPoints[0], oldPoints[1], pos.x, pos.y]);
      this.arrow.getLayer().draw();
    }
  }; */
