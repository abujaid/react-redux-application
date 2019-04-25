import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import FeatherIcon from 'feather-icons-react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Button,
    Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Modal, ModalBody, ModalFooter } from 'reactstrap';

import { API_URL } from './../../constants';
import { getClasses } from './../../actions/modules_action/classes';
import { getSubscriptions } from './../../actions/modules_action/subscriptions';
import { getLocation } from './../../actions/modules_action/locations';
import { updateUser } from './../../actions/modules_action/users';

class Education extends Component {
    constructor(props) {
        super(props);

        let userId = 0;
        let trainings = [];
        let trainingIds = [];
        let subscriptionId = [];
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
			if(user_data.data.Trainings.length > 0) {
                trainings = user_data.data.Trainings;
                user_data.data.Trainings.map(item => {
                    trainingIds.push(item.id);
                });
            }
            if(user_data.data.Subscriptions.length > 0) {
                user_data.data.Subscriptions.map(item => {
                    subscriptionId.push(item.id);
                });
            }
        }
        
        let activeTab = '2';
        if(this.props.location.state !== undefined && 'activeTab' in this.props.location.state) {
            activeTab = this.props.location.state.activeTab;
        }

        if(trainings.length > 0) {
            activeTab = '1';
        } else {
            activeTab= '2';
        }
        
        this.state = {
            activeTab: activeTab,
            userId: userId,
            subscriptions: [],
            joinedTrainingIds: trainingIds,
            joinedTrainings: trainings,
            subscriptionId: subscriptionId,
            joinWarning: false,
            joinSuccess: false,
        }

        this.props.getClasses(this.props.token, this.state.userId);
        this.props.getSubscriptions();
    }

    updateState = (additionalState = {}) => {
        let userId = 0;
        let trainings = [];
        let trainingIds = [];
        let subscriptionId = [];
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
			if(user_data.data.Trainings.length > 0) {
                trainings = user_data.data.Trainings;
                user_data.data.Trainings.map(item => {
                    trainingIds.push(item.id);
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
            activeTab: trainings.length > 0 ? '1' : '2',
            userId: userId,
            joinedTrainingIds: trainingIds,
            joinedTrainings: trainings,
            subscriptionId: subscriptionId,
        });
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    joinClass = (subscriptionId, classId) => {
        if(this.state.subscriptionId.length > 0) {
            if(Math.max(...this.state.subscriptionId) >= subscriptionId) {
                this.setState({
                    ...this.state,
                    joinSuccess: true
                });

                let request = {
                    trainingId: classId
                };
                this.props.updateUser(this.props.token, this.state.userId, request);
            } else {
                this.setState({
                    ...this.state,
                    joinWarning: true
                });
            }
        } else {
            this.setState({
                ...this.state,
                joinWarning: true
            });
        }
    }

    joinWarningToggle = () => {
        this.setState({
            ...this.state,
            joinWarning: !this.state.joinWarning
        });
    }

    joinWarningModal = () => {
        return (
            <Modal isOpen={this.state.joinWarning} toggle={this.joinWarningToggle} className={this.props.className}>
                <ModalBody>
                    <h1 className="mt-3 display-5 text-center text-warning">
                        <FeatherIcon icon="alert-triangle" size="50" className="mb-2" /><br />
                        You need to subscribe to join this training.
                    </h1>
                    <p className="text-center text-medium">
                        Go for <a href="/#/subscription-plan">Subscription Plan</a>.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.joinWarningToggle}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

    joinSuccessToggle = () => {
        this.setState({
            ...this.state,
            joinSuccess: !this.state.joinSuccess
        });
    }

    joinSuccessModal = () => {
        return (
            <Modal isOpen={this.state.joinSuccess} toggle={this.joinSuccessToggle} className={this.props.className}>
                <ModalBody>
                    <h1 className="mt-3 display-5 text-center text-success">
                        <FeatherIcon icon="check-circle" size="50" className="mb-2" /><br />
                        You have joined successfully.
                    </h1>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.joinSuccessToggle}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderClasses = (classStatus) => {
        let romanLevel = {'0': 'Start Level', '1': 'Level I', '2': 'Level II', '3': 'Level III'};
        let render = false;
        if(Object.keys(this.props.GetClasses).length > 0 && 'status' in this.props.GetClasses) {
            if(this.props.GetClasses.status) {
                return this.props.GetClasses.data.map(item => {
                    if(item.isActive === true) {
                        let level = '';
                        render = false;
                        if(this.state.subscriptions.length > 0) {
                            this.state.subscriptions.map(subscriptionItem => {
                                if(subscriptionItem.id === item.subscriptionsId) {
                                    level = <CardText className="mb-2 text-medium">
                                        {romanLevel[subscriptionItem.level]}&nbsp;
                                        <strong>{subscriptionItem.name}</strong>
                                    </CardText>;
                                }
                            });
                        }

                        let location = '';
                        let lat = 0.0;
                        let long = 0.0;
                        if(item.Location !== null && 'location' in item.Location) {
                            location = '(' + item.Location.location + ')';
                            if('latitude' in item.Location) {
                                lat = item.Location.latitude;
                            }
                            if('longitude' in item.Location) {
                                long = item.Location.longitude;
                            }
                        }

                        if((classStatus === 'joined' && this.state.joinedTrainingIds.indexOf(item.id) > -1) || 
                        (classStatus === 'available' && this.state.joinedTrainingIds.indexOf(item.id) === -1)) {
                            render = true;
                        }

                                     
                        if(render) {
                            return (
                                <Col sm="6" md="4" key={item.id}>
                                    <Card className="mb-4">
                                        <CardImg top src={`${API_URL}/${item.image}`} alt={item.name} width="350" height="200" />
                                        <CardBody>
                                            <CardTitle className="display-6">{item.name}</CardTitle>
                                            {level}
                                            <CardText className="text-medium pointer">   
                                                {item.countryClub} {location} <a href={`https://www.google.com/maps/search/?api=1&query= ${lat}, ${long}`} target="_blank" className="text-small pointer" >See Map</a><br />
                                                <span className="mt-2 text-small">
                                                    <strong>Start Date: </strong>
                                                    <Moment format="DD/MM/YYYY" date={item.startDateTime} />
                                                </span>
                                            </CardText>
                                        </CardBody>
                                        {classStatus === 'available' && <CardFooter>
                                            
                                            <Button color="success" className="float-right btn-auto" onClick={() => this.joinClass(item.subscriptionsId, item.id)}>
                                                Join
                                            </Button>
                                        </CardFooter>}
                                    </Card>
                                </Col>
                            );
                        }
                    }
                });
            }
        }
    }

    render = () => {
        let accessData = {};
        if(Object.keys(this.props.GetSubscriptions).length > 0 && 'status' in this.props.GetSubscriptions) {
            if(this.props.GetSubscriptions.status && this.state.subscriptions.length === 0) {
                this.setState({
                    ...this.state,
                    subscriptions: this.props.GetSubscriptions.data
                });                
            }
        }

        if(Object.keys(this.props.UpdateUser).length > 0 && 'status' in this.props.UpdateUser) {
            if(this.props.UpdateUser.status) {
                this.props.updateUser(this.props.token, this.state.userId, {});
                this.props.getClasses(this.props.token, this.state.userId);
                this.updateState();               
            }
        }

        if(Object.keys(this.props.GetLocation).length > 0 && 'status' in this.props.GetLocation) {
            if(this.props.GetLocation.status && this.state.subscriptions.length === 0) {
                this.setState({
                    ...this.state,
                    subscriptions: this.props.GetLocation.data
                });                
            }
        }

        return (
            <section>
                <h1 className="display-5">Available Certifications</h1>
                <div className="module-content">
                    <Nav className="md-tabs d-flex flex-row pointer" tabs>
                        {this.state.joinedTrainings.length > 0 && <NavItem>
                            <NavLink className={this.state.activeTab == "1" ? "active" : ""}  onClick={() => this.toggleTab('1')}>
                                Joined
                            </NavLink>
                        </NavItem>}
                        <NavItem>
                            <NavLink className={this.state.activeTab == "2" ? "active" : ""} onClick={() => this.toggleTab('2')}>
                                Available
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="md-content">
                        {this.state.joinedTrainings.length > 0 && <TabPane tabId="1">
                            <Row>
                                {this.renderClasses('joined')}
                            </Row>
                        </TabPane>}
                        <TabPane tabId="2">
                            <Row>
                                {this.renderClasses('available')}
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
                {this.state.joinWarning && this.joinWarningModal()}
                {this.state.joinSuccess && this.joinSuccessModal()}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetClasses: state.GetClasses,
        GetSubscriptions: state.GetSubscriptions,
        UpdateUser: state.UpdateUser,
        GetLocation: state.GetLocation
    }
}

export default withRouter(connect(mapStateToProps, { getClasses, getSubscriptions, updateUser, getLocation })(Education));