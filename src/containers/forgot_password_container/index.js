import React, { Component } from 'react';
import { connect } from 'react-redux';

import { forgotPassword } from './../../actions/forgot_password_action';
import ForgotPassword from './../../components/forgot_password';
import RecoveryInstruction from './../../components/forgot_password/recovery_instruction';

class ForgotPasswordContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requestError: '',
            requestSuccess: ''
        }
    }

    submit = (formData) => {
        this.props.forgotPassword(formData);
    }

    render = () => {
        let isRequesting = true;
        if(Object.keys(this.props.ForgotPassword).length > 0 && 'status' in this.props.ForgotPassword) {
            if(this.props.ForgotPassword.status) {
                this.setState({
                    ...this.state,
                    requestError: '',
                    requestSuccess: this.props.ForgotPassword.message || '',
                });
            } else {
                this.setState({
                    ...this.state,
                    requestError: this.props.ForgotPassword.message || '',
                    requestSuccess: '',
                });
            }
            this.props.forgotPassword({});
        }

        if('isRequesting' in this.props.ForgotPassword) {console.log('requesting');
            //isRequesting = this.props.ForgotPassword.isRequesting;
        }

        let render = <ForgotPassword
                request={isRequesting}
                success={this.state.requestSuccess}
                error={this.state.requestError}
                submit={this.submit}
            />;
        if(this.state.requestSuccess) {
            render = <RecoveryInstruction />;
        }

        return render;
    }
}

const mapStateToProps = state => {
    return {
        ForgotPassword: state.ForgotPassword
    }
}

export default connect(mapStateToProps, { forgotPassword })(ForgotPasswordContainer);