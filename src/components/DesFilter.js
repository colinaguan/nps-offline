import React, { Component } from 'react'
import '../stylesheets/filter.css'

class DesFilter extends Component {

    render() {
        let dropdown;
        var desig = this.props.desig;
        var keys = Object.keys(desig);

        keys.sort();

        dropdown = keys.map((keys) => (
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value={keys} id="defaultCheck1" />
                <label class="form-check-label" for="defaultCheck1">
                    {keys}
                </label>
            </div>
        ));

        return (
            <div className="col col-filter">
                <button type="button" className="btn btn-lg btn-outline-success" data-toggle="modal" data-target="#exampleModal">
                    Filter by Designation
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Filter by Designation</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {dropdown}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Clear</button>
                                <button type="button" class="btn btn-primary">Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DesFilter;