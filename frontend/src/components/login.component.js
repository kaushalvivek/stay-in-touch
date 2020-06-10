import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row } from "react-bootstrap";

export default class Login extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   user: null
    // }
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
                  LogIn to StayInTouch
            </Card.Title>
                <Card.Text>
                  Login details to be put here
            </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    )
  };
}
