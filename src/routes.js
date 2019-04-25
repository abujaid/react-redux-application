import React from "react";
import { Switch, Route } from "react-router-dom";

import HomeContainer from "./containers/home_container";
import LoginContainer from "./containers/login_container";
import SignupContainer from "./containers/signup_container";
import ForgotPasswordContainer from "./containers/forgot_password_container";
import ResetPasswordContainer from "./containers/forgot_password_container/reset_password_container";
import SubscriptionPlanContainer from "./containers/home_container/subscription_plan_container";
import CertificationPageContainer from "./containers/home_container/certification_page_container";
import ProfileContainer from "./containers/profile_container";

/** Creating routing configuration */
const Routes = ({ location }) => (
  <Switch>
    <Route location={location} exact path="/" component={HomeContainer} />
    <Route location={location} exact path="/login" component={LoginContainer} />
    <Route
      location={location}
      exact
      path="/signup"
      component={SignupContainer}
    />
    <Route
      location={location}
      exact
      path="/forgot-password"
      component={ForgotPasswordContainer}
    />
    <Route
      location={location}
      exact
      path="/reset-password/:id/:token"
      component={ResetPasswordContainer}
    />
    <Route
      location={location}
      exact
      path="/subscription-plan"
      component={SubscriptionPlanContainer}
    />
    <Route
      location={location}
      exact
      path="/certification-page/:id"
      component={CertificationPageContainer}
    />
    <Route
      location={location}
      exact
      path="/profile/:page/:token"
      component={ProfileContainer}
    />
    <Route location={location} exact path="*" component={HomeContainer} />
  </Switch>
);

export default Routes;
