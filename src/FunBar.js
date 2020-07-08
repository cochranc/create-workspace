import React, { useState } from "react";
import {
  Rect,
  Group,
  Text,
  Shape,
  useStrictMode
} from "react-konva";
import Konva from 'konva';
import Portal from './Portal';
import gui from './mistgui-globals.js';
import MISTImage from './MISTImage';

function FunBar(props) {

    const [imageButtonClicked, setImageButtonClicked] = useState(false);
    
    return (
        <Group
            x={0}
            y={gui.height - gui.funBarHeight}
        >
            <Rect
                x={0}
                y={0}
                width={gui.funBarWidth}
                height={gui.funBarHeight}
                fill={gui.funBarBackgroundColor}
                //shadowColor={'black'} shadowBlur={5}
            />
            <Rect
                x={gui.funBarOffset}
                y={gui.funBarOffset}
                width={gui.funBarTextAreaWidth}
                height={gui.funBarTextAreaHeight}
                fill={'white'}
            />
            <Text
                text={props.text}
                x={gui.funBarTextOffset}
                y={gui.funBarTextOffset}
                width={gui.funBarTextAreaWidth - gui.funBarTextOffset}
                height={gui.funBarTextAreaHeight - (2 * gui.funBarOffset)}
                fill={'black'}
                fontFamily={'Courier New'}
                fontSize={gui.funBarDisplayFontSize}
            />
            <Text
                text={'Save as...'}
                x={gui.funBarTextAreaWidth + 2 * gui.funBarOffset}
                y={gui.funBarHeight / 2 - (gui.funBarFontSize / 2)}
                width={gui.funBarWidth * (3 / 25)}
                fill={'black'}
                fontSize={gui.funBarFontSize}
            />
            <Group
                x={gui.funBarTextAreaWidth + gui.funBarWidth * (2 / 25) + (gui.funBarOffset)}
                y={gui.funBarOffset}
            >
                <Rect
                    x={0}
                    y={0}
                    width={gui.funBarIconTextWidth}
                    height={gui.funBarTextAreaHeight}
                    fill={gui.functionColorLight}
                    shadowBlur={2}
                    shadowOffsetX={1}
                    shadowOffsetY={1}
                    shadowColor={'black'}
                />
                <Text
                    text={'function'}
                    x={0}
                    y={gui.funBarOffset}
                    width={gui.funBarIconTextWidth}
                    height={gui.funBarTextAreaHeight}
                    align={'center'}
                    fill={'grey'}
                    fontSize={gui.funBarFontSize}
                />
        </Group>
        <Group
            x={gui.funBarTextAreaWidth + gui.funBarWidth * (2 / 25) + (gui.funBarOffset)
                + gui.funBarIconTextWidth + (2 * gui.funBarOffset)}
            y={gui.funBarOffset}
        >
            <Rect
                x={0}
                y={0}
                width={gui.funBarIconTextWidth}
                height={gui.funBarTextAreaHeight}
                fill={gui.valueMenuColorLight}
                //shadowColor={'black'}
                shadowBlur={2}
                shadowOffsetX={1}
                shadowOffsetY={1}
                shadowColor={'black'}
            />
            {imageButtonClicked //temp; remove ! later
                ? <Portal>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, width: gui.width, height: gui.height,
                                backgroundColor: 'black', opacity: 0.7
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: gui.popSaveGroupY, left: gui.popSaveGroupX,
                                width: gui.popRectWidth, height: gui.popRectHeight,
                                borderRadius: 25,
                                backgroundColor: gui.popRectColor
                            }}
                        />
                        <MISTImage
                            onClick={() => setImageButtonClicked(false)}
                            x={gui.popCanvasShiftX} y={gui.popCanvasShiftY}
                            width={gui.popCanvasSide} height={gui.popCanvasSide}
                            renderFunction={props.text}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: gui.popTextShiftY, left: gui.popSaveGroupX + gui.popTextShiftX,
                                fontSize: gui.popTextFontSize, fontFamily: gui.functionFont,
                                textAlign: 'center',
                                width: gui.popTextWidth, height: gui.popTextHeight
                            }}
                        >
                            <p>{props.text}</p>
                        </div>
                        
                </Portal>
                : <Text
                text={'image'}
                x={0}
                y={gui.funBarOffset}
                width={gui.funBarIconTextWidth}
                align={'center'}
                fill={props.text ? 'black' : 'gray'}
                fontSize={gui.funBarFontSize}
                onClick={() => {
                    if(props.text) {
                        setImageButtonClicked(true);
                    }
                }}
                />}
        </Group>
    </Group>
    )
}

export default FunBar