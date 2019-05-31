import React, { Component } from 'react'

class StateFilter extends Component {

    render() {
        let dropdown;
        var states = this.props.states;
        var keys = Object.keys(states);
        // console.log("Rendering States: ");
        // console.log(states);

        dropdown = keys.map((keys) => (
            <li className="stateFilter" key={keys} ><button className="dropdown-item" onClick={() => this.props.onStatesChange(keys)}>{keys}</button></li>
        ));

        return (
            <div className="desFilter">
                <button type="button" className="btn btn-Success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter by State
                </button>
                <div className="dropdown-menu scrollable-menu">
                    <li className="stateFilter"><button className="dropdown-item" onClick={() => this.props.onStatesChange("None")}>None</button></li>
                    {dropdown}
                </div>
            </div>
        );
    }
}

export default StateFilter;