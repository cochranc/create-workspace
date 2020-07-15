import React, { Component, useEffect, useState } from "react";
import Konva from 'konva';
import gui from './mistgui-globals.js'
import MIST from "./mistui.js";

/* MISTImage props
 *   resolution: the resolution used to render the image (may be smaller than
 *     the actual canvas)
 *   code: the MIST code used to render the image
 *   width: (optional, defaults to resolution) the width of the canvas
 *   height: (optional, defaults to resolution) the height of the canvas
 */
export default function MISTImage(props) {
  const [canvas] = useState(React.createRef());
  const [animator, setAnimator] = useState(null);

  useEffect(() => {
    if (animator) {
      animator.stop();
    }
    const new_animator = new MIST.ui.Animator(props.renderFunction, [], {}, canvas.current)
    new_animator.setResolution(props.width, props.height);
    new_animator.frame();
    setAnimator(new_animator);
    return () => {
      if (animator) {
        animator.stop();
      }
    }
  }, [animator, props.renderFunction, canvas, setAnimator]);

  useEffect(() => {
    if (animator) {
      animator.setResolution(props.width, props.height);
      animator.frame();
    }
  }, [animator, props.width, props.height])

  return (
    <canvas
      className="mist-image"
      width={props.width}
      height={props.height}
      style={{
        position: 'absolute',
        top: props.y,
        left: props.x,
        width: props.width,
        height: props.height
      }}
      onMouseOut={() => {
        if (animator) {
          animator.stop();
        }
      }}
      onMouseOver={() => {
        if (animator) {
          animator.stop();
          animator.start();
        }
      }}
      onClick={props.onClick}
      ref={canvas}
    />
  );
}