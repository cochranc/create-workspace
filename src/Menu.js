import React, { useState } from 'react';
import './styles/menu.css';

function Menu(props) {

    return (
        <div id="menu">
            <div class="icon" id="workspaceIcon" />
            <div class="icon" id="valueIcon" />
            <div class="icon" id="functionIcon" />
            <div class="icon" id="customFunctionIcon" />
            <div class="icon" id="cursorIcon" />
            <div class="icon" id="undoIcon" />
            <div class="icon" id="redoIcon" />
            <div class="icon" id="saveIcon" />
        </div>
    )
}

export default Menu;