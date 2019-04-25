import React, { Component } from 'react';

import { Container, Form, FormGroup, Input, Button, Col, UncontrolledAlert } from 'reactstrap';

import './style.css';
import background from './../../images/background.jpg';
import logo from './../../images/logo.png';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: ''
            }
        }
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');

        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [attribute]: event.target.value
            }
        });
    }

    handleMessage = () => {
        if(this.props.error !== '') {
            return (
                <Col>
                    <UncontrolledAlert className="text-left" color="danger">
                        <strong>Error:</strong> {this.props.error}
                    </UncontrolledAlert>
                </Col>
            );
        } else if(this.props.success !== '') {
            return (
                <Col>
                    <UncontrolledAlert className="text-left" color="success ">
                        <strong>Success:</strong> {this.props.success}
                    </UncontrolledAlert>
                </Col>
            );
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submit(this.state.form);
    }

    render = () => (
        <div id="forgot-password-page" style={{ backgroundImage: `url(${background})` }}>
            <Container>
                <div className="form-heading text-center mt-5 mb-4">
                    <a href="/#/"><img src={ logo } alt="Logo" /></a>
                </div>
                <div className="forgot-password-form  text-center">
                    <Col>
                        <h1 className="display-4">Forgot Your Password?</h1>
                        <p className="callout text-large text-left">
                            Please enter your email address. You will receive a recovery link to create a new password via email.
                        </p>
                    </Col>
                    {this.handleMessage()}
                    <Col>
                        <Form id="forgot-password" onSubmit={this.handleSubmit}>
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
                            <Button color="info">Send Me Recovery Link</Button>
                        </Form>
                        <div className="card-footer mt-3 text-medium">
                            Back to <a href="/#/login">Login</a>
                        </div>
                    </Col>
                </div>
            </Container>
        </div>
    );
}