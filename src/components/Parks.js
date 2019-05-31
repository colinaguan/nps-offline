import React, { Component } from 'react'
import DesFilter from './DesFilter.js'
import StateFilter from './StateFilter.js'

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
            dFilt: "",
            sFilt: "",
            input: ""
        };
        // NOTE TO SELF: multiple filters??? checkbox list

        this.onCardClick = this.onCardClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDesigChange = this.onDesigChange.bind(this);
        this.onStatesChange = this.onStatesChange.bind(this);

        this.state.desig = loadDesig(this.props.parks);
        this.state.states = loadStates(this.props.parks);
        this.state.parksDisp = this.props.parks;
    }

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

    onCardClick(c) {

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

        if (!(parkInfo === null))
            content = parkInfo.data.map((parkInfo) => (
                <div className="card" key={parkInfo.fullName} onClick={() => this.onCardClick(parkInfo)}>
                    <div className="card-body">
                        <h5 className="card-title">{parkInfo.fullName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{parkInfo.designation}</h6>
                        <p className="card-text">{parkInfo.description}</p>
                    </div>
                </div>
            ));
        else
            content = <div></div>;
        return (
            <div>
                <div>
                    <h1>National Park Service</h1>
                </div>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                        </div>
                        <input onChange={this.onSearchChange} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                    </div>
                    <DesFilter desFilter onDesigChange={this.onDesigChange} desig={this.state.desig} />
                    <StateFilter stateFilter onStatesChange={this.onStatesChange} states={this.state.states} />
                </div>
                {content}
            </div >
        );
    }
}

/*
const Parks = ({parks}) => {
            let content;
    if (parks.data)
        content = parks.data.map((parks) => (
<div class="card">
            <div class="card-body">
                <h5 class="card-title">{parks.fullName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{parks.designation}, {parks.states}</h6>
                <p class="card-text">{parks.description}</p>
            </div>
        </div>
        ));
    else
content = <div></div>;
            return (
<div>
            <left><h1>Parks</h1></left>
            {content}
        </div>
        );
    }
    */

export default Parks;
