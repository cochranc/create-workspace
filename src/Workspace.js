import React from 'react';
import { ValNode, VarNode, FunNode } from './Nodes';
import Menu from './Menu';
import FunctionMenu from './FunctionMenu';
import VariableMenu from './VariableMenu';
import './styles/workspace.css';

//container for everything related to the create workspace
function Workspace() {

    // we should probably have the menu, the workspace, the function bar, and the settings here
    return (
        <div>
            <Menu />
        </div>
    );

}

export default Workspace;
