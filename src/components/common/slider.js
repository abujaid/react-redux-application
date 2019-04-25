import React, { Component } from 'react';
import { connect } from 'react-redux';

import { API_URL } from './../../constants';
import { getBanner } from './../../actions/modules_action/customizations';

class Slider extends Component {
    constructor(props) {
        super(props);

        let loggedIn = false;
        let user_data = {};
        if (localStorage.getItem("fs_user_data") !== null) {
            user_data = JSON.parse(localStorage.getItem("fs_user_data"));
            loggedIn = true;
        }

        this.state = {
            bannerImage: '',
            accessId: 1
        }
        this.props.getBanner(this.props.token, this.state.accessId);
    }

    render = () => {
        // Used to Display data items
        if (Object.keys(this.props.GetBanner).length > 0 && 'status' in this.props.GetBanner) {
            if (this.props.GetBanner.status && Object.keys(this.props.GetBanner.data).length > 0) { //
                if (this.props.GetBanner.data.imageUrl != undefined) {
                    this.setState({
                        ...this.state,
                        bannerImage: this.props.GetBanner.data.imageUrl
                    });
                    this.props.getBanner();
                }
            }
        }

        return (
            <div className="banner">
                <img src={`${API_URL}/${this.state.bannerImage}`} alt="The Last of us" className="img-fluid" />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        GetBanner: state.GetBanner,
    }
}

export default connect(mapStateToProps, { getBanner })(Slider);