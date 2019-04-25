import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

class LocationsForm extends Component {
    constructor(props) {
        super(props);

        let accessData = this.props.accessData;
        this.state = {
            form: {
                location: accessData.location ? accessData.location : '',
                latitude: accessData.latitude || '',
                longitude: accessData.longitude || '',
                status: accessData.isActive == false ? 'false' : 'true',
            }
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
        
        return (
            <Modal isOpen={this.props.formEditable} toggle={this.props.onFormEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFormEdited}>
                    <span className="display-5">Location Form</span>
                </ModalHeader>
                <ModalBody>
                    <div className="locations-form text-medium">
                    <Col>
                        {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.props.error}
                        </UncontrolledAlert>}
                        <Form id="locations" onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="location" sm={3}>Location</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="location"
                                        data-state="location"
                                        className="form-control"
                                        placeholder="Location Name"
                                        value={this.state.form.location}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="latitude" sm={3}>Latitude</Label>
                                <Col sm={9}>
                                    <Input
                                        type="number"
                                        name="latitude"
                                        data-state="latitude"
                                        className="form-control"
                                        placeholder="Latitude"
                                        value={this.state.form.latitude}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="longitude" sm={3}>Longitude</Label>
                                <Col sm={9}>
                                    <Input
                                        type="number"
                                        name="longitude"
                                        data-state="longitude"
                                        className="form-control"
                                        placeholder="Longitude"
                                        value={this.state.form.longitude}
                                        onChange={this.handleChange}
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
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>
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

export default connect()(LocationsForm);
        