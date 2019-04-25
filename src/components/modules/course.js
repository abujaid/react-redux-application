import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PaypalExpressBtn from "react-paypal-express-checkout";
import ReactAutocomplete from "react-autocomplete";
import axios from "axios";

import FeatherIcon from 'feather-icons-react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Button, UncontrolledAlert,
    Card, CardBody, CardTitle, CardText, CardFooter, Modal, ModalBody, ModalFooter, Progress } from 'reactstrap';
import DonutChart from 'react-donut-chart';

import { API_URL } from './../../constants';
import CourseContent from './course_content';
import UserFeedback from './user_feedback';
import { getCourses, getCourse, getUserCoursesDetails, getFeedbackQuestion } from './../../actions/modules_action/courses';
import { getBasicCourses, getEducationCourses } from './../../actions/home_action';
import { updateUser } from './../../actions/modules_action/users';


class Course extends Component {
    constructor(props) {
        super(props);

        let userId = 0;
        let courses = [];
        let courseIds = [];
        let subscriptionId = [];
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
			if(user_data.data.Courses.length > 0) {
                courses = user_data.data.Courses;
                user_data.data.Courses.map(item => {
                    return courseIds.push(item.id);
                });
            }
            if(user_data.data.Subscriptions.length > 0) {
                user_data.data.Subscriptions.map(item => {
                    subscriptionId.push(item.id);
                });
            }
        }
        
        let activeTab = '1';
        if(this.props.location.state !== undefined) {
            if('activeTab' in this.props.location.state) {
                activeTab = this.props.location.state.activeTab;
            }
            if('activeCourse' in this.props.location.state && courseIds.indexOf(this.props.location.state.activeCourse)) {
                activeTab = '2';
            }
            console.log("this.props.location.state.enrolledCourse=>", this.props.location.state);
            if('activeCourse' in this.props.location.state && 'enrolledCourse' in this.props.location.state) {
                if(this.props.location.state.enrolledCourse == 'enroll'){
                    let request = {
                        courseId: this.props.location.state.activeCourse,
                        paidPrice: 0.00
                    };
                    this.props.updateUser(this.props.token, userId, request);
                }
            }
        }
        
        this.state = {
            activeTab: activeTab,
            env: 'production',
            currency: 'USD',
            client: {
                sandbox: "AcO-BtfdlfFyfw3WixxRKzOQ3J1QVDfgHYHDpsE1hyep-wUtNMKSMPHMhPe89EaFNE3LJ8YdSLgC2Yn_",
                production: "ARPydh_zCObxigPb8HWNPSGcVQ6BnUE8a2Rzd6xiBT3mV6SNoktJyewR1qqGtSOaIJo_TyIHGA2KpKcA"
            },
            userId: userId,
            subscriptions: [],
            joinedCourseIds: courseIds,
            joinedCourses: courses,
            subscriptionId: subscriptionId,
            formErrorMessage: '',
            accessId: 0,
            isContentEnable: false,
            paySuccess: false,
            enrollSuccess: false,
            onSuccess: false,
            onCancel: false,
            onError: false,
            paymentSuccess: false,
            value: '',
            searchedCourseId: null,
            searchedCourses: [],
            progressDetails: [],
            completedStatus: false,
            isFeedbackEnable: false
        }

        this.props.getCourses(this.props.token);
        this.props.getUserCoursesDetails(this.props.token, userId);
    }

    changeAutocompleteValue = (e,query)=>{
        this.setState({ value: e.target.value });
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.token;
        axios.get(`${API_URL}/private/courses/search?q=${e.target.value}`, {
          })
          .then((response)=> {
              this.setState({searchedCourses:response.data.data.map((course)=>course), searchedCourseId: null});
          })
          .catch(function (error) {
          });
    };

    updateState = (additionalState = {}) => {
        let userId = 0;
        let courses = [];
        let courseIds = [];
        let subscriptionId = [];
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
			if(user_data.data.Courses.length > 0) {
                courses = user_data.data.Courses;
                user_data.data.Courses.map(item => {
                    courseIds.push(item.id);
                });
            }
            if(user_data.data.Subscriptions.length > 0) {
                user_data.data.Subscriptions.map(item => {
                    subscriptionId.push(item.id);
                });
            }
        }
        this.setState({
            ...this.state,
            ...additionalState,
            userId: userId,
            subscriptions: [],
            joinedCourseIds: courseIds,
            joinedCourses: courses,
            subscriptionId: subscriptionId,
        });
    }

    toggleTab = (tab) => {
        let completedStatus = (tab != 1) ? true : false;
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
                completedStatus: completedStatus
            });
        }
    }

    getActivityContent = (id) => {
        this.setState({
            ...this.state,
            accessId: id,
        });
        this.props.getCourse(this.props.token, id);

    }

    feedbackQuestion = (id) => {
        this.setState({
            ...this.state,
            accessId: id,
        });
        this.props.getFeedbackQuestion(this.props.token);
    }

    formModalToggle = () => {
        this.setState({
            ...this.state,
            formErrorMessage: '',
            accessId: 0,
            isContentEnable: !this.state.isContentEnable
        });
        if(Object.keys(this.props.GetCourse).length > 0) {
            this.props.getCourse(this.props.token);
        }
    }

    feedbackModalToggle = () => {
        this.setState({
            ...this.state,
            feedbackErrorMessage: '',
            accessId: 0,
            isFeedbackEnable: !this.state.isFeedbackEnable
        });
        // if(Object.keys(this.props.GetCourse).length > 0) {
        //     this.props.getCourse(this.props.token);
        // }
    }

    enrollCourse = (courseId) => {
        if(courseId) {
            let request = {
                courseId: courseId,
                paidPrice: 0.00
            };
            this.props.updateUser(this.props.token, this.state.userId, request);
        }
    }

    enrollSuccessToggle = () => {
        this.setState({
            ...this.state,
            formErrorMessage: '',
            enrollSuccess: !this.state.enrollSuccess
        });
    }

    enrollSuccessModal = () => {
        return (
            <Modal isOpen={this.state.enrollSuccess} toggle={this.enrollSuccessToggle} className={this.props.className}>
                <ModalBody>
                    <h1 className="mt-3 display-5 text-center text-success">
                        <FeatherIcon icon="check-circle" size="50" className="mb-2" /><br />
                        You have enrolled successfully.
                    </h1>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.enrollSuccessToggle}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

    onSuccessModalClose = () => {
        this.setState({
            ...this.state,
            onSuccess: false,
            onCancel: false,
            onError: false,
            paymentSuccess: true
        });
    };

    onSuccess = (payment, id, amount) => {
        console.log("The payment was succeeded!!", payment);
        this.setState({
            ...this.state,
            onSuccess: true
        });
      
        let request = {
            courseId: id,
            paidPrice: amount
        };
        this.props.updateUser(this.props.token, this.state.userId, request);
    }

    successModal = token => {
        return (
            <Modal
                isOpen={this.state.onSuccess}
                toggle={this.onSuccessModalClose}
                className={this.props.className}
            >
                <ModalBody>
                    <h1 className="mt-3 display-5 text-center text-success">
                        <FeatherIcon icon="check-circle" size="50" className="mb-2" />
                        <br />
                        Your Payment is successfully completed.
                    </h1>
                    <p className="mt-3 text-center text-medium">
                        Please check in enrolled section to launch your course.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.onSuccessModalClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };

    onErrorModalClose = () => {
        this.setState({
            ...this.state,
            onSuccess: false,
            onCancel: false,
            onError: false
        });
    };

    onCancel = (data) => {
        console.log('The payment was cancelled!!', data);
        this.setState({
            ...this.state,
            onCancel: true
        });
    }

    cancelModal = () => {
        return (
            <Modal
                isOpen={this.state.onCancel}
                toggle={this.onErrorModalClose}
                className={this.props.className}
            >
                <ModalBody>
                    <h1 className="mt-3 display-5 text-center text-danger">
                        <FeatherIcon icon="x-circle" size="50" className="mb-2" />
                        <br />
                        Your Payment is cancelled
                    </h1>
                    <p className="text-center text-medium">Retry your payment again.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.onErrorModalClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };

    onError = (error) => {
        console.log("Error!!", error);
    }

    renderPaypal = (amount, id) => (
        <PaypalExpressBtn
            env={this.state.env}
            client={this.state.client}
            currency={this.state.currency}
            total={amount}
            onError={this.onError}
            onSuccess={payment => this.onSuccess(payment, id, amount)}
            onCancel={data => this.onCancel(data)}
        />
    )

    sumActivityStatus = function (obj) {
        return Object.keys(obj).reduce(function (sum, next) {
          return sum + obj[next];
        }, 0);
      };

    getCompletedCourse = (id) => {
        let course_details = this.state.progressDetails;
        let completed = {};
        let status = false;
        let processPercent = 0;
        let countActivity = 0;
        if(course_details.length == 0 || course_details == undefined){
            return {status: false, marks: 0, progress: {}}
        }
        for(var prop in course_details) {
            if(course_details[prop].progress == undefined){
                return {status: false, marks: 2, progress: {}}
            }

            if(course_details[prop].Course.id == id){
                let userFeedbackStatus = course_details[prop].feedbackGiven;
                let obj = JSON.parse(course_details[prop].progress);
                if(obj != null){
                    countActivity = Object.keys(obj).length;
                    var sumProgress = this.sumActivityStatus(obj);
                    processPercent = (sumProgress * 100) / (countActivity*2).toFixed(2);
                    status  = (processPercent == 100) ? true : false;
                    if(status){
                        return {status: true, marks: processPercent, progress: obj, feedbackStatus: userFeedbackStatus}
                    } else {
                        return {status: false, marks: processPercent, progress: obj, feedbackStatus: userFeedbackStatus}
                    }
                } else {
                    return {status: false, marks: processPercent, progress: obj, feedbackStatus: userFeedbackStatus}
                }
            }
        }
    }

    renderCourses = (courseStatus) => {
        let render = false;
        let enroll = true;
        let price = 0;
        let priceLabel = '';
       if(Object.keys(this.props.GetCourses).length > 0 && 'status' in this.props.GetCourses) {
            if(this.props.GetCourses.status) {
                if(this.props.GetCourses.data.length > 0) {
                    return this.props.GetCourses.data.map(item => {
                        //var completedCourse =  {status: false, marks: 0, progress: {}};
                        let completedCourse = {};
                        if(this.state.searchedCourseId&&item.id!==this.state.searchedCourseId) {
                            if(this.state.searchedCourses.length) {
                            return;
                            }
                        }
                        if(item.isActive === true && item.Activities.length > 0) {
                            render = false;
                            enroll = true;
                            price = 0;
                            priceLabel = <span>Free</span>;
    
                            if(item.coursePrice > 0) {
                                if(this.state.subscriptionId.length > 0) {
                                    if(item.subscribedPrice > 0) {
                                        enroll = false;
                                        price = item.subscribedPrice;
                                        priceLabel = <span><del>${item.coursePrice}</del> ${item.subscribedPrice}</span>;
                                    } else {
                                        price = <span>Free</span>;
                                    }
                                } else {
                                    enroll = false;
                                    price = item.coursePrice;
                                    priceLabel = <span>${item.coursePrice}</span>;
                                }
                            }
                            let donutHeight = 200;
                            let donutWidth = 200;
                            let colorCode = ['#28a745'];
                            let emptyColorCode = ['#28a745'];
                            if(this.state.completedStatus && this.state.joinedCourseIds.indexOf(item.id) > -1){
                                completedCourse = this.getCompletedCourse(item.id);
                            }
                            //console.log("completedCourse==>"+item.id+"<<==", completedCourse);
                            if(completedCourse == undefined || Object.keys(completedCourse) == 0){
                                completedCourse = {status: false, marks: 0, progress: {}, feedbackStatus: false};
                            }
                            
                            if((courseStatus === 'all' && this.state.joinedCourseIds.indexOf(item.id) === -1) || 
                            (courseStatus === 'enrolled' && this.state.joinedCourseIds.indexOf(item.id) > -1) || 
                            (courseStatus === 'basic' && this.state.joinedCourseIds.indexOf(item.id) > -1 && parseFloat(price) == 0) ||
                            (courseStatus === 'education' && this.state.joinedCourseIds.indexOf(item.id) > -1 && parseFloat(price) > 0) ||
                            (courseStatus === 'completed' && this.state.joinedCourseIds.indexOf(item.id) > -1 && completedCourse.status == true)) {
                                render = true;
                            }
                            let isFeedbackButtonDisable = false;
                            if(completedCourse.feedbackStatus){
                                isFeedbackButtonDisable = true;
                            }

                            if(render) {
                                return (
                                    <Col sm="6" md="4" key={item.id}>
                                        <Card className="mb-4">
                                            <div className="mt-3 d-flex justify-content-center align-items-center card-image">
                                                <img src={`${API_URL}/${item.image}`} alt={item.name} />
                                            </div>
                                            <CardBody>
                                                <CardTitle className="display-6">
                                                    {item.name}
                                                </CardTitle>
                                                <CardText className="text-medium">
                                                    Total Activities: {item.Activities.length}
                                                </CardText>
                                                {this.state.completedStatus && 'marks' in completedCourse &&
                                                    <Progress animated color="success" value={completedCourse.marks} className="mb-2" />
                                                } 
                                                <div>
                                                    <strong className="text-success display-6">
                                                        {priceLabel}
                                                    </strong>
                                                </div>
                                            </CardBody>
                                            {(courseStatus === 'completed')  ? '' : <CardFooter>
                                                {(courseStatus === 'enrolled' || courseStatus === 'basic' || courseStatus === 'education') ? 
                                                    <React.Fragment>
                                                        {item.isFeedback && <Button color="info" disabled={isFeedbackButtonDisable} className="btn-auto" onClick={()=> this.feedbackQuestion(item.id)}>
                                                            Feedback
                                                        </Button>}
                                                        <Button color="success" className="float-right btn-auto" onClick={() => this.getActivityContent(item.id)}>
                                                            Launch
                                                        </Button>
                                                    </React.Fragment>
                                                    :
                                                    enroll ? 
                                                    <Button color="success" className="float-right btn-auto" onClick={() => this.enrollCourse(item.id)}>
                                                        Enroll
                                                    </Button> : 
                                                    <span className="float-right">{this.renderPaypal(parseFloat(price), item.id)}</span> 
                                                }
                                            </CardFooter> }
                                        </Card>
                                    </Col>
                                );
                            }
                        }
                  });
                } else {
                    return (
                        <p><em>No Course Available.</em></p>
                    );
                }
                
            }
        }
        
    }

    renderContent = (accessData) => {
        let activityProgress = this.getCompletedCourse(accessData.id);
        return (
            <CourseContent
                error={this.state.formErrorMessage}
                token={this.props.token}
                accessData={accessData}
                contentEnable={this.state.isContentEnable}
                onContentCompleted={this.formModalToggle}
                submit={() => {}}
            />
        );
    }

    renderFeedback = (feedbackData) => {
        return (
            <UserFeedback
                error={this.state.formErrorMessage}
                token={this.props.token}
                accessId= {this.state.accessId}
                feedbackData={feedbackData}
                contentEnableFeedback={this.state.isFeedbackEnable}
                onFeedbackCompleted={this.feedbackModalToggle}
            />
        )
    }

    render = () => {
        let accessData = {};
        let feedbackData = {}
        if(Object.keys(this.props.GetCourse).length > 0 && 'status' in this.props.GetCourse) {
            if(this.props.GetCourse.status) {
                if(this.state.isContentEnable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isContentEnable: true
                    });
                }
                accessData = this.props.GetCourse.data;
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something went wrong.',
                        accessId: 0,
                        isContentEnable: false
                    });
                    this.props.getCourses(this.props.token);
                }
            }
        }

        if(Object.keys(this.props.UpdateUser).length > 0 && 'status' in this.props.UpdateUser) {
            if(this.props.UpdateUser.status) {
                this.props.updateUser(this.props.token, this.state.userId, {});
                this.props.getCourses(this.props.token);
                this.updateState({
                    enrollSuccess: true
                });
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something went wrong.',
                    });
                }
            }
        }

        if(Object.keys(this.props.GetUserCoursesDetails).length > 0 && this.state.progressDetails.length == 0 && 'status' in this.props.GetUserCoursesDetails){
            if(this.props.GetUserCoursesDetails.status){
                this.setState({
                    ...this.state,
                    progressDetails: this.props.GetUserCoursesDetails.data
                });
                this.props.getUserCoursesDetails(this.props.token);
            }
            
        }

        if(Object.keys(this.props.FeedbackQuestion).length > 0 && 'status' in this.props.FeedbackQuestion) {
            if(this.props.FeedbackQuestion.status) {
                if(this.state.isFeedbackEnable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFeedbackEnable: true
                    });
                }
                feedbackData = this.props.FeedbackQuestion.data;
            } else {
                if(this.state.feedbackErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        feedbackErrorMessage: 'Something went wrong.',
                        accessId: 0,
                        isFeedbackEnable: false
                    });
                    this.props.getFeedbackQuestion(this.props.token, 'reset');
                }
            }
        }

        return (
            <section>
                <div style = {{ display: 'inline', float: 'right'}} className="searchContainer">
                <ReactAutocomplete
                    value={ this.state.value }
                    inputProps={{ id: 'states-autocomplete', className: 'searchBox', placeholder: '', type:'Search' }}
                    wrapperStyle={{ position: 'relative', display: 'inline-block'}}
                    items={this.state.searchedCourses?this.state.searchedCourses:[]}
                    shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.name}
                    renderItem={(item, highlighted) =>
                    <div
                        key={item.id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                    >
                        {item.name}
                    </div>
                    }
                    value={this.state.value}
                    onChange={e => this.changeAutocompleteValue(e)}
                    onSelect={(value,item) => this.setState({ value,searchedCourseId:item.id })}
                />
                </div>
                
                <h1 className="display-5">My Course</h1>
                {this.state.formErrorMessage !== '' && <UncontrolledAlert className="text-left" color="danger">
                    <strong>Error:</strong> {this.state.formErrorMessage}
                </UncontrolledAlert>}
                <div className="module-content">
                    <Nav className="md-tabs d-flex flex-row pointer" tabs>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "1" ? "active" : ""}  onClick={() => this.toggleTab('1')}>
                                All
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "2" ? "active" : ""}  onClick={() => this.toggleTab('2')}>
                                Enrolled
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "3" ? "active" : ""} onClick={() => this.toggleTab('3')}>
                                Basic
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "4" ? "active" : ""} onClick={() => this.toggleTab('4')}>
                                Education
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "5" ? "active" : ""} onClick={() => this.toggleTab('5')}>
                                Completed
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="md-content">
                        <TabPane tabId="1">
                            <Row>
                                {this.renderCourses('all')}
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                {this.renderCourses('enrolled')}
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                {this.renderCourses('basic')}
                            </Row>
                        </TabPane>
                        <TabPane tabId="4">
                            <Row>
                                {this.renderCourses('education')}
                            </Row>
                        </TabPane>
                        <TabPane tabId="5">
                            <Row>
                                {this.renderCourses('completed')}
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
                {this.state.isContentEnable && this.renderContent(accessData)}
                {this.state.enrollSuccess && this.enrollSuccessModal()}
                {this.state.onSuccess && this.successModal(this.props.token)}
                {this.state.onCancel && this.cancelModal()}
                {this.state.isFeedbackEnable && this.renderFeedback(feedbackData)}
            </section>
        );
    }

    componentDidUpdate = () => {
        if(this.props.location.state !== undefined && 'activeCourse' in this.props.location.state) {
            this.getActivityContent(this.props.location.state.activeCourse);
            this.props.location.state = undefined;
        }
    }
}

const mapStateToProps = state => {
    return {
        GetCourses: state.GetCourses,
        GetCourse: state.GetCourse,
        UpdateUser: state.UpdateUser,
        BasicCourses: state.BasicCourses,
        EducationCourses: state.EducationCourses,
        GetUserCoursesDetails: state.GetUserCoursesDetails,
        FeedbackQuestion: state.FeedbackQuestion
    }
}

export default withRouter(connect(mapStateToProps, { getCourses, getCourse, updateUser, getBasicCourses, getEducationCourses, getUserCoursesDetails, getFeedbackQuestion })(Course));
