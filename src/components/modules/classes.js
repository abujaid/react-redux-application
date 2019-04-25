import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Moment from 'react-moment';
import moment from 'moment';

import FeatherIcon from 'feather-icons-react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Button, UncontrolledAlert, Modal, ModalBody, ModalFooter } from 'reactstrap';

import { API_URL } from './../../constants';
import ClassesForm from './classes_form';
import ClassesUserList from './classes_user_list';
import { getClasses, getClass, setClasses, updateClass, deleteClass } from './../../actions/modules_action/classes';
import { getLocations } from './../../actions/modules_action/locations';
import { getSubscriptions } from './../../actions/modules_action/subscriptions';

const columns = [{
    dataField: 'image',
    text: 'Image',
    headerStyle: {
        width: '80px'
    }
}, {
    dataField: 'className',
    text: 'Class Name',
    sort: true,
    headerStyle: {
        width: '150px'
    }
}, {
    dataField: 'level',
    text: 'Level',
    headerStyle: {
        width: '200px'
    }
}, {
    dataField: 'startDate',
    text: 'Start Date',
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'location',
    text: 'Location',
    headerStyle: {
        width: '150px'
    }
}, {
    dataField: 'action',
    text: 'Action',
    headerStyle: {
        width: '150px'
    }
}];

class Classes extends Component {
    constructor(props) {
        super(props);
        
        let user_data = {};
        let userId = 0;
        if(localStorage.getItem('fs_user_data') !== null) {
            user_data = JSON.parse(localStorage.getItem("fs_user_data"));
            userId = user_data.data.id;
        }

        this.state = {
            activeTab: '1',
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: 0,
            isFormEditable: false,
            deleteItem: 0,
            deleteEnable: false,
            userListItem: 0,
            userListEnable: false,
            userId
        }

        this.props.getClasses(this.props.token, userId);
        this.props.getLocations(this.props.token);
        this.props.getSubscriptions();
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    renderAction = (id) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getClassItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.deleteModalToggle(true, id)}>
                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
            </Button>
            <Button color="warning" data-id={id} className="btn-auto pt-1 pb-1 px-2" onClick={() => this.userListToggle(true, id)}>
                <FeatherIcon icon="users" size="18" className="mb-1" />
            </Button>
        </div>
    )

    renderRecords = (classes, status = true) => {
        let romanLevel = {'0': 'Start Level', '1': 'Level I', '2': 'Level II', '3': 'Level III'};
        return classes.map(item => {
            if(item.isActive == status) {
                let location = '';
                let level = '';
                let image = <div className="d-flex align-items-center justify-content-center thumb-image">
                        <FeatherIcon icon="image" size="20" />
                    </div>;
                
                if(item.image) {
                    image = <div className="d-flex align-items-center justify-content-center thumb-image">
                            <img src={`${API_URL}/${item.image}`} className="img-thumbnail w-100" />
                        </div>
                }

                if(Object.keys(this.props.GetSubscriptions).length > 0 && 'status' in this.props.GetSubscriptions) {
                    if(this.props.GetSubscriptions.status) {
                        this.props.GetSubscriptions.data.forEach(subscriptionItem => {
                            if(subscriptionItem.id === item.subscriptionsId) {
                                level = `${romanLevel[subscriptionItem.level]} - ${subscriptionItem.name}`;
                            }
                        });
                    }
                }

                if(Object.keys(this.props.GetLocations).length > 0 && 'status' in this.props.GetLocations) {
                    if(this.props.GetLocations.status) {
                        this.props.GetLocations.data.forEach(locationItem => {
                            if(locationItem.id === item.LocationId) {
                                location =  locationItem.location;
                            }
                        });
                    }
                }
                
                return {
                    id: item.id,
                    image: image,
                    className: item.name,
                    level: level,
                    startDate: <Moment format="DD/MM/YYYY" date={item.startDateTime} />,
                    location: location,
                    action: this.renderAction(item.id)
                }
            }
        });
    }

    getClassItem = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: id
        });
        this.props.getClass(this.props.token, id);
    }

    deleteItem = () => {
        this.props.deleteClass(this.props.token, this.state.deleteItem);
        this.deleteModalToggle(false, 0);
    }

    formModalToggle = () => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: 0,
            isFormEditable: !this.state.isFormEditable
        });
        if(Object.keys(this.props.GetClass).length > 0) {
            this.props.getClass(this.props.token);
        }
    }

    deleteModalToggle = (enable = false, id = 0) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            deleteItem: id,
            deleteEnable: enable
        });
    }

    userListToggle = (enable = false, id = 0) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            userListItem: id,
            userListEnable: enable
        });
    }

    locationsList = () => {
        let locationsList = [];
        if(Object.keys(this.props.GetLocations).length > 0 && 'status' in this.props.GetLocations) {
            if(this.props.GetLocations.status) {
                this.props.GetLocations.data.map(item => {
                    if(item.isActive === true) {
                        locationsList.push({
                            id: item.id,
                            name: item.location
                        });
                    }
                });
            }
        }
        return locationsList;
    }

    subscriptionsList = () => {
        let subscriptionsList = [];
        let romanLevel = {'0': 'Start Level', '1': 'Level I', '2': 'Level II', '3': 'Level III'};
        if(Object.keys(this.props.GetSubscriptions).length > 0 && 'status' in this.props.GetSubscriptions) {
            if(this.props.GetSubscriptions.status) {
                this.props.GetSubscriptions.data.map(item => {
                    if(item.isActive === true && item.level > 0) {
                        subscriptionsList.push({
                            id: item.id,
                            name: romanLevel[item.level] +' - ' + item.name
                        });
                    }
                });
            }
        }

        return subscriptionsList;
    }

    renderForm = (accessData) => {
   
        if(Object.keys(this.props.SetClasses).length > 0 && 'status' in this.props.SetClasses) {
            if(this.props.SetClasses.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getClasses(this.props.token,this.state.userId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.SetClasses.message || '',
                });
            }
            this.props.setClasses(this.props.token);
        }

        if(Object.keys(this.props.UpdateClass).length > 0 && 'status' in this.props.UpdateClass) {
            if(this.props.UpdateClass.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Updated Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getClasses(this.props.token,this.state.userId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateClass.message || '',
                });
            }
            this.props.updateClass(this.props.token, this.state.accessId);
        }
        return (
            
            <ClassesForm
                error={this.state.formErrorMessage}
                token={this.props.token}
                accessData={accessData}
                locations={this.locationsList()}
                subscriptions={this.subscriptionsList()}
                formEditable={this.state.isFormEditable}
                onFormEdited={this.formModalToggle}
                submit={this.submit}
            />
        );
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

    userListModal = () => {
        return (
            <ClassesUserList
                token={this.props.token}
                trainingId={this.state.userListItem}
                isActive={this.state.userListEnable}
                onCancel={this.userListToggle}
            />
        );
    }

    submit = (formData) => {
        let activeUser = null;
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            activeUser = user_data.data.id;
        }

        let request = {
            name: formData.className,
            description: formData.description,
            image: formData.image,
            startDateTime: formData.startDateTime,
            endDateTime: formData.endDateTime,
            countryClub: formData.countryClub,
            LocationId: parseInt(formData.location),
            subscriptionsId: formData.subscriptions,
            seats: formData.seats,
            isActive: formData.status,
            event: formData.event,
            createdBy: activeUser
        }
        
        if(this.state.accessId === 0) {
            this.props.setClasses(this.props.token, request);
        } else {
            this.props.updateClass(this.props.token, this.state.accessId, request);
        }
    }

    render = () => {
        let error = '';
        let accessData = {};
        let classesActive = [];
        let classesInactive = [];
        if(Object.keys(this.props.GetClasses).length > 0 && 'status' in this.props.GetClasses) {
            if(this.props.GetClasses.status) {
                classesActive = this.renderRecords(this.props.GetClasses.data, true);
                classesActive = classesActive.filter(item => item !== undefined);
                classesInactive = this.renderRecords(this.props.GetClasses.data, false);
                classesInactive = classesInactive.filter(item => item !== undefined);
            } else {
                error = this.props.GetClasses.message || '';
            }
        }

        if(Object.keys(this.props.GetClass).length > 0 && 'status' in this.props.GetClass) {
            if(this.props.GetClass.status) {
                if(this.state.isFormEditable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFormEditable: true
                    }); 
                }
                accessData = this.props.GetClass.data;
                accessData.startDateTime = moment(accessData.startDateTime).format('YYYY-MM-DD');
                accessData.endDateTime = moment(accessData.endDateTime).format('YYYY-MM-DD');
                
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something Wrong.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getClasses(this.props.token,this.state.userId);
                }
            }
        }

        if(Object.keys(this.props.DeleteClass).length > 0 && 'status' in this.props.DeleteClass) {
            if(this.props.DeleteClass.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Deleted Successfully.',
                    });
                    this.props.getClasses(this.props.token,this.state.userId);
                }   
            }
            this.props.deleteClass(this.props.token);
        }

        return (
            <section>
                <Button color="success" className="float-right btn-auto"  onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">Trainings</h1>
                {this.state.formSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                    <strong>Success:</strong> {this.state.formSuccessMessage}
                </UncontrolledAlert>}
                {error !== '' && <UncontrolledAlert className="text-left" color="danger">
                    <strong>Error:</strong> {error}
                </UncontrolledAlert>}
                <div className="module-content">
                    <Nav className="md-tabs d-flex flex-row pointer" tabs>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "1" ? "active" : ""}  onClick={() => this.toggleTab('1')}>
                                Active Trainings
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "2" ? "active" : ""} onClick={() => this.toggleTab('2')}>
                                Inactive Trainings
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="md-content">
                        <TabPane tabId="1" className="overflow-x">
                            <BootstrapTable 
                                bootstrap4
                                keyField="id"
                                data={classesActive}
                                columns={columns}
                                noDataIndication="No Record Found."
                                pagination={ paginationFactory() }
                            />
                        </TabPane>
                        <TabPane tabId="2" className="overflow-x">
                            <BootstrapTable 
                                bootstrap4
                                keyField="id"
                                data={classesInactive}
                                columns={columns}
                                noDataIndication="No Record Found."
                                pagination={ paginationFactory() }
                            />
                        </TabPane>
                    </TabContent>
                </div>
                {this.state.isFormEditable && this.renderForm(accessData)}
                {this.state.deleteEnable && this.deleteModal()}
                {this.state.userListEnable && this.userListModal()}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetClasses: state.GetClasses,
        GetClass: state.GetClass,
        SetClasses: state.SetClasses,
        UpdateClass: state.UpdateClass,
        DeleteClass: state.DeleteClass,
        GetLocations: state.GetLocations,
        GetSubscriptions: state.GetSubscriptions
    }
}

export default connect(mapStateToProps, { getClasses, getClass, setClasses, updateClass, deleteClass, getLocations, getSubscriptions })(Classes);