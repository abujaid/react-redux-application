/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

/*  import a javascript file */
import { API_URL } from '../../../constants';

/*  import consumable API functions */
import { activityUploadFile } from '../../../actions/modules_action/activities';

/* Define a class Based Component */
class NewsEventsForm extends Component {
    constructor(props) {
        super(props);

        let accessData = this.props.accessData;
        this.state = {
            form: {
                image: accessData.imageUrl || '',
                title: accessData.title || '',
                url: accessData.url || '',
                status: accessData.isActive == false ? 'false' : 'true',
                uploadError: ''
            }
        }
    }
    
    // handleChange method is used to handle the user input's when event occured.
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
    
    // handleUploadImage method is used to handle the image uploadation.
    handleUploadImage = (event) => {
        let formData = new FormData(); 
        formData.set('directory', 'newsevents');
        formData.append('file', event.target.files[0]);

        this.props.activityUploadFile(this.props.token, formData);
    }
    
    // handleSubmit method is used to handle the form submitation.
    handleSubmit = (event) => { 
        this.setState({
            ...this.state
        });
        this.props.submit(this.state.form);
    }
    
    // START: Component rendering
    render = () => {

        // Validation Checks for Upload images And upload image files
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
                    <span className="display-5">News Events Form</span>
                </ModalHeader>
                <ModalBody>
                    <div className="newsevents-form text-medium">
                    <Col>
                        {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.props.error}
                        </UncontrolledAlert>}
                        <Form id="newsevents" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                                <Label for="image" sm={3}>Image</Label>
                                <Col sm={9}>
                                    <Input
                                        type="file"
                                        name="image"
                                        data-state="image"
                                        placeholder="Upload Image"
                                        onChange={this.handleUploadImage}
                                    />
                                    <label for="logo_image">Image Size should be 44 x 44.</label><br></br>
                                    {this.state.form.uploadError && <p className="text-danger mb-1 text-small">{this.state.form.uploadError}</p>}
                                    {this.state.form.image && <img src={`${API_URL}/${this.state.form.image}`} className="img-thumbnail w-50 mt-2" />}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="title" sm={3}>Title</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="title"
                                        data-state="title"
                                        className="form-control"
                                        placeholder="Enter Title"
                                        value={this.state.form.title}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="url" sm={3}>URL</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="url"
                                        data-state="url"
                                        className="form-control"
                                        placeholder="Enter URL"
                                        value={this.state.form.url}
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

    // END: Component rendering
}

const mapStateToProps = state => {
    return {
        ActivityUploadFile: state.ActivityUploadFile
    }
}

export default connect(mapStateToProps, { activityUploadFile })(NewsEventsForm);

        