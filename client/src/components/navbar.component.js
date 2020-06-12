import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/add" className="nav-link">Add Friend</Link>
            </li>
            <li className="navbar-item">
              <Link to="/stats" className="nav-link">Statistics</Link>
            </li>
            <li className="navbar-item">
              <a href="/" className="nav-link">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}