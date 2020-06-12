import React, { Component } from 'react';
import axios from 'axios';

export default class AddFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      level: 1,
      last_contacted: '',
    }
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLevel = (e) => {
    this.setState({
      level: e.target.value
    });
  }

  onChangeLastContacted = (e) => {
    this.setState({
      last_contacted: e.target.value
    });
  }


  onSubmit = (e) => {
    e.preventDefault();

    const friend = {
      user_email: this.props.user.email,
      name: this.state.name,
      level: this.state.level,
      last_contacted: this.state.last_contacted
    };

    console.log(friend);
    axios.post('/api/friends/add', friend)
      .then(res => {
        console.log(res.data)
        console.log('added!')
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div>
        <h3>Add New Friend</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Level: </label>
            <select
              required
              className="form-control"
              value={this.state.level}
              onChange={this.onChangeLevel}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-group">
            <label>Last Contacted </label>
            <div>
              <input
                type="date"
                required
                className="form-control"
                selected={this.state.last_contacted}
                onChange={this.onChangeLastContacted}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Add New Friend" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}