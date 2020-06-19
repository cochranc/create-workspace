import React, { useState } from 'react';
import './styles/node.css';
//import { Stage, Layer, Rect, Text } from 'react-konva';


// function nodes - for defined functions
function FunNode(props) {
    const [name, setName] = useState(props.name);
    const [minParams, setMinParams] = useState(props.minParams);
    const [maxParams, setMaxParams] = useState(props.maxParams);
    const [isShown, setIsShown] = useState(false);


    return (
        <div>
            <div className="node"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                <div className="node-icon" id="funNode"></div>
            </div>
            {isShown && (
                <div className="info">funNode: name: {name}, minParams: {minParams}, maxParams: {maxParams}</div>
            )}
        </div>
    );

}

export default FunNode; 