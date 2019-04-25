import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';

import background from './../../images/testimonial-background.jpg';

import { API_URL } from './../../constants';
import { getTestimonials } from './../../actions/modules_action/customizations';

class Testimonial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            accessId: 1,
            items: [],
            testimonialData: []
        }

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

        this.props.getTestimonials(this.props.token, this.state.accessId);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({
            activeIndex: nextIndex
        });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({
            activeIndex: nextIndex
        });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({
            activeIndex: newIndex
        });
    }

    renderSlides = () => {
        let testimonial = this.state.testimonialData;
        testimonial = testimonial.filter(testimonials => { return testimonials.isActive == true });
        return testimonial.map(item => {
            return (
                <CarouselItem
                    key={item.id}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <div className="testimonial-item d-flex flex-column mb-5">
                        <p className="text-center text-white mb-3">{item.clientFeedback}</p>
                        <strong className="text-large text-center text-white mb-4">- {item.clientName}</strong>
                    </div>
                </CarouselItem>
            );
        });
    }

    render = () => {

        //Used to Display data items
        let items = [];
        if (Object.keys(this.props.GetTestimonials).length > 0 && 'status' in this.props.GetTestimonials) {
            if (this.props.GetTestimonials.status && this.props.GetTestimonials.data.length > 0) {
                this.setState({
                    ...this.state,
                    testimonialData: this.props.GetTestimonials.data,
                    items: this.props.GetTestimonials.data
                })
                this.props.getTestimonials(this.props.token);
            }
        }

        return (
            <Container fluid className="testimonial px-0 mt-5" style={{ backgroundImage: `url(${background})` }}>

                <h1 className="display-4 mb-5 pt-4 text-center text-white">What Client Say About Us?</h1>
                {this.state.testimonialData.length > 0 && <Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                    {this.renderSlides()}
                </Carousel>}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetTestimonials: state.GetTestimonials,
    }
}

export default connect(mapStateToProps, { getTestimonials })(Testimonial);