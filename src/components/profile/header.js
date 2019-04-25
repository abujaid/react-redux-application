import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import FeatherIcon from 'feather-icons-react';
import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { API_URL } from './../../constants';

import './style.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isDropdownOpen: false,
        }
    }

    dropdownToggle = () => {
        this.setState({
            ...this.state,
            isDropdownOpen: !this.state.isDropdownOpen
        });
    }

    logoutUser = () => {
        this.props.logout();
    }

    render = () => {
        let loggedIn = false;
        let user_data = {};
        if(localStorage.getItem('fs_user_data') !== null) {
            user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            loggedIn = true;
        }

        return (
            <header>
                <Nav className="float-left align-baseline" navbar>
                    <NavItem>
                        <NavLink id="sidebar-toggle" className="text-black" onClick={this.props.toggleSidebar}>
                            <FeatherIcon icon={this.props.collapsed ? "chevron-right" : "menu"} size="24" className="mt-2 ml-2" />
                        </NavLink>
                    </NavItem>
                </Nav>

                <Nav className="float-right text-medium" navbar>
                    <Dropdown nav isOpen={this.state.isDropdownOpen} toggle={this.dropdownToggle}>
                        <DropdownToggle nav className="text-black">
                            {loggedIn && user_data.data.picture ? 
                                <img src={`${API_URL}/${user_data.data.picture}`} className="mr-3 avatar" /> :
                                <FeatherIcon icon="user" size="38" className="mr-3 avatar" />
                            }
                            {loggedIn && user_data.data.firstName + ' ' + user_data.data.lastName}
                            <FeatherIcon icon="more-vertical" size="20" className="ml-1" />
                        </DropdownToggle>
                        <DropdownMenu className="text-medium">
                            <DropdownItem href={`/#/profile/account/${this.props.token}`}>
                                My Profile
                            </DropdownItem>
                            <DropdownItem href={`/#/profile/password/${this.props.token}`}>
                                Change Password
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.logoutUser}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
            </header>
        );
    }
}