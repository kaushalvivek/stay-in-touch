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

      users: [],

      alertMessage: ''
    }
  }

  handleSubmit = () => {
    var user = this.state.users.find(user => user.email === this.state.email);
    if (user !== undefined) {
      if (user.password === this.state.password) {
        this.props.signIn(user);
      }
      else {
        this.setState({
          alertMessage: 'Incorrect password',
        });
        console.log("incorrect password");
      }
    }
    else {
      this.setState({
        alertMessage: 'User not found',
      });
      console.log('No such user')
    }
  }



  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data });
        console.log("Users Loaded");
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

  handleSignUp = () => {
    this.props.changePage('signup');
  }


  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <Row className="justify-content-center">
          <p style={{ color: 'green' }}>{this.props.afterSignUpMessage}</p>
        </Row>
        <br />
        <Container>
          <Row className="justify-content-center">
            <Card style={{
              width: '18rem',
            }}>
              <Card.Body>
                <Card.Title>
                  LogIn to StayInTouch
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

                  <Form.Text className="text-muted">
                    We'll never share your details with anyone else.
                  </Form.Text>

                  <Button variant="light" onClick={this.handleSubmit} style={{ width: "100%" }}>
                    Submit
                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </Row>
          <br />
          <div>
            <Row className="justify-content-center">
              <p style={{ color: 'red' }}>{this.state.alertMessage}</p>
            </Row>
          </div>
          <Row className="justify-content-center">
            Not registered? &nbsp;<a href="#" onClick={this.handleSignUp}><strong> Sign up </strong> here!</a>
          </Row>
        </Container>
      </div >
    )
  };
}
