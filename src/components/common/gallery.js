import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Container, Row, Col, Carousel, CarouselItem, CarouselControl, Button,
    Modal, ModalBody, ModalFooter
} from 'reactstrap';

import { API_URL } from './../../constants';
import downloadAppStore from './../../images/download-app-store.png';
import downloadGooglePlay from './../../images/download-google-play.png';
import anywhere from './../../images/home/anywhere.jpeg';
import { getGallerys } from './../../actions/modules_action/customizations';

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            activeAppLink: false,
            accessId: 1,
            items: [],
            galleryData: []
        }

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

        this.props.getGallerys(this.props.token, this.state.accessId);
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
        let gallery = this.state.galleryData;

        return gallery.filter((item)=>item.isActive).map((item,index) => {
            return (
                <CarouselItem
                    className="gallery-item"
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.imageUrl}
                >
                    <img src={`${API_URL}/${item.imageUrl}`} className="img-fluid w-100" />
                </CarouselItem>
            );
        });
    }

    activeAppLink = () => {
        this.setState({
            ...this.state,
            activeAppLink: !this.state.activeAppLink
        });
    }

    appLinkModal = () => (
        <Modal isOpen={this.state.activeAppLink} toggle={this.activeAppLink} className={this.props.className}>
            <ModalBody>
                <h1 className="mt-3 display-5 text-center text-info">Coming Soon!</h1>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary btn-auto" onClick={this.activeAppLink}>Close</Button>
            </ModalFooter>
        </Modal>
    )

    render = () => {
        //Used to Display data items
        let items = [];
        if (Object.keys(this.props.GetGallerys).length > 0 && 'status' in this.props.GetGallerys) {
            if (this.props.GetGallerys.status && this.props.GetGallerys.data.length > 0) {
                this.setState({
                    ...this.state,
                    galleryData: this.props.GetGallerys.data,
                    items: this.props.GetGallerys.data.filter((item)=>item.isActive)
                })
                this.props.getGallerys(this.props.token);
            }
        }

        return (
            <Container className="gallery mt-5">
                <Row>
                    <Col md={6}>
                        <h1 className="display-4 mb-5 pt-4 text-center">Flight Scope Gallery</h1>
                        {this.state.galleryData.length > 0 && <Carousel
                            activeIndex={this.state.activeIndex}
                            next={this.next}
                            previous={this.previous}
                        >
                            {this.renderSlides()}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>}
                    </Col>
                    <Col md={6}>
                        <h1 className="display-4 mb-5 pt-4 text-center">Access Course Anywhere</h1>
                        <img src={anywhere} className="img-fluid w-100" />
                        <p className="mt-3 mb-2 text-center text-medium">Download Mobile App - Best App For Golf Study</p>
                        <div className="text-center">
                            <a className="mr-3" onClick={this.activeAppLink}><img src={downloadAppStore} className="img-fluid mt-3" /></a>
                            <a onClick={this.activeAppLink}><img src={downloadGooglePlay} className="img-fluid mt-3" /></a>
                        </div>
                    </Col>
                </Row>
                {this.state.activeAppLink && this.appLinkModal()}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetGallerys: state.GetGallerys,
    }
}

export default connect(mapStateToProps, { getGallerys })(Gallery);