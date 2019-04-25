import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

import './style.css';

export default class Footer extends Component {
    render = () => (
        <footer>
            <Row>
                <Col>
                    <p className="text-small text-right mt-2 mr-2">
                        Your Company @ 2018 - 2019
                    </p>
                </Col>
            </Row>
        </footer>
    );
}