import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";

import FeatherIcon from "feather-icons-react";
import {
  Container,
  CardDeck,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { updateUser } from "./../../actions/modules_action/users";

class Subscription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      env: "production",
      currency: "USD",
      client: {
        sandbox: "AcO-BtfdlfFyfw3WixxRKzOQ3J1QVDfgHYHDpsE1hyep-wUtNMKSMPHMhPe89EaFNE3LJ8YdSLgC2Yn_",
        production: "ARPydh_zCObxigPb8HWNPSGcVQ6BnUE8a2Rzd6xiBT3mV6SNoktJyewR1qqGtSOaIJo_TyIHGA2KpKcA"
      },
      onSuccess: false,
      onCancel: false,
      onError: false,
      paymentSuccess: false
    };
  }

  cardPricing = props => (
    <div className="card-pricing pt-4">
      <h1 className="display-6 text-center">{props.title}</h1>
      <h1 className="mt-4 text-center price">
        {props.price > 0 ? (
          <div>
            <span className="text-large text-white">$</span>
            {props.price}
            <span className="text-large text-white">
              {props.duration !== "" && "/ " + props.duration}
            </span>
          </div>
        ) : (
            <div>Free</div>
          )}
      </h1>
    </div>
  );

  onSuccessModalClose = () => {
    this.setState({
      ...this.state,
      onSuccess: false,
      onCancel: false,
      onError: false,
      paymentSuccess: true
    });
  };

  onSuccess = (payment, id) => {
    console.log("The payment was succeeded!!", payment);
    this.setState({
      ...this.state,
      onSuccess: true
    });

    let request = {
      subscriptionId: id
    };
    this.props.updateUser(this.props.token, this.props.userId, request);
  };

  successModal = token => {
    return (
      <Modal
        isOpen={this.state.onSuccess}
        toggle={this.onSuccessModalClose}
        className={this.props.className}
      >
        <ModalBody>
          <h1 className="mt-3 display-5 text-center text-success">
            <FeatherIcon icon="check-circle" size="50" className="mb-2" />
            <br />
            Your Payment is successfully completed.
          </h1>
          <p className="mt-3 text-center text-large">
            Go to{" "}
            <a href={`/#/profile/education/${token}`}>Available Trainings</a>.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary btn-auto" onClick={this.onSuccessModalClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  onErrorModalClose = () => {
    this.setState({
      ...this.state,
      onSuccess: false,
      onCancel: false,
      onError: false
    });
  };

  onCancel = data => {
    console.log("The payment was cancelled!!", data);
    this.setState({
      ...this.state,
      onCancel: true
    });
  };

  cancelModal = () => {
    return (
      <Modal
        isOpen={this.state.onCancel}
        toggle={this.onErrorModalClose}
        className={this.props.className}
      >
        <ModalBody>
          <h1 className="mt-3 display-5 text-center text-danger">
            <FeatherIcon icon="x-circle" size="50" className="mb-2" />
            <br />
            Your Payment is cancelled
          </h1>
          <p className="text-center text-medium">Retry your payment again.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary btn-auto" onClick={this.onErrorModalClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  onError = error => {
    console.log("Error!!", error);
  };

  renderPaypal = (amount, id) => (
    <PaypalExpressBtn
      env={this.state.env}
      client={this.state.client}
      currency={this.state.currency}
      total={amount}
      onError={this.onError}
      onSuccess={payment => this.onSuccess(payment, id)}
      onCancel={data => this.onCancel(data)}
    />
  );

  renderSubscriptionList = () => {
    let background = ["blue", "yellow", "red", "green"];
    let badgeColor = ["info", "warning", "danger", "success"];
    let romanLevel = {
      "0": "Start Level",
      "1": "Level I",
      "2": "Level II",
      "3": "Level III"
    };
    if (this.props.subscriptions.length > 0) {
      return this.props.subscriptions.map((item, index) => {
        return (
          <Card className={`sp-${background[index]} subscription-plan`} key={item.id}>
            <this.cardPricing title={romanLevel[item.level]} price={parseInt(item.price)} duration="" />
            <CardBody>
              <p className="mt-3 text-center text-small subscription-badge">
                <Badge color={`${badgeColor[index]} text-small text-white px-2 pt-2 pb-2`} pill>{item.name}</Badge>
              </p>
            </CardBody>
            <CardFooter className="d-flex justify-content-center">
              {this.props.loggedIn ? (
                this.props.subscriptionId.indexOf(item.id) > -1 ? (
                  <p className="text-black">
                    <em>Purchased</em>
                  </p>
                ) : (
                    this.renderPaypal(parseInt(item.price), item.id)
                  )
              ) : (
                  <a href="/#/login" className="text-large">
                    Login
                </a>
                )}
            </CardFooter>
          </Card>
        );
      });
    }
  };

  render = () => {
    if (this.state.paymentSuccess) {
      return <Redirect to={`/profile/dashboard/${this.props.token}`} />;
    } else {
      return (
        <Container className="mt-5 pb-5 border-bottom">
          {!this.props.loggedIn && (
            <h1 className="mb-5 text-center display-6">
              To purchase a subscription please <a href="/#/login">Login</a>.
            </h1>
          )}
          <CardDeck>{this.renderSubscriptionList()}</CardDeck>
          {this.state.onSuccess && this.successModal(this.props.token)}
          {this.state.onCancel && this.cancelModal()}
        </Container>
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    UpdateUser: state.UpdateUser
  };
};

export default connect(
  mapStateToProps,
  { updateUser }
)(Subscription);
