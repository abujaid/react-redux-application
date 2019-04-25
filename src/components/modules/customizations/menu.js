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
import MenusForm from './menus_form';
import { API_URL } from '../../../constants';

/*  import consumable API functions */
import { getMenus, getMenu, setMenus, updateMenu, deleteMenu } from '../../../actions/modules_action/customizations';

/*  define config variables */
const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: {
        width: '200px'
      }
    },
    {
        dataField: "parentId",
        text: "Parent Menu ID",
        sort: true,
        headerStyle: {
          width: '150px'
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
class Menu extends Component {
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
        this.props.getMenus(this.props.token, this.state.accessId);
    }
    
    // renderAction method is used to render Edit and Delete Icon in the ui
    renderAction = (id) => (
        <div className="actions">
            <Button color="info" data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getMenuItem(id)}>
                <FeatherIcon icon="edit" size="18" className="mb-1" />
            </Button>
            <Button color="danger" data-id={id} className="btn-auto pt-1 pb-1 px-2" onClick={() => this.deleteModalToggle(true, id)}>
                <FeatherIcon icon="trash-2" size="18" className="mb-1" />
            </Button>
        </div>
    )

    // renderGallerys method is used to display data into the table.
    renderMenus = (menu) => {
        let optionArr = [];
        menu.forEach((item, key) => {
                let option = {
                    id: item.id,
                    name: item.name,
                    parentId: 'Main Menu',
                    dateAdded: moment(item.createdAt).format('DD/MM/YYYY'),
                    status: item.isActive ? 'Active' : 'InActive',
                    action: this.renderAction(item.id)
                };
            
                optionArr.push(option);
                if (item.children.length > 0) {
                item.children.forEach((sub_menu, index) => {
                    let inner_option = {
                        id: sub_menu.id,
                        name: sub_menu.name,
                        parentId: item.name,
                        dateAdded: moment(sub_menu.createdAt).format('DD/MM/YYYY'),
                        status: item.isActive ? 'Active' : 'InActive',
                        action: this.renderAction(sub_menu.id)
                    };
                    optionArr.push(inner_option);
                  });
                }
        })
        return (optionArr);
    }
    
    // getMenuItem this method is used to get the indiviual news event
    getMenuItem = (id) => {
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: id
        });
        this.props.getMenu(this.props.token, id);
    }
    
    // deleteItem this method is used to delete the indiviual news event
    deleteItem = () => {
        this.props.deleteMenu(this.props.token, this.state.deleteItem);
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
        if(Object.keys(this.props.GetMenu).length > 0) {
            this.props.getMenu(this.props.token);
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
    renderForm = (accessData, menusList) => {
        //Used to Set data
        if(Object.keys(this.props.SetMenus).length > 0 && 'status' in this.props.SetMenus) {
            if(this.props.SetMenus.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Submitted Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getMenus(this.props.token, this.state.accessId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.SetMenus.message || '',
                });
            }
            this.props.setMenus(this.props.token);
        }
        
        //Used to Update data
        if(Object.keys(this.props.UpdateMenu).length > 0 && 'status' in this.props.UpdateMenu) {
            if(this.props.UpdateMenu.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Updated Successfully.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getMenus(this.props.token, this.state.accessId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateMenu.message || '',
                });
            }
            this.props.updateMenu(this.props.token, this.state.accessId);
        }

        return (
            <MenusForm
                error={this.state.formErrorMessage}
                token={this.props.token}
                accessData={accessData}
                menusList={menusList}
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
    
    // submit method is used to Submit the menu form.
    submit = (formData) => {
        let request = {
            name: formData.name,
            url: formData.url,
            parentId: formData.parentId,
            isActive: formData.status
        }

        if(this.state.accessId === 0) {
            this.props.setMenus(this.props.token, request);
        } else {
            this.props.updateMenu(this.props.token, this.state.accessId, request);
        }
    }
    
    // START: render the main Menu component
    render = () => {
        let error = '';
        let accessData = {};
        let menusList = {};
        let menuData = [];
        
        //Used to Display list of items data
        if(Object.keys(this.props.GetMenus).length > 0 && 'status' in this.props.GetMenus) {
            if(this.props.GetMenus.status) {
                menuData = this.renderMenus(this.props.GetMenus.data);
                menuData = menuData.filter(item => item );
                menusList = menuData;
            } else {
                error = this.props.GetMenus.message || '';
            }
        }

        //Used to Display list of items data
        if(Object.keys(this.props.GetMenu).length > 0 && 'status' in this.props.GetMenu) {
            if(this.props.GetMenu.status) {
                if(this.state.isFormEditable === false && this.state.accessId !== 0) {
                    this.setState({
                        ...this.state,
                        isFormEditable: true
                    }); 
                }
                accessData = this.props.GetMenu.data;
            } else {
                if(this.state.formErrorMessage === '') {
                    this.setState({
                        ...this.state,
                        formErrorMessage: 'Something Wrong.',
                        accessId: 0,
                        isFormEditable: false
                    });
                    this.props.getMenus(this.props.token, this.state.accessId);
                }
            }
        }
        
        //Used to Delete individual data item
        if(Object.keys(this.props.DeleteMenu).length > 0 && 'status' in this.props.DeleteMenu) {
            if(this.props.DeleteMenu.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Deleted Successfully.',
                    });
                    this.props.getMenus(this.props.token, this.state.accessId);
                }   
            }
            this.props.deleteMenu(this.props.token);
        }
        
        return (
            <div>
                <Button color="success" className="float-right btn-auto" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">Menu</h1>
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
                            data={menuData}
                            columns={columns}
                            noDataIndication="No Record Found."
                            pagination={paginationFactory()}
                        />
                    </div>
                </div>
                {this.state.isFormEditable && this.renderForm(accessData, menusList)}
                {this.state.deleteEnable && this.deleteModal()}
            </div>
        );
    }
    // END: render the main Menu component
}

const mapStateToProps = state => {
    return {
        GetMenus: state.GetMenus,
        GetMenu: state.GetMenu,
        SetMenus: state.SetMenus,
        UpdateMenu: state.UpdateMenu,
        DeleteMenu: state.DeleteMenu
    }
}

export default connect(mapStateToProps, { getMenus, getMenu, setMenus, updateMenu, deleteMenu })(Menu);
