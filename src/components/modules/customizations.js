/*  import react packages */
import React, { Component } from 'react';

/*  import Designing Constant */
import { Nav, NavItem, NavLink, TabContent, TabPane, Col } from 'reactstrap';

/*  import a javascript file */
import GeneralForm from './customizations/general_form';
import Menu from './customizations/menu';
import Gallery from './customizations/gallery';
import Testimonial from './customizations/testimonial';
import Banner from './customizations/banner';
import NewsEvent from './customizations/newsevent';

/* Define a class Based Component */
class Customizations extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activeTab: '1',
            accessId: 0,
        }
    }

    // Used to toggle the Nav Tabs
    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    // START: render the main customizations component
    render = () => {

        return (
            
            <section>
                <h1 className="display-5">Theme Customizations</h1>
                <div className="module-content">
                    <Nav className="md-tabs d-flex flex-row text-medium pointer" tabs>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "1" ? "active" : ""}  onClick={() => this.toggleTab('1')}>
                                GENERAL
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "2" ? "active" : ""}  onClick={() => this.toggleTab('2')}>
                                MENU
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "3" ? "active" : ""} onClick={() => this.toggleTab('3')}>
                                GALLERY
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "4" ? "active" : ""} onClick={() => this.toggleTab('4')}>
                                TESTIMONIAL
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "5" ? "active" : ""} onClick={() => this.toggleTab('5')}>
                                BANNER
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab == "6" ? "active" : ""} onClick={() => this.toggleTab('6')}>
                                NEWS AND EVENTS
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="md-content">
                        <TabPane tabId="1">
                                <Col sm={12} className="text-small">
                                    <GeneralForm
                                        token={this.props.token}
                                        submit={this.submit}
                                    />
                                </Col>
                        </TabPane>
                        <TabPane tabId="2">
                            <Col sm={12} className="text-small">
                                <Menu
                                    token={this.props.token}
                                    submit={this.submit}
                                />
                            </Col>
                        </TabPane>
                        <TabPane tabId="3">
                                <Col sm={12} className="text-small">
                                    <Gallery
                                        token={this.props.token}
                                        submit={this.submit}
                                    />
                                </Col>
                        </TabPane>
                        <TabPane tabId="4">
                            <Col sm={12} className="text-small">
                                <Testimonial
                                    token={this.props.token}
                                    submit={this.submit}
                                />
                            </Col>
                        </TabPane>
                        <TabPane tabId="5">
                            <Col sm={12} className="text-small">
                                <Banner
                                    token={this.props.token}
                                    submit={this.submit}
                                />
                            </Col>
                        </TabPane>
                        <TabPane tabId="6">
                            <Col sm={12} className="text-small">
                                <NewsEvent
                                    token={this.props.token}
                                    submit={this.submit}
                                />
                            </Col>
                        </TabPane>
                    </TabContent>
                </div>
            </section>
        );
    }
    // END: render the main customizations component
}
    
export default Customizations;