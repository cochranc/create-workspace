import React, { Component } from "react";
import { Line, Group, Text } from "react-konva";
import gui from './mistgui-globals';

class DrawArrow extends Component {
  state = {
    isDrawing: false,
    mode: "brush",
    shadow: false
  };

  componentDidMount() {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext("2d");

    this.setState({ canvas, context });
  }

  handleMouseDown = () => {

    this.setState({ isDrawing: true });

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
  };

  handleMouseOver = () => {
    this.setState({shadow: true});
  }

  handleMouseOut = () => {
    this.setState({shadow: false});
  }

  render() {
    return (
      <Group>
        <Line
          ref={ref => (this.arrow = ref)}
          points={[
            this.props.sourceX,
            this.props.sourceY,
            this.props.sinkX,
            this.props.sinkY
          ]}
          pointerLength={0}
          pointerWidth={0}
          fill="black"
          stroke="black"
          shadowColor={"red"}
          shadowBlur={5}
          shadowEnabled={this.state.shadow}
          strokeWidth={3}
          //onMouseDown={this.handleMouseDown}
          //onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <Text
          x={this.props.sourceX + (this.props.sinkX - this.props.sourceX) * (2/3)}
          y={this.props.sourceY + (this.props.sinkY - this.props.sourceY) * (2/3)}
          text={"del."}
          fill={"red"}
          visible={this.state.shadow}
          shadowColor={"red"}
          shadowBlur={5}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onClick={() => this.props.removeLine(this.props.index)}
        />
      </Group>

    );
  }
}

export default DrawArrow