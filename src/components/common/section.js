import React, { Component } from 'react';

import TopContent from './top_content';
import SubscriptionBanner from './subscription_banner';
import BotomContent from './bottom-content';
import Blogs from './blogs';
import Gallery from './gallery';
import Testimonial from './testimonial';
import Newsletter from './newsletter';

export default class Section extends Component {
    render = () => (
        <section>
            <TopContent />
            <SubscriptionBanner />
            <BotomContent />
            <Blogs />
            <Gallery />
            <Testimonial />
            <Newsletter />
        </section>
    )
}