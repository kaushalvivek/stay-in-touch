import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';

const Friend = (props) => (
  <tr>
    <td>{props.friend.name}</td>
    <td>{props.friend.level}</td>
    <td>{props.friend.last_contacted}</td>
    <td><a href="#" onClick={() => { props.contact(props.friend) }}>Contact</a></td>
  </tr >
)

export default class FriendsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: null
    }
  }

  // fill state with user's friends
  componentDidMount() {
    axios.get('http://localhost:5000/friends/')
      .then(response => {
        var filtered_friends = response.data.filter((friend) => { return friend.user_email === this.props.user.email });
        this.setState({ friends: filtered_friends });
        console.log('Component Mounted')
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // function called on button click
  contactFriend = (friend) => {

    // get date
    var today = new Date();

    // new data 
    const newFriend = {
      "user_email": friend.user_email,
      "name": friend.name,
      "level": friend.level,
      "last_contacted": today
    }

    // post new data to database
    axios.post('http://localhost:5000/friends/update/' + friend._id, newFriend)
      .then(res => console.log(res.data));

    // reload component with state
    axios.get('http://localhost:5000/friends/')
      .then(response => {
        var filtered_friends = response.data.filter((friend) => { return friend.user_email === this.props.user.email });
        this.setState({ friends: filtered_friends });
        console.log('Component Re-Mounted')
      })
      .catch((error) => {
        console.log(error);
      })

  }

  friendsList() {
    if (this.state.friends) {
      return this.state.friends.map(friend => {
        return <Friend
          friend={friend}
          user={this.props.user}
          contact={this.contactFriend}
          setFriends={this.setFriends}
          key={friend._id} />;
      })
    }
    else {
      return;
    }
  }
  render() {
    return (
      <div>
        <Container>
          <br />
          <br />
          <Row className="justify-content-center">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Last Contacted</th>
                  <th>Click to Contact</th>
                </tr>
              </thead>
              <tbody>
                {this.friendsList()}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}