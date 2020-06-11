import React, { useState } from 'react';
import './styles/menu.css';

function Menu(props) {

    return (
        <div id="menu">
            <ul>
                <li>
                    <div class="icon" id="workspaceIcon" />
                </li>
                <li>
                    <div class="icon" id="valueIcon" />
                </li>
                <li>
                    <div class="icon" id="functionIcon" />
                </li>
                <li>
                    <div class="icon" id="customFunctionIcon" />
                </li>
                <li>
                    <div class="icon" id="cursorIcon" />
                </li>
                <li>
                    <div class="icon" id="undoIcon" />
                </li>
                <li>
                    <div class="icon" id="redoIcon" />
                </li>
                <li>
                    <div class="icon" id="saveIcon" />
                </li>
            </ul>
        </div>
    )
}

export default Menu;