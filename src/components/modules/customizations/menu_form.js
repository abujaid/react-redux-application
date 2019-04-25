import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

import { API_URL } from '../../../constants';
import { activityUploadFile } from '../../../actions/modules_action/activities';

class MenuForm extends Component {
    constructor(props) {
        super(props);

        let accessData = this.props.accessData;

        this.state = {
            form: {
                name: '',
                url: '',
                parentId: null,
                status: true
            },
            menuSuccessMessage: '',
            menuErrorMessage: ''
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
        this.setState({
            ...this.state
        });
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
                    <span className="display-5">Add/Edit Menu</span>
                </ModalHeader>
                <ModalBody>
                    <div className="gallerys-form text-medium">
                    <Col>
                        {this.state.menuErrorMessage !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.state.menuErrorMessage}
                        </UncontrolledAlert>}
                        <Form id="gallerys" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                                <Label for="status" sm={3}>Parent</Label>
                                <Col sm={9}>
                                    <Input
                                        type="select"
                                        name="parent"
                                        data-state="status"
                                        className="form-control"
                                        placeholder="Status"
                                        value={'a'}
                                        onChange={this.handleChange}
                                    >
                                        <option value={null}>Main Menu</option>
                                        <option value={false}>Inactive</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        <FormGroup row>
                                <Label for="status" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="name"
                                        data-state="name"
                                        className="form-control"
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="status" sm={3}>URL</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="url"
                                        data-state="url"
                                        className="form-control"
                                        placeholder="URL"
                                        value={this.state.url}
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
                                        value={this.state.status}
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

const mapStateToProps = state => {
    return {
        ActivityUploadFile: state.ActivityUploadFile
    }
}

export default connect(mapStateToProps, { activityUploadFile })(MenuForm);

        