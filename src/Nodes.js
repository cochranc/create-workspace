import React, { useState } from 'react';
import './styles/node.css';
//import { Stage, Layer, Rect, Text } from 'react-konva';


// value node - only for numbers
function ValNode(props) {
    const [value, setValue] = useState(props.value);

    return (
        <div>
            <div class="node" id="valNode" ></div>
            {/*this is a hidden object. It will appear when hovered over.*/}
            <p class="hide">valNode: val: {value}</p>
        </div>
    );

}

// variable nodes - for x, y, and other variables
function VarNode(props) {
    const [name, setName] = useState(props.name);

    return (
        <div>
            <div class="node" id = "varNode"></div>
            <p class="hide">varNode: name: {name}</p>
        </div>
    );


}

// function nodes - for defined functions
function FunNode(props) {
    const [name, setName] = useState(props.name);
    const [minParams, setMinParams] = useState(props.minParams);
    const [maxParams, setMaxParams] = useState(props.maxParams);

    return (
        <div>
            <div class="node" id = "funNode"></div>
            <p class="hide">funNode: name: {name}, minParams: {minParams}, maxParams: {maxParams}</p>
        </div>
    );

}

export { ValNode, VarNode, FunNode }; 