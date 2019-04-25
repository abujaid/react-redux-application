import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeatherIcon from 'feather-icons-react';
import { Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert, CustomInput } from 'reactstrap';

import { API_URL } from '../../constants';
import { updateUser } from '../../actions/modules_action/users';
import { activityUploadFile } from '../../actions/modules_action/activities';

class UserAccount extends Component {
    constructor(props) {
        super(props);

        let user_data = {};
        let userId = 0;
        if(localStorage.getItem('fs_user_data') !== null) {
            user_data = JSON.parse(localStorage.getItem("fs_user_data"));
            userId = user_data.data.id;
        }
        this.state = {
            form: {
                avatar: user_data.data.picture || '',
                firstName: user_data.data.firstName || '',
                lastName: user_data.data.lastName || '',
                email: user_data.data.email || '',
                phoneNumber: user_data.data.phone || ''
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
                [attribute]: value
            }
        })
    }

    validateInputFields = ()=>{
        let validate = true;
        if(this.state.form.firstName == '') {
            validate = false;
            this.setState({
                ...this.state,
                updateError: 'First name should not be empty.',
                updateSuccess: ''
            });
        } else if(this.state.form.lastName == ''){
            validate = false;
            this.setState({
                ...this.state,
                updateError: 'Last name should not be empty.',
                updateSuccess: ''
            });
        }
        return validate;
    }

    handleUploadImage = (event) => {
        let formData = new FormData(); 
        formData.set('directory', 'avatar');
        formData.append('file', event.target.files[0]);

        this.props.activityUploadFile(this.props.token, formData);
    }

    handleSubmit = (event) => {
        if (this.state.userId !== 0 && this.validateInputFields()) {
            let request = {
                picture: this.state.form.avatar,
                firstName: this.state.form.firstName,
                lastName: this.state.form.lastName
            }
            // console.log("this.state.form.avatar   =>", this.state.form.avatar);
            this.props.updateUser(this.props.token, this.state.userId, request);
        }
        event.preventDefault();
    }

    clearUserContentImage = (event) => {
        console.log(this.state.form.avatar);
        let { form } = this.state;
        if(this.state.form.avatar !== '') {
            form['avatar'] = '';
            this.setState({form});
        }
        event.preventDefault();
    }


    render = () => {
        if(Object.keys(this.props.UpdateUser).length > 0 && 'status' in this.props.UpdateUser) {
            if(this.props.UpdateUser.status) {
                if(this.state.updateSuccess === '') {
                    this.setState({
                        ...this.state,
                        updateError: '',
                        updateSuccess: 'User account has been updated successfully.',
                    });
                }
            } else {
                this.setState({
                    ...this.state,
                    updateError: this.props.UpdateUser.message || 'Something went wrong.',
                    updateSuccess: ''
                });
            }
            this.props.updateUser(this.props.token, this.state.userIds);
        }

        if(Object.keys(this.props.ActivityUploadFile).length > 0 && 'status' in this.props.ActivityUploadFile) {
            if(this.props.ActivityUploadFile.status) {
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        avatar: this.props.ActivityUploadFile.filePath || '',
                    },
                    updateError: ''
                });
            } else {
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        avatar: '',
                    },
                    updateError: this.props.ActivityUploadFile.message || ''
                });
            }
            this.props.activityUploadFile(this.props.token);
        }

        return (
            <section>
                <h1 className="display-5">My Account</h1>
                <div className="module-content">
                    <Col sm={8} className="mt-4">
                        {this.state.updateError !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.state.updateError}
                        </UncontrolledAlert>}
                        {this.state.updateSuccess !== '' && <UncontrolledAlert className="text-left" color="success">
                            <strong>Success:</strong> {this.state.updateSuccess}
                        </UncontrolledAlert>}
                        <Form id="user-account" onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="fistName" sm={3}>Profile Picture</Label>
                                <Col sm={9}>
                                    <CustomInput 
                                        type="file" 
                                        name="avatar"
                                        id="avatar"
                                        data-state="avatar"
                                        label="Pick your avatar"
                                        onChange={this.handleUploadImage}
                                    />
                                    {this.state.form.avatar && <img src={`${API_URL}/${this.state.form.avatar}`} className="img-thumbnail w-50 mt-2" />}
                                    
                                    {
                                        this.state.form.avatar ? 
                                        (
                                            <Button
                                                color="danger"
                                                className="position-absolute btn-auto pt-1 pb-1 px-2 index-1 right-thumb mt-2 hide"
                                                onClick={this.clearUserContentImage}
                                            >
                                                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
                                            </Button>
                                            
                                        )
                                        : ''
                                    }
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="fistName" sm={3}>First Name</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="first-name"
                                        data-state="firstName"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={this.state.form.firstName}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="last-name" sm={3}>Last Name</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="last-name"
                                        data-state="lastName"
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={this.state.form.lastName}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input
                                        type="email"
                                        name="email"
                                        data-state="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.form.email}
                                        onChange={this.handleChange}
                                        disabled
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone-number" sm={3}>Phone Number</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="phone-number"
                                        data-state="phoneNumber"
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={this.state.form.phoneNumber}
                                        onChange={this.handleChange}
                                        disabled
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
        UpdateUser: state.UpdateUser,
        ActivityUploadFile: state.ActivityUploadFile
    }
}

export default connect(mapStateToProps, { updateUser, activityUploadFile })(UserAccount);