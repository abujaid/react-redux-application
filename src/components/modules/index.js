import React, { Component } from 'react';

import Dashboard from './dashboard';
import Course from './course';
import Transcript from './transcript';
import Certificate from './certificate';
import Payment from './payment';
import Education from './education';
import User from './user';
import Categories from './categories';
import Activities from './activities';
import Courses from './courses';
import Classes from './classes';
import UserAccount from './user_account';
import ChangePassword from './change_password';
import Locations from './locations';
import Customizations from './customizations';
import EditCertificate from './edit_certificate';

import './style.css';

export default class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboard: Dashboard,
            course: Course,
            transcript: Transcript,
            certificate: Certificate,
            payment: Payment,
            education: Education,
            user: User,
            categories: Categories,
            activities: Activities,
            courses: Courses,
            classes: Classes,
            account: UserAccount,
            password: ChangePassword,
            locations: Locations,
            customizations: Customizations,
            edit_certificate: EditCertificate
        }
    }

    render = () => {
        const Module = this.state[this.props.activePage];
        return (
            <Module token={this.props.token} />
        );
    }
}