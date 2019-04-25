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
import { getUserCourseFeedbackDetails } from "./../../actions/modules_action/courses";

const columns = [{
    dataField: 'question',
    text: 'Question',
    sort: true,
    headerStyle: {
        width: '150px'
    }
}, {
    dataField: 'answer',
    text: 'Answer',
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'user',
    text: 'User',
    headerStyle: {
        width: '100px'
    }
},{
    dataField: 'dateAdded',
    text: 'Date Added',
    sort: true,
    headerStyle: {
        width: '100px'
    }
} ];

class ViewCourseFeedback extends Component {
    constructor(props) {
        super(props);
        let courseId = this.props.courseId;
        this.state = {
            feedbackData: []
        }
        this.props.getUserCourseFeedbackDetails(this.props.token, courseId);
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

    renderRecords = (feedback) => {
        let completeArray = [];
        let feedData = '';
        feedback.forEach((item, key) => {
            let userName = item.userName;
            item.feedback.map((details, index) => {
                feedData = {
                    id: details.id,
                    question: details.question,
                    answer: details.answer,
                    user: userName,
                    dateAdded: <Moment format="DD/MM/YYYY" date={details.createdAt} />
                }
                completeArray.push(feedData);
            })
        })
        return completeArray;
    }

    render = () => {
        let userFeedback = [];
        if(Object.keys(this.props.GetUserCourseFeedbackDetails).length > 0 && 'status' in this.props.GetUserCourseFeedbackDetails) {
            if(this.props.GetUserCourseFeedbackDetails.status) {
                userFeedback = this.renderRecords(this.props.GetUserCourseFeedbackDetails.data);
            }
        }

        return (
            <Modal isOpen={this.props.isActive} toggle={this.props.userCommentsToggle} className="modal-lg">
                <ModalHeader toggle={this.props.userCommentsToggle}>
                    <span className="display-5">User Feedback Details</span>
                </ModalHeader>
                <ModalBody>
                    <BootstrapTable 
                        bootstrap4
                        keyField="id"
                        data={userFeedback}
                        columns={columns}
                        noDataIndication="No Record Found."
                        pagination={ paginationFactory() }
                    />
                    <ModalFooter>
                        <Button color="secondary btn-auto" onClick={this.props.userCommentsToggle}>
                            <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetUserCourseFeedbackDetails: state.GetUserCourseFeedbackDetails
    }
}

export default connect(mapStateToProps, { getUserCourseFeedbackDetails })(ViewCourseFeedback);