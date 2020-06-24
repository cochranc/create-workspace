import React, { useState } from 'react';
import VarNode  from './VarNode';
import FunNode  from './FunNode';
import './styles/fun&varMenu.css';

//menu that lists the different variables
function VariableMenu() {

    //list of example variables
    var exVar = ['x', 'y', 't'];

    return (
        <div className="flex" id="variable">
            {//creates an instance of a VarNode with the values from exVar
                exVar.map((item, index) => {
                    return (
                        <div className="node">
                            <VarNode name={item} />
                        </div>
                    )
                })}
        </div>
    );


}

export default VariableMenu;