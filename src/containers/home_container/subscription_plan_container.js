import React, { Component } from 'react';
import {connect } from 'react-redux';

import SubscriptionPlan from './../../components/home/subscription_plan';
import { getSubscriptions } from './../../actions/modules_action/subscriptions';

class SubscriptionPlanContainer extends Component {
	constructor(props) {
		super(props);

		let loggedIn = false;
		let token = '';
		let userId = 0;
		let subscriptionIds = [];
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
			token = user_data.token;
			userId = user_data.data.id;
            loggedIn = true;
			if(user_data.data.Subscriptions.length > 0) {
				user_data.data.Subscriptions.map(item => {
					subscriptionIds.push(item.id);
				});
			}
		}

		this.state = {
			loggedIn: loggedIn,
			token: token,
			userId: userId,
			subscriptionIds: subscriptionIds
		}

		this.props.getSubscriptions();
	}

    render = () => {
		let subscriptionsList = [];
		if(Object.keys(this.props.GetSubscriptions).length > 0 && 'status' in this.props.GetSubscriptions) {
            if(this.props.GetSubscriptions.status) {
				subscriptionsList = this.props.GetSubscriptions.data;
            }
        }
		
		return (
			<SubscriptionPlan loggedIn={this.state.loggedIn} userId={this.state.userId} token={this.state.token} subscriptionId={this.state.subscriptionIds} subscriptions={subscriptionsList} />
		);
	}
}

const mapStateToProps = state => {
	return {
		GetSubscriptions: state.GetSubscriptions
	};
};
  
export default connect(mapStateToProps, { getSubscriptions })(SubscriptionPlanContainer);