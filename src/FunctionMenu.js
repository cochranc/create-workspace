import React, { useState } from 'react';
import { FunNode } from './Nodes';

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
        <div id="menu">
            <ul>
                {//creates an instance of a FunNode with the values from exFun
                    exFun.map((item, index) => {
                        return (
                            <li>
                                <FunNode name={item.name}
                                    minParams={item.minParams}
                                    maxParams={item.maxParams}
                                />
                            </li>
                        )
                    })}
            </ul>
        </div>
    );


}

export default FunctionMenu;