import React, { Component } from 'react';

import Header from './../common/header';
import Slider from './../common/slider';
import Subscription from '../common/subscription';
import Footer from './../common/footer';

import './style.css';

export default class SubscriptionPlan extends Component {
    render = () => (
        <div id="subscription-plan-page" >
            <Header />
            <Slider />
            <section>
                <Subscription loggedIn={this.props.loggedIn} userId={this.props.userId} token={this.props.token} subscriptionId={this.props.subscriptionId} subscriptions={this.props.subscriptions} />
            </section>
            <Footer />
        </div>
    )
}