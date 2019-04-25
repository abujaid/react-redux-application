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
import { saveFeedbackDetails, getFeedbackDetails, deleteFeedback, getFeedbackById, updateFeedbackDetails } from './../../actions/modules_action/activities';

const columns = [{
    dataField: 'question',
    text: 'Question',
    sort: true,
    headerStyle: {
        width: '150px'
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

class ActivitiesFeedback extends Component {
    constructor(props) {
        super(props);
        let accessData = this.props.accessData;
        this.state = {
            feedback: {
                question: '',
                status: 'true'
            },
            activeTab: '1',
            feedbackSuccessMessage: '',
            feedbackErrorMessage: '',
            deleteItem: 0,
            deleteEnable: false,
            accessId: 0
        }
        this.props.getFeedbackDetails(this.props.token);
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let value = event.target.value;
        
        this.setState({
            ...this.state,
            feedback: {
                ...this.state.feedback,
                [attribute]: value
            }
        });
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                ...this.state,
                activeTab: tab,
                feedbackSuccessMessage: '',
                feedbackErrorMessage: '',
            });
        }
    }

    reSetQuestionField = (additionalState = {}) => {
        this.setState({
            ...this.state,
            ...additionalState,
            feedback: {
                ...this.state.feedback,
                question: '',
                status: 'true',
            },
            activeTab: '1',
            accessId: 0
        })
    }

    handleSubmitFeedback = async (event) => {
        let request = {
            question: this.state.feedback.question,
            isActive: (/true/i).test(this.state.feedback.status)
        }
        if(parseInt(this.state.accessId) === 0) {
            await this.props.saveFeedbackDetails(this.props.token, request);
        } else {
            await this.props.updateFeedbackDetails(this.props.token, this.state.accessId, request);
        }
    }

    deleteModalToggle = (enable = false, id = 0) => {
        this.setState({
            ...this.state,
            feedbackSuccessMessage: '',
            deleteItem: id,
            deleteEnable: enable
        });
    }

    deleteItem = async () => {
        await this.props.deleteFeedback(this.props.token, this.state.deleteItem);
        if(this.props.DeleteFeedback.status){
            await this.props.getFeedbackDetails(this.props.token, this.props.activityId);
            this.deleteModalToggle(false, 0);
            this.setState({
                ...this.state,
                feedbackSuccessMessage: 'Record deleted Successfully',
                feedbackErrorMessage: ''
            });
        } else {
            this.setState({
                ...this.state,
                feedbackErrorMessage: this.props.deleteFeedback.message,
                feedbackSuccessMessage: ''
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

    renderRecords = (feedback, status = true) => {
        return feedback.map(item => {
            return {
                id: item.id,
                question: item.question,
                status: item.isActive ? 'Active' : 'Inactive',
                dateAdded: <Moment format="DD/MM/YYYY" date={item.createdAt} />,
                action: this.renderAction(item.id)
            }
        });
    }

    renderAction = (id) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getFeedbackItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.deleteModalToggle(true, id)}>
                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
            </Button>
        </div>
    )

    getFeedbackItem = async (id) => {
        await this.props.getFeedbackById(this.props.token, id);
        if(Object.keys(this.props.GetFeedbackById).length > 0){
            this.setState({
                ...this.state,
                activeTab: '2',
                feedbackSuccessMessage: '',
                feedbackErrorMessage: '',
                accessId: id,
                feedback: {
                    ...this.state.feedback,
                    question: this.props.GetFeedbackById.data.question,
                    status: this.props.GetFeedbackById.data.isActive
                }
            });
        }
    }

    render = () => {
        let activitiesActive = [];
        if(Object.keys(this.props.GetFeedbackDetails).length > 0 && 'status' in this.props.GetFeedbackDetails) {
            if(this.props.GetFeedbackDetails.status) {
                activitiesActive = this.renderRecords(this.props.GetFeedbackDetails.data.feedbackTemplate, true);
                activitiesActive = activitiesActive.filter(item => item !== undefined);
            }
        }

        if(Object.keys(this.props.UpdateFeedbackDetails).length > 0 && 'status' in this.props.UpdateFeedbackDetails) {
            if(this.props.UpdateFeedbackDetails.status){
                this.reSetQuestionField({
                    feedbackSuccessMessage: 'Data Submitted Successfully',
                    feedbackErrorMessage: ''
                });
            } else {
                this.setState({
                    ...this.state,
                    feedbackErrorMessage: this.props.SaveFeedbackDetails.message || 'Something Went Wrong.',
                    feedbackSuccessMessage: ''
                });
            }
            this.props.getFeedbackDetails(this.props.token);
            this.props.updateFeedbackDetails(this.state.token);
        }

        if(Object.keys(this.props.SaveFeedbackDetails).length > 0 && 'status' in this.props.SaveFeedbackDetails) {
            if(this.props.SaveFeedbackDetails.status){
                this.reSetQuestionField({
                    feedbackSuccessMessage: 'Data Submitted Successfully',
                    feedbackErrorMessage: ''
                });
            } else {
                this.setState({
                    ...this.state,
                    feedbackErrorMessage: this.props.SaveFeedbackDetails.message,
                    feedbackSuccessMessage: ''
                });
            }
            this.props.getFeedbackDetails(this.props.token);
            this.props.saveFeedbackDetails(this.state.token);
        }

        return (
            <Modal isOpen={this.props.FeedbackEditable} toggle={this.props.onFeedbackEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFeedbackEdited}>
                    <span className="display-5">Feedback Form</span>
                </ModalHeader>
                <ModalBody>
                    <Nav className="md-tabs d-flex flex-row" tabs>
                            <NavItem>
                                <NavLink className={this.state.activeTab == "1" ? "active" : ""} onClick={() => this.toggleTab('1')}>
                                    Feedback Questions Listing
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={this.state.activeTab == "2" ? "active" : ""} onClick={() => this.toggleTab('2')}>
                                    Add Feedback Questions
                                </NavLink>
                            </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="md-content">
                        <TabPane tabId="1" className="overflow-x">
                            {this.state.feedbackSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                            <strong>Success:</strong> {this.state.feedbackSuccessMessage}
                            </UncontrolledAlert>}
                            {this.state.feedbackErrorMessage !== '' && <UncontrolledAlert className="text-left" color="danger">
                                <strong>Error:</strong> {this.state.feedbackErrorMessage}
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
                                {this.state.feedbackSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                                <strong>Success:</strong> {this.state.feedbackSuccessMessage}
                                </UncontrolledAlert>}
                                {this.state.feedbackErrorMessage !== '' && <UncontrolledAlert className="text-left" color="danger">
                                    <strong>Error:</strong> {this.state.feedbackErrorMessage}
                                </UncontrolledAlert>}
                                <Col>
                                    {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                                        <strong>Error:</strong> {this.props.error}
                                    </UncontrolledAlert>}
                                    <Form id="activities" onSubmit={this.handleSubmitFeedback}>
                                        <FormGroup row>
                                            <Label for="question" sm={3}>Question</Label>
                                            <Col sm={9}>
                                                <Input
                                                    type="textarea"
                                                    name="question"
                                                    data-state="question"
                                                    className="form-control"
                                                    placeholder="Question"
                                                    value={this.state.feedback.question}
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
                                                    value={this.state.feedback.status}
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
                            <ModalFooter>
                                <Button color="info btn-auto" onClick={this.handleSubmitFeedback}>
                                    <FeatherIcon icon="save" size="20" className="mb-1" /> Save
                                </Button>
                                <Button color="secondary btn-auto" onClick={this.props.onFeedbackEdited}>
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
        SaveFeedbackDetails: state.SaveFeedbackDetails,
        GetFeedbackDetails: state.GetFeedbackDetails,
        DeleteFeedback: state.DeleteFeedback,
        GetFeedbackById: state.GetFeedbackById,
        UpdateFeedbackDetails: state.UpdateFeedbackDetails
    }
}

export default connect(mapStateToProps, { saveFeedbackDetails, getFeedbackDetails, deleteFeedback, getFeedbackById, updateFeedbackDetails })(ActivitiesFeedback);