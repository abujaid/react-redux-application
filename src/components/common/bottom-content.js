import React, { Component } from 'react';

import FeatherIcon from 'feather-icons-react';
import { Container, Row, Collapse, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';

export default class BotomContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            accordionActive: '',
            accordionCollapse: false
        }
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    accordionToggle = (accordion) => {
        let accordionActive = '';
        let accordionCollapse = false;

        if (this.state.accordionActive !== accordion) {
            accordionActive = accordion;
            accordionCollapse = true;
        }

        this.setState({
            ...this.state,
            accordionActive: accordionActive,
            accordionCollapse: accordionCollapse
        });
    }

    render = () => (
        <Container className="bottom-content mt-5">
            <Row className="accordion d-flex flex-column">
                <Nav className="md-tabs" tabs>
                    <NavItem>
                        <NavLink className={this.state.activeTab == "1" ? "active" : ""} onClick={() => this.toggleTab('1')}>
                            Certification
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab} className="px-0">
                    <TabPane tabId="1">
                        <div className="accordion-group">
                            <Button className="accordion-item btn-no-shadow text-left px-4" onClick={() => this.accordionToggle('1')}>
                                <span>Level I <strong>Professional</strong></span>
                                {this.state.accordionCollapse && this.state.accordionActive == '1' ?
                                    <FeatherIcon icon="chevron-down" size="26" className="ml-4 float-right" /> :
                                    <FeatherIcon icon="chevron-right" size="26" className="ml-4 float-right" />}
                                <Button color="danger btn-auto float-right" href="/#/subscription-plan">Enroll</Button>
                            </Button>
                            <Collapse isOpen={this.state.accordionCollapse && this.state.accordionActive == '1'}>
                                <Card className="border-0 text-medium">
                                    <CardBody>
                                        This certification level provides an understanding of advance operations of technology and software, and fundamentals of mental, fitness and performance coaching.
                                        <p className="mt-2 text-xsmall">
                                            In order to  receive your Level I Professional certification, you will need to complete 8 - 12 hours of online courses, pass a test, and attend a one-day workshop.
                                        </p>
                                        <a href="/#/certification-page/1" className="float-right pointer">See More</a>
                                    </CardBody>
                                </Card>
                            </Collapse>
                            <Button outline className="border-top accordion-item btn-no-shadow text-left px-4" onClick={() => this.accordionToggle('2')}>
                                <span>Level II <strong>Expert Professional</strong></span>
                                {this.state.accordionCollapse && this.state.accordionActive == '2' ?
                                    <FeatherIcon icon="chevron-down" size="26" className="ml-4 float-right" /> :
                                    <FeatherIcon icon="chevron-right" size="26" className="ml-4 float-right" />}
                                <Button color="danger btn-auto float-right" href="/#/subscription-plan">Enroll</Button>
                            </Button>
                            <Collapse isOpen={this.state.accordionCollapse && this.state.accordionActive == '2'}>
                                <Card className="border-0 text-medium">
                                    <CardBody>
                                        This Expert Professional certification level provides and advanced understanding of mental, fitness, and performance coaching, as well as applications of FlightScope data and basics in cause and effect while using the data.
                                        <p className="mt-2 text-xsmall">
                                            A student reaching this level of education will have already passed Level I and completed an additional 8 - 10 hours of online courses, a 2 - day live workshop, and passed tests.
                                        </p>
                                        <a href="/#/certification-page/2" className="float-right pointer">See More</a>
                                    </CardBody>
                                </Card>
                            </Collapse>
                            <Button outline className="border-top accordion-item btn-no-shadow text-left px-4" onClick={() => this.accordionToggle('3')}>
                                <span>Level III <strong>Master Professional</strong></span>
                                {this.state.accordionCollapse && this.state.accordionActive == '3' ?
                                    <FeatherIcon icon="chevron-down" size="26" className="ml-4 float-right" /> :
                                    <FeatherIcon icon="chevron-right" size="26" className="ml-4 float-right" />}
                                <Button color="danger btn-auto float-right" href="/#/subscription-plan">Enroll</Button>
                            </Button>
                            <Collapse isOpen={this.state.accordionCollapse && this.state.accordionActive == '3'}>
                                <Card className="border-0 text-medium">
                                    <CardBody>
                                        The Master Professional level of certification provides a subject matter for expert understanding of mental, fitness, and performance coaching, application of FlightScope data, and cause and effect while using the data.
                                        <p className="mt-2 text-xsmall">
                                            A student reaching this level of certification will have already passed Level I and II, completed 16 additional hours of online courses, and attended a 4 - day workshop.
                                        </p>
                                        <a href="/#/certification-page/3" className="float-right pointer">See More</a>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>
                    </TabPane>
                </TabContent>
            </Row>
        </Container>
    )
}