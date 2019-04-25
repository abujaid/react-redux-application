import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";

import Header from './../common/header';
import Slider from './../common/slider';
import Section from './../common/section';
import Footer from './../common/footer';
import { API_URL } from './../../constants';

import './style.css';

export default class Home extends Component {

    constructor() { 
        super();      
        this.state = {
            title:'',
            favicon:''
        }


        axios.get(`${API_URL}/public/theme_customization/general_settings/1/item`, {
          })
          .then((response)=> {
              console.log(response)
              this.setState({title: response.data.data.site_title, favicon: response.data.data.favicon_image});
          })
          .catch(function (error) {
          });

    }

    render = () => (
        <div id="home-page">
                <Helmet>
            <title>{this.state.title}</title>
            <link rel="shortcut icon" href={`${API_URL}/${this.state.favicon}`} />
        </Helmet>
            <Header />
            <Slider />
            <Section />
            <Footer />
        </div>
    )
}