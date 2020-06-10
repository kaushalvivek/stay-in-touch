import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from './components/login.component.js';
import Home from './components/home.component.js';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  signIn = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    if (this.state.user == null) {
      return (
        <Login signIn={this.signIn} />
      );
    }
    else {
      return (
        <Home user={this.state.user} />
      )
    }
  };
}
