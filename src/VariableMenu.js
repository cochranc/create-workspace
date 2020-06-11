import React, { useState } from 'react';
import { ValNode, VarNode } from './Nodes';
import './styles/fun&varMenu.css';

//menu that lists the different variables
function VariableMenu() {

    //list of example variables
    var exVar = ['x', 'y', 't'];

    return (
        <div id="flex">
            <div class="node">
                <ValNode value={0.5} />
            </div>
            {//creates an instance of a VarNode with the values from exVar
                exVar.map((item, index) => {
                    return (
                        <div class="node">
                            <VarNode name={item} />
                        </div>
                    )
                })}
        </div>
    );


}

export default VariableMenu;