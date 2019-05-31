import React, { Component } from 'react'
import Parks from './components/Parks.js'

import data from './data.json'

const API = 'https://developer.nps.gov/api/v1/';
const KEY = 'kTXawZC8Up8xkPa8gocEoJ9ZRAeXGZnKzx5PxtcS';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleParkClick = this.handleParkClick.bind(this);

    this.state = {
      //parks: null,
      parks: data,       //grabbing from data.json (NOT FOR API)
      page: "parks"
    };

  }

  handleParkClick() {
    this.setState({ page: "parks" });
  }

  // componentDidMount() {
  //   fetch(API + 'parks?parkCode=&limit=999&api_key=' + KEY)
  //     .then(response => response.json())
  //     .then(data => this.setState({ parks: data }))
  //     .catch(console.log);
  // }

  render() {
    let content;
    var pageName = this.state.page;

    if (this.state.parks == null) {
      return (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
    }
    if (pageName === "parks") {
      content = < Parks parks={this.state.parks} pageName={this.state.page} />;
    }
    return (
      <div className="text-center">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="masthead mb-auto">
            <div className="inner">
              <button type="button" className="btn btn-light" onClick={this.handleParkClick}>Logo</button>
            </div>
          </header>

          {content}

        </div>
      </div>
      // <Parks parks={this.state.parks} />
    );
  }
}

export default App;
