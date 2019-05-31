import React, { Component } from 'react'
import '../stylesheets/filter.css'

class DesFilter extends Component {

    render() {
        let dropdown;
        var desig = this.props.desig;
        var keys = Object.keys(desig);
        // console.log("Rendering Designations: ");
        // console.log(desig);

        dropdown = keys.map((keys) => (
            <li className="desFilter" key={keys}><button className="dropdown-item" onClick={() => this.props.onDesigChange(keys)}>{keys}</button></li>
        ));

        return (
            <div className="desFilter">
                <button type="button" className="btn btn-Success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter by Designation
                </button>
                <div className="dropdown-menu scrollable-menu">
                    <li className="desFilter"><button className="dropdown-item" onClick={() => this.props.onDesigChange("None")}>None</button></li>
                    {dropdown}
                </div>
            </div>
        );
    }
}

export default DesFilter;