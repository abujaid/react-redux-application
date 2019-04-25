import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Moment from 'react-moment';

import FeatherIcon from 'feather-icons-react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Button, UncontrolledAlert, Modal, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';

import ActivitiesForm from './activities_form';
import ActivitiesAssessment from './activities_assessment';
import ActivitiesFeedback from './activities_feedback';
import { getActivities, getActivity, setActivities, updateActivity, deleteActivity } from './../../actions/modules_action/activities';

const columns = [{
    dataField: 'activityName',
    text: 'Activity Name',
    sort: true,
    headerStyle: {
        width: '150px'
    }
}, {
    dataField: 'activityType',
    text: 'Activity Type',
    sort: true,
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'status',
    text: 'Status',
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'dateAdded',
    text: 'Date Added',
    sort: true,
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

class Activities extends Component {
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
            isAssessmentEditable: false,
            activityId: 0,
            isFeedbackEditable: false
        }

        this.props.getActivities(this.props.token);
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    renderActivityName = (id, sortActivityName, fullActivityName) => {
        return (
            <React.Fragment>
                <span scope="row" id={'activity' + id}>
                    {sortActivityName}
                </span>
                <UncontrolledTooltip
                    placement="top"
                    target={'activity' + id}>
                    {fullActivityName}
                </UncontrolledTooltip>
            </React.Fragment>
        );
    }

    renderAction = (id, type) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getActivityItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            {type == 'feedback' ? <Button data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.feedbackModalToggle(true, id)}>
                <FeatherIcon icon="message-square" size="18" className="mb-1" />
            </Button> :
                <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.deleteModalToggle(true, id)}>
                    <FeatherIcon icon="trash-2" size="18" className="mb-1" />
                </Button>
            }
            {type == 'assessment' &&
                <Button color="success" data-id={id} className="btn-auto pt-1 pb-1 px-2" onClick={() => this.assessmentModalToggle(id)}>
                    <FeatherIcon icon="plus" size="18" className="mb-1" />
                </Button>
            }
        </div>
    )

    renderRecords = (activities, status = true) => {
        return activities.map(item => {
            if (item.isActive === status) {
                let activityType = '';
                switch (item.type) {
                    case 'content':
                        activityType = 'Content';
                        break;
                    case 'link':
                        activityType = 'Youtube Link';
                        break;
                    case 'assessment':
                        activityType = 'Assessment';
                        break;
                    case 'feedback':
                        activityType = 'Feedback';
                        break;
                }
                let name = item.name;
                let nameType = false;
                if (item.name.length > 25) {
                    name = name.slice(0, 25) + "...";
                    nameType = true;
                }
                return {
                    id: item.id,
                    activityName: (nameType) ? this.renderActivityName(item.id, name, item.name) : item.name,
                    activityType: activityType,
                    status: item.isActive ? 'Active' : 'Inactive',
                    dateAdded: <Moment format="DD/MM/YYYY" date={item.createdAt} />,
                    action: this.renderAction(item.id, item.type)
                }
            }
        });
    }

    getActivityItem = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: id
        });
        this.props.getActivity(this.props.token, id);
    }

    deleteItem = () => {
        this.props.deleteActivity(this.props.token, this.state.deleteItem);
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
        if (Object.keys(this.props.GetActivity).length > 0) {
            this.props.getActivity(this.props.token);
        }
    }

    assessmentModalToggle = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            activityId: id,
            isAssessmentEditable: !this.state.isAssessmentEditable
        });
    }

    feedbackModalToggle = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            activityId: id,
            isFeedbackEditable: !this.state.isFeedbackEditable
        });
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
        if (Object.keys(this.props.SetActivities).length > 0 && 'status' in this.props.SetActivities) {
            if (this.props.SetActivities.status) {
                if (this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getActivities(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.SetActivities.message || '',
                });
            }
            this.props.setActivities(this.props.token);
        }

        if (Object.keys(this.props.UpdateActivity).length > 0 && 'status' in this.props.UpdateActivity) {
            if (this.props.UpdateActivity.status) {
                if (this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getActivities(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateActivity.message || '',
                });
            }
            this.props.updateActivity(this.props.token, this.state.accessId);
        }

        return (

            <ActivitiesForm
                error={this.state.formErrorMessage}
                token={this.props.token}
                accessData={accessData}
                formEditable={this.state.isFormEditable}
                onFormEdited={this.formModalToggle}
                submit={this.submit}
            />
        );
    }

    renderAssessment = (accessData) => {
        return (<ActivitiesAssessment
            error={this.state.formErrorMessage}
            token={this.props.token}
            accessData={accessData}
            activityId={this.state.activityId}
            AssessmentEditable={this.state.isAssessmentEditable}
            onAssessmentEdited={this.assessmentModalToggle}
        />);
    }

    renderFeedback = (accessData) => {
        return (<ActivitiesFeedback
            error={this.state.formErrorMessage}
            token={this.props.token}
            accessData={accessData}
            activityId={this.state.activityId}
            FeedbackEditable={this.state.isFeedbackEditable}
            onFeedbackEdited={this.feedbackModalToggle}
        />);
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
        let url = (formData.activityType !== 'assessment') ? { url: formData.activityContentLink } : {};
        let request = {
            name: formData.activityName,
            description: formData.description,
            type: formData.activityType,
            isActive: formData.status,
            isQuestionBank: formData.isQuestionBank,
            questionBankCount: formData.questionBankCount,
            passingPercentage: formData.passingPercentage,
            negativeMarks: formData.negativeMarks,
            ...url
        }

        if (this.state.accessId === 0) {
            this.props.setActivities(this.props.token, request);
        } else {
            this.props.updateActivity(this.props.token, this.state.accessId, request);
        }
    }

    render = () => {
        let error = '';
        let accessData = {};
        let activitiesActive = [];
        let activitiesInactive = [];
        if (Object.keys(this.props.GetActivities).length > 0 && 'status' in this.props.GetActivities) {
            if (this.props.GetActivities.status) {
                activitiesActive = this.renderRecords(this.props.GetActivities.data, true);
                activitiesActive = activitiesActive.filter(item => item !== undefined);
                activitiesInactive = this.renderRecords(this.props.GetActivities.data, false);
                activitiesInactive = activitiesInactive.filter(item => item !== undefined);
            } else {
                error = this.props.GetActivities.message || '';
            }
        }

        if (Object.keys(this.props.GetActivity).length > 0 && 'status' in this.props.GetActivity) {
            if (this.props.GetActivity.status) {
                if (this.state.isFormEditable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFormEditable: true
                    });
                }
                accessData = this.props.GetActivity.data;
            } else {
                if (this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something Wrong.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getActivities(this.props.token);
                }
            }
        }

        if (Object.keys(this.props.DeleteActivity).length > 0 && 'status' in this.props.DeleteActivity) {
            if (this.props.DeleteActivity.status) {
                if (this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Deleted Successfully.',
                    });
                    this.props.getActivities(this.props.token);
                }
            }
            this.props.deleteActivity(this.props.token);
        }
        return (
            <section>
                <Button color="success" className="float-right btn-auto" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">Activities</h1>
                {this.state.formSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                    <strong>Success:</strong> {this.state.formSuccessMessage}
                </UncontrolledAlert>}
                {error !== '' && <UncontrolledAlert className="text-left" color="danger">
                    <strong>Error:</strong> {error}
                </UncontrolledAlert>}
                <div className="module-content">
                    <Nav className="md-tabs d-flex flex-row pointer" tabs>
                        <NavItem>
                            <NavLink className={this.state.activeTab === "1" ? "active" : ""} onClick={() => this.toggleTab('1')}>
                                Active Activity
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab === "2" ? "active" : ""} onClick={() => this.toggleTab('2')}>
                                Inactive Activity
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="md-content">
                        <TabPane tabId="1" className="overflow-x">
                            <BootstrapTable
                                bootstrap4
                                keyField="id"
                                data={activitiesActive}
                                columns={columns}
                                noDataIndication="No Record Found."
                                pagination={paginationFactory()}
                            />
                        </TabPane>
                        <TabPane tabId="2" className="overflow-x">
                            <BootstrapTable
                                bootstrap4
                                keyField="id"
                                data={activitiesInactive}
                                columns={columns}
                                noDataIndication="No Record Found."
                                pagination={paginationFactory()}
                            />
                        </TabPane>
                    </TabContent>
                </div>
                {this.state.isFormEditable && this.renderForm(accessData)}
                {this.state.deleteEnable && this.deleteModal()}
                {this.state.isAssessmentEditable && this.renderAssessment(accessData)}
                {this.state.isFeedbackEditable && this.renderFeedback(accessData)}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetActivities: state.GetActivities,
        GetActivity: state.GetActivity,
        SetActivities: state.SetActivities,
        UpdateActivity: state.UpdateActivity,
        DeleteActivity: state.DeleteActivity
    }
}

export default connect(mapStateToProps, { getActivities, getActivity, setActivities, updateActivity, deleteActivity })(Activities);