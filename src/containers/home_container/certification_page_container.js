import React, { Component } from 'react';

import CertificationPage from './../../components/home/certification_page';

export default class CertificationPageContainer extends Component {
    render = () => (
        <CertificationPage certificate={this.props.match.params.id} />
    );
}