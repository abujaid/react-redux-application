import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Moment from 'react-moment';
import FeatherIcon from 'feather-icons-react';
import { Col, Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';
import {editCertificate, getCertificateTemplate} from './../../actions/modules_action/certificate'
import JsxParser from 'react-jsx-parser';
import ContentEditable from 'react-contenteditable'


class EditCertificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certificateContent: '',
            certificateSuccessMessage: '',
            certificateErrorMessage: ''
        }
        this.contentEditable = React.createRef();
        this.props.getCertificateTemplate(this.props.token, true);
    }

    handleChange = evt => {
        this.setState({certificateContent: evt.target.value});
      };

    submitForm = () => {
        let request = {templateHTML: this.state.certificateContent}
        this.props.editCertificate(this.props.token, request);
    }

    render = () => {
        if(Object.keys(this.props.GetCertificateTemplate).length > 0){
            if(this.props.GetCertificateTemplate.status && 'templateHTML' in this.props.GetCertificateTemplate.data){
                if(this.props.GetCertificateTemplate.data.templateHTML != ''){
                    this.setState({
                        ...this.state,
                        certificateContent: this.props.GetCertificateTemplate.data.templateHTML
                    });
                    this.props.getCertificateTemplate(this.props.token, false);
                }
            }
        }

        if(Object.keys(this.props.EditCertificate).length > 0 && 'status' in this.props.EditCertificate){
            if(this.props.EditCertificate.status){
                this.setState({
                    ...this.state,
                    certificateSuccessMessage: 'Template updated successfully.'
                })
            } else {
                this.setState({
                    ...this.state,
                    certificateErrorMessage: this.props.EditCertificate.message
                })
            }
            this.props.editCertificate(this.props.token);
        }

        return (
            <section>
                <h1 className="display-5">Edit Certificate</h1>
                {this.state.certificateSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                    <strong>Success:</strong> {this.state.certificateSuccessMessage}
                </UncontrolledAlert>}
                {this.state.certificateErrorMessage !== '' && <UncontrolledAlert className="text-left" color="danger">
                    <strong>Error:</strong> {this.state.certificateErrorMessage}
                </UncontrolledAlert>}
                <div className="module-content">
                    <div className="activities-form text-medium">
                        <Col>
                            <Form id="activities" onSubmit={this.submitForm}>
                                <FormGroup row>
                                    <Label for="question" sm={2}>Certificate Content</Label>
                                    <Col sm={9} className="template-border">
                                        <ContentEditable
                                            innerRef={this.contentEditable}
                                            html={this.state.certificateContent}
                                            disabled={false}
                                            onChange={this.handleChange}
                                            tagName='article'
                                            className='certificateTemplate'
                                            blacklistedTags={['br']}
                                        />
                                    </Col>
                                </FormGroup>
                                <Button color="info btn-auto" onClick={this.submitForm}>
                                    <FeatherIcon icon="save" size="20" className="mb-1" /> Save
                                </Button>
                            </Form>
                        </Col>
                    </div>
                </div>
            </section>
        );
    }
}

const stateMaptoProps = state =>{
    return {
        EditCertificate: state.EditCertificate,
        GetCertificateTemplate: state.GetCertificateTemplate
    }
}

export default connect(stateMaptoProps, {editCertificate, getCertificateTemplate})(EditCertificate);
