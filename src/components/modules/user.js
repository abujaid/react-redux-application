/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

/*  import Designing Constant */
import { Button, UncontrolledAlert, Modal, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import ReactHtmlParser from 'react-html-parser';

/*  import a javascript file */
import UsersForm from './users_form';

/*  import consumable API functions */
import { getUsers, getUser, setUsers, updateUserAdmin, deleteUser } from '../../actions/modules_action/users';
import { signup } from '../../actions/signup_action';

/*  define config variables */
const columns = [{
    dataField: 'image', 
    text: 'Image',
    headerStyle: {
        width: '80px'
    }
}, {
    dataField: 'name',
    text: 'Name',
    sort: true,
    headerStyle: {
        width: '150px'
    }
}, {
    dataField: 'email',
    text: 'Email',
    sort: true,
    headerStyle: {
        width: '250px'
    }
}, {
    dataField: 'subscription',
    text: 'Subscription Plan',
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
    dataField: 'action',
    text: 'Action',
    headerStyle: {
        width: '150px'
    }
}];

/*  define class based component */
class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: 0,
            isFormEditable: false,
            deleteItem: 0,
            deleteEnable: false,
            showLock: false
        }
        this.props.getUsers(this.props.token);
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    lockUserItem = (id, userType) =>{
        let userStatus = (userType) ? false : true;
        let request = {isActive: userStatus}
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: ''
        });
        this.props.updateUserAdmin(this.props.token, id, request);
    }

    renderAction = (id, userType) => {
        let showLock = (userType) ? 'lock' : 'unlock';
        return (
            <div className="actions">
                <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getUserItem(id)}>
                    <FeatherIcon icon="edit" size="18" className="mb-1" />
                </Button>
                <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.deleteModalToggle(true, id)}>
                    <FeatherIcon icon="trash-2" size="18" className="mb-1" />
                </Button>
                <Button color="success" data-id={id} className="btn-auto pt-1 pb-1 px-2" onClick={()=> this.lockUserItem(id,userType)}>
                    <FeatherIcon icon={showLock} size="18" className="mb-1" /> 
                </Button>
            </div>
        )
    }

    renderRecords = (users, status = true) => {
        const romanLevel = {'0': 'Start Level', '1': 'Level I', '2': 'Level II', '3': 'Level III'};
        return users.map(item => {
            let image = <div className="d-flex align-items-center justify-content-center thumb-image">
                    <FeatherIcon icon="image" size="20" />
                </div>;

            if(item.picture) {
                image = <div className="d-flex align-items-center justify-content-center thumb-image">
                        <img src={item.picture} className="img-thumbnail w-100" />
                    </div>
            }

            let subscription = 'Free';
            let subscriptionLevel = 0;
            if(item.Subscriptions.length > 0) {
                item.Subscriptions.map(subscriptionItem => {
                    if(subscriptionItem.level >= subscriptionLevel) {
                        subscriptionLevel = subscriptionItem.level;
                        subscription = ReactHtmlParser(`${romanLevel[subscriptionItem.level]} <strong>${subscriptionItem.name}</strong>`);
                    }
                });
            }
            
            if(item.isActive == status) {
                return {
                    id: item.id,
                    image: image,
                    name: item.firstName + ' ' + item.lastName,
                    email: item.email,
                    subscription: subscription,
                    status: item.isActive ? "Unlocked" : "Locked",
                    action: this.renderAction(item.id, item.isActive)
                }
            }
        });
    }

    getUserItem = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: id
        });
        this.props.getUser(this.props.token, id);
    }

    deleteItem = () => {
        this.props.deleteUser(this.props.token, this.state.deleteItem);
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
        if(Object.keys(this.props.GetUser).length > 0) {
            this.props.getUser(this.props.token);
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

    renderForm = (accessData) => {
        if(Object.keys(this.props.Signup).length > 0 && 'status' in this.props.Signup) {
            if(this.props.Signup.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'New User Added Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getUsers(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.Signup.message || '',
                });
            }
            this.props.signup();
        }

        if(Object.keys(this.props.UpdateUserAdmin).length > 0 && 'status' in this.props.UpdateUserAdmin) {
            if(this.props.UpdateUserAdmin.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'User Updated Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getUsers(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateUserAdmin.message || '',
                });
            }
            this.props.updateUserAdmin(this.props.token);
        }

        return (   
            <UsersForm
                error={this.state.formErrorMessage}
                token={this.props.token}
                accessData={accessData}
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

    submit = (formData) => { 
        let request = {}
        request.firstName = formData.firstName;
        request.lastName = formData.lastName;
        request.isActive = formData.status;
        if(this.state.accessId === 0) {
            request.password = 'kronos';
            request.confirmPassword = 'kronos';
            request.phone = formData.phone;
            request.email = formData.email;
            this.props.signup(request);
        } else {   
             this.props.updateUserAdmin(this.props.token, this.state.accessId, request);
        }  
    }

    render = () => {
        let error = '';
        let usersActive = [];
        let usersInactive = [];
        let accessData = {};
        if(Object.keys(this.props.GetUsers).length > 0 && 'status' in this.props.GetUsers) {
            if(this.props.GetUsers.status) {
                usersActive = this.renderRecords(this.props.GetUsers.data, true);
                usersActive = usersActive.filter(item => item !== undefined);
                usersInactive = this.renderRecords(this.props.GetUsers.data, false);
                usersInactive = usersInactive.filter(item => item !== undefined);
            } else {
                error = this.props.GetUsers.message || '';
            }
        }

        if(Object.keys(this.props.GetUser).length > 0 && 'status' in this.props.GetUser) {
            if(this.props.GetUser.status) {
                if(this.state.isFormEditable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFormEditable: true
                    }); 
                }
                accessData = this.props.GetUser.data;
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something Wrong.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getUsers(this.props.token);
                }
            }
        }

        if(Object.keys(this.props.DeleteUser).length > 0 && 'status' in this.props.DeleteUser) {
            if(this.props.DeleteUser.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'User Deleted Successfully.',
                    });
                    this.props.getUsers(this.props.token);
                }   
            }
            this.props.deleteUser(this.props.token);
        }

        if(Object.keys(this.props.UpdateUserAdmin).length > 0 && 'status' in this.props.UpdateUserAdmin) {
            if(this.props.UpdateUserAdmin.status) {
                if(this.state.formSuccessMessage === '' && Object.keys(this.props.UpdateUserAdmin.data).length > 0) {
                    let message = (this.props.UpdateUserAdmin.data.isActive) ? "Unlocked" : 'Locked';
                    this.setState({
                        ...this.state,
                        formSuccessMessage: `User ${message} Successfully.`,
                        accessId: 0,
                        isFormEditable: false
                    });
                    
                    this.props.getUsers(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateUserAdmin.message || '',
                });
            }
            this.props.updateUserAdmin(this.props.token);
        }

        if(this.state.showLock){
            this.props.getUser(this.props.token);
            this.state.showLock = false;
        }

        return (
            <section>
                <Button color="success" className="float-right btn-auto" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">Users</h1>
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
                                Active Users
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "2" ? "active" : ""} onClick={() => this.toggleTab('2')}>
                                Locked Users
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="md-content">
                        <TabPane tabId="1" className="overflow-x">
                            <BootstrapTable 
                                bootstrap4
                                keyField="id"
                                data={usersActive}
                                columns={columns}
                                noDataIndication="No Record Found."
                                pagination={ paginationFactory() }
                            />
                        </TabPane>
                        <TabPane tabId="2" className="overflow-x">
                            <BootstrapTable 
                                bootstrap4
                                keyField="id"
                                data={usersInactive}
                                columns={columns}
                                noDataIndication="No Record Found."
                                pagination={ paginationFactory() }
                            />
                        </TabPane>
                    </TabContent>
                </div>
                {this.state.isFormEditable && this.renderForm(accessData)}
                {this.state.deleteEnable && this.deleteModal()}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetUsers: state.GetUsers,
        GetUser: state.GetUser,
        Signup: state.Signup,
        SetUsers: state.SetUsers,
        UpdateUserAdmin: state.UpdateUserAdmin,
        DeleteUser: state.DeleteUser
    }
}

/* export class component*/
export default connect(mapStateToProps, { getUsers, getUser, setUsers, updateUserAdmin, deleteUser, signup })(User);