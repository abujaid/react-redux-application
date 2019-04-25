import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import FeatherIcon from 'feather-icons-react';
import { Button, Input, Modal, ModalBody, ModalFooter, FormGroup, Col, Row, Form } from 'reactstrap';
import { getUsersByTrainings, updateUsersByTrainings } from './../../actions/modules_action/users';

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
        width: '100px'
    }
}, {
    dataField: "isAttend",
    text: "Attendance",
    headerStyle: {
      width: '80px'
    }
}];

class ClassesUserList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            attendance: new Map()
        }

        this.props.getUsersByTrainings(this.props.token, this.props.trainingId).then(()=>{

            const attendanceMap=  this.props.GetUsersByTrainings.data.map(item => {
                if(item.User !== null) {
           return [item.User.id,item.userAttend]
                }
            })
           
            this.setState({ attendance: new Map(attendanceMap)})

        })

    }

    handleChange = (e) => {
    const item = parseInt(e.target.name);
    const isChecked = e.target.checked;
    
    this.props.updateUsersByTrainings(this.props.token, this.props.trainingId, item,  {
        userAttend: isChecked
    })
    
    this.setState(prevState => ({ attendance: prevState.attendance.set(item, isChecked) }));
    }  

    renderUsers = (users) => {
        const trainingData =  users.map(item => {
    
            if(item.User !== null) {
              
                return {
                    id: item.User.id,
                    name: item.User.firstName + ' ' + item.User.lastName,
                    email: item.User.email,
                    phone: item.User.phone,
                    isAttend: this.renderAction(item.User.id)
                }
            }

        });

        return trainingData;
    }

    renderAction = (id) => (
    
        <div className="actions">
            <Form>
               <FormGroup row>
                    <Col sm={12}>
                        <div className="form-check">
                            <label className="ml-12">
                                <Input
                                    type="checkbox"
                                    name={id}
                                    data-state="isAttend"
                                    checked={this.state.attendance.get(id)}
                                    onChange={this.handleChange}
                                    data-id={id}
                                />
                                <span>
                                    Is Attend? 
                                </span>
                            </label>
                        </div>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )

    render = () => {
        let error= '';
        let userList = [];
        if(Object.keys(this.props.GetUsersByTrainings).length > 0 && 'status' in this.props.GetUsersByTrainings) {
            if(this.props.GetUsersByTrainings.status) {
                userList = this.renderUsers(this.props.GetUsersByTrainings.data);
                userList = userList.filter(item => item !== undefined);
            } else {
                error = this.props.GetUsersByTrainings.message || '';
            }
        }
        
        if(Object.keys(this.props.UpdateUserByTraining).length > 0 && 'status' in this.props.UpdateUserByTraining && this.state.renderdata) {
            if(this.props.UpdateUserByTraining.status) {
                this.props.updateUsersByTrainings(this.props.token);
                this.props.getUsersByTrainings(this.props.token, this.props.trainingId);
            } else {
                error = this.props.UpdateUserByTraining.message || '';
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
        GetUsersByTrainings: state.GetUsersByTrainings,
        UpdateUserByTraining: state.UpdateUserByTraining
    }
}

export default connect(mapStateToProps, { getUsersByTrainings, updateUsersByTrainings })(ClassesUserList);