import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeatherIcon from 'feather-icons-react';
import { Container, Row, Col, InputGroup, Input, InputGroupAddon, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import background from './../../images/geometry.png';

import { subscribeUser } from '../../actions/home_action';

class NewsletterContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: ''
            },
            subscribeSuccess: false,
            subscribeErrorMessage: '',
            subscribeError: false,
            subscribePopup: false
        }
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-state');

        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [attribute]: event.target.value
            },
        });
    }

    handleSubmit = () => {
        let request = {
            email: this.state.form.email
        }
        this.props.subscribeUser(request);
    }

    popupToggle = () => {
        this.setState({
            ...this.state,
            subscribeSuccess: false,
            subscribeErrorMessage: '',
            subscribeError: false,
            subscribePopup: false
        });
    }

    showPopup = () => (
        <Modal isOpen={this.state.subscribePopup} toggle={this.popupToggle} className={this.props.className}>
            <ModalBody>
                {this.state.subscribeSuccess && <h1 className="mt-3 display-5 text-center text-success">
                    <FeatherIcon icon="check-circle" size="50" className="mb-2" /><br />
                    Thanks for subscribing.
                </h1>}
                {this.state.subscribeError && <h1 className="mt-3 display-5 text-center text-danger">
                    <FeatherIcon icon="x-circle" size="50" className="mb-2" /><br />
                    {this.state.subscribeErrorMessage ? this.state.subscribeErrorMessage : 'Something went wrong.'}
                </h1>}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary btn-auto" onClick={this.popupToggle}>Close</Button>
            </ModalFooter>
        </Modal>
    )

    render = () => {
        if (Object.keys(this.props.SubscribeUser).length > 0 && 'status' in this.props.SubscribeUser) {
            if (this.props.SubscribeUser.status) {
                this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        email: ''
                    },
                    subscribeSuccess: true,
                    subscribePopup: true
                });
            } else {
                this.setState({
                    ...this.state,
                    subscribeError: true,
                    subscribeErrorMessage: this.props.SubscribeUser.message || '',
                    subscribePopup: true
                });
            }
            this.props.subscribeUser({});
        }

        return (
            <Container fluid className="newsletter px-0" style={{ backgroundImage: `url(${background})` }}>
                <Container className="pt-5 pb-5">
                    <Row className="d-flex align-items-center">
                        <Col sm={12} className="d-flex flex-column text-center">
                            <h1 className="display-4 text-white">Subscribe Our Newsletter and Stay Connected</h1>
                            <p className="text-large text-white mt-3 pl-3 pr-3">
                                Subscribe now and receive weekly newsletter with educational materials, new courses, interesting posts, popular books and much more!
                            </p>
                            <div className="d-flex justify-content-center mt-5 newsletter-input-group">
                                <InputGroup>
                                    <Input
                                        type="email"
                                        name="email"
                                        data-state="email"
                                        className="form-control"
                                        placeholder="Enter Your Email To Subscribe"
                                        value={this.state.form.email}
                                        onChange={this.handleChange}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="info" onClick={() => this.handleSubmit()}>Subscribe</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </Col>
                    </Row>
                    {this.state.subscribePopup && this.showPopup()}
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        SubscribeUser: state.SubscribeUser
    }
}

export default connect(mapStateToProps, { subscribeUser })(NewsletterContainer);