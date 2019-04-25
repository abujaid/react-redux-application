import React, { Component } from 'react';

import FeatherIcon from 'feather-icons-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class CategoriesForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                categoryName: '',
                description: '',
                status: true,
            }
        }
    }

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

    handleSubmit = (event) => {
        console.log('submitting...', this.state);
    }

    render = () => (
        <Modal isOpen={this.props.formEditable} toggle={this.props.onFormEdited} className="modal-lg">
            <ModalHeader toggle={this.props.onFormEdited}>
                <span className="display-5">Catagory Form</span>
            </ModalHeader>
            <ModalBody>
                <div className="category-form text-medium">
                <Col>
                    <Form id="category" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label for="category-name" sm={3}>Category Name</Label>
                            <Col sm={9}>
                                <Input
                                    type="text"
                                    name="category-name"
                                    data-state="categoryName"
                                    className="form-control"
                                    placeholder="Category Name"
                                    value={this.state.form.categoryName}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="description" sm={3}>Description</Label>
                            <Col sm={9}>
                                <Input
                                    type="textarea"
                                    name="description"
                                    data-state="description"
                                    className="form-control"
                                    placeholder="Description"
                                    value={this.state.form.description}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        {/* <FormGroup row>
                            <Label for="parent-category" sm={3}>Parent</Label>
                            <Col sm={9}>
                                <Input
                                    type="text"
                                    name="parent"
                                    data-state="parent"
                                    className="form-control"
                                    placeholder="Parent Category"
                                />
                            </Col>
                        </FormGroup> */}
                        {/* <FormGroup row>
                            <Label for="exampleSelectMulti" sm={3}>SEO URL</Label>
                            <Col sm={9}>
                                <Input
                                    type="text"
                                    name="seo-url"
                                    data-state="seo"
                                    className="form-control"
                                    placeholder="SEO URL"
                                    value={this.state.form.seo}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup> */}
                        <FormGroup row>
                            <Label for="exampleSelectMulti" sm={3}>Status</Label>
                            <Col sm={9}>
                                <Input
                                    type="select"
                                    name="status"
                                    data-state="status"
                                    className="form-control"
                                    placeholder="Status"
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