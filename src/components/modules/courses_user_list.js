import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import FeatherIcon from 'feather-icons-react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import { getUsersByCourses } from './../../actions/modules_action/users';

const columns = [{
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
        width: '200px'
    }
}, {
    dataField: 'phone',
    text: 'Phone Number',
    headerStyle: {
        width: '150px'
    }
}, {
    dataField: 'status',
    text: 'Status',
    sort: true,
    headerStyle: {
        width: '150px'
    }
}];

class CoursesUserList extends Component {
    constructor(props) {
        super(props);

        this.props.getUsersByCourses(this.props.token, this.props.courseId);
    }

    renderUsers = (users) => {
        return users.map(item => {
            if(item.User !== null) {
                return {
                    id: item.User.id,
                    name: item.User.firstName + ' ' + item.User.lastName,
                    email: item.User.email,
                    phone: item.User.phone,
                    status: item.User.isActive ? 'True' : 'False'
                }
            }
        });
    }

    render = () => {
        let error= '';
        let userList = [];
        if(Object.keys(this.props.GetUsersByCourses).length > 0 && 'status' in this.props.GetUsersByCourses) {
            if(this.props.GetUsersByCourses.status) {
                userList = this.renderUsers(this.props.GetUsersByCourses.data);
                userList = userList.filter(item => item !== undefined);
            } else {
                error = this.props.GetUsersByCourses.message || '';
            }
        }

        return (
            <Modal isOpen={this.props.isActive} toggle={() => this.props.onCancel(false, 0)} className="modal-lg">
                <ModalBody>
                    <div className="overflow-x">
                        <BootstrapTable 
                            bootstrap4
                            keyField="id"
                            data={userList}
                            columns={columns}
                            noDataIndication="No Record Found."
                            pagination={ paginationFactory() }
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={() => this.props.onCancel(false, 0)}>
                        <FeatherIcon icon="x" size="20" className="mb-1" /> Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetUsersByCourses: state.GetUsersByCourses
    }
}

export default connect(mapStateToProps, { getUsersByCourses })(CoursesUserList);