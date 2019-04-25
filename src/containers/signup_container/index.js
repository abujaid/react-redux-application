import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signup } from './../../actions/signup_action';
import SignUp from './../../components/signup';
import RegisterSuccess from './../../components/signup/register_success';

class SignupContainer extends Component
{
    constructor (props)
    {
        super(props);

        this.state = {
            registerSuccessMessage: '',
            registerErrorMessage: '',
            registerSuccess: false
        }
    }

    submit = (formData) =>
    {
        let reqest = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        }
        this.props.signup(reqest);
    }

    render = () =>
    {
        if (Object.keys(this.props.Signup).length > 0) {
            if (this.props.Signup.status) {
                this.setState({
                    ...this.state,
                    registerSuccessMessage: 'Congratulation! Your account has been created.',
                    registerErrorMessage: '',
                    registerSuccess: true
                });
            } else {
                this.setState({
                    ...this.state,
                    registerSuccessMessage: '',
                    registerErrorMessage: this.props.Signup.message || '',
                    registerSuccess: false
                });
            }
            this.props.signup({});
        }

        let render = <SignUp
            success={this.state.registerSuccessMessage}
            error={this.state.registerErrorMessage}
            submit={this.submit}
        />;

        if (this.state.registerSuccess) {
            render = <RegisterSuccess />;
        }

        return render;
    }
}

const mapStateToProps = state =>
{
    return {
        Signup: state.Signup
    }
}

export default connect(mapStateToProps, { signup })(SignupContainer);