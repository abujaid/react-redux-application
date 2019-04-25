import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactPlayer from 'react-player';
import FileViewer from 'react-file-viewer';
import Moment from 'react-moment';

import FeatherIcon from 'feather-icons-react';
import { Nav, NavItem, NavLink, Modal, TabContent, InputGroup, InputGroupAddon, InputGroupText, TabPane, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

import { API_URL } from './../../constants';
import { activityUploadFile, saveAssessmentDetails, getAssessmentDetails, deleteAssessment, getAssessmentById, updateAssessmentDetails } from './../../actions/modules_action/activities';

const columns = [{
    dataField: 'question',
    text: 'Question',
    sort: true,
    headerStyle: {
        width: '150px'
    }
}, {
    dataField: 'marks',
    text: 'Marks',
    sort: true,
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'status',
    text: 'Status',
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'dateAdded',
    text: 'Date Added',
    sort: true,
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'action',
    text: 'Action',
    headerStyle: {
        width: '150px'
    }
}];
var error = '';

class ActivitiesAssessment extends Component {
    constructor(props) {
        super(props);
        let accessData = this.props.accessData;
        let fileType = '';
        if (accessData.type === 'content' && accessData.url) {
            fileType = (accessData.url.split('.'))[1];
            fileType = fileType.substr(0, fileType.indexOf('-'));
        }
        
        this.state = {
            form: {
                activityName: accessData.name ? accessData.name : '',
                description: accessData.description || '',
                activityType: accessData.type === 'link' ? 'link' : 'content',
                activityContentLink: accessData.url || '',
                status: accessData.isActive == false ? 'false' : 'true',
                uploadError: '',
            },
            assesment: {
                activityId: this.props.activityId,
                question: '',
                marks: '',
                status: 'true',
                options: {
                    optionA: {'option':'', 'correct': false },
                    optionB: {'option':'', 'correct': false },
                    optionC: {'option':'', 'correct': false },
                    optionD: {'option':'', 'correct': false }
                }
            },
            fileType: fileType,
            activeTab: '1',
            assessmentSuccessMessage: '',
            assessmentErrorMessage: '',
            deleteItem: 0,
            deleteEnable: false,
            accessId: 0
        }
        this.props.getAssessmentDetails(this.props.token, this.props.activityId);
    }

    handleChangeAssesment = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let value = event.target.value;
        
        this.setState({
            ...this.state,
            assesment: {
                ...this.state.assesment,
                [attribute]: value
            }
        });
    }

    handleOptionData = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let index = event.target.getAttribute('data-index');
        let value = event.target.value;

        if (attribute === "correct") {
            if (value === "true") {
                value = true;
                this.state.assesment.options.optionA.correct = false;
                this.state.assesment.options.optionB.correct = false;
                this.state.assesment.options.optionC.correct = false;
                this.state.assesment.options.optionD.correct = false;
            } else if (value === "false") {
                value = false;
            }
        }

        this.setState({
            ...this.state,
            assesment: {
                ...this.state.assesment,
                options: {
                    ...this.state.assesment.options,
                    [index]: {
                        ...this.state.assesment.options[index],
                        [attribute]: value
                    }
                }
            }
        });
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                ...this.state,
                activeTab: tab,
                assessmentSuccessMessage: '',
                assessmentErrorMessage: '',
            });
        }
    }

    reSetQuestionField = (additionalState = {}) => {
        this.setState({
            ...this.state,
            ...additionalState,
            assesment: {
                ...this.state.assesment,
                question: '',
                marks: '',
                options: {
                    optionA : {option: '', correct: false},
                    optionB : {option: '', correct: false},
                    optionC : {option: '', correct: false},
                    optionD : {option: '', correct: false}
                },
                status: 'true',
            },
            activeTab: '1',
            accessId: 0
        })
    }

    handleSubmitAssessment = async (event) => {
        let request = {
            question: this.state.assesment.question,
            marks: parseInt(this.state.assesment.marks),
            Options: Object.values(this.state.assesment.options),
            isActive: this.state.assesment.status
        }
        if(parseInt(this.state.accessId) === 0) {
            await this.props.saveAssessmentDetails(this.props.token, request, this.state.assesment.activityId);
        } else {
            await this.props.updateAssessmentDetails(this.props.token, this.state.accessId, request);
        }
    }

    deleteModalToggle = (enable = false, id = 0) => {
        this.setState({
            ...this.state,
            assessmentSuccessMessage: '',
            deleteItem: id,
            deleteEnable: enable
        });
    }

    deleteItem = async () => {
        await this.props.deleteAssessment(this.props.token, this.state.deleteItem);
        if(this.props.DeleteAssessment.status){
            await this.props.getAssessmentDetails(this.props.token, this.props.activityId);
            this.deleteModalToggle(false, 0);
            this.setState({
                ...this.state,
                assessmentSuccessMessage: 'Record deleted Successfully',
                assessmentErrorMessage: ''
            });
        } else {
            this.setState({
                ...this.state,
                assessmentErrorMessage: this.props.deleteAssessment.message,
                assessmentSuccessMessage: ''
            });
        }
    }

    deleteModal = () => {
        return (
            <Modal isOpen={this.state.deleteEnable} toggle={() => this.deleteModalToggle(false, 0)} className={this.props.className}>
                <ModalBody>
                    <div className="text-center">
                        <FeatherIcon icon="x-circle" size="50" className="mb-2 mt-3 text-danger" />
                    </div>
                    <h1 className="display-5 mx-3">
                        Are you sure you want to delete this Item ?
                    </h1>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger btn-auto" onClick={() => this.deleteItem()}>
                        <FeatherIcon icon="trash-2" size="20" className="mb-1" /> Delete
                    </Button>
                    <Button color="secondary btn-auto" onClick={() => this.deleteModalToggle(false, 0)}>
                        <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    getAssessmentItem = async (id) => {
        await this.props.getAssessmentById(this.props.token, id);
        if(Object.keys(this.props.GetAssessmentById).length > 0){
            let i = 1;
            var optionsEdit = {};
            var optionA; var optionB; var optionC; var optionD
            Object.values(this.props.GetAssessmentById.data.Options).map((key, item) => {
                if(item == 0){
                    optionA = key
                }
                if(item == 1){
                    optionB = key
                }
                if(item == 2){
                    optionC = key
                }
                if(item == 3){
                    optionD = key
                }
            })
            optionsEdit = {
                optionA: optionA,
                optionB: optionB,
                optionC: optionC,
                optionD: optionD
            }
            
            this.setState({
                ...this.state,
                activeTab: '2',
                formSuccessMessage: '',
                formErrorMessage: '',
                accessId: id,
                assesment: {
                    ...this.state.assesment,
                    question: this.props.GetAssessmentById.data.question,
                    marks: this.props.GetAssessmentById.data.marks,
                    status: this.props.GetAssessmentById.data.isActive,
                    options: optionsEdit
                }
            });
        }
    }

    renderRecords = (assessment, status = true) => {
        return assessment.map(item => {
            if(item.isActive == status) {
                return {
                    id: item.id,
                    question: item.question,
                    marks: item.marks,
                    status: item.isActive ? 'Active' : 'Inactive',
                    dateAdded: <Moment format="DD/MM/YYYY" date={item.createdAt} />,
                    action: this.renderAction(item.id, item.type)
                }
            }
        });
    }

    renderAction = (id, type) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getAssessmentItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.deleteModalToggle(true, id)}>
                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
            </Button>
        </div>
    )

    getAnserOptions = () =>{
        let optionList = [];
        var options = '';
            Object.entries(this.state.assesment.options).map((item, key) =>{
                options = <FormGroup row key={key}>
                    <Label for="option-a" sm={3}>Option</Label>
                    <Col sm={9}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <Input
                                        addon
                                        type="radio"
                                        onChange={this.handleOptionData}
                                        data-index={item[0]}
                                        data-state="correct"
                                        name="correct"
                                        value={!item[1].correct}
                                        className="mr-1"
                                        checked={item[1].correct}
                                    />
                                    <span className="text-small">
                                        Is Correct
                                    </span>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="text"
                                name={item.option}
                                data-state="option"
                                className="form-control"
                                placeholder="Option is required"
                                value={item[1].option}
                                onChange={this.handleOptionData}
                                data-index={item[0]}
                                autoComplete="off"
                            />
                        </InputGroup>
                    </Col>
                </FormGroup>
                optionList.push(options);
            })
        return optionList
    }
 
    render = () => {
        let activitiesActive = [];
        if(Object.keys(this.props.GetAssessmentDetails).length > 0 && 'status' in this.props.GetAssessmentDetails) {
            if(this.props.GetAssessmentDetails.status) {
                activitiesActive = this.renderRecords(this.props.GetAssessmentDetails.data, true);
                activitiesActive = activitiesActive.filter(item => item !== undefined);
            }
        }

        if(Object.keys(this.props.UpdateAssessmentDetails).length > 0 && 'status' in this.props.UpdateAssessmentDetails) {
            if(this.props.UpdateAssessmentDetails.status){
                this.reSetQuestionField({
                    assessmentSuccessMessage: 'Data Submitted Successfully',
                    assessmentErrorMessage: ''
                });
            } else {
                this.setState({
                    ...this.state,
                    assessmentErrorMessage: this.props.SaveAssessmentDetails.message || 'Something Went Wrong.',
                    assessmentSuccessMessage: ''
                });
            }
            this.props.getAssessmentDetails(this.props.token, this.props.activityId);
            this.props.updateAssessmentDetails(this.state.token);
        }

        if(Object.keys(this.props.SaveAssessmentDetails).length > 0 && 'status' in this.props.SaveAssessmentDetails) {
            if(this.props.SaveAssessmentDetails.status){
                this.reSetQuestionField({
                    assessmentSuccessMessage: 'Data Submitted Successfully',
                    assessmentErrorMessage: ''
                });
            } else {
                this.setState({
                    ...this.state,
                    assessmentErrorMessage: this.props.SaveAssessmentDetails.message,
                    assessmentSuccessMessage: ''
                });
            }
            this.props.getAssessmentDetails(this.props.token, this.props.activityId);
            this.props.saveAssessmentDetails(this.state.token);
        }

        return (
            <Modal isOpen={this.props.AssessmentEditable} toggle={this.props.onAssessmentEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onAssessmentEdited}>
                    <span className="display-5">Assessment Form</span>
                </ModalHeader>
                <ModalBody>
                    <Nav className="md-tabs d-flex flex-row" tabs>
                            <NavItem>
                                <NavLink className={this.state.activeTab == "1" ? "active" : ""} onClick={() => this.toggleTab('1')}>
                                    Questions Listing
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={this.state.activeTab == "2" ? "active" : ""} onClick={() => this.toggleTab('2')}>
                                    Add Questions
                                </NavLink>
                            </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="md-content">
                        <TabPane tabId="1" className="overflow-x">
                            {this.state.assessmentSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                            <strong>Success:</strong> {this.state.assessmentSuccessMessage}
                            </UncontrolledAlert>}
                            {this.state.assessmentErrorMessage !== '' && <UncontrolledAlert className="text-left" color="danger">
                                <strong>Error:</strong> {this.state.assessmentErrorMessage}
                            </UncontrolledAlert>}
                            <BootstrapTable 
                                bootstrap4
                                keyField="id"
                                data={activitiesActive}
                                columns={columns}
                                noDataIndication="No Record Found."
                                pagination={ paginationFactory() }
                            />
                        </TabPane>
                        <TabPane tabId="2" className="overflow-x">
                            <div className="activities-form text-medium">
                                {this.state.assessmentSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                                <strong>Success:</strong> {this.state.assessmentSuccessMessage}
                                </UncontrolledAlert>}
                                {this.state.assessmentErrorMessage !== '' && <UncontrolledAlert className="text-left" color="danger">
                                    <strong>Error:</strong> {this.state.assessmentErrorMessage}
                                </UncontrolledAlert>}
                                <Col>
                                    {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                                        <strong>Error:</strong> {this.props.error}
                                    </UncontrolledAlert>}
                                    <Form id="activities" onSubmit={this.handleSubmitAssessment}>
                                        <FormGroup row>
                                            <Label for="question" sm={3}>Question</Label>
                                            <Col sm={9}>
                                                <Input
                                                    type="textarea"
                                                    name="question"
                                                    data-state="question"
                                                    className="form-control"
                                                    placeholder="Question"
                                                    value={this.state.assesment.question}
                                                    onChange={this.handleChangeAssesment}
                                                />
                                            </Col>
                                        </FormGroup>
                                        {this.getAnserOptions()}
                                        <FormGroup row>
                                            <Label for="marks" sm={3}>Marks</Label>
                                            <Col sm={9}>
                                                <Input
                                                    type="text"
                                                    name="marks"
                                                    data-state="marks"
                                                    className="form-control"
                                                    placeholder="Marks"
                                                    autoComplete="off"
                                                    value={this.state.assesment.marks}
                                                    onChange={this.handleChangeAssesment}
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
                                                    value={this.state.assesment.status}
                                                    onChange={this.handleChangeAssesment}
                                                >
                                                    <option value={true}>Active</option>
                                                    <option value={false}>Inactive</option>
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </div>
                            <ModalFooter>
                                <Button color="danger btn-auto" onClick={this.reSetQuestionField}>
                                    <FeatherIcon icon="refresh-cw" size="20" className="mb-1" /> Reset
                                </Button>
                                <Button color="info btn-auto" onClick={this.handleSubmitAssessment}>
                                    <FeatherIcon icon="save" size="20" className="mb-1" /> Save
                                </Button>
                                <Button color="secondary btn-auto" onClick={this.props.onAssessmentEdited}>
                                    <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
                                </Button>
                            </ModalFooter>
                        </TabPane>
                    </TabContent>
                </ModalBody>
                {this.state.deleteEnable && this.deleteModal()}
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        ActivityUploadFile: state.ActivityUploadFile,
        SaveAssessmentDetails: state.SaveAssessmentDetails,
        GetAssessmentDetails: state.GetAssessmentDetails,
        DeleteAssessment: state.DeleteAssessment,
        GetAssessmentById: state.GetAssessmentById,
        UpdateAssessmentDetails: state.UpdateAssessmentDetails
    }
}

export default connect(mapStateToProps, { activityUploadFile, saveAssessmentDetails, getAssessmentDetails, deleteAssessment, getAssessmentById, updateAssessmentDetails })(ActivitiesAssessment);