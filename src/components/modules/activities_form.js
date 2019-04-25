import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import FileViewer from 'react-file-viewer';
import Fullscreen from "react-full-screen";

import FeatherIcon from 'feather-icons-react';
import { Nav, NavItem, NavLink, Modal, Alert, TabContent, InputGroup, InputGroupAddon, InputGroupText, TabPane, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

import { API_URL } from './../../constants';
import { activityUploadFile } from './../../actions/modules_action/activities';

class ActivitiesForm extends Component {
    constructor(props) {
        super(props);

        let accessData = this.props.accessData;
        let fileType = '';
        if (accessData.type === 'content' && accessData.url) {
            fileType = (accessData.url.split('.'))[1];
        }

        let activityTypeValue = '';
        switch(accessData.type) {
            case 'content':
            activityTypeValue = 'content';
            break;
            case 'link':
            activityTypeValue = 'link';
            break;
            case 'assessment':
            activityTypeValue = 'assessment';
            break;
            default:
            activityTypeValue = 'content';
        }

        this.state = {
            form: {
                activityName: accessData.name ? accessData.name : '',
                description: accessData.description || '',
                activityType: activityTypeValue,
                activityContentLink: accessData.url || '',
                status: accessData.isActive == false ? 'false' : 'true',
                uploadError: '',
                questionBankCount: accessData.questionBankCount ? accessData.questionBankCount : '',
                passingPercentage: accessData.passingPercentage ? accessData.passingPercentage : '',
                negativeMarks: accessData.negativeMarks ? accessData.negativeMarks : 0,
                isQuestionBank: accessData.isQuestionBank ? accessData.isQuestionBank : false,
                isQBCountEditable: false
            },
            fileType: fileType,
            linkInvalidError: '',
            isFull: false
        }
    }

    validateYoutubeLink = (link) => {
        let isLInkValid = false;
        if(link.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/g)) {
            isLInkValid = true;
        }

        return isLInkValid;
    }

    expandDocument = () => {
        this.setState({
            ...this.state,
            isFull: !this.state.isFull
        });
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let value = event.target.value;
        let contentLink = this.state.form.activityContentLink;

        if (attribute === 'activityType') {
            contentLink = '';
        }

        let linkInvalidError = '';
        if(attribute === 'activityContentLink' && this.state.form.activityType == 'link') {
            if(!this.validateYoutubeLink(value)) {
                linkInvalidError = 'YouTube link is invalid.';
            }
        }

        if (attribute === "isQuestionBank") {
            if (value === "true") {
              value = true;
              this.state.isQBCountEditable = true;
            } else if (value === "false") {
              value = false;
              this.state.form.questionBankCount = '';
              this.state.isQBCountEditable = false;
            }
          }
        console.log("attribute==>", attribute);
        console.log("value==>", value);
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                activityContentLink: contentLink,
                [attribute]: value,
            },
            linkInvalidError: linkInvalidError
        });
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    clearActivityContentLink = () => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                activityContentLink: ''
            },
            fileType: '',
            isFull: false
        });
    }

    handleUploadFile = (event) => {
        if (event.target.files.length > 0) {
            let formData = new FormData();
            formData.set('directory', 'activities');
            formData.append('file', event.target.files[0]);
            let fileName = event.target.files[0].name;

            this.setState({
                ...this.state,
                fileType: fileName.substr(fileName.lastIndexOf('.') + 1)
            });
            this.props.activityUploadFile(this.props.token, formData);
        }
    }

    handleSubmit = (event) => {
        if(this.state.linkInvalidError === '' && this.state.form.uploadError === '') {
            this.setState({
                ...this.state,
                fileType: ''
            });
            this.props.submit(this.state.form);
        }
    }

    render = () => {
        if (Object.keys(this.props.ActivityUploadFile).length > 0 && 'status' in this.props.ActivityUploadFile) {
            if (this.props.ActivityUploadFile.status) {
                if (this.state.form.activityType === 'content' && this.state.form.activityContentLink !== this.props.ActivityUploadFile.filePath) {
                    this.setState({
                        ...this.state,
                        form: {
                            ...this.state.form,
                            activityContentLink: this.props.ActivityUploadFile.filePath,
                            uploadError: ''
                        }
                    });
                }
            } else {
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        activityContentLink: '',
                        uploadError: this.props.ActivityUploadFile.message
                    }
                });
            }
            this.props.activityUploadFile(this.props.token);
        }
        let isQBDisable = (this.state.isQBCountEditable || this.state.form.isQuestionBank) ? '' : 'disabled';
        let isClassDisable = (this.state.isQBCountEditable || this.state.form.isQuestionBank) ? '' : 'disabled-marker';
        var accessDataCount = Object.keys(this.props.accessData).length;
        return (
            <Modal isOpen={this.props.formEditable} toggle={this.props.onFormEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFormEdited}>
                    <span className="display-5">Activity Form</span>
                </ModalHeader>
                <ModalBody>
                    <div className="activities-form text-medium">
                        <Col>
                            {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                                <strong>Error:</strong> {this.props.error}
                            </UncontrolledAlert>}
                            <Form id="activities" onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for="activity-name" sm={3}>Activity Name</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="text"
                                            name="activity-name"
                                            data-state="activityName"
                                            className="form-control"
                                            placeholder="Activity Name"
                                            value={this.state.form.activityName}
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
                                    <Label for="activity-type" sm={3}>Content Type</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="select"
                                            name="activity-type"
                                            data-state="activityType"
                                            className="form-control"
                                            placeholder="Activity Type"
                                            value={this.state.form.activityType}
                                            onChange={this.handleChange}
                                        >
                                            <option value={'content'}>Upload File</option>
                                            <option value={'link'}>Youtube Link</option>
                                            <option value={'assessment'}>Assessment</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                {this.state.form.activityType == 'content' && <FormGroup row>
                                    <Col sm={{ size: 9, offset: 3 }}>
                                        {this.state.form.activityContentLink ? 
                                        <Fullscreen
                                            enabled={this.state.isFull}
                                            onChange={isFull => this.setState({isFull})}
                                        >
                                            <div className={`mt-2 img-thumbnail ${this.state.isFull ? `h-100` : `page-viewer`}`}>
                                                <Button color="danger" className="position-absolute btn-auto pt-1 pb-1 px-2 index-1 right-thumb" onClick={this.clearActivityContentLink}>
                                                    <FeatherIcon icon="trash-2" size="18" className="mb-1" />
                                                </Button>
                                                <Button color="info" className="position-absolute btn-auto mt-5 pt-1 pb-1 px-2 index-1 right-thumb" onClick={this.expandDocument}>
                                                    <FeatherIcon icon={this.state.isFull ? "minimize" : "maximize"} size="18" className="mb-1" />
                                                </Button>
                                                {this.state.isFull && <Alert color="info" className="position-absolute btn-auto mr-5 pt-1 pb-1 px-2 index-1 right-thumb text-large">
                                                    Press Ctrl + Scroll Up / Down to Zoom Out / In the page.
                                                </Alert>}
                                                <FileViewer fileType={this.state.fileType} filePath={`${API_URL}/${this.state.form.activityContentLink}`} />
                                            </div>
                                        </Fullscreen> : 
                                        <span>
                                            <Input
                                                type="file"
                                                name="upload-file"
                                                data-state="uploadFile"
                                                placeholder="Upload File"
                                                onChange={this.handleUploadFile}
                                            />
                                            {this.state.form.uploadError && <p className="text-danger mb-1 text-small">{this.state.form.uploadError}</p>}
                                        </span>}
                                    </Col>
                                </FormGroup>}
                                {this.state.form.activityType == 'link' && <FormGroup row>
                                    <Col sm={{ size: 9, offset: 3 }}>
                                        <Input
                                            type="text"
                                            name="youtube-link"
                                            data-state="activityContentLink"
                                            className="form-control"
                                            placeholder="Youtube Link"
                                            value={this.state.form.activityContentLink}
                                            onChange={this.handleChange}
                                        />
                                        {this.state.linkInvalidError !== '' ? 
                                            <p className="text-danger mb-1 text-small">{this.state.linkInvalidError}</p> :
                                            this.state.form.activityContentLink !== '' && 
                                                <ReactPlayer
                                                    controls={true}
                                                    loop={true}
                                                    playing={true}
                                                    width='100%'
                                                    url={this.state.form.activityContentLink}
                                                    className="mt-2"
                                                />
                                        }
                                    </Col>
                                </FormGroup>}
                                {this.state.form.activityType == 'assessment' && <FormGroup row>
                                    <Label for="is-question-bank" sm={3}>Is Question Bank</Label>
                                    <Col sm={9}>
                                    <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <div className="form-check">
                                                        <label className="ml-2 mb-0">
                                                            <Input
                                                                type="checkbox"
                                                                onChange={this.handleChange}
                                                                data-state="isQuestionBank"
                                                                name="question-bank"
                                                                value={!this.state.form.isQuestionBank}
                                                                checked={this.state.form.isQuestionBank}
                                                            />
                                                            <span className="text-small">
                                                                Question Bank
                                                            </span>
                                                        </label>
                                                    </div>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="question-bank-count"
                                                data-state="questionBankCount"
                                                className={"form-control " + isClassDisable}
                                                placeholder="Question Bank Count"
                                                value={this.state.form.questionBankCount}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                                disabled= {isQBDisable}
                                            />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>}
                                {this.state.form.activityType == 'assessment' && <React.Fragment><FormGroup row>
                                    <Label for="passing-percentage" sm={3}>Passing Percentage</Label>
                                        <Col sm={9}>
                                        <InputGroup>
                                        <Input
                                            type="text"
                                            name="passing-percentage"
                                            data-state="passingPercentage"
                                            className="form-control"
                                            placeholder="Passing Percentage"
                                            value={this.state.form.passingPercentage}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                        <InputGroupAddon addonType="append">%</InputGroupAddon>
                                        </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label for="negative-marks" sm={3}>Negative Marks</Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                        <Input
                                            type="text"
                                            name="negative-marks"
                                            data-state="negativeMarks"
                                            className="form-control"
                                            placeholder="Negative Marks in Percentage"
                                            autoComplete="off"
                                            value={this.state.form.negativeMarks}
                                            onChange={this.handleChange}
                                        />
                                        <InputGroupAddon addonType="append">%</InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    </FormGroup>
                                </React.Fragment>
                                }
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

const mapStateToProps = state => {
    return {
        ActivityUploadFile: state.ActivityUploadFile
    }
}

export default connect(mapStateToProps, { activityUploadFile })(ActivitiesForm);