/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cleave from "cleave.js/react";

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

/*  import a javascript file */
import { API_URL } from './../../../constants';

/*  import consumable API functions */
import { activityUploadFile } from '../../../actions/modules_action/activities';
import { getGeneral, updateGeneral } from './../../../actions/modules_action/customizations';

/* Define a class Based Component */
class GeneralForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            form: {
                site_name: '',
                site_title: '',
                description: '',
                logo_image: '',
                favicon_image: '',
                keywords: '',
                meta_description: '',
                email: '',
                phone_number: '',
                alternate_phone_number: '',
                address: '',
            },
            uploadProperty: '',
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: 1,
            uploadError: ''
        }
        this.props.getGeneral(this.props.token, this.state.accessId);
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
    handleUploadFile = (event) => {
        if(event.target.files.length > 0) {
            let formData = new FormData();
            formData.set('directory', 'site');
            formData.append('file', event.target.files[0]);
            this.state.uploadProperty = event.target.getAttribute('data-state');
            let fileName = event.target.files[0].name;
            this.props.activityUploadFile(this.props.token, formData);
        }
    }

    // handleSubmit method is used to handle the form submitation.
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateGeneral(this.props.token, this.state.accessId, this.state.form);
    }
    
    // START: Component rendering
    render = () => {
        let error = '';
        let accessData = {};

        // Validation Checks for Upload images And upload image files
        if(Object.keys(this.props.ActivityUploadFile).length > 0 && 'status' in this.props.ActivityUploadFile) {
            let formProperty = {};
            if(this.props.ActivityUploadFile.status) {
                if(this.state.uploadProperty === 'logo_image') {
                    formProperty = {
                        logo_image: this.props.ActivityUploadFile.filePath,
                    };
                } else if(this.state.uploadProperty === 'favicon_image') {
                    formProperty = {
                        favicon_image: this.props.ActivityUploadFile.filePath,
                    };
                }
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        ...formProperty
                    },
                    uploadError: '',
                    uploadProperty: ''
                });
            } else {
                if(this.state.uploadProperty === 'logo_image') {
                    formProperty = {
                        logo_image: '',
                    };
                } else if(this.state.uploadProperty === 'favicon_image') {
                    formProperty = {
                        favicon_image: ''
                    };
                }
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        ...formProperty
                    },
                    uploadError: this.props.ActivityUploadFile.message,
                    uploadProperty: ''
                });
            }
            this.props.activityUploadFile(this.props.token);
        }

        // Used to display records
        if(Object.keys(this.props.GetGeneral).length > 0 && 'status' in this.props.GetGeneral) {
            if(this.props.GetGeneral.status && Object.keys(this.props.GetGeneral.data).length > 0) {
                this.setState({
                    ...this.state,
                    form:{
                        ...this.state.form,
                        site_name: this.props.GetGeneral.data.site_name,
                        site_title: this.props.GetGeneral.data.site_title,
                        description: this.props.GetGeneral.data.description,
                        logo_image: this.props.GetGeneral.data.logo_image,
                        favicon_image: this.props.GetGeneral.data.favicon_image,
                        keywords: this.props.GetGeneral.data.keywords,
                        meta_description: this.props.GetGeneral.data.meta_description,
                        email: this.props.GetGeneral.data.email,
                        phone_number: this.props.GetGeneral.data.phone_number,
                        alternate_phone_number: this.props.GetGeneral.data.alternate_phone_number,
                        address: this.props.GetGeneral.data.address
                    }
                    
                });
                this.props.getGeneral(this.props.token);
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: 'Something Wrong.'
                });
            }
        }
        
        // Used to update record.
        if(Object.keys(this.props.UpdateGeneral).length > 0 && 'status' in this.props.UpdateGeneral) {
            if(this.props.UpdateGeneral.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'General Site Settings Updated Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getGeneral(this.props.token, this.state.accessId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateGeneral.message || '',
                });
            }
            this.props.updateGeneral(this.props.token, this.state.accessId);
        }

        return (
            <div className="general-form text-medium">
                <Col>
                {this.state.formSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                    <strong>Success:</strong> {this.state.formSuccessMessage}
                </UncontrolledAlert>}
                {error !== '' && <UncontrolledAlert className="text-left" color="danger">
                    <strong>Error:</strong> {error}
                </UncontrolledAlert>}
                {/* {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.props.error}
                        </UncontrolledAlert>} */}
                <Form id="general" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={6}>
                            <FormGroup row>
                                <Label for="site_name" sm={3}>Site Name</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="site_name"
                                        data-state="site_name"
                                        className="form-control"
                                        placeholder="Site Name"
                                        value={this.state.form.site_name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="site_title" sm={3}>Site Title</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="site_title"
                                        data-state="site_title"
                                        className="form-control"
                                        placeholder="Site Title"
                                        value={this.state.form.site_title}
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
                                <Label for="logo_image" sm={3}>Logo</Label>
                                <Col sm={9}>
                                    <Input
                                        type="file"
                                        name="logo_image"
                                        data-state="logo_image"
                                        placeholder="Upload Logo"
                                        onChange={this.handleUploadFile}
                                    />
                                    <label for="logo_image">Image Size should be 186 x 54.</label><br></br>
                                    {this.state.uploadError && this.state.uploadProperty == 'logo_image' && <p className="text-danger mb-1 text-small">{this.state.uploadError}</p>}
                                    {this.state.form.logo_image && <img src={`${API_URL}/${this.state.form.logo_image}`} className="img-thumbnail w-50 mt-2" />}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="favicon_image" sm={3}>Favicon</Label>
                                <Col sm={9}>
                                    <Input
                                        type="file"
                                        name="favicon_image"
                                        data-state="favicon_image"
                                        placeholder="Upload Favicon"
                                        onChange={this.handleUploadFile}
                                    />
                                    <label for="favicon_image">Image Size should be 20 x 10.</label><br></br>
                                    {this.state.uploadError && this.state.uploadProperty == 'favicon_image' && <p className="text-danger mb-1 text-small">{this.state.uploadError}</p>}
                                    {this.state.form.favicon_image && <img src={`${API_URL}/${this.state.form.favicon_image}`} className="img-thumbnail w-50 mt-2" />}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="keywords" sm={3}>Keyword</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="keywords"
                                        data-state="keywords"
                                        className="form-control"
                                        placeholder="Enter Site Keywords"
                                        value={this.state.form.keywords}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="meta_description" sm={3}>Meta Description</Label>
                                <Col sm={9}>
                                    <Input
                                        type="textarea"
                                        name="meta_description"
                                        data-state="meta_description"
                                        className="form-control"
                                        placeholder="Enter Meta Description"
                                        value={this.state.form.meta_description}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup row>
                                <Label for="email" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input
                                        type="email"
                                        name="email"
                                        data-state="email"
                                        className="form-control"
                                        placeholder="abc@example.com"
                                        value={this.state.form.email}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone_number" sm={3}>Phone Number</Label>
                                <Col sm={9}>
                                    <Cleave
                                        name="phone_number"
                                        data-state="phone_number"
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={this.state.form.phone_number}
                                        options={{
                                            delimiter: "-",
                                            blocks: [3, 3, 4]
                                        }}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="alternate_phone_number" sm={3}>Alternate Number</Label>
                                <Col sm={9}>
                                    <Cleave
                                        name="alternate_phone_number"
                                        data-state="alternate_phone_number"
                                        className="form-control"
                                        placeholder="Alternate Phone Number"
                                        value={this.state.form.alternate_phone_number}
                                        options={{
                                            delimiter: "-",
                                            blocks: [3, 3, 4]
                                        }}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="address" sm={3}>Address</Label>
                                <Col sm={9}>
                                    <Input
                                        type="textarea"
                                        name="address"
                                        data-state="address"
                                        className="form-control"
                                        placeholder="Address"
                                        value={this.state.form.address}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Col sm={12}>
                                <Button color="info btn-auto" className="ml-2 float-right" onClick={this.handleSubmit}>
                                    <FeatherIcon icon="save" size="20" className="mb-1" /> Save
                                </Button>
                            </Col>
                        </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Col>
            </div>
        );
    }
    // END: Component rendering
}

const mapStateToProps = state => {
    return {
        GetGeneral: state.GetGeneral,   
        UpdateGeneral: state.UpdateGeneral,
        ActivityUploadFile: state.ActivityUploadFile
    }
}

export default connect(mapStateToProps, { getGeneral, updateGeneral, activityUploadFile })(GeneralForm);    