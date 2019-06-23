import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DesFilter from './DesFilter.js'
import StateFilter from './StateFilter.js'
import Filter from './Filter.js'

import '../stylesheets/parks.css'

function loadDesig(parksO) {

    // creates javascript object
    // keys: designation names
    // values: array of integers (indices)
    var desig = {};
    var parks = parksO.data;

    for (var i = 0; i < parks.length; i++) {
        var key = parks[i].designation;
        var vInd;
        // if designation exists and is not stored yet, store and add index to dInd
        if (!(key === "") && !(key in desig)) {
            vInd = [];
            vInd.push(i);
            desig[key] = [];
            desig[key] = vInd;
        }
        // if designation was already stored, push to dInd
        else if (key in desig) {
            vInd = desig[key];
            vInd.push(i);
            desig[key] = vInd;
        }
    }

    return desig;
}

function loadStates(parksO) {

    // creates javascript object
    // keys: state initials
    // values: array of integers(indicies)
    var states = {};
    var parks = parksO.data;

    for (var i = 0; i < parks.length; i++) {
        var value = parks[i].states;
        var s = value.split(",");

        for (var j = 0; j < s.length; j++) {
            var vInd;
            // if designation exists and is not stored yet, store and add index to dInd
            if (!(s[j] === "") && !(s[j] in states)) {
                vInd = [];
                vInd.push(i);
                states[s[j]] = [];
                states[s[j]] = vInd;
            }
            // if designation was already stored, push to dInd
            else if (s[j] in states) {
                vInd = states[s[j]];
                vInd.push(i);
                states[s[j]] = vInd;
            }
        }
    }

    return states;
}

class Parks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desig: {},          // designations
            states: {},         // states
            parksDisp: {},      // parks to display
            // dFilt: "",
            // sFilt: "",
            input: ""
        };
        // NOTE TO SELF: multiple filters??? checkbox list

        //this.onFilterChange = this.onFilterChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDesigChange = this.onDesigChange.bind(this);
        this.onStatesChange = this.onStatesChange.bind(this);

        this.state.desig = loadDesig(this.props.parks);
        this.state.states = loadStates(this.props.parks);
        this.state.parksDisp = this.props.parks;
    }

    // onFilterChange(event) {

    //     var p = [];
    //     var parks = this.props.parks.data;

    //     // check if changed filter is DesigFilter
    //     if (event in this.state.desig) {
    //         var des = this.state.desig[event];

    //         if (event === "None") {
    //             p = this.props.parks.data;
    //         } else {
    //             for (var i = 0; i < des.length; i++) {
    //                 var j = des[i];
    //                 p[i] = parks[j];
    //             }
    //         }
    //     }

    //     this.setState({
    //         parksDisp: { data: p }
    //     });
    // }

    onSearchChange(event) {
        console.log("Input changed");
        console.log(event.target.value);

        var p = [];
        var parks = this.props.parks.data;
        var inp = event.target.value;

        if (inp === "") {
            p = this.props.parks.data;
        } else {
            var j = 0;
            for (var i = 0; i < parks.length; i++) {
                if ((parks[i].fullName.toLowerCase()).includes(inp.toLowerCase())) {
                    p[j] = parks[i];
                    j++;
                }
            }
        }

        this.setState({
            parksDisp: { data: p }
        })
    }

    onDesigChange(d) {
        console.log("Clicked " + d);

        this.setState({
            dFilt: d
        });

        var p = [];
        var parks = this.props.parks.data;
        var des = this.state.desig[d];

        if (d === "None") {
            p = this.props.parks.data;
        } else {
            for (var i = 0; i < des.length; i++) {
                var j = des[i];
                p[i] = parks[j];
            }
        }

        this.setState({
            parksDisp: { data: p }
        })
    }

    onStatesChange(s) {
        console.log("Clicked " + s);

        this.setState({
            sFilt: s
        });

        var p = [];
        var parks = this.props.parks.data;
        var sta = this.state.states[s];

        if (s === "None") {
            p = this.props.parks.data;
        } else {
            for (var i = 0; i < sta.length; i++) {
                var j = sta[i];
                p[i] = parks[j];
            }
        }

        this.setState({
            parksDisp: { data: p }
        });
    }

    render() {
        let content;
        var parkInfo = this.state.parksDisp;

        console.log(parkInfo);

        //<img class="card-img-top" src={parkInfo.images.url} alt="Card image cap"></img>

        if (parkInfo)
            content = parkInfo.data.map((parkInfo) => {
                var stateStr = parkInfo.states.split(",").join(" ");
                return (
                    <div className="col-lg-4 col-md-6">
                        <div className="card park-card" key={parkInfo.fullName}>
                            <img className="card-img-top" src={parkInfo.images[0].url} alt="Card image cap"></img>
                            <div className="card-block d-flex">
                                <div className="card-body">
                                    <h5 className="card-title">{parkInfo.fullName}</h5>
                                    <p className="card-text text-muted">
                                        {parkInfo.designation + " "}
                                        <small style={{ "opacity": 0.5 }}>{stateStr}</small>
                                    </p>
                                    <Link to={"/parks/" + parkInfo.parkCode} >
                                        <button type="button learn-more" className="btn btn-success">Learn More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        else
            content = <div></div>;


        return (
            <div>
                <div className="container search-filter">
                    <div className="row">
                        <input onChange={this.onSearchChange} type="text" className="search-bar" placeholder="Search..."></input>
                    </div>
                    <div className="row filter-row">
                        {/* <Filter filter onDesigChange={this.onDesigChange} desig={this.state.desig} /> */}
                        <DesFilter desFilter onDesigChange={this.onDesigChange} desig={this.state.desig} />
                        <StateFilter stateFilter onStatesChange={this.onStatesChange} states={this.state.states} />
                    </div>
                </div>
                <div className="row">
                    {content}
                </div>
            </div >
        );
    }
}

export default Parks;
