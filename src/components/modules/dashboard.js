import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FeatherIcon from 'feather-icons-react';
import { Button, CardDeck, Card, CardTitle, CardSubtitle } from 'reactstrap';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        let userId = 0;
        let loggedIn = false;
        let subscription = false;
        let subscriptionData = {};
        let coursesCount = 0;
        let trainingsCount = 0;
        let transcriptsCount = 0;
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
            loggedIn = true;
            coursesCount = user_data.data.Courses.filter(item => item.isActive === true);
            trainingsCount = user_data.data.Trainings.filter(item => item.isActive === true);
			if(user_data.data.Subscriptions.length > 0) {
                subscription = true;
                let level = 0;
                user_data.data.Subscriptions.map(item => {
                    if(item.level >= level) {
                        level = item.level;
                        subscriptionData = item;
                    }
                });
            }
        }

        this.state = {
            userId: userId,
            loggedIn: loggedIn,
            subscription: subscription,
            subscriptionData: subscriptionData,
            coursesCount: coursesCount.length,
            trainingsCount: trainingsCount.length,
            transcriptsCount: transcriptsCount
        }
    }

    renderSubscriptionInfo = () => {
        let subscriptionLabel = 'No Subscription Purchased';
        let romanLevel = {'0': 'Start Level', '1': 'Level I', '2': 'Level II', '3': 'Level III'};
        if(Object.keys(this.state.subscriptionData).length > 0) {
            subscriptionLabel = <span>
                    You have subscribed with {romanLevel[this.state.subscriptionData.level]} <strong>{this.state.subscriptionData.name}</strong>
                </span>
        }
        return (
            <p className="callout text-small d-flex align-items-center subscription-notification">
                <FeatherIcon icon="credit-card" size="22" className="mr-2" />
                {subscriptionLabel}
                {this.state.subscription && 
                    <Button color="success ml-auto btn-auto text-small" href="/#/subscription-plan">PURCHASE</Button>
                }
            </p>
        );
    }

    render = () => {
        return (
            <section>
                <h1 className="display-5">Dashboard</h1>
                {this.renderSubscriptionInfo()}
                
                <CardDeck>
                    <Card body color="blue d-flex align-items-start flex-column">
                        <CardTitle className="display-6">My Courses</CardTitle>
                        <CardTitle className="display-4">{this.state.coursesCount}</CardTitle>
                        <CardSubtitle className="ml-auto">
                            <Link to={{
                                    pathname: `/profile/course/${this.props.token}`,
                                    state: { activeTab: '2' }
                                }} className="text-white">
                                View More
                            </Link>
                        </CardSubtitle>
                        <FeatherIcon icon="book" size="60" className="backlay" />
                    </Card>
                    <Card body color="green d-flex align-items-start flex-column">
                        <CardTitle className="display-6">My Certificates</CardTitle>
                        <CardTitle className="display-4">{this.state.trainingsCount}</CardTitle>
                        <CardSubtitle className="ml-auto">
                            <Link to={{
                                    pathname: `/profile/education/${this.props.token}`,
                                    state: { activeTab: '1' }
                                }} className="text-white">
                                View More
                            </Link>
                        </CardSubtitle>
                        <FeatherIcon icon="award" size="60" className="backlay" />
                    </Card>
                    <Card body color="red d-flex align-items-start flex-column">
                        <CardTitle className="display-6">My Transcripts</CardTitle>
                        <CardTitle className="display-4">{this.state.transcriptsCount}</CardTitle>
                        <CardSubtitle className="ml-auto">View More</CardSubtitle>
                        <FeatherIcon icon="list" size="60" className="backlay" />
                    </Card>
                </CardDeck>
            </section>
        );
    }
}