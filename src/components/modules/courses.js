import React, { Component } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import FeatherIcon from "feather-icons-react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button, UncontrolledAlert, Modal, ModalBody, ModalFooter, UncontrolledTooltip } from "reactstrap";

import { API_URL } from "./../../constants";
import CoursesForm from "./courses_form";
import CoursesUserList from './courses_user_list';
import ViewCourseFeedback from './view_course_feedback';
import { getCourses, getCourse, setCourses, updateCourse, deleteCourse } from "./../../actions/modules_action/courses";
import { getActivities } from "./../../actions/modules_action/activities";

const columns = [
  {
    dataField: "image",
    text: "Image",
    headerStyle: {
      width: '80px'
    }
  },
  {
    dataField: "courseName",
    text: "Course Name",
    sort: true,
    headerStyle: {
      width: '150px'
    }
  },
  {
    dataField: "noOfActivity",
    text: "Number Of Activity",
    sort: true,
    headerStyle: {
      width: '100px'
    }
  },
  {
    dataField: "price",
    text: "Price",
    headerStyle: {
      width: '100px'
    }
  },
  {
    dataField: "status",
    text: "Status",
    headerStyle: {
      width: '100px'
    }
  },
  {
    dataField: "action",
    text: "Action",
    headerStyle: {
      width: '150px'
    }
  }
];

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      formSuccessMessage: "",
      formErrorMessage: "",
      accessId: 0,
      isFormEditable: false,
      deleteItem: 0,
      deleteEnable: false,
      userListItem: 0,
      userListEnable: false,
      feedbackData: []
    };

    this.props.getCourses(this.props.token);
    this.props.getActivities(this.props.token);
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

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

  renderAction = (id, isFeedback) => (
    <div className="actions">
      <Button
        color="info"
        data-id={id}
        className="btn-auto pt-1 pb-1 px-2 mr-2"
        onClick={() => this.getCourseItem(id)}
      >
        <FeatherIcon icon="edit" size="18" className="mb-1" />
      </Button>
      <Button
        color="danger"
        data-id={id}
        className="btn-auto pt-1 pb-1 px-2 mr-2"
        onClick={() => this.deleteModalToggle(true, id)}
      >
        <FeatherIcon icon="trash-2" size="18" className="mb-1" />
      </Button>
      <Button
        color="warning"
        data-id={id}
        className="btn-auto pt-1 pb-1 px-2 mr-2"
        onClick={() => this.userListToggle(true, id)}
      >
        <FeatherIcon icon="users" size="18" className="mb-1" />
      </Button>
      {isFeedback && <Button
        color="success"
        data-id={id}
        className="btn-auto pt-1 pb-1 px-2"
        onClick={() => this.userCommentsToggle(true, id)}
      >
        <FeatherIcon icon="message-square" size="18" className="mb-1" />
      </Button>}
    </div>
  );

  renderRecords = (courses, status = true) => {
    return courses.map(item => {
      let image = (
        <div className="d-flex align-items-center justify-content-center thumb-image">
          <FeatherIcon icon="image" size="20" />
        </div>
      );

      if (item.image) {
        image = (
          <div className="d-flex align-items-center justify-content-center thumb-image">
            <img
              src={`${API_URL}/${item.image}`}
              className="img-thumbnail w-100"
            />
          </div>
        );
      }

      if (item.isActive == status) {
        let name = item.name;
        let nameType = false;
        if(item.name.length > 22) {
            name = name.slice(0,22)+"...";
            nameType = true;
        }
        return {
          id: item.id,
          image: image,
          courseName: (nameType) ? this.renderActivityName(item.id, name, item.name) : item.name,
          noOfActivity: item.Activities.length,
          price: item.coursePrice > 0 ? "Paid" : "Free",
          status: item.isActive ? "Active" : "Inactive",
          action: this.renderAction(item.id, item.isFeedback)
        };
      }
    });
  };

  getCourseItem = id => {
    this.setState({
      ...this.state,
      formSuccessMessage: "",
      formErrorMessage: "",
      accessId: id
    });
    this.props.getCourse(this.props.token, id);
  };

  deleteItem = () => {
    this.props.deleteCourse(this.props.token, this.state.deleteItem);
    this.deleteModalToggle(false, 0);
  }

  formModalToggle = () => {
    this.setState({
      ...this.state,
      formSuccessMessage: "",
      formErrorMessage: "",
      accessId: 0,
      isFormEditable: !this.state.isFormEditable
    });
    if (Object.keys(this.props.GetCourse).length > 0) {
      this.props.getCourse(this.props.token);
    }
  };

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

  userCommentsToggle = (enable = false, id = 0) => {
    this.setState({
      ...this.state,
      formSuccessMessage: '',
      userFeedbackItem: id,
      userFeedbackEnable: !this.state.userFeedbackEnable
    });
  }
  
  activitiesList = () => {
    let activitiesList = [];
    if (
      Object.keys(this.props.GetActivities).length > 0 &&
      "status" in this.props.GetActivities
    ) {
      if (this.props.GetActivities.status) {
        this.props.GetActivities.data.map(item => {
          if (item.isActive === true) {
            activitiesList.push({
              id: item.id,
              name: item.name
            });
          }
        });
      }
    }

    return activitiesList;
  };

  renderForm = accessData => {
    if (
      Object.keys(this.props.SetCourses).length > 0 &&
      "status" in this.props.SetCourses
    ) {
      if (this.props.SetCourses.status) {
        if (this.state.formSuccessMessage === "") {
          this.setState({
            ...this.state,
            formSuccessMessage: "Data Submitted Successfully.",
            accessId: 0,
            isFormEditable: false
          });
          this.props.getCourses(this.props.token);
        }
      } else {
        this.setState({
          ...this.state,
          formErrorMessage: this.props.SetCourses.message || ""
        });
      }
      this.props.setCourses(this.props.token);
    }

    if (
      Object.keys(this.props.UpdateCourse).length > 0 &&
      "status" in this.props.UpdateCourse
    ) {
      if (this.props.UpdateCourse.status) {
        if (this.state.formSuccessMessage === "") {
          this.setState({
            ...this.state,
            formSuccessMessage: "Data Submitted Successfully.",
            accessId: 0,
            isFormEditable: false
          });
          this.props.getCourses(this.props.token);
        }
      } else {
        this.setState({
          ...this.state,
          formErrorMessage: this.props.UpdateCourse.message || ""
        });
      }
      this.props.updateCourse(this.props.token, this.state.accessId);
    }

    return (
      <CoursesForm
        error={this.state.formErrorMessage}
        token={this.props.token}
        accessData={accessData}
        activities={this.activitiesList()}
        formEditable={this.state.isFormEditable}
        onFormEdited={this.formModalToggle}
        submit={this.submit}
      />
    );
  };

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
      <CoursesUserList
        token={this.props.token}
        courseId={this.state.userListItem}
        isActive={this.state.userListEnable}
        onCancel={this.userListToggle}
      />
    );
  }

  feedbackListModal = () =>{
    return (
      <ViewCourseFeedback
        token={this.props.token}
        // feedbackData={this.state.feedbackData}
        courseId={this.state.userFeedbackItem}
        isActive={this.state.userFeedbackEnable}
        userCommentsToggle={this.userCommentsToggle}
      />
    );
  }

  validatePrice = price => {
    if (price % 1 > 0) {
      return parseFloat(price);
    } else {
      return parseFloat(price + ".00");
    }
  };

  submit = formData => {
    let activeUser = null;
    if (localStorage.getItem("fs_user_data") !== null) {
      let user_data = JSON.parse(localStorage.getItem("fs_user_data"));
      activeUser = user_data.data.id;
    }
    
    let request = {
      name: formData.courseName,
      description: formData.description,
      image: formData.image,
      coursePrice: Number(parseFloat(formData.coursePrice).toFixed(2)),
      subscribedPrice: Number(parseFloat(formData.subscriptionPrice).toFixed(2)),
      category: "1",
      activities: formData.activities,
      isActive: formData.status,
      prerequisites: formData.prerequisite,
      marketing: formData.marketing,
      isFeedback: formData.feedback,
      createdBy: activeUser
    };

    if (this.state.accessId === 0) {
      this.props.setCourses(this.props.token, request);
    } else {
      this.props.updateCourse(this.props.token, this.state.accessId, request);
    }
  };

  render = () => {
    let error = "";
    let accessData = {};
    let coursesActive = [];
    let coursesInactive = [];
    if (
      Object.keys(this.props.GetCourses).length > 0 &&
      "status" in this.props.GetCourses
    ) {
      if (this.props.GetCourses.status) {
        coursesActive = this.renderRecords(this.props.GetCourses.data, true);
        coursesActive = coursesActive.filter(item => item !== undefined);
        coursesInactive = this.renderRecords(this.props.GetCourses.data, false);
        coursesInactive = coursesInactive.filter(item => item !== undefined);
      } else {
        error = this.props.GetCourses.message || "";
      }
    }

    if (
      Object.keys(this.props.GetCourse).length > 0 &&
      "status" in this.props.GetCourse
    ) {
      if (this.props.GetCourse.status) {
        if (this.state.isFormEditable === false && this.state.accessId !== 0) {
          this.setState({
            ...this.state,
            isFormEditable: true
          });
        }
        accessData = this.props.GetCourse.data;
      } else {
        if (this.state.formErrorMessage === "") {
          this.setState({
            ...this.state,
            formErrorMessage: "Something Wrong.",
            accessId: 0,
            isFormEditable: false
          });
          this.props.getCourses(this.props.token);
        }
      }
    }

    if(Object.keys(this.props.DeleteCourse).length > 0 && 'status' in this.props.DeleteCourse) {
      if(this.props.DeleteCourse.status) {
        if(this.state.formSuccessMessage === '') {
          this.setState({
            ...this.state,
            formSuccessMessage: 'Data Deleted Successfully.',
          });
          this.props.getCourses(this.props.token);
        }   
      }
      this.props.deleteCourse(this.props.token);
    }

    return (
      <section>
        <Button
          color="success"
          className="float-right btn-auto"
          onClick={this.formModalToggle}
        >
          <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
        </Button>
        <h1 className="display-5">Courses</h1>
        {this.state.formSuccessMessage !== "" && (
          <UncontrolledAlert className="text-left" color="success">
            <strong>Success:</strong> {this.state.formSuccessMessage}
          </UncontrolledAlert>
        )}
        {error !== "" && (
          <UncontrolledAlert className="text-left" color="danger">
            <strong>Error:</strong> {error}
          </UncontrolledAlert>
        )}
        <div className="module-content">
          <Nav className="md-tabs d-flex flex-row pointer" tabs>
            <NavItem>
              <NavLink
                className={this.state.activeTab == "1" ? "active" : ""}
                onClick={() => this.toggleTab("1")}
              >
                Active Course
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab == "2" ? "active" : ""}
                onClick={() => this.toggleTab("2")}
              >
                Inactive Course
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab} className="md-content">
            <TabPane tabId="1" className="overflow-x">
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={coursesActive}
                columns={columns}
                noDataIndication="No Record Found."
                pagination={paginationFactory()}
              />
            </TabPane>
            <TabPane tabId="2" className="overflow-x">
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={coursesInactive}
                columns={columns}
                noDataIndication="No Record Found."
                pagination={paginationFactory()}
              />
            </TabPane>
          </TabContent>
        </div>
        {this.state.isFormEditable && this.renderForm(accessData)}
        {this.state.deleteEnable && this.deleteModal()}
        {this.state.userListEnable && this.userListModal()}
        {this.state.userFeedbackEnable && this.feedbackListModal()}
      </section>
    );
  };
}

const mapStateToProps = state => {
  return {
    GetCourses: state.GetCourses,
    GetCourse: state.GetCourse,
    SetCourses: state.SetCourses,
    UpdateCourse: state.UpdateCourse,
    DeleteCourse: state.DeleteCourse,
    GetActivities: state.GetActivities
  };
};

export default connect(
  mapStateToProps,
  { getCourses, getCourse, setCourses, updateCourse, deleteCourse, getActivities }
)(Courses);
