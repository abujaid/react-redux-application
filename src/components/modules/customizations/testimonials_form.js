/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';

/* Define a class Based Component */
class TestimonialsForm extends Component {
    constructor(props) {
        super(props);

        let accessData = this.props.accessData;
        this.state = {
            form: {
                clientName: accessData.clientName || '',
                clientFeedback: accessData.clientFeedback || '',
                status: accessData.isActive == false ? 'false' : 'true',
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
    
    // START: Component rendering
    render = () => {
        
        return (
            <Modal isOpen={this.props.formEditable} toggle={this.props.onFormEdited} className="modal-lg">
                <ModalHeader toggle={this.props.onFormEdited}>
                    <span className="display-5">Testimonials Form</span>
                </ModalHeader>
                <ModalBody>
                    <div className="testimonials-form text-medium">
                    <Col>
                        {this.props.error !== '' && <UncontrolledAlert className="text-left" color="danger">
                            <strong>Error:</strong> {this.props.error}
                        </UncontrolledAlert>}
                        <Form id="testimonials" onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="client-name" sm={3}>Client Name</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="clientName"
                                        data-state="clientName"
                                        className="form-control"
                                        placeholder="Client Name"
                                        value={this.state.form.clientName}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="clientFeedback" sm={3}>Feedback</Label>
                                <Col sm={9}>
                                    <Input
                                        type="textarea"
                                        name="clientFeedback"
                                        data-state="clientFeedback"
                                        className="form-control"
                                        placeholder="Feedback"
                                        value={this.state.form.clientFeedback}
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

    // END: Component rendering
}

export default TestimonialsForm;

        