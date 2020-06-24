import React, { Component, useState } from 'react'
import './styles/functionform.css';
import MIST from './mist.js';

//container for everything related to the create workspace
export default function FunctionForm(props) {
    const [value, setValue] = useState('');

    // don't need this, but commented out in case we do in the future
    /*
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.MIST = MIST;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    */

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        console.log(MIST.parse(value, ""));
        //console.log(MIST.App("plus", new MIST.Val("x"), new MIST.Val("y")));
        return false;
    };

    return (
        <form id="form" onSubmit={handleSubmit}>
            <label>
                <input id="textbox" type="text" value={value} onChange={handleChange} />
            </label>
        </form>
    );

}
