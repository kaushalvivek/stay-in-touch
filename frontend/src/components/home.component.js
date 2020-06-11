import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/friends/')
      .then(response => {
        console.log(response.data)
        var filtered_friends = response.data.filter((friend) => { return friend.user_email === this.props.user.email });
        this.setState({ friends: filtered_friends });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        This is the main home page.
      </div>
    )
  };
}
