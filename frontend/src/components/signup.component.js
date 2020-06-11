import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Form, Button } from "react-bootstrap";
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      retype: "",
      users: []
    }
  }

  handleSubmit = () => {

    var user = null;

    if (this.state.password !== this.state.retype) {
      console.log('passwords do not match');
      return;
    }

    user = this.state.users.find(user => user.email === this.state.email);
    if (user !== null) {
      console.log('User already exists');
    }

    else {
      const newUser = {
        email: this.state.email,
        password: this.state.password
      };

      axios.post('http://localhost:5000/users/add', newUser)
        .then(res => console.log(res.data));
      console.log("New user added!");

    }
  }



  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleRetypeChange = (e) => {
    this.setState({ retype: e.target.value });
  }

  handleSignIn = () => {
    this.props.changePage('signin');
  }


  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Container>
          <Row className="justify-content-center">
            <Card style={{
              width: '18rem',
            }}>
              <Card.Body>
                <Card.Title>
                  SignUp to StayInTouch
                </Card.Title>
                <Form>
                  <Form.Group controlId="Email">
                    <Form.Control
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      type="text"
                      placeholder="Enter email"
                      style={{ width: "100%" }} />
                  </Form.Group>

                  <Form.Group controlId="Password">
                    <Form.Control
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      type="password"
                      placeholder="Enter password"
                      style={{ width: "100%" }} />
                  </Form.Group>

                  <Form.Group controlId="Retype">
                    <Form.Control
                      value={this.state.retype}
                      onChange={this.handleRetypeChange}
                      type="password"
                      placeholder="Retype password"
                      style={{ width: "100%" }} />
                  </Form.Group>

                  <Form.Text className="text-muted">
                    We'll never share your details with anyone else.
                  </Form.Text>

                  <Button variant="light" onClick={this.handleSubmit} style={{ width: "100%" }}>
                    Register
                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </Row>
          <br />
          <Row className="justify-content-center">
            Already a member?&nbsp; <a href="#" onClick={this.handleSignIn}><strong> Sign in </strong> here!</a>
          </Row>
        </Container>
      </div >
    )
  };
}
