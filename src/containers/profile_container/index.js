import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { validateToken } from './../../actions/profile_action';
import Profile from './../../components/profile';

class ProfileContainer extends Component {
    constructor(props) {
        super(props);
        
        this.props.validateToken({
            token: this.props.match.params.token
        });
    }

    render = () => {
        let error = false;
        let errorMsg = '';
        if(Object.keys(this.props.ValidateToken).length > 0  && 'status' in this.props.ValidateToken) {
            if(!this.props.ValidateToken.status && !this.props.ValidateToken.isValid) {
                error = true;
                errorMsg = this.props.ValidateToken.err;
                localStorage.removeItem('fs_user_data');
            }
        }
        
        if(error) {
            return (
                <Redirect to={{
                    pathname: "/login",
                    state: { error: errorMsg }
                }} />
            );
        }

        return (
            <Profile
                activePage={this.props.match.params.page}
                token={this.props.match.params.token}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        ValidateToken: state.ValidateToken
    }
}

export default connect(mapStateToProps, { validateToken })(ProfileContainer);