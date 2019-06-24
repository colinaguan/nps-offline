import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import Parks from './components/Parks.js'
import Info from './components/Info.js'
import './stylesheets/app.css'

import logoImg from './images/logo.png'
import data from './data2.json'

const API = 'https://developer.nps.gov/api/v1/';
//const KEY = 'kTXawZC8Up8xkPa8gocEoJ9ZRAeXGZnKzx5PxtcS';
const KEY = 'tT5XaeyZMoQASmB5dx2kdyuU2vcMLKc1be2iiFpw';

//https://developer.nps.gov/api/v1/parks?limit=999&fields=fullName&fields=states&fields=parkCode&fields=description&fields=designation&fields=images

class App extends Component {

  constructor(props) {
    super(props);

    this.handleParkClick = this.handleParkClick.bind(this);
    this.handleParkInfo = this.handleParkInfo.bind(this);

    this.state = {
      parks: null,
      //parks: data,       //grabbing from data.json (NOT FOR API)
      events: null,
      page: "parks"
    };

    fetch(API + 'parks?limit=5&fields=addresses,contacts,images,operatingHours&api_key=' + KEY)
      .then(response => response.json())
      .then(data => this.setState({ parks: data }))
      .catch(console.log);
  }

  handleParkClick() {
    this.setState({ page: "parks" });
  }

  handleParkInfo(event) {

    var code = event.parkCode;

    this.setState({
      page: code
    });
  }

  render() {

    console.log(this.state.parks);

    if (!this.state.parks) {
      return (
        <div className="container">
          <nav className="navbar d-flex justify-content-center">
            <Link className="navbar-brand text-center center-block" to="/">
              <img className="logo" width="30" height="30" src={logoImg} />
            </Link>
          </nav>
          <div className="container loading-container d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"></link>
        <Router>
          <nav className="navbar d-flex justify-content-center">
            <Link className="navbar-brand text-center center-block" to="/">
              <span>
                <img className="logo" width="30" height="30" src={logoImg} />
              </span>
            </Link>
          </nav>

          <Switch>
            <Route path='/' exact
              render={() => <Parks parks={this.state.parks} handleParkInfo={this.handleParkInfo} />}
            />
            <Route path='/parks/:id'
              render={(props) => <Info parks={this.state.parks} pageName={this.state.page} id={props.match.params.id} />}
            />
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
