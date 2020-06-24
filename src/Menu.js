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
            <div className="icon" id="workspaceIcon" />
            <div className="icon" id="valueIcon" onClick={() => onClick('valueIcon')}/>
            {//only shows variable menu if true
            isValueMenuOpen ? <VariableMenu/>: null}
            <div className="icon" id="functionIcon" onClick={() => onClick('functionIcon')}/>
            {//only shows function menu if true{
            isFunctionMenuOpen ? <FunctionMenu/>: null}
            <div className="icon" id="customFunctionIcon" />
            <div className="icon" id="cursorIcon" />
            <div className="icon" id="undoIcon" />
            <div className="icon" id="redoIcon" />
            <div className="icon" id="saveIcon" />
        </div>
    )
}

export default Menu;