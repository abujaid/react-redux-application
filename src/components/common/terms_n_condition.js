import React, { Component } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class TermsNCondition extends Component {
    render = () => {
        return (
            <Modal isOpen={this.props.isActive} toggle={this.props.onClose} className={this.props.className}>
                <ModalHeader toggle={this.props.onClose}>
                    <span className="display-5">Terms & Conditions</span>
                </ModalHeader>
                <ModalBody>
                    <p className="text-left text-medium">
                        Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://ballflightuniversity.com website (the "Service") operated by Flight Scope ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                    </p>
                    <strong>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</strong>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.props.onClose}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
