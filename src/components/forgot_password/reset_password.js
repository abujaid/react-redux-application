import React, { Component } from 'react';

import { Container, Form, FormGroup, Input, Button, Col, UncontrolledAlert } from 'reactstrap';

import './style.css';
import background from './../../images/background.jpg';
import logo from './../../images/logo.png';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                password: '',
                confirmPassword: ''
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
        <div id="reset-password-page" style={{ backgroundImage: `url(${background})` }}>
            <Container>
                <div className="form-heading text-center mt-5 mb-4">
                    <a href="/#/"><img src={ logo } alt="Logo" /></a>
                </div>
                <div className="reset-password-form  text-center">
                    <Col>
                        <h1 className="display-4">Choose New Password</h1>
                        <p className="callout text-medium text-left">
                            Please choose your new password.
                        </p>
                    </Col>
                    {this.handleMessage()}
                    <Col>
                        <Form id="reset-password" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    type="password"
                                    data-state="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={this.state.form.password}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    data-state="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={this.state.form.confirmPassword}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button color="info">Reset Password</Button>
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