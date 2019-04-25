/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Button, UncontrolledAlert, Modal, ModalBody, ModalFooter } from 'reactstrap';

/*  import a javascript file */
import NewsEventsForm from './newsevents_form';
import { API_URL } from '../../../constants';

/*  import consumable API functions */
import { getNewsEvents, getNewsEvent, setNewsEvents, updateNewsEvent, deleteNewsEvent } from '../../../actions/modules_action/customizations';

/*  define config variables */
const columns = [
    {
      dataField: "image",
      text: "Image",
      headerStyle: {
        width: '100px'
      }
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: {
        width: '200px'
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
class NewsEvent extends Component {
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
        this.props.getNewsEvents(this.props.token);
    }
    
    // renderAction method is used to render Edit and Delete Icon in the ui
    renderAction = (id) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getNewsEventItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2" onClick={() => this.deleteModalToggle(true, id)}>
                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
            </Button>
        </div>
    );
    
    // renderNewsEvents method is used to display data into the table.
    renderNewsEvents = (NewsEvent) => {
        return NewsEvent.map(item => {
            let image = <div className="d-flex align-items-center justify-content-center thumb-image">
                    <FeatherIcon icon="image" size="20" />
                </div>;
            
            if(item.imageUrl) {
                image = <div className="d-flex align-items-center justify-content-center thumb-image">
                                <img src={`${API_URL}/${item.imageUrl}`} className="img-thumbnail w-100" />
                        </div>
            }
            return {
                id: item.id,
                image: image,
                title: item.title,
                dateAdded: moment(item.createdAt).format('DD/MM/YYYY'),
                status: item.isActive ? 'Active' : 'InActive',
                action: this.renderAction(item.id)
            }
        });
    }

    // getNewsEventItem this method is used to get the indiviual news event
    getNewsEventItem = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: id
        });
        this.props.getNewsEvent(this.props.token, id);
    }
    
    // deleteItem this method is used to delete the indiviual news event
    deleteItem = () => {
        this.props.deleteNewsEvent(this.props.token, this.state.deleteItem);
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
        if(Object.keys(this.props.GetNewsEvent).length > 0) {
            this.props.getNewsEvent(this.props.token);
        }
    }
    
    // deleteModalToggle this method is used to open the delete confirmation popup
    deleteModalToggle = (enable = false, id = 0) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            deleteItem: id,
            deleteEnable: enable
        });
    }
    
    // renderForm method is used to render the NewsEventsForm Component.
    renderForm = (accessData) => {
        
        //Used to Set data
        if(Object.keys(this.props.SetNewsEvents).length > 0 && 'status' in this.props.SetNewsEvents) {
            if(this.props.SetNewsEvents.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getNewsEvents(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.SetNewsEvents.message || '',
                });
            }
            this.props.setNewsEvents(this.props.token);
        }

        //Used to Update data
        if(Object.keys(this.props.UpdateNewsEvent).length > 0 && 'status' in this.props.UpdateNewsEvent) {
            if(this.props.UpdateNewsEvent.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Updated Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getNewsEvents(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateNewsEvent.message || '',
                });
            }
            this.props.updateNewsEvent(this.props.token, this.state.accessId);
        }
     
        return (
            <NewsEventsForm
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
    
    // submit method is used to Submit the newsEvent form.
    submit = (formData) => {
        let request = {
            imageUrl: formData.image,
            title: formData.title,
            url: formData.url,
            isActive: formData.status
        }
        
        if(this.state.accessId === 0) {
            this.props.setNewsEvents(this.props.token, request);
        } else {
            this.props.updateNewsEvent(this.props.token, this.state.accessId, request);
        }
    }
    
    // START: render the main newsevent component
    render = () => {
        let error = '';
        let accessData = {};
        let newsEventData = [];
        
        //Used to Display list of items data
        if(Object.keys(this.props.GetNewsEvents).length > 0 && 'status' in this.props.GetNewsEvents) {
            if(this.props.GetNewsEvents.status) {
                newsEventData = this.renderNewsEvents(this.props.GetNewsEvents.data);
                newsEventData = newsEventData.filter(item => item );
            } else {
                error = this.props.GetNewsEvents.message || '';
            }
        }
        
        //Used to Display individual data item
        if(Object.keys(this.props.GetNewsEvent).length > 0 && 'status' in this.props.GetNewsEvent) {
            if(this.props.GetNewsEvent.status) {
                if(this.state.isFormEditable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFormEditable: true
                    }); 
                }
                accessData = this.props.GetNewsEvent.data;
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something Wrong.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getGetNewsEvents(this.props.token);
                }
            }
        }
        
        //Used to Delete the data item.
        if(Object.keys(this.props.DeleteNewsEvent).length > 0 && 'status' in this.props.DeleteNewsEvent) {
            if(this.props.DeleteNewsEvent.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Deleted Successfully.',
                    });
                    this.props.getNewsEvents(this.props.token);
                }   
            }
            this.props.deleteNewsEvent(this.props.token);
        }
        
        return (
            <div>
                <Button color="success" className="float-right btn-auto" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">News And Events</h1>
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
                            data={newsEventData}
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
    // END: render the main newsevent component
}

const mapStateToProps = state => {
    return {
        GetNewsEvents: state.GetNewsEvents,
        GetNewsEvent: state.GetNewsEvent,
        SetNewsEvents: state.SetNewsEvents,
        UpdateNewsEvent: state.UpdateNewsEvent,
        DeleteNewsEvent: state.DeleteNewsEvent
    }
}

export default connect(mapStateToProps, { getNewsEvents, getNewsEvent, setNewsEvents, updateNewsEvent, deleteNewsEvent })(NewsEvent);
