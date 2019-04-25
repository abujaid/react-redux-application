import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactPlayer from 'react-player';
import FileViewer from 'react-file-viewer';
import Fullscreen from "react-full-screen";

import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Button, Label, FormGroup, Input, Form, Alert, Badge, UncontrolledTooltip } from 'reactstrap';
import { getTestActivity, submitTestQuestion } from './../../actions/modules_action/activities';
import { updateActivityProgress, getUserCoursesDetails } from './../../actions/modules_action/courses';

import { API_URL } from './../../constants';

const columns = [{
    dataField: 'activityName',
    text: 'Activity Name',
}, {
    dataField: 'activityType',
    text: 'Activity Type',
}, {
    dataField: 'status',
    text: 'Status',
}, {
    dataField: 'progress',
    text: 'Progress',
}, {
    dataField: 'action',
    text: 'Action',
}];

class CourseContent extends Component {
    constructor(props) {
        super(props);

        let activities = [];
        let activitiesId = [];
        let accessData = this.props.accessData;
        if (accessData.Activities.length > 0) {
            accessData.Activities.map(item => {
                activitiesId.push(item.id);
                activities.push(item);
            });
        }

        let userId = 0;
        let loggedIn = false;
        let userSubscribedCount = 0;
        if (localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
            loggedIn = true;
            userSubscribedCount = user_data.data.Subscriptions.length;
        }

        this.state = {
            userId: userId,
            loggedIn: loggedIn,
            userSubscribedCount: userSubscribedCount,
            content: {
                courseName: accessData.name || '',
                description: accessData.description || '',
                image: accessData.image || '',
                coursePrice: accessData.coursePrice || '',
                subscriptionPrice: accessData.subscribedPrice || '',
                courseCategory: '',
                status: accessData.isActive == false ? 'false' : 'true',
                activitiesId: activitiesId,
                activities: activities,
                activeActivity: 0,
                prerequisite: accessData.prerequisites ? true : false,
                marketing: accessData.marketing ? true : false,
                uploadError: ''
            },
            assessment: {
                currentQuestion: 0,
                questions: [],
                activityType: '',
                activityId: 0,
                isQuestionRequesting: false,
                testAttempt: [],
                result: {},
                activityProgress: '',
                updateProgress: true,
                isCurrent: false,
                isPlayYouTube: true,
                isDocumentRead: true
            },
            fileType: '',
            isFull: false,
            tooltipOpen: false
        };
        this.props.getUserCoursesDetails(this.props.token, userId, accessData.id);
    }

    onFinishVideo = (activityIndex) => {
        this.setState({
            ...this.state,
            content: {
                ...this.state.content,
                activeActivity: parseInt(activityIndex) + 1
            },
            assessment: {
                ...this.state.assessment,
                isPlayYouTube: true,
                isDocumentRead: true
            }
        });
    }

    expandDocument = () => {
        this.setState({
            ...this.state,
            isFull: !this.state.isFull
        });
    }

    handleQuestionOptions = (event) => {
        let selectedAnswer = event.target.getAttribute('data-option');
        let index = event.target.getAttribute('data-index');
        let questionId = event.target.getAttribute('data-question_id');

        let attempted = this.state.assessment.testAttempt;
        if (questionId == attempted[index].questionId) {
            attempted[index] = {
                ...attempted[index],
                isAttempt: true,
                attemptedOption: parseInt(selectedAnswer)
            };
        }

        this.setState({
            ...this.state,
            assessment: {
                ...this.state.assessment,
                testAttempt: attempted
            }
        });
    }

    handleTestSubmit = () => {
        if (this.state.isFull) this.expandDocument();
        let request = {
            userId: this.state.userId,
            courseId: this.props.accessData.id,
            activityId: this.state.assessment.activityId,
            testAttempt: this.state.assessment.testAttempt
        }
        this.state.assessment.activityType = '';
        this.props.submitTestQuestion(this.props.token, request);
    }

    renderContent = (id) => {
        let activity = this.state.content.activities[id];
        let actProgress = this.state.assessment.activityProgress;
        let userId = this.state.userId;
        let courseId = this.props.accessData.id;
        if (activity.type == 'link' && activity.url !== null) {
            if(actProgress != '' && this.state.assessment.isPlayYouTube){
                actProgress[activity.id] = 2;
                let request = {progress: actProgress};
                this.state.assessment.activityProgress = actProgress;
                this.state.assessment.isPlayYouTube = false;
                this.props.updateActivityProgress(this.props.token, userId, courseId, request);
            }
            return (
                <ReactPlayer
                    controls={true}
                    playing={true}
                    onEnded={() => this.onFinishVideo(id)}
                    width="100%"
                    url={activity.url}
                    className="mt-2"
                />
            );
        } else if (activity.type == 'content' && activity.url !== null) {
            if (this.state.fileType === '') {
                let fileType = (activity.url.split('.'))[1];

                this.setState({
                    ...this.state,
                    fileType: fileType
                });
                return (
                    <div className="mt-2 img-thumbnail page-viewer">
                        Loading...
                    </div>
                );
            } else {
                if(actProgress != '' && this.state.assessment.isDocumentRead){
                    actProgress[activity.id] = 2;
                    let request = {progress: actProgress};
                    this.state.assessment.activityProgress = actProgress;
                    this.state.assessment.isDocumentRead = false;
                    this.props.updateActivityProgress(this.props.token, userId, courseId, request);
                }
                return (
                    <Fullscreen
                        enabled={this.state.isFull}
                        onChange={isFull => this.setState({ isFull })}
                    >
                        <div className={`mt-2 img-thumbnail ${this.state.isFull ? `h-100` : `page-viewer`}`}>
                            <Button color="info" className="position-absolute btn-auto pt-1 pb-1 px-2 index-1 right-thumb" onClick={this.expandDocument}>
                                <FeatherIcon icon={this.state.isFull ? "minimize" : "maximize"} size="18" className="mb-1" />
                            </Button>
                            {this.state.isFull && <Alert color="info" className="position-absolute btn-auto mr-5 pt-1 pb-1 px-2 index-1 right-thumb text-large">
                                Press Ctrl + Scroll Up / Down to Zoom Out / In the page.
                            </Alert>}
                            <FileViewer fileType={this.state.fileType} filePath={`${API_URL}/${activity.url}`} />
                        </div>
                    </Fullscreen>
                );
            }
        }
    }

    getQuestion = (id) => {
        this.setState({
            ...this.state,
            assessment: {
                ...this.state.assessment,
                isQuestionRequesting: true
            }
        });
        this.props.getTestActivity(this.props.token, id);
    }

    getPreviousQuestion = (currIndex) => {
        this.setState({
            ...this.state,
            assessment: {
                ...this.state.assessment,
                currentQuestion: (currIndex - 1)
            }

        })
    }

    getNextQuestion = (currIndex) => {
        this.setState({
            assessment: {
                ...this.state.assessment,
                currentQuestion: (currIndex + 1)
            }
        })
    }

    renderOption = (options, index, questionId) => {
        let optionArr = [];
        let option = '';
        let optionChecked = false;
        options.map((item, key) => {
            let isChecked = '';
            if (this.state.assessment.testAttempt[index].attemptedOption != '' && item.id == this.state.assessment.testAttempt[index].attemptedOption) {
                isChecked = 'checked'
            }
            option = <React.Fragment key={key}>
                <div className="row">
                    <div className="col-sm-12">
                    <Label className="" for="question">
                        <input
                            className="pull-left m-r-10"
                            type="radio"
                            name={"option" + index}
                            data-option={item.id}
                            data-index={index}
                            data-question_id={questionId}
                            checked={isChecked}
                            onChange={this.handleQuestionOptions} />
                         {item.option}</Label>
                    </div>
                </div>
            </React.Fragment>
            optionArr.push(option);
        })
        return optionArr;
    }

    renderQuestionContent = () => {
        let questionList = this.state.assessment.questions;
        let questionCount = questionList.length;

        if (this.state.assessment.testAttempt.length === 0) {
            let totalQuestion = [];
            let queOption = ''
            questionList.forEach((item, key) => {
                queOption = { questionId: item.id, isAttempt: false, attemptedOption: null }
                totalQuestion.push(queOption)
            });
            this.state.assessment.testAttempt = totalQuestion;
        }
        let currentIndex = this.state.assessment.currentQuestion;
        let disabled = (currentIndex == 0) ? true : false;
        let disableMarker = (currentIndex == 0) ? 'disabled-marker' : '';
        let questionLength = (Object.keys(questionList).length - 1);
        let questionArr = [];
        questionArr = <React.Fragment>
            <Row className="mt-2 mb-3 pr-5 border-bottom">
                <Col xs={6} sm={6} md={6} className="text-left">
                    <Label for="marks"><strong> Question: </strong>{currentIndex + 1} out of {questionList.length}</Label>
                </Col>
                <Col xs={6} sm={6} md={6} className="text-right">
                    <Label for="marks"><strong>Marks: </strong>{questionList[currentIndex].marks}</Label>
                </Col>
            </Row>
            <div className="row form-group">
                <div className="col-sm-2">
                    <Label for="question"><strong>Question: </strong></Label>
                </div>
                <div className="col-sm-10 p-sm-l-0">
                    <Label for="question-que">{questionList[currentIndex].question}</Label>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-sm-2">
                    <Label for="marks"><strong>Answer</strong></Label>
                </div>
                <div className="col-sm-10 p-sm-l-0">
                    {this.renderOption(questionList[currentIndex].Options, currentIndex, questionList[currentIndex].id)}
                </div>
            </div>
        </React.Fragment>
        return (
            <Fullscreen
                enabled={this.state.isFull}
                onChange={isFull => this.setState({ isFull })}
            >
                <div className={`mt-2 img-thumbnail ${this.state.isFull ? `h-100` : `page-viewer`}`}>

                    <React.Fragment><Button color="info" className="position-absolute btn-auto pt-1 pb-1 px-2 index-1 right-thumb" onClick={this.expandDocument}>
                        <FeatherIcon icon={this.state.isFull ? "minimize" : "maximize"} size="18" className="mb-1" />
                    </Button>
                        <div className="activities-form text-medium">
                            <Col>
                                <Form id="activities" onSubmit={this.handleTestSubmit}>
                                    {questionArr}
                                </Form>
                            </Col>
                        </div>
                        <div className="bottom-btns">
                            <div className="actions">
                                <Button color="info" disabled={disabled} className={"btn-auto pt-1 pb-1 px-2 mr-2 " + disableMarker} onClick={() => this.getPreviousQuestion(this.state.assessment.currentQuestion)}>
                                    Previous
                            </Button>
                                {currentIndex < questionLength && <Button color="info" className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getNextQuestion(this.state.assessment.currentQuestion)}>
                                    Next
                            </Button>}
                                {currentIndex == questionLength && <Button color="info" className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.handleTestSubmit()}>
                                    Submit
                            </Button>}
                            </div>
                        </div></React.Fragment>

                </div>
            </Fullscreen>
        )
    }

    renderResult = () => {
        let passingScore = 0;
        let yourScore = 0;
        let isPass = false;
        let message = 'Failed!';
        let className = 'danger';
        let messageText = 'Unfortunately you could not clear the test';
        if ('isPassed' in this.state.assessment.result) {
            passingScore = this.state.assessment.result.passingPercentage;
            yourScore = this.state.assessment.result.scoredPercentage;
            if (this.state.assessment.result.isPassed) {
                isPass = true;
                message = 'Congratulations!';
                className = 'success';
                messageText = 'Congratulations you have successfully completed the test.'
                if (this.state.assessment.updateProgress) {
                    let activityProgress = this.state.assessment.activityProgress;
                    activityProgress[this.state.assessment.activityId] = 2;
                    let request = { progress: activityProgress }
                    let userId = this.state.userId;
                    let courseId = this.props.accessData.id;
                    this.state.assessment.updateProgress = false
                    this.props.updateActivityProgress(this.props.token, userId, courseId, request);
                }
            }
        }
        this.state.assessment.questions = [];
        this.state.assessment.testAttempt = [];
        this.state.assessment.currentQuestion = 0;

        return (
            <div className="img-thumbnail page-viewer text-center">
                <FeatherIcon icon={isPass ? "check-circle" : "x-circle"} size="50" className={"mb-2 mt-5 text-" + className} /><br />
                <h1 className={"display-4 text-" + className}>{message}</h1>
                <h1 className={"display-6 text-center mt-3 text-" + className}>
                    {messageText}
                </h1>
                <p className="text-large text-center mt-3 mb-2">
                    Passing %: {passingScore} %
                </p>
                <p className="text-large text-center mb-3">
                    Your Score: {yourScore.toFixed(2)} %
                </p>
                <p className="text-large text-center">
                    {isPass && 'Best of luck for your next activity.'}
                    {!isPass && 'Please attempt the test again.'}
                </p>
                {(this.state.userSubscribedCount == 0) && <p className="comment-font text-center">
                <strong><a href="/#/subscription-plan">Click here</a> to enroll for annual membership to get the next step of education or <a href="/#/subscription-plan">Click here</a> to sign up for certification and training.</strong>
                </p>}
            </div>
        );
    }

    renderActivityName = (id, sortActivityName, fullActivityName) => {
        return (
            <React.Fragment>
                <span scope="row" id={'activity'+id}>
                    {sortActivityName}
                </span>
                <UncontrolledTooltip
                    placement="top"
                    target={'activity'+id}>
                    {fullActivityName}
                </UncontrolledTooltip>
            </React.Fragment>
        );
    }

    renderAction = (id, type, isAction, runningStatus) => {
        let isDisable = (isAction) ? true : false;
        return (
            <div className="actions">
                {(type == 'content' || type == 'link') && <Button color="info" className="btn-auto pt-1 pb-1 px-2 mr-2" disabled={isDisable} onClick={() => this.activeActivity(id, { activityType: '' })}>
                    <FeatherIcon icon="eye" size="18" className="mb-1" />
                </Button>}
                {type == 'assessment' && <Button color="info" className="btn-auto pt-1 pb-1 px-2 mr-2" disabled={isDisable} onClick={() => this.activeActivity(id, { activityType: 'assessment' })}>
                    <FeatherIcon icon="eye" size="18" className="mb-1" />
                </Button>}
                {runningStatus && <Badge color={'warning'} pill className="px-2 pt-1 pb-1">{'Running'}</Badge>}
            </div>
        );
    }

    activeActivity = (id, additional = {}) => {
        let activitiesList = this.props.accessData.Activities;
        let actProgress = this.state.assessment.activityProgress;

        this.state.assessment.result = {}
        this.state.assessment.updateProgress = true;
        let userId = this.state.userId;
        let courseId = this.props.accessData.id;
        
        let request = {}
        if (actProgress[id] != 2) {
            for (let actId in actProgress) {
                if (actProgress[actId] == 0) {
                    let obj1 = activitiesList.find((item, index) => {
                        if (item.id == id && item.type != 'assessment') { //&& item.type != 'assessment'
                            console.log("type==>", item.type);
                            actProgress[id] = (item.type != 'assessment') ? 2 : 1;
                        } else if(item.id == id && item.type == 'assessment'){
                            actProgress[id] = 1;
                        }
                    });
                }
            }
            this.state.assessment.activityProgress = actProgress;
            request.progress = actProgress;
            this.props.updateActivityProgress(this.props.token, userId, courseId, request);
        }

        this.setState({
            ...this.state,
            content: {
                ...this.state.content,
                activeActivity: this.state.content.activitiesId.indexOf(id)
            },
            assessment: {
                ...this.state.assessment,
                ...additional,
                activityId: id
            },
            fileType: ''
        });
    }

    renderActivities = (activities) => {
        let progress = [];
        if (Object.keys(this.state.assessment.activityProgress).length > 0) {
            progress = this.state.assessment.activityProgress;
        }
        let isDisable = true;
        let count = 1;
        return activities.map((item, key) => {
            let activityTypeValue = '';
            let runningStatus = false;
            switch (item.type) {
                case 'content':
                    activityTypeValue = 'Content';
                    break;
                case 'link':
                    activityTypeValue = 'Youtube Link';
                    break;
                case 'assessment':
                    activityTypeValue = 'Assessment';
                    break;
                default:
                    activityTypeValue = '';
            }

            let progressStatus = 'Not Started';
            let badgeClass = 'info';
            let activityId = item.id;
            if (progress[item.id] == 2) {
                progressStatus = 'Completed';
                badgeClass = 'success';
                isDisable = false;
            } else if (progress[item.id] == 1) {
                progressStatus = 'In-Progress';
                badgeClass = 'warning';
                isDisable = false;
                count++;
            } else {
                isDisable = (count > 1) ? true : false;
                count++;
            }
            isDisable = (this.state.content.prerequisite) ? isDisable : false;
            let name = item.name;
            let nameType = false;
            if(item.name.length > 15) {
                name = name.slice(0,15)+"...";
                nameType = true;
            }
            if(this.state.content.activeActivity == key){
                runningStatus = true;
            }
            return {
                id: item.id,
                activityName: (nameType) ? this.renderActivityName(item.id, name, item.name) : item.name,
                activityType: activityTypeValue,
                status: item.isActive ? 'Active' : 'Inactive',
                progress: <Badge color={badgeClass} pill className="px-2 pt-1 pb-1">{progressStatus}</Badge>,
                action: this.renderAction(item.id, item.type, isDisable, runningStatus),
            }
        });
    }

    render = () => {
        let activitiesList = [];
        if (this.state.content.activities.length > 0) {
            activitiesList = this.renderActivities(this.state.content.activities);
            activitiesList = activitiesList.filter(item => item !== undefined);
        }

        if (this.state.assessment.activityType == 'assessment' && !this.state.assessment.isQuestionRequesting && this.state.assessment.questions.length === 0) {
            this.getQuestion(this.state.assessment.activityId);
        }

        if (Object.keys(this.props.GetTestActivity).length > 0 && 'status' in this.props.GetTestActivity) {
            if (this.props.GetTestActivity.status && this.props.GetTestActivity.data.length > 0) {
                this.setState({
                    ...this.state,
                    assessment: {
                        ...this.state.assessment,
                        questions: this.props.GetTestActivity.data,
                        isQuestionRequesting: false
                    }
                });
            }
            this.props.getTestActivity(this.props.token);
        }

        if (Object.keys(this.props.SubmitTestQuestion).length > 0 && 'status' in this.props.SubmitTestQuestion) {
            if (this.props.SubmitTestQuestion.status) {
                this.setState({
                    ...this.state,
                    assessment: {
                        ...this.state.assessment,
                        result: this.props.SubmitTestQuestion.data
                    }
                });
            }
            this.props.submitTestQuestion(this.props.token);
        }

        if (Object.keys(this.props.GetUserCoursesDetails).length > 0 && this.state.assessment.activityProgress.length == 0 && 'status' in this.props.GetUserCoursesDetails) {
            if (this.props.GetUserCoursesDetails.status) {
                if (!Array.isArray(this.props.GetUserCoursesDetails.data)) {
                    if (JSON.parse(this.props.GetUserCoursesDetails.data.progress) != null) {
                        if (Object.keys(JSON.parse(this.props.GetUserCoursesDetails.data.progress)).length > 0) {
                            this.setState({
                                ...this.state,
                                assessment: {
                                    ...this.state.assessment,
                                    activityProgress: JSON.parse(this.props.GetUserCoursesDetails.data.progress)
                                }
                            });
                            this.props.getUserCoursesDetails(this.props.token);
                        }
                    }
                }
            }
        }

        return (
            <Modal isOpen={this.props.contentEnable} toggle={this.props.onContentCompleted} className="modal-lg">
                <ModalHeader toggle={this.props.onContentCompleted}>
                    <span className="display-5">{this.state.content.courseName}</span>
                </ModalHeader>
                <ModalBody>
                    <div className="content-page text-medium">
                        <Col>
                            {(this.state.content.activities.length > 0 && this.state.assessment.activityType == '') && this.renderContent(this.state.content.activeActivity)}
                            {Object.keys(this.state.assessment.questions).length > 0 && this.state.assessment.activityType == 'assessment' && this.renderQuestionContent()}
                            {Object.keys(this.state.assessment.result).length > 0 && this.state.assessment.activityType == '' && this.renderResult()}

                            <div className="mt-3">
                                <BootstrapTable
                                    bootstrap4
                                    keyField="id"
                                    data={activitiesList}
                                    columns={columns}
                                    noDataIndication="No Record Found."
                                    pagination={paginationFactory()}
                                />
                            </div>
                        </Col>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.props.onContentCompleted}>
                        <FeatherIcon icon="x" size="20" className="mb-1" /> Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetTestActivity: state.GetTestActivity,
        SubmitTestQuestion: state.SubmitTestQuestion,
        UpdateActivityProgress: state.UpdateActivityProgress,
        GetUserCoursesDetails: state.GetUserCoursesDetails
    }
}

export default withRouter(connect(mapStateToProps, { getTestActivity, submitTestQuestion, updateActivityProgress, getUserCoursesDetails })(CourseContent));