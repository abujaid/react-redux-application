import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactHtmlParser from 'react-html-parser';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, CardLink, Media } from 'reactstrap';

import blog1 from './../../images/home/blog-1.jpeg';
import blog2 from './../../images/home/blog-2.jpeg';
import blog3 from './../../images/home/blog-3.jpeg';

import { getBlogs } from './../../actions/home_action';

const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const htmlDecoder = (value) => {
    return value.replace(/&#(\d+);/g, function (match, decoded) {
        return String.fromCharCode(decoded);
    });
}

class Blogs extends Component {
    constructor(props) {
        super(props);

        this.props.getBlogs();
    }


    renderBlogs = () => {
        let feedCount = 0;
        if (Object.keys(this.props.BlogReducer).length > 0) {
            return Object.values(this.props.BlogReducer).map(item => {
                if (feedCount < 3) {
                    let blogDate = new Date(item.date);
                    let featureImage = false;
                    feedCount++;
                    if ('wp:featuredmedia' in item._embedded) {
                        featureImage = true;
                    }

                    return (
                        <Col sm={4} key={item.id}>
                            <Card className="mb-4" key={item.id}>
                                <div className="mt-3 d-flex justify-content-center align-items-center card-image">
                                    <img src={featureImage ? item._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url : blog1} />
                                </div>
                                <CardBody>
                                    <Media>
                                        <Media left>
                                            <div className="blog-calender text-center text-small mr-2">
                                                {blogDate.getUTCDate()}<br />{month[blogDate.getUTCMonth()]}
                                            </div>
                                        </Media>
                                        <Media body>
                                            <CardTitle className="display-6">{htmlDecoder(item.title.rendered.substr(0, 20))}</CardTitle>
                                            <div className="text-small">
                                                {ReactHtmlParser(item.excerpt.rendered.substr(0, 100))}
                                            </div>
                                            <CardLink href={item.link} className="float-right text-small" target="_blank">
                                                Read More
                                            </CardLink>
                                        </Media>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                    );
                }
            });
        }
    }

    render() {
        return (
            <Container className="blogs mt-5">
                <h1 className="display-4 mb-5 pt-4 text-center">Flight Scope Blogs</h1>
                <Row>
                    {this.renderBlogs()}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        BlogReducer: state.BlogReducer
    }
}

export default connect(mapStateToProps, { getBlogs })(Blogs);