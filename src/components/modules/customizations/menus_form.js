/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

/*  import a javascript file */
import { API_URL } from '../../../constants';

/*  import consumable API functions */
import { activityUploadFile } from '../../../actions/modules_action/activities';

/* Define a class Based Component */
class MenusForm extends Component {
    constructor(props) {
        super(props);

        let accessData = this.props.accessData;
        let menusList = this.props.menusList;
        this.state = {
            form: {
                name: accessData.name ? accessData.name : '',
                url: accessData.url ? accessData.url : '',
                parentId: accessData.parentId ? accessData.parentId : null,
                status: accessData.isActive == false ? false : true,
                uploadError: ''
            }
        }
    }
    
    // handleChange method is used to handle the user input's when event occured.
    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');
        let value = event.target.value;
        
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [attribute]: value,
            }
        });
    }
    
    // handleSubmit method is used to handle the form submitation.
    handleSubmit = (event) => { 
        this.setState({
            ...this.state
        });
        this.props.submit(this.state.form);
    }

    getMenuOptions = () =>{
        let menu = this.props.menusList;
        let optionArr = [];
        let option = '';
        if(menu.length > 0 && menu != undefined){
            menu.map((item, key) => {
                option = <React.Fragment key={key}>
                    <option value={item.id}>{item.name}</option>
                </React.Fragment>
                optionArr.push(option);
            })
        }
        return optionArr;
    }
    
    // START: Component rendering
    render = () => {
        return (
            <Modal isOpen={this.props.formEditable} toggle={this.props.onFormEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFormEdited}>
                    <span className="display-5">Add/Edit Menu</span>
                </ModalHeader>
                <ModalBody>
                    <div className="menus-form text-medium">
                    <Col>
                        {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.props.error}
                        </UncontrolledAlert>}
                        <Form id="menus" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                                <Label for="parentId" sm={3}>Parent</Label>
                                <Col sm={9}>
                                    <Input
                                        type="select"
                                        name="parentId"
                                        data-state="parentId"
                                        className="form-control"
                                        value={this.state.form.parentId}
                                        onChange={this.handleChange}
                                    >
                                        <option value={null}>Main Menu</option>
                                        {this.getMenuOptions()}
                                    </Input>
                                </Col>
                            </FormGroup>
                        <FormGroup row>
                                <Label for="name" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="name"
                                        data-state="name"
                                        className="form-control"
                                        placeholder="Name"
                                        value={this.state.form.name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="url" sm={3}>URL</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="url"
                                        data-state="url"
                                        className="form-control"
                                        placeholder="URL"
                                        value={this.state.form.url}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="status" sm={3}>Status</Label>
                                <Col sm={9}>
                                    <Input
                                        type="select"
                                        name="status"
                                        data-state="status"
                                        className="form-control"
                                        placeholder="Status"
                                        value={this.state.form.status}
                                        onChange={this.handleChange}
                                    >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="info btn-auto" onClick={this.handleSubmit}>
                        <FeatherIcon icon="save" size="20" className="mb-1" /> Save
                    </Button>
                    <Button color="secondary btn-auto" onClick={this.props.onFormEdited}>
                        <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default MenusForm;

        