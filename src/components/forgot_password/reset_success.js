import React, { Component } from 'react';

import FeatherIcon from 'feather-icons-react';
import { Container, Col } from 'reactstrap';

import './style.css';
import background from './../../images/background.jpg';
import logo from './../../images/logo.png';

export default class ResetSuccess extends Component {
    render = () => (
        <div id="reset-success-page" style={{ backgroundImage: `url(${background})` }}>
            <Container>
                <div className="form-heading text-center mt-5 mb-4">
                    <a href="/#/"><img src={ logo } alt="Logo" /></a>
                </div>
                <div className="reset-success-wrapper text-center">
                    <Col>
                        <FeatherIcon icon="check-circle" size="50" className="mb-2 mt-3 text-success" /><br />
                        <h1 className="display-4">Congratulations!</h1>
                        <p className="text-large text-center mt-4">
                            Your password has been changed.
                        </p>
                    </Col>
                    <Col>
                        <div className="card-footer mt-3 text-medium">
                            Return to <a href="/#/login">Login</a>
                        </div>
                    </Col>
                </div>
            </Container>
        </div>
    );
}