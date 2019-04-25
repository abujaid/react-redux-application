import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import FeatherIcon from 'feather-icons-react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import { API_URL } from './../../constants';
import { getGeneral } from './../../actions/modules_action/customizations';

import './style.css';
import logo from './../../images/logo.png';
import logo_icon from './../../images/logo_icon.png';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSidebarOpen: false,
            accessId: 1,
            logo_image: '',
            defaultRole: 1,
            navigations: {
                dashboard: {
                    url: '/profile/dashboard/' + this.props.token,
                    link: 'Dashboard',
                    icon: 'home',
                    roles: [1, 2, 3]
                },
                course: {
                    url: '/profile/course/' + this.props.token,
                    link: 'My Course',
                    icon: 'book',
                    roles: [1, 2]
                },
                transcript: {
                    url: '/profile/transcript/' + this.props.token,
                    link: 'My Transcripts',
                    icon: 'list',
                    roles: [1, 2]
                    //roles: [1, 2, 3]
                },
                certificate: {
                    url: '/profile/certificate/' + this.props.token,
                    link: 'My Certificates',
                    icon: 'award',
                    roles: [1, 2]
                },
                payment: {
                    url: '/profile/payment/' + this.props.token,
                    link: 'Payment History',
                    icon: 'dollar-sign',
                    roles: [1, 2, 3]
                },
                education: {
                    url: '/profile/education/' + this.props.token,
                    link: 'Available Certifications',
                    icon: 'book-open',
                    roles: [1, 2]
                },
                user: {
                    url: '/profile/user/' + this.props.token,
                    link: 'Users',
                    icon: 'users',
                    roles: [3]
                },
                categories: {
                    url: '/profile/categories/' + this.props.token,
                    link: 'Categories',
                    icon: 'tag',
                    roles: [3]
                },
                activities: {
                    url: '/profile/activities/' + this.props.token,
                    link: 'Activities',
                    icon: 'activity',
                    roles: [2]
                },
                courses: {
                    url: '/profile/courses/' + this.props.token,
                    link: 'Courses',
                    icon: 'book',
                    roles: [2]
                },
                classes: {
                    url: '/profile/classes/' + this.props.token,
                    link: 'Trainings',
                    icon: 'book-open',
                    roles: [2]
                },
                locations: {
                    url: '/profile/locations/' + this.props.token,
                    link: 'Locations',
                    icon: 'map-pin',
                    roles: [2, 3]
                },
                customizations: {
                    url: '/profile/customizations/' + this.props.token,
                    link: 'Theme Customizations',
                    icon: 'settings',
                    roles: [3]
                },
                edit_certificate: {
                    url: '/profile/edit_certificate/' + this.props.token,
                    link: 'Edit Certificate',
                    icon: 'award',
                    roles: [3]
                },
                report: {
                    url: '',
                    link: 'Report',
                    icon: 'pie-chart',
                    roles: [1, 2, 3]
                }
            }
        }
        this.props.getGeneral(this.props.token, this.state.accessId);
    }

    sidebarToggle = () => {
        this.setState({
            ...this.state,
            isSidebarOpen: !this.state.isSidebarOpen,
        });
    }

    render = () => {
        let roleId = this.state.defaultRole;
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            if('roleId' in user_data.data && user_data.data.roleId !== null) {
                roleId = user_data.data.roleId;
            }
        }

        if (Object.keys(this.props.GetGeneral).length > 0 && 'status' in this.props.GetGeneral) {
            if (this.props.GetGeneral.status && Object.keys(this.props.GetGeneral.data).length > 0) {
              this.setState({
                ...this.state,
                logo_image: this.props.GetGeneral.data.logo_image
              });
              this.props.getGeneral();
            }
          }
        
        return (
            <nav id="sidebar">
                <div className="sidebar-header text-center d-flex align-items-center justify-content-center">
                    <a href="/#/">
                        <span className="logo"><img src={`${API_URL}/${this.state.logo_image}`} alt="Logo" className="img-fluid site-logo" /></span>
                        <span className="logo-icon"><img src={ logo_icon } alt="Logo Icon" /></span>
                    </a>
                </div>
                <div className="sidebar-content">
                    <Scrollbars>
                    <Nav vertical className="mb-4">
                        {Object.keys(this.state.navigations).map(item => {
                                if(this.state.navigations[item].roles.indexOf(roleId) >= 0) {
                                    return (
                                        <NavItem key={item}>
                                            <NavLink href={"/#" + this.state.navigations[item].url} className="sidebar-link text-medium" disabled={this.state.navigations[item].url === '' && true}>
                                                <FeatherIcon icon={this.state.navigations[item].icon} size="18" className="mr-2 mb-1" />
                                                <span className="title">{this.state.navigations[item].link}</span>
                                            </NavLink>
                                        </NavItem>
                                    );
                                }
                            }
                        )}
                    </Nav>
                    </Scrollbars>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
      GetGeneral: state.GetGeneral
    }
}
  
export default connect(mapStateToProps, { getGeneral })(Sidebar);