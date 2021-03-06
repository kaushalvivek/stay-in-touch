import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
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
          <Route path='/add' exact render={(props) => <AddFriend {...props} user={this.props.user} />} />
          <Route path="/stats" component={Statistics} />
        </div>
      </Router>
    )
  };
}
