import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  login,
  loginGoogle,
  loginFacebook
} from "./../../actions/login_action";
import Login from "./../../components/login";

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: "",
      loggedIn: false
    };
  }
  submit = formData => {
    this.setState({
      ...this.state,
      loginError: '',
      loggedIn: false
    });
    this.props.login(formData);
  };

  submitGoogle = tokenId => {
    this.props.loginGoogle(tokenId);
  };

  submitFacebook = accessToken => {
    this.props.loginFacebook(accessToken);
  };

  render = () => {
    let token = "";
    if (
      this.props.location.state !== undefined &&
      "error" in this.props.location.state
    ) {
      this.setState({
        ...this.state,
        loginError: this.props.location.state.error || "",
        loggedIn: false
      });
      this.props.location.state = undefined;
    }

    if(this.state.loginError === "") {
      if (
        localStorage.getItem("fs_user_data") !== null
      ) {
        let user_data = JSON.parse(localStorage.getItem("fs_user_data"));
        token = user_data.token;
        this.setState({
          ...this.state,
          loginError: "",
          loggedIn: true
        });
      } else {
        if (
          Object.keys(this.props.Login).length > 0 &&
          "status" in this.props.Login
        ) {
          if (this.props.Login.status) {
            token = this.props.Login.token;
            this.setState({
              ...this.state,
              loginError: "",
              loggedIn: true
            });
          } else {
            this.setState({
              ...this.state,
              loginError: this.props.Login.message || "",
              loggedIn: false
            });
          }
          this.props.login({});
        }
      }
    }

    if (this.state.loggedIn && token) {
      if(this.props.location.state !== undefined && 'activeCourse' in this.props.location.state) {
        return <Redirect to={{
              pathname: `/profile/course/${token}`,
              state: { activeCourse: this.props.location.state.activeCourse, enrolledCourse: 'enroll' }
            }}
          />
      } else {
        return <Redirect to={`/profile/dashboard/${token}`} />;
      }
    }

    return (
      <Login
        error={this.state.loginError}
        submit={this.submit}
        submitGoogle={this.submitGoogle}
        submitFacebook={this.submitFacebook}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    Login: state.Login
  };
};

export default connect(
  mapStateToProps,
  { login, loginGoogle, loginFacebook }
)(LoginContainer);
