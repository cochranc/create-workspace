import React, {Component} from 'react'
import './styles/functionform.css';
import MIST from './mist.js';

//container for everything related to the create workspace
export default class FunctionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.MIST = MIST;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        console.log(MIST.parse(this.state.value, ""));
        //console.log(MIST.App("plus", new MIST.Val("x"), new MIST.Val("y")));
        return false;
    }
    
    render() {
        return (
            <form id="form" onSubmit={event => this.handleSubmit(event)}>
                <label>
                    <input id="textbox" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
            </form>
        );
    }
}
