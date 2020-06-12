import React, { useState } from 'react';
import './styles/menu.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import VariableMenu from './VariableMenu';
import FunctionMenu from './FunctionMenu';

function Menu(props) {

    //keeps track if the menus are open
    const [isValueMenuOpen, setIsValueMenuOpen] = useState(false);
    const [isFunctionMenuOpen, setIsFunctionMenuOpen] = useState(false);

    function onClick(clicked) {

        //toggles value menu
        if (clicked == 'valueIcon') {

            //makes sure two menus aren't open at once
            if(!isValueMenuOpen && isFunctionMenuOpen) {
                 setIsFunctionMenuOpen(false);
            }
            setIsValueMenuOpen(!isValueMenuOpen);
            
        }

        //toggles function menu
        if (clicked == 'functionIcon') {

            //makes sure two menus aren't open at once
            if(!isFunctionMenuOpen && isValueMenuOpen) {
                setIsValueMenuOpen(false);
           }
           setIsFunctionMenuOpen(!isFunctionMenuOpen);
        }
    }

    return (
        <div id="menu">
            <div class="icon" id="workspaceIcon" />
            <div class="icon" id="valueIcon" onClick={() => onClick('valueIcon')}/>
            {//only shows variable menu if true
            isValueMenuOpen ? <VariableMenu/>: null}
            <div class="icon" id="functionIcon" onClick={() => onClick('functionIcon')}/>
            {//only shows function menu if true{
            isFunctionMenuOpen ? <FunctionMenu/>: null}
            <div class="icon" id="customFunctionIcon" />
            <div class="icon" id="cursorIcon" />
            <div class="icon" id="undoIcon" />
            <div class="icon" id="redoIcon" />
            <div class="icon" id="saveIcon" />
        </div>
    )
}

export default Menu;