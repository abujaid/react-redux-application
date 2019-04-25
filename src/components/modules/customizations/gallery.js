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
import GallerysForm from './gallerys_form';
import { API_URL } from '../../../constants';

/*  import consumable API functions */
import { getGallerys, getGallery, setGallerys, updateGallery, deleteGallery } from '../../../actions/modules_action/customizations';

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
      dataField: "sort",
      text: "Sort",
      sort: true,
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

/* Define a class Based Component */
class Gallery extends Component {
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
        this.props.getGallerys(this.props.token, this.state.accessId);
    }
    
    // renderAction method is used to render Edit and Delete Icon in the ui
    renderAction = (id) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getGalleryItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2" onClick={() => this.deleteModalToggle(true, id)}>
                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
            </Button>
        </div>
    );
    
    // renderGallerys method is used to display data into the table.
    renderGallerys = (gallery) => {
        
        return gallery.map(item => {

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
                    sort: item.sort,
                    dateAdded: moment(item.createdAt).format('DD/MM/YYYY'),
                    status: item.isActive ? 'Active' : 'InActive',
                    action: this.renderAction(item.id)
                }
        });
    }

    // getGalleryItem this method is used to get the indiviual gallery event
    getGalleryItem = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: id
        });
        this.props.getGallery(this.props.token, id);
    }
    
    // deleteItem this method is used to delete the indiviual gallery event
    deleteItem = () => {
        this.props.deleteGallery(this.props.token, this.state.deleteItem);
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
        if(Object.keys(this.props.GetGallery).length > 0) {
            this.props.getGallery(this.props.token);
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
    
    // renderForm method is used to render the Gallery Component.
    renderForm = (accessData) => {

        //Used to Set data
        if(Object.keys(this.props.SetGallerys).length > 0 && 'status' in this.props.SetGallerys) {
            if(this.props.SetGallerys.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getGallerys(this.props.token, this.state.accessId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.SetGallerys.message || '',
                });
            }
            this.props.setGallerys(this.props.token);
        }
        
        //Used to Update data
        if(Object.keys(this.props.UpdateGallery).length > 0 && 'status' in this.props.UpdateGallery) {
            if(this.props.UpdateGallery.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Updated Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getGallerys(this.props.token, this.state.accessId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateGallery.message || '',
                });
            }
            this.props.updateGallery(this.props.token, this.state.accessId);
        }

        return (
            <GallerysForm
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
    
    // submit method is used to Submit the gallery form.
    submit = (formData) => {
        let request = {
            imageUrl: formData.image,
            sort: formData.sort,
            isActive: formData.status
        }
        
        if(this.state.accessId === 0) {
            this.props.setGallerys(this.props.token, request);
        } else {
            this.props.updateGallery(this.props.token, this.state.accessId, request);
        }
    }
    
    // START: render the main gallery component
    render = () => {
        let error = '';
        let accessData = {};
        let galleryData = [];
        
        //Used to Display list of items data
        if(Object.keys(this.props.GetGallerys).length > 0 && 'status' in this.props.GetGallerys) {
            if(this.props.GetGallerys.status) {
                galleryData = this.renderGallerys(this.props.GetGallerys.data);
                galleryData = galleryData.filter(item => item );
            } else {
                error = this.props.GetGallerys.message || '';
            }
        }
        
        //Used to Display individual data item
        if(Object.keys(this.props.GetGallery).length > 0 && 'status' in this.props.GetGallery) {
            if(this.props.GetGallery.status) {
                if(this.state.isFormEditable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFormEditable: true
                    }); 
                }
                accessData = this.props.GetGallery.data;
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something Wrong.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getGallerys(this.props.token, this.state.accessId);
                }
            }
        }
        
        //Used to Delete the data item.
        if(Object.keys(this.props.DeleteGallery).length > 0 && 'status' in this.props.DeleteGallery) {
            if(this.props.DeleteGallery.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Deleted Successfully.',
                    });
                    this.props.getGallerys(this.props.token, this.state.accessId);
                }   
            }
            this.props.deleteGallery(this.props.token);
        }
        
        return (
            <div>
                <Button color="success" className="float-right btn-auto" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">Gallery</h1>
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
                            data={galleryData}
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
    // END: render the main gallery component
}

const mapStateToProps = state => {
    return {
        GetGallerys: state.GetGallerys,
        GetGallery: state.GetGallery,
        SetGallerys: state.SetGallerys,
        UpdateGallery: state.UpdateGallery,
        DeleteGallery: state.DeleteGallery
    }
}

export default connect(mapStateToProps, { getGallerys, getGallery, setGallerys, updateGallery, deleteGallery })(Gallery);
