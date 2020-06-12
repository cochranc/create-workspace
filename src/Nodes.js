import React, { useState } from 'react';
import './styles/node.css';
//import { Stage, Layer, Rect, Text } from 'react-konva';


// value node - only for numbers
// we may not actually need this
function ValNode(props) {
    const [value, setValue] = useState(props.value);
    const [isShown, setIsShown] = useState(false);

    return (
        <div>
            <div class="node"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                <div class="node-icon" id="valNode"
                ></div>
            </div>
            {/*this is a hidden object. It will appear when hovered over.*/}
            { isShown && (
                <div class="info">valNode: val: {value}</div>
            )}
        </div>
    );

}

// variable nodes - for x, y, and other variables
function VarNode(props) {
    const [name, setName] = useState(props.name);
    const [isShown, setIsShown] = useState(false);

    return (
        <div>
            <div class="node"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                <div class="node-icon" id="varNode"></div>
            </div>
            {isShown && (
                <div class="info">varNode: name: {name}</div>
            )}
        </div>
    );


}

// function nodes - for defined functions
function FunNode(props) {
    const [name, setName] = useState(props.name);
    const [minParams, setMinParams] = useState(props.minParams);
    const [maxParams, setMaxParams] = useState(props.maxParams);
    const [isShown, setIsShown] = useState(false);


    return (
        <div>
            <div class="node"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                <div class="node-icon" id="funNode"></div>
            </div>
            {isShown && (
                <div class="info">funNode: name: {name}, minParams: {minParams}, maxParams: {maxParams}</div>
            )}
        </div>
    );

}

export { ValNode, VarNode, FunNode }; 