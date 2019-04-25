import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'reactstrap';

import background from './../../images/subscription_banner.jpg';

export default class SubscriptionBanner extends Component {
    render = () => (
        <Container fluid className="subscription-banner px-0 mt-5" style={{ backgroundImage: `url(${background})` }}>
            <Container className="pt-4 pb-4">
                <Row className="d-flex align-items-center">
                    <Col sm={8} className="d-flex flex-column text-center">
                        <h1 className="display-6 text-white">Buy Your subscription plan For Your Facility Or Associates</h1>
                        <p className="text-medium text-white">Best Golf Subscription</p>
                    </Col>
                    <Col sm={4} className="d-flex">
                        <Button color="info btn-auto ml-auto" href="/#/subscription-plan">Buy Your Subscription Plan</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}