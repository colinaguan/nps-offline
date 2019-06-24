import React, { Component } from 'react'

import '../stylesheets/filter.css'

class StateFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checkS: {}
        };
    }

    onCheckChange(e) {
        var checked = e.target.checked;
        var name = e.target.value;
        console.log(name + " " + checked);

        let checkState = Object.assign({}, this.state.checkS, { [name]: checked });
        console.log(checkState);

        this.setState({
            checkS: checkState
        });
    }

    onClear() {
        console.log("Clearing");
        document.getElementById("filter-form").reset();

        this.setState({
            checkS: {}
        })

        this.props.onStatesChange([]);
    }

    onFormSubmit() {
        console.log("Form submitted");
        console.log(this.state.checkS);

        var f = [];

        for (var k in this.state.checkS) {
            if (this.state.checkS[k] === true) {
                f.push(k);
            }
        }

        this.props.onStatesChange(f);
    }

    render() {
        let dropdown;
        var keys = this.props.states;

        keys.sort();

        dropdown = keys.map((keys) => (
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value={keys} onChange={this.onCheckChange.bind(this)} id="defaultCheck1" />
                <label class="form-check-label" for="defaultCheck1">
                    {keys}
                </label>
            </div>
        ));

        return (
            <div className="col col-filter">
                <button type="button" className="btn btn-lg btn-outline-success" data-toggle="modal" data-target="#stateModal">
                    Filter by State
                </button>
                <div class="modal fade" id="stateModal" tabindex="-1" role="dialog" aria-labelledby="stateModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Filter by State</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="filter-form">
                                    {dropdown}
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.onClear.bind(this)}>Clear</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.onFormSubmit.bind(this)}>Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StateFilter;