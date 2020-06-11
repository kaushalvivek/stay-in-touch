import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from './components/login.component.js';
import SignUp from './components/signup.component.js';
import Home from './components/home.component.js';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      page: "signin"
    }
  }

  signIn = (user) => {
    this.setState({
      user: user,
      page: 'home'
    });
  }

  changePage = (toPage) => {
    this.setState({
      page: toPage
    });
  }


  render() {
    if (this.state.page === "signin") {
      return (
        <Login signIn={this.signIn} changePage={this.changePage} />
      );
    }
    else if (this.state.page === 'signup') {
      return (
        <SignUp changePage={this.changePage} />
      );
    }
    else {
      return (
        <Router>
          <Home user={this.state.user} changePage={this.changePage} />
        </Router>
      )
    }
  };
}
