import React, { Component } from 'react';
import { connect } from 'react-redux';

import { validateResetToken, resetPassword } from './../../actions/forgot_password_action/reset_password';
import ResetPassword from './../../components/forgot_password/reset_password';
import ResetSuccess from './../../components/forgot_password/reset_success';

class ResetPasswordContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resetErrorMessage: '',
            resetSuccessMessage: '',
            resetSuccess: false
        }

        this.props.validateResetToken({
            id: this.props.match.params.id,
            resetToken: this.props.match.params.token
        });
    }

    submit = (formData) => {
        let request = {
            id: this.props.match.params.id,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            resetToken: this.props.match.params.token 
        }
        this.props.resetPassword(request);
    }

    render = () => {
        if(Object.keys(this.props.ValidateResetToken).length > 0  && 'status' in this.props.ValidateResetToken) {
            if(!this.props.ValidateResetToken.status && !this.props.ValidateResetToken.isValid) {
                this.setState({
                    ...this.state,
                    resetErrorMessage: this.props.ValidateResetToken.err,
                    resetSuccessMessage: '',
                    resetSuccess: false
                });
            }
            this.props.validateResetToken({});
        }

        if(Object.keys(this.props.ResetPassword).length > 0  && 'status' in this.props.ResetPassword) {
            if(this.props.ResetPassword.status) {
                this.setState({
                    ...this.state,
                    resetErrorMessage: '',
                    resetSuccessMessage: 'Congratulation! Your password has been changed.',
                    resetSuccess: true
                });
            } else {
                this.setState({
                    ...this.state,
                    resetErrorMessage: this.props.ResetPassword.message || '',
                    resetSuccessMessage: '',
                    resetSuccess: false
                });
            }
            this.props.resetPassword({});
        }
        
        let render = <ResetPassword
                success={this.state.resetSuccessMessage}
                error={this.state.resetErrorMessage}
                submit={this.submit}
            />;

        if(this.state.resetSuccess) {
            render = <ResetSuccess />;
        }

        return render;
    }
}

const mapStateToProps = state => { 
    return {
        ValidateResetToken: state.ValidateResetToken,
        ResetPassword: state.ResetPassword
    }
}

export default connect(mapStateToProps, { validateResetToken, resetPassword })(ResetPasswordContainer);