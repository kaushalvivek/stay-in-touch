import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './navbar.component';
import Statistics from './statistics.component';
import AddFriend from './addFriend.component'
import FriendsList from './friendsList.component'

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path='/' exact render={(props) => <FriendsList {...props} user={this.props.user} />} />
          {/* <Route path='/add' render={(props) => <Pending {...props} user={this.props.user} />} /> */}
          <Route path="/add" component={AddFriend} />
          <Route path="/stats" component={Statistics} />
        </div>
      </Router>
    )
  };
}
