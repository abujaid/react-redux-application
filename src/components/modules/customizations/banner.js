/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Container, Row, Col, UncontrolledAlert, Card, CardImg } from 'reactstrap';

/*  import a javascript file */
import BannersForm from './../customizations/banners_form';
import { API_URL } from '../../../constants';

/*  import consumable API functions */
import { activityUploadFile } from '../../../actions/modules_action/activities';
import { getBanner, updateBanner } from './../../../actions/modules_action/customizations';

/* Define a class Based Component */
class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                isFormEditable: false,
                deleteItem: 0,
                deleteEnable: false
            },
            formSuccessMessage: '',
            formErrorMessage: '',
            uploadProperty: '',
            accessId: 1,
            uploadError: ''
        }
        this.props.getBanner(this.props.token, this.state.accessId);
    }  
    
    // formModalToggle this method is used to open the popup
    formModalToggle = () => { 
        this.setState({
            ...this.state,
            formSuccessMessage: '',
            formErrorMessage: '',
            accessId: 1,
            isFormEditable: !this.state.isFormEditable
        });
        if(Object.keys(this.props.GetBanner).length > 0) {
            this.props.getBanner(this.props.token, this.state.accessId);
        }
    }
    
    // renderForm method is used to render the BannersForm Component.
    renderForm = (accessData) => { 

        // Used to Update the Record
        if(Object.keys(this.props.UpdateBanner).length > 0 && 'status' in this.props.UpdateBanner) {
            if(this.props.UpdateBanner.status) {
                if(this.state.formSuccessMessage === '') {
                    this.setState({
                        ...this.state,
                        formSuccessMessage: 'Data Updated Successfully.',
                        accessId: 1,
                        isFormEditable: false
                    });
                    this.props.getBanner(this.props.token, this.state.accessId);
                }
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: this.props.UpdateBanner.message || '',
                });
            }
            this.props.updateBanner(this.props.token, this.state.accessId);
        }

        return (
            <BannersForm
                error={this.state.formErrorMessage}
                token={this.props.token}
                accessData={accessData}
                formEditable={this.state.isFormEditable}
                onFormEdited={this.formModalToggle}
                submit={this.submit}
            />
        );
    }
    
    // submit method is used to Submit the Form.
    submit = (formData) => {
        let request = {
            imageUrl: formData.bannerImage
        }
        this.props.updateBanner(this.props.token, this.state.accessId, request);
    }
    
    // START: render the main newsevent component
    render = () => {
        let error = '';
        let accessData = {};
        let bannerUrl = '';
        
        //Used to Display data items
        if(Object.keys(this.props.GetBanner).length > 0 && 'status' in this.props.GetBanner) {
            if(this.props.GetBanner.status && Object.keys(this.props.GetBanner.data).length > 0) {
                bannerUrl = this.props.GetBanner.data.imageUrl
            }
        }
       
        return (
            <Container fluid>
                {this.state.formSuccessMessage !== '' && <UncontrolledAlert className="text-left" color="success">
                    <strong>Success:</strong> {this.state.formSuccessMessage}
                </UncontrolledAlert>}
                {error !== '' && <UncontrolledAlert className="text-left" color="danger">
                    <strong>Error:</strong> {error}
                </UncontrolledAlert>}
                <h1 className="text-small text-center pt-4 pb-4 border-dashed pointer" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="50" /><br />
                    Add Banner.
                </h1>
                <Row>
                    <Col sm="12" md="12">
                        <Card className="mb-4">
                            <CardImg top src={`${API_URL}/${bannerUrl}`} alt="" width="350" height="200" />
                        </Card>
                    </Col>
                </Row>
                {this.state.isFormEditable && this.renderForm(accessData)}
            </Container>
        );
    }
    // END: render the main newsevent component
}

const mapStateToProps = state => {
    return {
        GetBanner: state.GetBanner,
        UpdateBanner: state.UpdateBanner,
        ActivityUploadFile: state.ActivityUploadFile
    }
}

export default connect(mapStateToProps, { getBanner, updateBanner, activityUploadFile })(Banner);
