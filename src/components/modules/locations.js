import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';

import FeatherIcon from 'feather-icons-react';
import { Button, UncontrolledAlert, Modal, ModalBody, ModalFooter } from 'reactstrap';

import LocationsForm from './locations_form';
import { getLocations, getLocation, setLocations, updateLocation, deleteLocation } from './../../actions/modules_action/locations';

const columns = [
    {
      dataField: "location",
      text: "Location",
      sort: true,
      headerStyle: {
        width: '200px'
      }
    },
    {
      dataField: "latitude",
      text: "Latitude",
      headerStyle: {
        width: '100px'
      }
    },
    {
      dataField: "longitude",
      text: "Longitude",
      headerStyle: {
        width: '100px'
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

class Locations extends Component {
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
        this.props.getLocations(this.props.token);
    }

    renderAction = (id) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getLocationItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2" onClick={() => this.deleteModalToggle(true, id)}>
                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
            </Button>
        </div>
    )

    renderLocations = () => {
        let locations = [];
        if(Object.keys(this.props.GetLocations).length > 0 && 'status' in this.props.GetLocations) {
            if(this.props.GetLocations.status) {
                 this.props.GetLocations.data.map(item => {
                 return locations.push({
                        id: item.id,
                        location: item.location,
                        latitude: item.latitude || '-',
                        longitude: item.longitude || '-',
                        dateAdded: moment(item.createdAt).format('DD/MM/YYYY'),
                        status: item.isActive ? 'True' : 'False',
                        action: this.renderAction(item.id)
                    });
                });
            }
        }
        return locations;
    }

    getLocationItem = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: id
        });
        this.props.getLocation(this.props.token, id);
    }

    deleteItem = () => {
        this.props.deleteLocation(this.props.token, this.state.deleteItem);
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
        if(Object.keys(this.props.GetLocation).length > 0) {
            this.props.getLocation(this.props.token);
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
        if(Object.keys(this.props.SetLocations).length > 0 && 'status' in this.props.SetLocations) {
            if(this.props.SetLocations.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getLocations(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.SetLocations.message || '',
                });
            }
            this.props.setLocations(this.props.token);
        }

        if(Object.keys(this.props.UpdateLocation).length > 0 && 'status' in this.props.UpdateLocation) {
            if(this.props.UpdateLocation.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getLocations(this.props.token);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateLocation.message || '',
                });
            }
            this.props.updateLocation(this.props.token, this.state.accessId);
        }

        return (
            <LocationsForm
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
        let request = {
            location: formData.location,
            latitude: Number(parseFloat(formData.latitude)),
            longitude: Number(parseFloat(formData.longitude)),
            isActive: formData.status
        }

        if(this.state.accessId === 0) {
            this.props.setLocations(this.props.token, request);
        } else {
            this.props.updateLocation(this.props.token, this.state.accessId, request);
        }
    }

    render = () => {
        let error = '';
        let accessData = {};
        if(Object.keys(this.props.GetLocation).length > 0 && 'status' in this.props.GetLocation) {
            if(this.props.GetLocation.status) {
                if(this.state.isFormEditable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFormEditable: true
                    }); 
                }
                accessData = this.props.GetLocation.data;
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something Wrong.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getLocations(this.props.token);
                }
            }
        }

        if(Object.keys(this.props.DeleteLocation).length > 0 && 'status' in this.props.DeleteLocation) {
            if(this.props.DeleteLocation.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Deleted Successfully.',
                    });
                    this.props.getLocations(this.props.token);
                }   
            }
            this.props.deleteLocation(this.props.token);
        }
        
        return (
            <section>
                <Button color="success" className="float-right btn-auto" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">Locations</h1>
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
                            data={this.renderLocations()}
                            columns={columns}
                            noDataIndication="No Record Found."
                            pagination={paginationFactory()}
                        />
                    </div>
                </div>
                {this.state.isFormEditable && this.renderForm(accessData)}
                {this.state.deleteEnable && this.deleteModal()}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetLocations: state.GetLocations,
        GetLocation: state.GetLocation,
        SetLocations: state.SetLocations,
        UpdateLocation: state.UpdateLocation,
        DeleteLocation: state.DeleteLocation
    }
}

export default connect(mapStateToProps, { getLocations, getLocation, setLocations, updateLocation, deleteLocation })(Locations);