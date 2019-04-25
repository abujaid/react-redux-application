/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Modal, ModalBody, ModalFooter, Container, Row, Col, Button, Card, CardImg, CardBody, CardTitle, CardText, CardFooter, UncontrolledAlert } from 'reactstrap';

/*  import a javascript file */
import TestimonialsForm from './../customizations/testimonials_form';

/*  import consumable API functions */
import { getTestimonials, getTestimonial, setTestimonials, updateTestimonial, deleteTestimonial } from './../../../actions/modules_action/customizations';

/*  define config variables */
const columns = [
    {
      dataField: "clientName",
      text: "Client Name",
      headerStyle: {
        width: '150px'
      }
    },
    {
      dataField: "clientFeedback",
      text: "Client Feedback",
      sort: true,
      headerStyle: {
        width: '250px'
      }
    },
    {
        dataField: "dateAdded",
        text: "Date Added",
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


/* Define a class Based Component */
class Testimonial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: 0,
            isFormEditable: false,
            deleteItem: 0,
            deleteEnable: false
        }
        this.props.getTestimonials(this.props.token, this.state.accessId);
    }  

    // renderAction method is used to render Edit and Delete Icon in the ui
    renderAction = (id) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getTestimonialItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2" onClick={() => this.deleteModalToggle(true, id)}>
                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
            </Button>
        </div>
    );

    // renderTestinomials method is used to display data into the table.
    renderTestinomials = (testinomial) => {
        return testinomial.map(item => {
                return {
                    id: item.id,
                    clientName: item.clientName,
                    clientFeedback: item.clientFeedback,
                    dateAdded: moment(item.createdAt).format('DD/MM/YYYY'),
                    status: item.isActive ? 'Active' : 'InActive',
                    action: this.renderAction(item.id)
                }
        });
    }

    // getTestimonialItem this method is used to get individual record.
    getTestimonialItem = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: id
        });
        this.props.getTestimonial(this.props.token, id);
    }

    // deleteItem this method is used to delete individual record.
    deleteItem = () => {
        this.props.deleteTestimonial(this.props.token, this.state.deleteItem);
        this.deleteModalToggle(false, 0);
    }
    
    // formModalToggle this method is used to open the popup
    formModalToggle = () => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: 0,
            isFormEditable: !this.state.isFormEditable
        });
        if(Object.keys(this.props.GetTestimonial).length > 0) {
            this.props.getTestimonial(this.props.token);
        }
    }
    
    // deleteModalToggle this method is used to open delete popup with the data of individual record.
    deleteModalToggle = (enable = false, id = 0) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            deleteItem: id,
            deleteEnable: enable
        });
    }
    
    // renderForm method is used to render the TestimonialForm Component.
    renderForm = (accessData) => { 
        
        // Used to Set the Record
        if(Object.keys(this.props.SetTestimonials).length > 0 && 'status' in this.props.SetTestimonials) {
            if(this.props.SetTestimonials.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getTestimonials(this.props.token, this.state.accessId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.SetTestimonials.message || '',
                });
            }
            this.props.setTestimonials(this.props.token);
        }
        
        // Used to Update the Record
        if(Object.keys(this.props.UpdateTestimonial).length > 0 && 'status' in this.props.UpdateTestimonial) {
            if(this.props.UpdateTestimonial.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Updated Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getTestimonials(this.props.token, this.state.accessId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateTestimonial.message || '',
                });
            }
            this.props.updateTestimonial(this.props.token, this.state.accessId);
        }

        return (
            <TestimonialsForm
                error={this.state.formErrorMessage}
                token={this.props.token}
                accessData={accessData}
                formEditable={this.state.isFormEditable}
                onFormEdited={this.formModalToggle}
                submit={this.submit}
            />
        );
    }

    // deleteModal method is used to delete the record
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
    
    // submit method is used to Submit the Form.
    submit = (formData) => {
        let request = {
            clientName: formData.clientName,
            clientFeedback: formData.clientFeedback,
            isActive: formData.status
        }

        if(this.state.accessId === 0) {
            this.props.setTestimonials(this.props.token, request);
        } else {
            this.props.updateTestimonial(this.props.token, this.state.accessId, request);
        }
    }
    
    // START: render the main newsevent component
    render = () => {
        let error = '';
        let accessData = {};
        let testinomialData = '';
        
        //Used to Display list of items data
        if(Object.keys(this.props.GetTestimonials).length > 0 && 'status' in this.props.GetTestimonials) {
            if(this.props.GetTestimonials.status) {
                testinomialData = this.renderTestinomials(this.props.GetTestimonials.data);
                testinomialData = testinomialData.filter(item => item );
            } else {
                error = this.props.GetTestimonials.message || '';
            }
        }

        if(Object.keys(this.props.GetTestimonial).length > 0 && 'status' in this.props.GetTestimonial) {
            if(this.props.GetTestimonial.status) {
                if(this.state.isFormEditable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFormEditable: true
                    }); 
                }
                accessData = this.props.GetTestimonial.data;
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something Wrong.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getTestimonials(this.props.token, this.state.accessId);
                }
            }
        }
        
        //Used to Delete the record
        if(Object.keys(this.props.DeleteTestimonial).length > 0 && 'status' in this.props.DeleteTestimonial) {
            if(this.props.DeleteTestimonial.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Deleted Successfully.',
                    });
                    this.props.getTestimonials(this.props.token, this.state.accessId);
                }   
            }
            this.props.deleteTestimonial(this.props.token);
        }
       
        return (
            <div>
                <Button color="success" className="float-right btn-auto" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">Testinomial</h1>
                {this.state.formSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                    <strong>Success:</strong> {this.state.formSuccessMessage}
                </UncontrolledAlert>}
                {error !== '' && <UncontrolledAlert className="text-left" color="danger">
                    <strong>Error:</strong> {error}
                </UncontrolledAlert>}
                <div className="module-content">
                    <div className="overflow-x">
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={testinomialData}
                            columns={columns}
                            noDataIndication="No Record Found."
                            pagination={paginationFactory()}
                        />
                    </div>
                </div>
                {this.state.isFormEditable && this.renderForm(accessData)}
                {this.state.deleteEnable && this.deleteModal()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetTestimonials: state.GetTestimonials,
        GetTestimonial: state.GetTestimonial,
        SetTestimonials: state.SetTestimonials,
        UpdateTestimonial: state.UpdateTestimonial,
        DeleteTestimonial: state.DeleteTestimonial
    }
}

export default connect(mapStateToProps, { getTestimonials, getTestimonial, setTestimonials, updateTestimonial, deleteTestimonial })(Testimonial);    