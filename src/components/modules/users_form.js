/*  import react packages */
import React, { Component } from 'react';
import Cleave from "cleave.js/react";

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, CustomInput, UncontrolledAlert } from 'reactstrap';

/*  define class based component */
class UsersForm extends Component {
    constructor(props) {
        super(props);
        
        let accessData = this.props.accessData;
        this.state = {
            form: {
                firstName: accessData.firstName || '',
                lastName: accessData.lastName || '',
                email: accessData.email || '',
                phone: accessData.phone || '',
                password: '',
                confirmPassword: '',
                status: accessData.isActive == false ? 'false' : 'true'
            },
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

    handleSubmit = (event) => {
        this.props.submit(this.state.form);
    }

    render = () => {
        let inputDisabled = (this.props.accessData.id > 0) ? true: false;
        return (
            <Modal isOpen={this.props.formEditable} toggle={this.props.onFormEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFormEdited}>
                    <span className="display-5">User Form</span>
                </ModalHeader>
                <ModalBody>
                    <div className="users-form text-medium">
                    <Col>
                        {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.props.error}
                        </UncontrolledAlert>}
                        <Form id="users" onSubmit={this.handleSubmit}>
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
                                <Label for="lastName" sm={3}>Last Name</Label>
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
                                        disabled={inputDisabled}
                                       
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phoneNumber" sm={3}>Phone Number</Label>
                                <Col sm={9}>
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
                                        disabled={inputDisabled}
                           
                                    />
                                    </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="status" sm={3}>Status</Label>
                                <Col sm={9}>
                                    <Input
                                        type="select"
                                        name="status"
                                        data-state="status"
                                        className="form-control"
                                        placeholder="Status"
                                        value={this.state.form.status}
                                        onChange={this.handleChange}
                                    >
                                        <option value={true}>Unlocked</option>
                                        <option value={false}>Locked</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="info btn-auto" onClick={this.handleSubmit}>
                        <FeatherIcon icon="save" size="20" className="mb-1" /> Save
                    </Button>
                    <Button color="secondary btn-auto" onClick={this.props.onFormEdited}>
                        <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

/* export class component*/
export default UsersForm;

        