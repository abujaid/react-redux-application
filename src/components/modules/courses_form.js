import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

import { API_URL } from './../../constants';
import { activityUploadFile } from './../../actions/modules_action/activities';


class CoursesForm extends Component {
    constructor(props) {
        super(props);

        let activities = [];
        let activitiesId = [];
        let accessData = this.props.accessData;
        if (accessData.Activities && accessData.Activities.length > 0) {
            accessData.Activities.map(item => {
                activitiesId.push(item.id);
                activities.push({
                    id: item.id,
                    name: item.name
                });
            });

        }

        this.state = {
            form: {
                courseName: accessData.name || '',
                description: accessData.description || '',
                image: accessData.image || '',
                coursePrice: accessData.coursePrice || '',
                subscriptionPrice: accessData.subscribedPrice || '',
                status: accessData.isActive == false ? 'false' : 'true',
                activities: activitiesId,
                activityList: activities,
                prerequisite: accessData.prerequisites ? true : false,
                marketing: accessData.marketing ? true : false,
                feedback: accessData.isFeedback ? true : false,
                uploadError: ''
            },
            crop: {
                aspect: 16 / 10
            },
            src: `${API_URL}/${accessData.image}` || null,
        }
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let value = event.target.value;

        if (attribute === 'marketing' || attribute === 'prerequisite' || attribute === 'feedback') {
            if (value === 'true') {
                value = true;
            } else if (value === 'false') {
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

    handleUploadImage = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({
                    ...this.state, src: reader.result, form: {
                        ...this.state.form,
                        image: ''
                    }
                }),
            );
            reader.readAsDataURL(e.target.files[0]);
        }

    }


  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };

    onCropChange = crop => {
        this.setState({ crop });
    };

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );
        return canvas.toDataURL('image/jpeg')

    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    toDataURL(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }




    addActivities = (selected) => {
        let activityIds = [];
        let activityList = [];
        selected.map(item => {
            activityIds.push(item.id);
            activityList.push({
                id: item.id,
                name: item.name
            });
        });
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                activities: activityIds,
                activityList: activityList
            }
        });
    }

    handleSubmit = async (event) => {

        const formData = new FormData();

        formData.set('directory', 'courses');

        if (this.state.croppedImageUrl) {
            const block = this.state.croppedImageUrl.split(";");
            const contentType = block[0].split(":")[1];
            const realData = block[1].split(",")[1];
            formData.append('file', this.b64toBlob(realData, contentType));
            await this.props.activityUploadFile(this.props.token, formData);
        }
        else if (!this.state.form.image) {
            formData.append('file', this.state.src);
            const block = this.state.src.split(";");
            const contentType = block[0].split(":")[1];
            const realData = block[1].split(",")[1];
            formData.append('file', this.b64toBlob(realData, contentType));
            await this.props.activityUploadFile(this.props.token, formData);
        }
        this.props.submit(this.state.form);
    }


    componentDidMount() {

        if (this.state.src) {
            const scope = this;
            this.toDataURL(this.state.src, function (myBase64) {
                scope.setState({ src: myBase64 });
            });
        }
    }

    render = () => {
        const { crop, croppedImageUrl } = this.state;
        let src = null
        if (this.state.src) {
            src = this.state.src;
        }
        if (Object.keys(this.props.ActivityUploadFile).length > 0 && 'status' in this.props.ActivityUploadFile) {
            if (this.props.ActivityUploadFile.status) {
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
                    <span className="display-5">Course Form</span>
                </ModalHeader>
                <ModalBody>
                    <div className="courses-form text-medium">
                        <Col>
                            {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                                <strong>Error:</strong> {this.props.error}
                            </UncontrolledAlert>}
                            <Form id="courses" onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for="courseName" sm={3}>Course Name</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="text"
                                            name="course-name"
                                            data-state="courseName"
                                            className="form-control"
                                            placeholder="Course Name"
                                            value={this.state.form.courseName}
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
                                        {src && (
                                            <ReactCrop
                                                src={src}
                                                crop={crop}
                                                onImageLoaded={this.onImageLoaded}
                                                onComplete={this.onCropComplete}
                                                onChange={this.onCropChange}
                                                keepSelection={true}
                                                className="img-thumbnail w-100 mt-2"
                                            />
                                        )}
                                        {this.state.form.uploadError && <p className="text-danger mb-1 text-small">{this.state.form.uploadError}</p>}

                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="activity-type" sm={3}>Course Price</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="number"
                                            name="course-price"
                                            data-state="coursePrice"
                                            className="form-control"
                                            placeholder="0.00"
                                            value={this.state.form.coursePrice}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="activity-type" sm={3}>Subscription Price</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="number"
                                            name="subscription-price"
                                            data-state="subscriptionPrice"
                                            className="form-control"
                                            placeholder="0.00"
                                            value={this.state.form.subscriptionPrice}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="activity-type" sm={3}>Activities</Label>
                                    <Col sm={9}>
                                        <Typeahead
                                            multiple
                                            labelKey="name"
                                            options={this.props.activities}
                                            defaultSelected={this.state.form.activityList}
                                            onChange={selected => this.addActivities(selected)}
                                            className="text-small rbt-autocomplete"
                                            placeholder="Choose content activity."
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
                                                    name="prerequisite"
                                                    data-state="prerequisite"
                                                    value={!this.state.form.prerequisite}
                                                    checked={this.state.form.prerequisite}
                                                    onChange={this.handleChange}
                                                />
                                                <span>
                                                    User needs to complete the activity before go to next activity.
                                            </span>
                                            </label>
                                        </div>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={12}>
                                        <div className="form-check">
                                            <label className="ml-2">
                                                <Input
                                                    type="checkbox"
                                                    name="marketing"
                                                    data-state="marketing"
                                                    value={!this.state.form.marketing}
                                                    checked={this.state.form.marketing}
                                                    onChange={this.handleChange}
                                                />
                                                <span>
                                                    Is available for marketing ?
                                            </span>
                                            </label>
                                        </div>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={12}>
                                        <div className="form-check">
                                            <label className="ml-2">
                                                <Input
                                                    type="checkbox"
                                                    name="feedback"
                                                    data-state="feedback"
                                                    value={!this.state.form.feedback}
                                                    checked={this.state.form.feedback}
                                                    onChange={this.handleChange}
                                                />
                                                <span>
                                                    Is available for user feedback ?
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

export default connect(mapStateToProps, { activityUploadFile })(CoursesForm);