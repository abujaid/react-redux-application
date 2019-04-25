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
import { saveUserComment } from './../../actions/modules_action/courses';

var error = '';

class UserFeedback extends Component {
    constructor(props) {
        super(props);
        let feedbackData = this.props.feedbackData.feedbackTemplate;
        let userId = 0;
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
        }
        this.state = {
            feedbackSuccessMessage: '',
            feedbackErrorMessage: '',
            deleteItem: 0,
            userId: userId,
            deleteEnable: false,
            isShowButton: true,
            accessId: (this.props.accessId > 0) ? this.props.accessId : 0,
            feedbackData: feedbackData,
            feedback: {
                userFeedback: feedbackData
            }
        }
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let question = event.target.getAttribute('data-question');
        let index = event.target.getAttribute('data-index');
        let question_id = event.target.getAttribute('data-question_id');
        let value = event.target.value;
        let feedbackQue = this.state.feedback.userFeedback;
        if (question_id == feedbackQue[index].id) {
            feedbackQue[index] = {
                question: question,
                answer: value
            }
        }
        this.setState({
            ...this.state,
            feedback: {
                ...this.state.feedback,
                userFeedback: feedbackQue
            }
        });
    }

    handleSubmitFeedback = async (event) => {
        let request = {
            userFeedback: this.state.feedback.userFeedback
        }
        await this.props.saveUserComment(this.props.token, this.state.accessId, this.state.userId, request);
    }

    renderQuestion = () => {
        let feedback = this.state.feedbackData;
        let questionArr = [];
        let questonElement = '';
        feedback.forEach((item, key) => {
            questonElement = <React.Fragment key={key}>            
            <div className="row form-group">
                <div className="col-sm-2">
                    <Label for="question"><strong>Question: </strong></Label>
                </div>
                <div className="col-sm-10 p-sm-l-0">
                    <Label for="question-que">{item.question}</Label>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-sm-2">
                    <Label for="marks"><strong>Answer</strong></Label>
                </div>
                <div className="col-sm-10 p-sm-l-0">
                <FormGroup row>
                    <Col sm={9}>
                        <Input
                            type="textarea"
                            name={"answer" + item.id}
                            data-state={"answer" + item.id}
                            className="form-control"
                            placeholder="Answer"
                            data-question={item.question}
                            data-index={key}
                            data-question_id={item.id}
                            value={this.state.feedback.userFeedback[key].answer}
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
                </div>
            </div>
        </React.Fragment>
        questionArr.push(questonElement);
        });
        return (questionArr);
    }

    render = () => {
        if(Object.keys(this.props.SaveUserComment).length > 0 && 'status' in this.props.SaveUserComment) {
            if(this.props.SaveUserComment.status){
                this.setState({
                    ...this.state,
                    feedbackSuccessMessage: 'Comment Submitted Successfully',
                    feedbackErrorMessage: '',
                    isShowButton: false
                });
                this.props.saveUserComment(this.props.token);
            } else {
                this.setState({
                    ...this.state,
                    feedbackErrorMessage: this.props.SaveUserComment.message,
                    feedbackSuccessMessage: ''
                });
            }
        }
        let isDisable = this.state.isShowButton ? false : true;
        return (
            <Modal isOpen={this.props.contentEnableFeedback} toggle={this.props.onFeedbackEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFeedbackEdited}>
                    <span className="display-5">User Feedback Form</span>
                </ModalHeader>
                <ModalBody>
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
                            {this.renderQuestion()}
                            </Form>
                        </Col>
                    </div>
                    <ModalFooter>
                        <Button color="info btn-auto" disabled={isDisable} onClick={this.handleSubmitFeedback}>
                            <FeatherIcon icon="save" size="20" className="mb-1" /> Save
                        </Button>
                        <Button color="secondary btn-auto" onClick={this.props.onFeedbackCompleted}>
                            <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
                        </Button>
                    </ModalFooter>
                </ModalBody>
                {this.state.deleteEnable && this.deleteModal()}
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        SaveUserComment: state.SaveUserComment
    }
}

export default connect(mapStateToProps, { saveUserComment })(UserFeedback);