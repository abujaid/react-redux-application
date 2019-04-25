import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

import { API_URL } from './../../constants';
import { activityUploadFile } from './../../actions/modules_action/activities';

class ClassesForm extends Component {
    constructor(props) {
        super(props);

        let accessData = this.props.accessData;
        console.log("accessData ==>",accessData);
        
        this.state = {
            form: {
                className: accessData.name || '',
                description: accessData.description || '',
                image: accessData.image || '',
                startDateTime: accessData.startDateTime || '',
                endDateTime: accessData.endDateTime || '',
                countryClub: accessData.countryClub || '',
                location: accessData.LocationId || '',
                subscriptions: accessData.subscriptionsId || '',
                seats: accessData.seats || '',
                status: accessData.isActive == false ? 'false' : 'true',
                event: accessData.marketing ? true : false,
                uploadError: ''
            }
        }
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let value = event.target.value;

        if(attribute === 'event') {
            if(value === 'true') {
                value = true;
            } else if(value === 'false') {
                value = false;
            }
        }
        
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [attribute]: value,
            }
        });
    }

    handleUploadImage = (event) => {
        let formData = new FormData(); 
        formData.set('directory', 'classes');
        formData.append('file', event.target.files[0]);

        this.props.activityUploadFile(this.props.token, formData);
    }

    renderLocations = () => {
        if(this.props.locations.length > 0) {
            return this.props.locations.map(item => {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                );
            });
        }
    }

    renderSubscriptions = () => {
        if(this.props.subscriptions.length > 0) {
            return this.props.subscriptions.map(item => {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                );
            });
        }
    }

    handleSubmit = (event) => {
        this.props.submit(this.state.form);
    }

    render = () => {
        if(Object.keys(this.props.ActivityUploadFile).length > 0 && 'status' in this.props.ActivityUploadFile) {
            if(this.props.ActivityUploadFile.status) {
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        image: this.props.ActivityUploadFile.filePath,
                        uploadError: ''
                    }
                });
            } else {
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        image: '',
                        uploadError: this.props.ActivityUploadFile.message
                    }
                });
            }

            this.props.activityUploadFile(this.props.token);
        }

        return (
            <Modal isOpen={this.props.formEditable} toggle={this.props.onFormEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFormEdited}>
                    <span className="display-5">Training Form</span>
                </ModalHeader>
                <ModalBody>
                    <div className="courses-form text-medium">
                    <Col>
                        {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.props.error}
                        </UncontrolledAlert>}
                        <Form id="classes" onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="activity-name" sm={3}>Class Name</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="class-name"
                                        data-state="className"
                                        className="form-control"
                                        placeholder="Class Name"
                                        value={this.state.form.className}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={3}>Description</Label>
                                <Col sm={9}>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        data-state="description"
                                        className="form-control"
                                        placeholder="Description"
                                        value={this.state.form.description}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={3}>Image</Label>
                                <Col sm={9}>
                                    <Input
                                        type="file"
                                        name="upload-image"
                                        data-state="uploadImage"
                                        placeholder="Upload Image"
                                        onChange={this.handleUploadImage}
                                    />
                                    {this.state.form.uploadError && <p className="text-danger mb-1 text-small">{this.state.form.uploadError}</p>}
                                    {this.state.form.image && <img src={`${API_URL}/${this.state.form.image}`} className="img-thumbnail w-50 mt-2" />}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="activity-type" sm={3}>Start Date & Time</Label>
                                <Col sm={9}>
                                    <Input
                                        type="date"
                                        name="start-datetime"
                                        data-state="startDateTime"
                                        className="form-control"
                                        placeholder="Start Date & Time"
                                        value={this.state.form.startDateTime}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="activity-type" sm={3}>End Date & Time</Label>
                                <Col sm={9}>
                                    <Input
                                        type="date"
                                        name="end-datetime"
                                        data-state="endDateTime"
                                        className="form-control"
                                        placeholder="End Date & Time"
                                        value={this.state.form.endDateTime}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="activity-name" sm={3}>Country Club</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="country-club"
                                        data-state="countryClub"
                                        className="form-control"
                                        placeholder="Country Club"
                                        value={this.state.form.countryClub}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="location" sm={3}>Location</Label>
                                <Col sm={9}>
                                    <Input
                                        type="select"
                                        name="location"
                                        data-state="location"
                                        className="form-control"
                                        placeholder="Location"
                                        value={this.state.form.location}
                                        onChange={this.handleChange}
                                    >
                                        <option value=''>Select Location</option>
                                        {this.renderLocations()}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="activity-type" sm={3}>Course Level</Label>
                                <Col sm={9}>
                                    <Input
                                        type="select"
                                        name="subscriptions"
                                        data-state="subscriptions"
                                        className="form-control"
                                        placeholder="Course Level"
                                        value={this.state.form.subscriptions}
                                        onChange={this.handleChange}
                                    >
                                        <option value=''>Select Subscriptions</option>
                                        {this.renderSubscriptions()}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="activity-name" sm={3}># of Seats</Label>
                                <Col sm={9}>
                                    <Input
                                        type="number"
                                        name="seats"
                                        data-state="seats"
                                        className="form-control"
                                        placeholder="Number of Seats"
                                        value={this.state.form.seats}
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
                            <FormGroup row>
                                <Col sm={12}>
                                    <div className="form-check">
                                        <label className="ml-2">
                                            <Input
                                                type="checkbox"
                                                name="event"
                                                data-state="event"
                                                value={!this.state.form.event}
                                                checked={this.state.form.event}
                                                onChange={this.handleChange}
                                            />
                                            <span>
                                            Is This Training will be an event ?
                                            </span>
                                        </label>
                                    </div>
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

const mapStateToProps = state => {
    return {
        ActivityUploadFile: state.ActivityUploadFile
    }
}

export default connect(mapStateToProps, { activityUploadFile })(ClassesForm);