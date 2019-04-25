import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Col, Button } from 'reactstrap';

export default class Certification extends Component {
    constructor(props) {
        super(props);
    }

    renderCertificateContent = (id) => {
        let content = '';

        if (id === '1') {
            content = <Col>
                <h1 className="display-4">
                    Level I <strong>Professional</strong> - $600
                    <Button color="danger btn-auto float-right" href="/#/subscription-plan">Buy Subscription</Button>
                </h1>
                <div className="text-large mt-4 mb-4">
                    <p>This certification level teaches the university Skill scoring system using flightscope technology. Each person will learn key elements within data parameters and information and skill scoring within DISTANCE, CONSISTENCY and DIRECTION. This certification provides an understanding of advance operations of flightscope technology and software, and fundamentals of various evaluation and modern technics and processes in several of the topics the university will cover other than technology. You will spend time on putting, short game, full swing using the various software and hardware that best cover each pillar of the game.</p>
                    <p>A basic test of what you learned will follow the workshop and each person will have 30 days to complete to receive certificate of completion.</p>
                    <p>Each person attending level 1 needs to know basic operations of hardware and software listed below and be a FLIGHTSCOPE UNIVERSITY subscriber:</p>
                </div>
                <div className="callout text-large text-left">
                    This certification level provides an understanding of advance operations of technology and software, and fundamentals of mental, fitness and performance coaching.
                    <p className="mt-2 text-xsmall">
                        In order to  receive your Level I Professional certification, you will need to complete 8 - 12 hours of online courses, pass a test, and attend a one-day workshop.
                    </p>
                </div>
            </Col>;
        } else if (id === '2') {
            content = <Col>
                <h1 className="display-4">
                    Level II <strong>Expert Professional</strong> - $800
                    <Button color="danger btn-auto float-right" href="/#/subscription-plan">Buy Subscription</Button>
                </h1>
                <div className="text-large mt-4 mb-4">
                    <p>This Expert Professional certification level provides a more advanced understanding of mental and performance coaching, as well as applications of FlightScope data and basics in cause and effect while using the data. Each person attending will spend between 8-12 hours hands on with students and programs using the processes of flightscope hardware and software to correctly identify which pillar and element needs work and attention.</p>
                    <p>A student reaching this level of education will have passed Level I, attended a 2 - day live workshop, and passed level 2 tests.</p>
                    <p><strong>Benefits in addition to knowledge for this level:</strong></p>
                    <ul>
                        <li>16-22 hours of education credits for PGA and LPGA</li>
                        <li>Special software excess and versions for performance coaching, various Certified performance coach programs</li>
                        <li>Marketing and referrals of students in your market from FSU, 12 hours of actual hands on work with flightscope hardware and software using teaching and coaching programs.</li>
                        <li>Introduction to all 10 Pillars, &nbsp;5 practice levels, personality profiling for lessons, practice.</li>
                    </ul>
                </div>
                <div className="callout text-large text-left">
                    This Expert Professional certification level provides and advanced understanding of mental, fitness, and performance coaching, as well as applications of FlightScope data and basics in cause and effect while using the data.
                    <p className="mt-2 text-xsmall">
                        A student reaching this level of education will have already passed Level I and completed an additional 8 - 10 hours of online courses, a 2 - day live workshop, and passed tests.
                    </p>
                </div>
            </Col>;
        } else if (id === '3') {
            content = <Col>
                <h1 className="display-4">
                    Level III <strong>Master Professional</strong> - $1200
                    <Button color="danger btn-auto float-right" href="/#/subscription-plan">Buy Subscription</Button>
                </h1>
                <div className="text-large mt-4 mb-4">
                    <p>The Master Professional level of certification provides a subject matter expert understanding of mental, fitness, and performance coaching, application of FlightScope data, and cause and effect while using the data. This level of certification requires four days on hands on work within programs, evaluations, testing, case studies, data interoperation, skill assessment, multiple technology use and application.</p>
                    <p>A student reaching this level of certification will have passed Level I and II, completed 16 additional hours of online courses and activities, and attended a 4 - day workshop.</p>
                    <p><strong>Benefits of this level: </strong></p>
                    <ul>
                        <li>Premiere branding, marketing and advertising from flightscope and FSU as TOP coach, fitter in their market</li>
                        <li>Featured articles, videos and online content.</li>
                        <li>Opportunities to coach and instruct for FSU or any FSU performance center of the academy worldwide.</li>
                        <li>Opportunity to start their own franchise of Flightscope academies or performance centers.</li>
                        <li>1 year contract as an advisory board member</li>
                        <li>Access to the latest version of performance coaching software and tools.</li>
                        <li>Assistance in contracting, capital raising, business consulting, various business tools for the trade.</li>
                    </ul>
                </div>
                <div className="callout text-large text-left">
                    The Master Professional level of certification provides a subject matter for expert understanding of mental, fitness, and performance coaching, application of FlightScope data, and cause and effect while using the data.
                    <p className="mt-2 text-xsmall">
                        A student reaching this level of certification will have already passed Level I and II, completed 16 additional hours of online courses, and attended a 4 - day workshop.
                    </p>
                </div>
            </Col>;
        } else {
            content = <Redirect to="" />;
        }
        return content;
    }

    render = () => {
        return (
            <Container className="mt-5 pb-5 border-bottom">
                {this.renderCertificateContent(this.props.certificate)}
            </Container>
        );
    }
}