import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  UncontrolledAlert
} from "reactstrap";

import "./style.css";
import background from "./../../images/background.jpg";
import logo from "./../../images/logo.png";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: "",
        password: ""
      }
    };
  }

  handleChange = event => {
    let attribute = event.target.getAttribute("data-state");

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [attribute]: event.target.value
      }
    });
  };

  handleMessage = () => {
    if (this.props.error !== "") {
      return (
        <Col>
          <UncontrolledAlert className="text-left" color="danger">
            <strong>Error:</strong> {this.props.error}
          </UncontrolledAlert>
        </Col>
      );
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submit(this.state.form);
  };

  googleResponse = response => {
    console.log(response);
    if (response.tokenId)
      this.props.submitGoogle({
        tokenId: response.tokenId
      });
  };

  facebookResponse = response => {
    console.log(response);
    if (response.accessToken)
      this.props.submitFacebook({
        accessToken: response.accessToken
      });
  };

  render = () => {
    return (
      <div id="login-page" style={{ backgroundImage: `url(${background})` }}>
        <Container>
          <div className="form-heading text-center mt-5 mb-4">
            <a href="/#/">
              <img src={logo} alt="Logo" />
            </a>
          </div>
          <div className="login-form  text-center">
            <Col>
              <h1 className="display-4">Login</h1>
              <p className="text-small">
                Please enter your email & password to Access Your Account
              </p>
            </Col>
            {this.handleMessage()}
            <Col>
              <Form id="login" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    data-state="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={this.state.form.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="email"
                    data-state="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.form.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button color="info">Login</Button>
              </Form>
              <div className="form-option">OR</div>
              <FacebookLogin
                appId="347706372725856"
                callback={this.facebookResponse}
                isMobile={true}
                disableMobileRedirect={true}
                cssClass="btn btn-social btn-facebook"
              />
              <GoogleLogin
                clientId="250400812392-n7gvt0pa2utiqg12ikjvgnrukp3ktgc1.apps.googleusercontent.com"
                render={renderProps => (
                  <Button
                    className="btn btn-social btn-google"
                    onClick={renderProps.onClick}
                  >
                    Login with Google
                  </Button>
                )}
                buttonText="Login with Google"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
              />
              <div className="card-footer mt-3 text-medium">
                <Row>
                  <Col>
                    <a className="forgot-link" href="/#/forgot-password">
                      Forgot Password?
                    </a>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Don't have an account? <a href="/#/signup">Sign Up</a>
                  </Col>
                </Row>
              </div>
            </Col>
          </div>
        </Container>
      </div>
    );
  };
}
