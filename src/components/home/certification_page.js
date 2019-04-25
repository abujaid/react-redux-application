import React, { Component } from 'react';

import Header from './../common/header';
import Certification from '../common/certification';
import Footer from './../common/footer';

import './style.css';

export default class CertificationPage extends Component {
    render = () => (
        <div id="subscription-plan-page" >
            <Header />
            <section>
                <Certification certificate={this.props.certificate} />
            </section>
            <Footer />
        </div>
    )
}