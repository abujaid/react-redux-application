import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeatherIcon from 'feather-icons-react';
import { Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

import { updateUser } from './../../actions/modules_action/users';

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        let userId = 0;
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
        }

        this.state = {
            form: {
                currentPassword: '',
                password: '',
                confirmPassword: ''
            },
            userId: userId,
            updateError: '',
            updateSuccess: ''
        }
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let value = event.target.value;
        
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [attribute]: value,
            }
        });
    }

    validatePassword = () => {
        let validate = false;
        if(this.state.form.currentPassword === '' || this.state.form.password === '' || this.state.form.confirmPassword === '') {
            validate = false;
            this.setState({
                ...this.state,
                updateError: 'All details are required.',
                updateSuccess: ''
            });
        } else {
            if(this.state.form.password === this.state.form.confirmPassword) {
                validate = true;
                this.setState({
                    ...this.state,
                    updateError: '',
                    updateSuccess: ''
                });
            } else {
                validate = false;
                this.setState({
                    ...this.state,
                    updateError: 'Password and Confirm Password should be identical.',
                    updateSuccess: ''
                });
            }
        }
        return validate;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.userId !== 0 && this.validatePassword()) {
            let request = {
                oldPassword: this.state.form.currentPassword,
                password: this.state.form.password
            }
            this.props.updateUser(this.props.token, this.state.userId, request);
        }
    }

    render = () => {
        if(Object.keys(this.props.UpdateUser).length > 0 && 'status' in this.props.UpdateUser) {
            if(this.props.UpdateUser.status) {
                if(this.state.updateSuccess === '') {
                    this.setState({
                        ...this.state,
                        updateSuccess: 'Password has been updated successfully.',
                    });
                }
            } else {
                this.setState({
                    ...this.state,
                    updateError: this.props.UpdateUser.message || 'Something went wrong.'
                });
            }
            this.props.updateUser(this.props.token, this.state.userIds);
        }

        return (
            <section>
                <h1 className="display-5">Change Password</h1>
                <div className="module-content">
                    <Col sm={8} className="mt-4">
                        {this.state.updateError !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.state.updateError}
                        </UncontrolledAlert>}
                        {this.state.updateSuccess !== '' && <UncontrolledAlert className="text-left" color="success">
                            <strong>Success:</strong> {this.state.updateSuccess}
                        </UncontrolledAlert>}
                        <Form id="change-password" onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="password" sm={3}>Current Password</Label>
                                <Col sm={9}>
                                    <Input
                                        type="password"
                                        name="current-password"
                                        data-state="currentPassword"
                                        className="form-control"
                                        placeholder="Current Password"
                                        value={this.state.form.currentPassword}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={3}>Password</Label>
                                <Col sm={9}>
                                    <Input
                                        type="password"
                                        name="password"
                                        data-state="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.form.password}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={3}>Confirm Password</Label>
                                <Col sm={9}>
                                    <Input
                                        type="password"
                                        name="confirm-password"
                                        data-state="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={this.state.form.confirmPassword}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <div className="d-flex align-items-center">
                                <Button color="info" className="ml-auto btn-auto">
                                    <FeatherIcon icon="save" size="20" className="mb-1" /> Save
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        UpdateUser: state.UpdateUser
    }
}

export default connect(mapStateToProps, { updateUser })(ChangePassword);