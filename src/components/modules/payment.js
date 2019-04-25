import React, { Component } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from 'moment';

import ReactHtmlParser from 'react-html-parser';

import { getCoursesByUser } from './../../actions/modules_action/courses';

const columns = [
  {
    dataField: "subscription",
    text: "Subscription",
    sort: true,
    headerStyle: {
      width: '250px'
    }
  },
  {
    dataField: "amount",
    text: "Amount",
    headerStyle: {
      width: '100px'
    }
  },
  {
    dataField: "date",
    text: "Date",
    headerStyle: {
      width: '100px'
    }
  },
  {
    dataField: "expiryDate",
    text: "Expiry Date",
    headerStyle: {
      width: '100px'
    }
  }
];

class Payment extends Component {
  constructor(props) {
    super(props);

    let user_data = {};
    let userId = 0;
    let subscriptionList = [];
    if (localStorage.getItem("fs_user_data") !== null) {
      user_data = JSON.parse(localStorage.getItem("fs_user_data"));
      userId = user_data.data.id;
      if(user_data.data.Subscriptions.length > 0) {
        subscriptionList = user_data.data.Subscriptions;
      }
    }
    
    this.state = {
      userId: userId,
      subscription: subscriptionList
    };

    this.props.getCoursesByUser(this.props.token, userId);
  }

  renderPaymentHistory = () => {
    const subscriptions = [];
    let romanLevel = {'0': 'Start Level', '1': 'Level I', '2': 'Level II', '3': 'Level III'};
    if (this.state.subscription.length > 0) {
       this.state.subscription.map(item => {
        subscriptions.push({
          id: item.id,
          subscription: ReactHtmlParser(`${romanLevel[item.level]} <strong>${item.name}</strong>`),
          amount: '$' + (item.price || 0.00),
          date: moment(item.createdAt).format('DD/MM/YYYY'),
          expiryDate: moment(item.createdAt).add(1, 'year').format('DD/MM/YYYY'),
        });
      });
    }

    if(Object.keys(this.props.GetCoursesByUser).length > 0 && 'status' in this.props.GetCoursesByUser) {
      if(this.props.GetCoursesByUser.status && this.props.GetCoursesByUser.data.length > 0) {
         this.props.GetCoursesByUser.data.map(item => {
          if(item.paidPrice > 0) {
              subscriptions.push({
              id: item.id,
              subscription: item.Course.name,
              amount: '$' + (item.paidPrice || 0.00),
              date: moment(item.createdAt).format('DD/MM/YYYY')
            });
          }
        });
      }
    }

    return subscriptions;
  }

  render = () => {
    return (
      <section>
        <h1 className="display-5">Payment History</h1>
        <div className="module-content">
          <div className="overflow-x">
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={this.renderPaymentHistory()}
              columns={columns}
              noDataIndication="No Record Found."
              pagination={paginationFactory()}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    GetCoursesByUser: state.GetCoursesByUser
  }
}

export default connect(mapStateToProps, { getCoursesByUser })(Payment);