import React, { Component } from 'react'
import '../stylesheets/filter.css'

class Filter extends Component {
    render() {
        let dropdown;
        var desig = this.props.desig;
        var keys = Object.keys(desig);

        keys.sort();

        dropdown = keys.map((keys) => (
            // <li className="desFilter" key={keys}><button className="dropdown-item" onClick={() => this.props.onDesigChange(keys)}>{keys}</button></li>
            <li><input type="checkbox" value={keys} />{keys}</li>
        ));

        return (
            <button type="button" className="btn btn-lg btn-outline-success" data-toggle="modal" data-target="#exampleModal">
                Filter by Designation and State
            </button>
        );
    }
}

export default Filter;