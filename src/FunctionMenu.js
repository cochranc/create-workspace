import React, { useState } from 'react';
import { VarNode } from './VarNode';
import FunNode from './FunNode';
import './styles/fun&varMenu.css';

// menu that lists the different functions
function FunctionMenu() {

    //list of example functions
    var exFun = [
        {
            name: 'add',
            minParams: 2,
            maxParams: 20
        },
        {
            name: 'absVal',
            minParams: 1,
            maxParams: 1
        },
        {
            name: 'RGB',
            minParams: 3,
            maxParams: 3
        }
    ]

    return (

        <div className="flex" id="function">
            {//creates an instance of a FunNode with the values from exFun
                exFun.map((item, index) => {
                    return (
                        <div className="node">
                            <FunNode name={item.name}
                                minParams={item.minParams}
                                maxParams={item.maxParams}
                            />
                        </div>
                    )
                })}
        </div>
    );


}

export default FunctionMenu;