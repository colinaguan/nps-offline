import React, { Component } from 'react'

import '../stylesheets/filter.css'

class StateFilter extends Component {

    constructor(props) {
        super(props);

        this.checkOnClick = this.checkOnClick.bind(this);
    }

    checkOnClick(e, key) {
        e.stopPropagation();
        this.props.onStatesChange(key);
    }

    render() {
        let dropdown;
        var states = this.props.states;
        var keys = Object.keys(states);
        // console.log("Rendering States: ");
        // console.log(states);

        /*
        dropdown = keys.map((keys) => (
            <div class="checkbox">
                <label>
                    <input type="checkbox">Two
                </label>
            </div>
        ));
        */

        dropdown = keys.map((keys) => (
            <li className="stateFilter" key={keys} ><button className="dropdown-item" onClick={() => this.props.onStatesChange(keys)}>{keys}</button></li>
        ));

        // dropdown = keys.map((key) => (
        //     <div class="form-check">
        //         <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={() => this.props.onStatesChange(key)} />
        //         <label class="form-check-label" for="defaultCheck1">
        //             {key}
        //         </label>
        //     </div>
        // ));

        return (
            <div className="col col-filter">
                <button type="button" className="btn btn-lg btn-outline-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter by State
                </button>
                <div className={"dropdown-menu scrollable-menu"}>
                    <li className="stateFilter"><button className="dropdown-item" onClick={() => this.props.onStatesChange("None")}>None</button></li>
                    {dropdown}
                </div>
            </div>
        );
    }
}

export default StateFilter;