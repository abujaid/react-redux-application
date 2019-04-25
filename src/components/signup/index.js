import React, { Component } from "react";
import Cleave from "cleave.js/react";

import
{
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  UncontrolledAlert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import "./style.css";
import background from "./../../images/background.jpg";
import logo from "./../../images/logo.png";

export default class SignupContainer extends Component
{
  constructor (props)
  {
    super(props);

    this.state = {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsNConditions: false
      },
      isConditionReading: false
    };
  }

  handleChange = event =>
  {
    let attribute = event.target.getAttribute("data-state");
    let value = event.target.value;

    if (attribute === "termsNConditions") {
      if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      }
    }

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [attribute]: value
      }
    });
  };

  handleMessage = () =>
  {
    if (this.props.error !== "") {
      return (
        <Col>
          <UncontrolledAlert className="text-left" color="danger">
            <strong>Error:</strong> {this.props.error}
          </UncontrolledAlert>
        </Col>
      );
    } else if (this.props.success !== "") {
      return (
        <Col>
          <UncontrolledAlert className="text-left" color="success ">
            <strong>Success:</strong> {this.props.success}
          </UncontrolledAlert>
        </Col>
      );
    }
  };

  conditionReadingToggle = (event) =>
  {
    event.preventDefault();
    this.setState({
      ...this.state,
      isConditionReading: !this.state.isConditionReading
    });
  };

  termsNConditions = () => (
    <Modal
      isOpen={this.state.isConditionReading}
      toggle={this.conditionReadingToggle}
      className={this.props.className}
    >
      <ModalHeader toggle={this.conditionReadingToggle}>
        <span className="display-5">Terms & Conditions</span>
      </ModalHeader>
      <ModalBody>
        <p className="text-left text-medium">
          Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://ballflightuniversity.com website (the "Service") operated by Flight Scope ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
        </p>
        <strong>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</strong>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary btn-auto"
          onClick={this.conditionReadingToggle}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );

  handleSubmit = event =>
  {
    event.preventDefault();
    this.props.submit(this.state.form);
  };

  render = () => (
    <div id="signup-page" style={{ backgroundImage: `url(${background})` }}>
      <Container>
        <div className="form-heading text-center mt-5 mb-4">
          <a href="/#/">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="signup-form text-center">
          <Col>
            <h1 className="display-4">Sign Up</h1>
            <p className="text-small">Create a New Account</p>
          </Col>
          {this.handleMessage()}
          <Col>
            <Form id="signup" onSubmit={this.handleSubmit}>
              <Row>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Input
                      type="text"
                      name="first-name"
                      data-state="firstName"
                      className="form-control"
                      placeholder="First Name"
                      value={this.state.form.firstName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Input
                      type="text"
                      name="last-name"
                      data-state="lastName"
                      className="form-control"
                      placeholder="Last Name"
                      value={this.state.form.lastName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6">
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
                </Col>
                <Col xs="12" sm="6">
                  <FormGroup>
                    {/* <Input
                      type="text"
                      name="phone"
                      data-state="phone"
                      className="form-control"
                      placeholder="Phone Number ( eg. XXX-XXX-XXXX)"
                      value={this.state.form.phone}
                      onChange={this.handleChange}
                    /> */}
                    <Cleave
                      name="phone"
                      data-state="phone"
                      className="form-control"
                      placeholder="Phone Number"
                      value={this.state.form.phone}
                      options={{
                        delimiter: "-",
                        blocks: [3, 3, 4]
                      }}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      data-state="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.form.password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Input
                      type="password"
                      name="confirm-password"
                      data-state="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={this.state.form.confirmPassword}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-4 text-left">
                <Col>
                  <div className="form-check">
                    <label className="ml-2">
                      <Input
                        type="checkbox"
                        name="terms-n-conditions"
                        data-state="termsNConditions"
                        value={!this.state.form.termsNConditions}
                        checked={this.state.form.termsNConditions}
                        onChange={this.handleChange}
                      />
                      <span>
                        I Read and Accept the{" "}
                        <a onClick={this.conditionReadingToggle} className="pointer">
                          Terms & Conditions
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <Button color="info" disabled={!this.state.form.termsNConditions}>
                Sign Up
              </Button>
            </Form>
            <div className="card-footer mt-3 text-medium">
              Already have an account?&nbsp;
              <a href="/#/login">Login</a>
            </div>
          </Col>
        </div>
        {this.termsNConditions()}
      </Container>
    </div>
  );
}
