import React, { useState } from "react";
import {
  Rect,
  Group,
  Text,
  Shape,
  useStrictMode
} from "react-konva";
import Konva from 'konva';
import gui from './mistgui-globals.js';

function FunBar(props) {


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
                stroke={'black'}
                strokeWidth={1}
            />
            <Rect
                x={gui.funBarOffset}
                y={gui.funBarOffset}
                width={gui.funBarTextAreaWidth}
                height={gui.funBarTextAreaHeight}
                fill={'white'}
                stroke={'black'}
                strokeWidth={.5}
            />
            <Text
                text={''}
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
                    stroke={'grey'}
                    strokeWidth={1}
                    shadowColor={'black'}
                    shadowEnabled={false}
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
                stroke={'grey'}
                strokeWidth={1}
                shadowColor={'black'}
                shadowEnabled={false}
            />
            <Text
                text={'image'}
                x={0}
                y={gui.funBarOffset}
                width={gui.funBarIconTextWidth}
                align={'center'}
                fill={'grey'}
                fontSize={gui.funBarFontSize}
            />
        </Group>
    </Group>
    )
}

export default FunBar