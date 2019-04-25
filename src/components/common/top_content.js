import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import FeatherIcon from 'feather-icons-react';
import {
    Container, Row, Col, Card, CardBody, CardTitle, CardText, CardLink, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from 'reactstrap';

import { API_URL } from './../../constants';
import { getBasicCourses, getEducationCourses } from './../../actions/home_action';

import lesson1 from './../../images/home/lesson-1.jpeg';
import lesson2 from './../../images/home/lesson-2.jpeg';
import lesson3 from './../../images/home/lesson-3.jpeg';
import lesson4 from './../../images/home/lesson-4.jpeg';
import lesson5 from './../../images/home/lesson-5.jpeg';
import lesson6 from './../../images/home/lesson-6.jpeg';

class TopContent extends Component {
    constructor(props) {
        super(props);

        let user_data = '';
        let loggedIn = false;
        let token = '';
        let enrolledCourse = [];
        if (localStorage.getItem('fs_user_data') !== null) {
            loggedIn = true;
            user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            token = user_data.token;
            enrolledCourse = user_data.data.Courses;
        }
        this.state = {
            activeCourseId: '',
            loggedIn: loggedIn,
            token: token,
            activeBasicCourse: false,
            activeEducationCourse: false,
            children: [],
            activeItemIndex: 0,
            enrolledCourse: enrolledCourse
        }
        this.props.getBasicCourses();
        this.props.getEducationCourses();
    }

    activeBasicCourse = (index) => {
        this.setState({
            ...this.state,
            activeCourseId: !this.state.activeBasicCourse ? index : '',
            activeBasicCourse: !this.state.activeBasicCourse
        });
    }

    activeEducationCourse = (index) => {
        this.setState({
            ...this.state,
            activeCourseId: !this.state.activeEducationCourse ? index : '',
            activeEducationCourse: !this.state.activeEducationCourse
        });
    }

    activeBasicsCourse = () => {
        let activeCourse = this.props.BasicCourses.data[this.state.activeCourseId];
        let courseStatus = undefined;
        if (this.state.enrolledCourse.length > 0) {
            courseStatus = this.state.enrolledCourse.find((item, index) => {
                if (item.id === activeCourse.id) {
                    return true;
                }
            });
        }
        let isEnrolled = (courseStatus == undefined) ? false : true;
        let loginActionBasic = {};
        if (isEnrolled) {
            loginActionBasic = {
                pathname: "/login",
                state: {
                    path: `/profile/course/${this.state.token}`,
                    activeCourse: activeCourse.id
                }
            }
        } else {
            loginActionBasic = {
                pathname: "/login",
                state: {
                    path: `/profile/course/${this.state.token}`,
                    activeCourse: activeCourse.id,
                    enrolledCourse: 'enroll'
                }
            }
        }
        return (
            <Modal isOpen={this.state.activeBasicCourse} toggle={this.activeBasicCourse} className="modal-lg">
                <ModalHeader toggle={this.activeBasicCourse}>
                    <span className="display-5">{activeCourse.name}</span>
                </ModalHeader>
                <ModalBody>
                    <Alert color="secondary">
                        {this.state.loggedIn ?
                            (isEnrolled) ? <p className="text-large d-flex align-items-center mb-0">
                                Go to
                                <Link
                                    className="btn btn-danger btn-auto ml-auto"
                                    to={{
                                        pathname: `/profile/course/${this.state.token}`,
                                        state: { activeCourse: activeCourse.id }
                                    }}
                                >
                                    <FeatherIcon icon="book" size="18" className="mb-1" /> Course Page
                                </Link>
                            </p> :
                                <p className="text-large d-flex align-items-center mb-0">
                                    To see the complete course content it is required you to enroll into the course
                                <Link
                                        className="btn btn-danger btn-auto ml-auto"
                                        to={{
                                            pathname: `/profile/course/${this.state.token}`,
                                            state: { activeCourse: activeCourse.id, enrolledCourse: 'enroll' }
                                        }}
                                    >
                                        <FeatherIcon icon="book" size="18" className="mb-1" /> Enroll
                                </Link>
                                </p>
                            :
                            <p className="text-large d-flex align-items-center mb-0">
                                For Full access to courses you'll need to take a minute to
                                <Link
                                    className="ml-auto btn btn-danger btn-auto"
                                    to={loginActionBasic}
                                >
                                    <FeatherIcon icon="log-in" size="18" className="mb-1" /> Login
                                </Link>
                            </p>}
                    </Alert>
                    <p className="text-left text-medium">
                        <img src={`${API_URL}/${activeCourse.image}`} className="img-thumbnail float-left w-50 mr-3 mb-3" />
                        {activeCourse.description}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.activeBasicCourse}>
                        <FeatherIcon icon="x" size="20" className="mb-1" /> Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    activeEducationsCourse = () => {
        let activeCourse = this.props.EducationCourses.data[this.state.activeCourseId];
        let courseStatus = undefined;
        if (this.state.enrolledCourse.length > 0) {
            courseStatus = this.state.enrolledCourse.find((item, index) => {
                if (item.id === activeCourse.id) {
                    return true;
                }
            });
        }
        let isEnrolled = (courseStatus == undefined) ? false : true;
        let loginAction = {}
        if (isEnrolled) {
            loginAction = {
                pathname: "/login",
                state: {
                    path: `/profile/course/${this.state.token}`,
                    activeCourse: activeCourse.id
                }
            }
        } else {
            loginAction = {
                pathname: "/login",
                state: {
                    path: `/profile/course/${this.state.token}`,
                    activeCourse: activeCourse.id,
                    enrolledCourse: 'enroll'
                }
            }
        }

        return (
            <Modal isOpen={this.state.activeEducationCourse} toggle={this.activeEducationCourse} className="modal-lg">
                <ModalHeader toggle={this.activeEducationCourse}>
                    <span className="display-5">{activeCourse.name}</span>
                </ModalHeader>
                <ModalBody>
                    <Alert color="secondary">
                        {this.state.loggedIn ?
                            (isEnrolled) ? <p className="text-large d-flex align-items-center mb-0">
                                Go to
                            <Link
                                    className="btn btn-danger btn-auto ml-auto"
                                    to={{
                                        pathname: `/profile/course/${this.state.token}`,
                                        state: { activeCourse: activeCourse.id }
                                    }}
                                >
                                    <FeatherIcon icon="book" size="18" className="mb-1" /> Course Page
                            </Link>
                            </p> :
                                <p className="text-large d-flex align-items-center mb-0">
                                    To see the complete course content it is required you to enroll into the course
                            <Link
                                        className="btn btn-danger btn-auto ml-auto"
                                        to={{
                                            pathname: `/profile/course/${this.state.token}`,
                                            state: { activeCourse: activeCourse.id, enrolledCourse: 'enroll' }
                                        }}
                                    >
                                        <FeatherIcon icon="book" size="18" className="mb-1" /> Enroll
                            </Link>
                                </p>
                            :
                            <p className="text-large d-flex align-items-center mb-0">
                                For Full access to courses you'll need to take a minute to
                            <Link
                                    className="ml-auto btn btn-danger btn-auto"
                                    to={loginAction}
                                >
                                    <FeatherIcon icon="log-in" size="18" className="mb-1" /> Login
                            </Link>
                            </p>}
                    </Alert>
                    <p className="text-left text-medium">
                        {activeCourse.description}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.activeEducationCourse}>
                        <FeatherIcon icon="x" size="20" className="mb-1" /> Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderBasicCourses = (basicCourses) => {
        return basicCourses.map((item, index) => {
            if (item.isActive === true) {
                return (
                    <Col sm={12} key={item.id}>
                        <Card className="mb-4">
                            <div className="mt-3 d-flex justify-content-center align-items-center card-image">
                                <img src={`${API_URL}/${item.image}`} />
                            </div>
                            <CardBody>
                                <CardTitle className="display-6">{item.name}</CardTitle>
                                <CardText className="text-small mh-75p">
                                    {item.description.substr(0, 100)}...
                                </CardText>
                                <CardLink
                                    onClick={(e) => this.activeBasicCourse(index, e)}
                                    className="float-right pointer text-small"
                                >
                                    View More <FeatherIcon icon="arrow-right" size="14" />
                                </CardLink>
                            </CardBody>
                        </Card>
                    </Col>
                )
            }
        });
    }

    renderEducationCourses = (educationCourses) => {
        return educationCourses.map((item, index) => {
            if (item.isActive === true) {
                return (
                    <Col sm={12} key={item.id}>
                        <Card className="mb-4">
                            <div className="mt-3 d-flex justify-content-center align-items-center card-image">
                                <img src={`${API_URL}/${item.image}`} />
                            </div>
                            <CardBody>
                                <CardTitle className="display-6">{item.name}</CardTitle>
                                <CardText className="text-small mh-75p">
                                    {item.description.substr(0, 100)}...
                                </CardText>
                                <CardLink
                                    onClick={() => this.activeEducationCourse(index)}
                                    className="float-right pointer text-small"
                                >
                                    View More <FeatherIcon icon="arrow-right" size="14" />
                                </CardLink>
                            </CardBody>
                        </Card>
                    </Col>
                )
            }
        });
    }

    render = () => {
        let basicCourses = '';
        if (Object.keys(this.props.BasicCourses).length > 0 && 'status' in this.props.BasicCourses) {
            if (this.props.BasicCourses.status) {
                basicCourses = this.renderBasicCourses(this.props.BasicCourses.data);
            }
        }

        let educationCourses = '';
        if (Object.keys(this.props.EducationCourses).length > 0 && 'status' in this.props.EducationCourses) {
            if (this.props.EducationCourses.status) {
                educationCourses = this.renderEducationCourses(this.props.EducationCourses.data);
            }
        }

        return (
            <React.Fragment>
                <Container className="top-content col-sm-10 auto-margin banner-text">
                    <div className="display-4 mb-5 pt-4 text-center">
                        <span className="flight-size headingtop">
                            <p>FLIGHTSCOPE UNIVERSITY DRIVES IMPROVEMENT</p>
                            <p>IN</p>
                            <p>CONSISTENCY DIRECTION AND DISTANCE</p>
                        </span>
                        <ul className="text-medium headingSub">
                            <li>Basic Information - LEARN HOW TO TRANSFORM THE DATA FROM TECHNOLOGY TO INFORMATION</li>
                            <li>Education - SELF EDUCATE ON A PROCESS OF USING INFORMATION TO CHANGE THE GAME</li>
                            <li>Certification - BECOME AN EXPERT IN PERFORMANCE COACHING</li>
                        </ul>
                        

                    </div>
                    <div class="row pd-t-20">
                            <div class="d-flex justify-content-space-bitween col">
                                <a href="/#/login" class="btn btn-info btn-auto">Login</a>
                                <a href="/#/signup" class="btn btn-info btn-auto">Sign Up</a>
                            </div>
                        </div>
                </Container>
                <Container className="top-content mt-5">
                    {basicCourses && <h1 className="display-4 mb-5 pt-4 text-center">Check Your Knowledge</h1>}
                    {basicCourses && <OwlCarousel
                        className="basic-owl-theme"
                        loop={true}
                        margin={10}
                        nav={true}
                        responsiveClass={true}
                        responsive={
                            {
                                0: {
                                    items: 1
                                },
                                600: {
                                    items: 2
                                },
                                1000: {
                                    items: 3
                                }
                            }
                        }
                    >
                        {basicCourses}
                    </OwlCarousel>}

                    {educationCourses && <h1 className="display-4 mb-5 pt-4 text-center">Education Courses</h1>}
                    {educationCourses && <OwlCarousel
                        className="education-owl-theme"
                        loop={true}
                        margin={10}
                        nav={true}
                        responsiveClass={true}
                        responsive={
                            {
                                0: {
                                    items: 1
                                },
                                600: {
                                    items: 2
                                },
                                1000: {
                                    items: 3
                                }
                            }
                        }
                    >
                        {educationCourses}
                    </OwlCarousel>}

                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button color="info btn-auto" href="/#/signup">Sign Up For Free Trial</Button>
                        </Col>
                    </Row>
                    {this.state.activeBasicCourse && this.activeBasicsCourse()}
                    {this.state.activeEducationCourse && this.activeEducationsCourse()}
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        BasicCourses: state.BasicCourses,
        EducationCourses: state.EducationCourses
    }
}

export default connect(mapStateToProps, { getBasicCourses, getEducationCourses })(TopContent);