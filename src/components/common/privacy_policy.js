import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class PrivacyPolicy extends Component {
    render = () => {
        return (
            <Modal isOpen={this.props.isActive} toggle={this.props.onClose} className={this.props.className}>
                <ModalHeader toggle={this.props.onClose}>
                    <span className="display-5">Privacy Policy</span>
                </ModalHeader>
                <ModalBody>
                    <p className="text-left text-medium">
                        This privacy policy sets out how “Flight Scope University” uses and protects any information that you give “Flight Scope University” when you use this website. “Flight Scope University” is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. “Flight Scope University” may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from January 2019
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={this.props.onClose}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}