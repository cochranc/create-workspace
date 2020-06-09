import React from 'react';
import { ValNode, VarNode, FunNode } from './Nodes';
import './styles/workspace.css';

//container for everything related to the create workspace
function Workspace() {

    //list of example variables
    var exVar = ['x', 'y', 't'];

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
        <div>
            <ul>
                <li>
                    <ValNode value={0.5} />
                </li>

                {//creates an instance of a VarNode with the values from exVar
                    exVar.map((item, index) => {
                        return (
                            <li>
                                <VarNode name={item} />
                            </li>
                        )
                    })}

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

export default Workspace;
