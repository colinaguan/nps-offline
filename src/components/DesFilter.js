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
            // <li className="desFilter" key={keys}><button className="dropdown-item" onClick={() => this.props.onDesigChange(keys)}>{keys}</button></li>
            <li className="" data-value="option1" tabIndex="-1"><input type="checkbox" />&nbsp;{keys}</li>
        ));

        // dropdown = keys.map((keys) => (
        //     <div className="desFilter" key={keys}>
        //         <li className="dropdown-item">
        //             <input type="checkbox" onClick={() => this.props.onDesigChange(keys)}></input>
        //             <label>{keys}</label>
        //         </li>
        //     </div>
        // ));

        return (
            <div className="col col-filter">
                <button type="button" className="btn btn-lg btn-outline-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter by Designation
                </button>
                <div className="dropdown-menu scrollable-menu">
                    <li className="desFilter" key={keys}><button className="dropdown-item" onClick={() => this.props.onDesigChange("None")}>None</button></li>
                    {dropdown}
                </div>
            </div>
        );
    }
}

export default DesFilter;