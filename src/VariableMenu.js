import React, { useState } from 'react';
import { ValNode, VarNode } from './Nodes';

//menu that lists the different variables
function VariableMenu() {

     //list of example variables
     var exVar = ['x', 'y', 't'];

    return (
        <div id = "varMenu">
            <ul>
                <li>
                    <ValNode value={0.5}/>
                </li>

                {//creates an instance of a VarNode with the values from exVar
                    exVar.map((item, index) => {
                        return (
                            <li>
                                <VarNode name={item} />
                            </li>
                        )
                    })}
            </ul>
        </div> 
    );

        
}

export default VariableMenu;