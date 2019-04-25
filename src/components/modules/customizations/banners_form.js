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
class BannersForm extends Component {
    constructor(props) {
        super(props);

        let accessData = this.props.accessData;
        this.state = {
            form: {
                bannerImage: accessData.imageUrl || '',
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
        formData.set('directory', 'banners');
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

        // Validation Checks for Upload images And used to upload images
        if(Object.keys(this.props.ActivityUploadFile).length > 0 && 'status' in this.props.ActivityUploadFile) {
            if(this.props.ActivityUploadFile.status) {
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        bannerImage: this.props.ActivityUploadFile.filePath,
                        uploadError: ''
                    }
                });
            } else {
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        bannerImage: '',
                        uploadError: this.props.ActivityUploadFile.message
                    }
                });
            }
            this.props.activityUploadFile(this.props.token);
        }
        
        return (
            <Modal isOpen={this.props.formEditable} toggle={this.props.onFormEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFormEdited}>
                    <span className="display-5">Banner Form</span>
                </ModalHeader>
                <ModalBody>
                    <div className="banners-form text-medium">
                    <Col>
                        {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.props.error}
                        </UncontrolledAlert>}
                        <Form id="banners" onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="bannerImage" sm={3}>Banner Image</Label>
                                <Col sm={9}>
                                    <Input
                                        type="file"
                                        name="bannerImage"
                                        data-state="bannerImage"
                                        placeholder="Upload Image"
                                        onChange={this.handleUploadImage}
                                    />  
                                    <label for="bannerImage">Image Size should be 1350 x 650.</label><br></br>
                                    {this.state.form.uploadError && <p className="text-danger mb-1 text-small">{this.state.form.uploadError}</p>}
                                    {this.state.form.bannerImage && <img src={`${API_URL}/${this.state.form.bannerImage}`} className="img-thumbnail w-50 mt-2" />}
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

export default connect(mapStateToProps, { activityUploadFile })(BannersForm);

        