import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Sidebar from './sidebar';
import Header from './header';
import Module from './../modules';
import Footer from './footer';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            logout: false,
            wrapperClass: ''
        }
    }

    toggleSidebar = () => {
        if(window.innerWidth > 991) {
            this.setState({
                ...this.state,
                collapsed: !this.state.collapsed,
                wrapperClass: !this.state.collapsed ? 'collapsed-md' : ''
            });
        } else {
            this.setState({
                ...this.state,
                collapsed: !this.state.collapsed,
                wrapperClass: !this.state.collapsed ? 'collapsed-sm' : ''
            });
        }
    }

    logoutUser = () => {
        localStorage.removeItem('fs_user_data');
        this.setState({
            ...this.state,
            logout: true
        });
    }

    render = () => {
        if(this.state.logout) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div className={"wrapper " + this.state.wrapperClass}>
                    <Sidebar token={this.props.token} />
                    <div id="content">
                        <Header token={this.props.token} toggleSidebar={this.toggleSidebar} collapsed={this.state.collapsed} logout={this.logoutUser} />
                        <Module token={this.props.token} activePage={this.props.activePage} />
                        <Footer />
                    </div>
                </div>
            );
        }
    }
}