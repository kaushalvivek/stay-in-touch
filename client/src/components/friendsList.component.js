import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';

const Friend = (props) => (
  <tr>
    <td>{props.friend.name}</td>
    <td>{'★'.repeat(props.friend.level)}</td>
    <td>{props.friend.last_contacted.toString().slice(0, 10)}</td>
    <td><a href="#" onClick={() => { props.contact(props.friend) }}>Contacted</a></td>
    <td><a href="#" onClick={() => { props.delete(props.friend) }}>X</a></td>
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
        var sorted_friends = filtered_friends.sort((b, a) => new Date(b.last_contacted) - new Date(a.last_contacted));
        this.setState({ friends: sorted_friends });

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
      .then(res => {
        console.log(res.data);
        // reload component with state
        axios.get('http://localhost:5000/friends/')
          .then(response => {
            var filtered_friends = response.data.filter((friend) => { return friend.user_email === this.props.user.email });
            var sorted_friends = filtered_friends.sort((b, a) => new Date(b.last_contacted) - new Date(a.last_contacted));
            this.setState({ friends: sorted_friends });
            console.log('Component Re-Mounted')
          })
          .catch((error) => {
            console.log(error);
          })

      });
  }

  // remove friend
  deleteFriend = (friend) => {
    axios.delete('http://localhost:5000/friends/' + friend._id)
      .then(res => console.log(res.data));
    this.setState({
      friends: this.state.friends.filter(el => el._id !== friend._id)
    })
    console.log("Friend deleted!")
  }

  friendsList() {
    if (this.state.friends) {
      return this.state.friends.map(friend => {
        return <Friend
          friend={friend}
          user={this.props.user}
          contact={this.contactFriend}
          delete={this.deleteFriend}
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
                  <th>Click to Mark Contacted</th>
                  <th>Remove</th>
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