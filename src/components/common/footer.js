import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeatherIcon from 'feather-icons-react';
import { Container, Row, Col, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Media, CardLink } from 'reactstrap';

import { WP_APP } from './../../constants';
import { API_URL } from './../../constants';

import { getGeneral } from './../../actions/modules_action/customizations';
import { getNewsEvents } from './../../actions/home_action/index';
import PrivacyPolicy from './privacy_policy';
import TermsNCondition from './terms_n_condition';
import { htmlDecoder } from './blogs';

import { getBlogs } from '../../actions/home_action';

class Footer extends Component {
    constructor(props) {
        super(props);

        let user_data = {};
        let userId = 0;
        if (localStorage.getItem('fs_user_data') !== null) {
            user_data = JSON.parse(localStorage.getItem("fs_user_data"));
            userId = user_data.data.id;
        }

        this.state = {
            activePolicy: false,
            activeTermsNCondition: false,
            intervalId: 100,
            accessId: 1,
            email: '',
            phone_number: '',
            alternate_phone_number: '',
            address: '',
            newsEventData: ''
        }
        this.props.getGeneral(user_data.token, this.state.accessId);
        this.props.getNewsEvents(user_data.token, this.state.accessId);
    }

    scrollStep() {
        let offsetTop = document.querySelector('.accordion').offsetTop;
        window.scroll({
            top: offsetTop + 300,
            left: 0,
            behavior: 'smooth'
        });
    }

    activePolicy = () => {
        this.setState({
            ...this.state,
            activePolicy: !this.state.activePolicy

        });
    }

    activeTermsNCondition = () => {
        this.setState({
            ...this.state,
            activeTermsNCondition: !this.state.activeTermsNCondition
        });
    }

    renderBlogs = () => {
        let newsData = '';
        if (Object.keys(this.props.GetNewsEvents).length > 0 && 'status' in this.props.GetNewsEvents) {
            if (this.props.GetNewsEvents.status && Object.keys(this.props.GetNewsEvents.data).length > 0) {
                newsData = this.props.GetNewsEvents.data;
                newsData = newsData.filter(newsEvent => { return newsEvent.isActive == true});
                return newsData.map(item => {
                    return (
                        <ListGroupItem className="pl-0" key={item.id}>
                            <Media>
                                <Media left>
                                    <div className="d-flex justify-content-center align-items-center mr-3 media-image">
                                        <img src={`${API_URL}/${item.imageUrl}`} />
                                    </div>
                                </Media>
                                <Media body>
                                    <CardLink href={item.url} className="text-small" target="_blank">
                                        {item.title}
                                    </CardLink>
                                </Media>
                            </Media>
                        </ListGroupItem>
                    );
                });
            }
        }

    }

    render = () => {

        if (Object.keys(this.props.GetGeneral).length > 0 && 'status' in this.props.GetGeneral) {
            if (this.props.GetGeneral.status && Object.keys(this.props.GetGeneral.data).length > 0) {
                this.setState({
                    ...this.state,
                    email: this.props.GetGeneral.data.email,
                    phone_number: this.props.GetGeneral.data.phone_number,
                    alternate_phone_number: this.props.GetGeneral.data.alternate_phone_number,
                    address: this.props.GetGeneral.data.address
                });
                this.props.getGeneral();
            } else {
                this.setState({
                    ...this.state,
                    formErrorMessage: 'Something Wrong.'
                });
            }
        }

        return (
            <footer>
                <Container className="footer-widget mt-4 mb-4">
                    <Row>
                        <Col md={3} sm={6} className="pt-4">
                            <h1 className="display-6 mb-4">About Us</h1>
                            <p className="pr-2 text-small">
                                The FlightScope University has been established to provide a forum to educate our FlightScope customers and golf professionals around the world....
                        </p>
                            <div className="list-inline text-center text-black">
                                <a href="https://www.facebook.com/FlightScopeGolf" className="text-black" target="_blank">
                                    <FeatherIcon icon="facebook" size="20" className="mt-3 mr-4" />
                                </a>
                                <a href="https://www.linkedin.com/company/flightscope" className="text-black" target="_blank">
                                    <FeatherIcon icon="linkedin" size="20" className="mt-3 mr-4" />
                                </a>
                                <a href="https://www.instagram.com/flightscope/" className="text-black" target="_blank">
                                    <FeatherIcon icon="instagram" size="20" className="mt-3 mr-4" />
                                </a>
                            </div>
                        </Col>
                        <Col md={3} sm={6} className="pt-4">
                            <h1 className="display-6 mb-4">Latest Feed</h1>
                            <ListGroup flush className="pr-2 text-small">
                                {this.renderBlogs()}
                            </ListGroup>
                        </Col>
                        <Col md={3} sm={6} className="pt-4">
                            <h1 className="display-6 mb-4">Quick Links</h1>
                            <Nav vertical className="text-medium">
                                <NavItem>
                                    <NavLink className="pl-0 text-black" href="/#/">
                                        <FeatherIcon icon="chevron-right" size="14" className="mb-1 mr-1" />
                                        Home
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="pl-0 text-black pointer" onClick={() => this.scrollStep()}>
                                        <FeatherIcon icon="chevron-right" size="14" className="mb-1 mr-1" />
                                        Certifications
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="pl-0 text-black" href={WP_APP} target="_blank">
                                        <FeatherIcon icon="chevron-right" size="14" className="mb-1 mr-1" />
                                        Blogs
                                </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col md={3} sm={6} className="pt-4">
                            <h1 className="display-6 mb-4">Contact Us</h1>
                            <div className="pr-2 text-small">
                                <div className="mb-4">
                                    <a className="text-black" href={"tel:" + "+1" + this.state.phone_number}>
                                        <FeatherIcon icon="phone" size="16" className="mb-1 mr-2" />
                                        {"+1" + this.state.phone_number}
                                    </a>
                                </div>
                                <div className="mb-4">
                                    <a className="text-black" href={"mailto:" + this.state.email}>
                                        <FeatherIcon icon="mail" size="16" className="mb-1 mr-2" />
                                        {this.state.email}
                                    </a>
                                </div>
                                <div className="d-flex align-items-start">
                                    <FeatherIcon icon="map-pin" size="16" className="mr-2" />
                                    <p className="list-inline-item">{this.state.address}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="copyright d-flex align-items-center border-top pt-2 pb-2">
                    <p className="mb-0 text-small">Copyright &copy; {new Date().getFullYear()} All rights reserved</p>
                    <Nav className="ml-auto text-small">
                        <NavItem>
                            <NavLink className="pointer text-black" onClick={this.activePolicy}>Privacy Policy</NavLink>
                        </NavItem>
                        {this.state.activePolicy && <PrivacyPolicy isActive={this.state.activePolicy} onClose={this.activePolicy} />}
                        <NavItem>
                            <NavLink className="pointer text-black" onClick={this.activeTermsNCondition}>Terms & Conditions</NavLink>
                        </NavItem>
                        {this.state.activeTermsNCondition && <TermsNCondition isActive={this.state.activeTermsNCondition} onClose={this.activeTermsNCondition} />}
                        <NavItem>
                            <span id="siteseal">
                                <script async type="text/javascript" src="https://seal.godaddy.com/getSeal?sealID=FYeV1OFbea0tj2m3Ly2ZzjzvJaBAJFDI7BhkH0HO4TLvSYUq45Pa0BwpcmFQ"></script>
                            </span>
                        </NavItem>
                    </Nav>
                </Container>
            </footer>
        );
    }
}
const mapStateToProps = state => {
    return {
        BlogReducer: state.BlogReducer,
        GetGeneral: state.GetGeneral,
        GetNewsEvents: state.GetNewsEvents
    }
}

export default connect(mapStateToProps, { getBlogs, getGeneral, getNewsEvents })(Footer);