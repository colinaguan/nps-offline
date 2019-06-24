import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DesFilter from './DesFilter.js'
import StateFilter from './StateFilter.js'

import '../stylesheets/parks.css'

function loadDesigs(parks) {
    var desList = new Set();
    parks.forEach((p) => {
        desList.add(p.designation);
    });
    return Array.from(desList);
}

function loadStates(parks) {
    var states = new Set();
    parks.forEach((p) => {
        var stateList = p.states.split(",");
        stateList.forEach((s) => {
            states.add(s);
        });
    });
    return Array.from(states);
}

class Parks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desigs: [],
            states: [],
            desigCheck: [],
            statesCheck: [],
            searchCheck: ""
        };
        // NOTE TO SELF: multiple filters??? checkbox list

        this.onDesigChange = this.onDesigChange.bind(this);
        this.onStatesChange = this.onStatesChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

        this.state.desigs = loadDesigs(this.props.parks.data);
        this.state.states = loadStates(this.props.parks.data);
    }

    onDesigChange(desigFilters) {
        console.log("Designation Change");

        this.setState({
            desigCheck: desigFilters
        });
    }

    onStatesChange(stateFilters) {
        console.log("States Change");
        console.log(stateFilters);

        this.setState({
            statesCheck: stateFilters
        });
    }

    onSearchChange(searchFil) {
        console.log("Input changed");
        console.log(searchFil.target.value);

        this.setState({
            searchCheck: searchFil.target.value
        });
    }

    render() {
        let content;

        var parkInfo = this.props.parks.data;
        console.log(parkInfo);
        if (this.state.desigCheck.length !== 0) {
            parkInfo = parkInfo.filter((park) => {
                return this.state.desigCheck.includes(park.designation);
            })
        }
        console.log(parkInfo);
        console.log("StatesCheck: ")
        console.log(this.state.statesCheck);
        if (this.state.statesCheck.length !== 0) {
            parkInfo = parkInfo.filter((park) => {
                var s = park.states.split(",").every((state) => {
                    return this.state.statesCheck.includes(state);
                });
                return s;
            });
        }
        console.log(parkInfo);
        console.log("Search Check: " + this.state.searchCheck);
        if (this.state.searchCheck) {
            parkInfo = parkInfo.filter((park) => {
                return park.fullName.toLowerCase().includes(this.state.searchCheck.toLowerCase());
            })
        }

        console.log(parkInfo);

        if (parkInfo) {
            content = parkInfo.map((park) => {
                var stateStr = park.states.split(",").join(" ");
                return (
                    <div className="col-lg-4 col-md-6">
                        <div className="card park-card" key={park.fullName}>
                            <img className="card-img-top" src={park.images[0].url} alt="Card image cap"></img>
                            <div className="card-block d-flex">
                                <div className="card-body">
                                    <h5 className="card-title">{park.fullName}</h5>
                                    <p className="card-text text-muted">
                                        {park.designation + " "}
                                        <small style={{ "opacity": 0.5 }}>{stateStr}</small>
                                    </p>
                                    <Link to={"/parks/" + park.parkCode} >
                                        <button type="button learn-more" className="btn btn-success btn-learn-more">Learn More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        else
            content = <div></div>;


        return (
            <div>
                <div className="container search-filter">
                    <div className="row">
                        <input onChange={this.onSearchChange} type="text" className="search-bar" placeholder="Search..."></input>
                    </div>
                    <div className="row filter-row">
                        <DesFilter desFilter onDesigChange={this.onDesigChange} desigs={this.state.desigs} />
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
