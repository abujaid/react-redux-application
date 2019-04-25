/*  import react packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Moment from 'react-moment'
import moment from 'moment';
import ReactToPrint from "react-to-print";

/*  import Designing Constant */
import FeatherIcon from 'feather-icons-react';
import { Button, Col, Modal, ModalBody, ModalFooter } from 'reactstrap';

/*  import API Calling Functions */
import { getTranscripts, getTranscript } from './../../actions/modules_action/transcript';

import logoStamp from './../../images/logo-stamp.png';

/*  define config variables */
const columns = [{
    dataField: 'course',
    text: 'Course',
    sort: true,
    headerStyle: {
        width: '200px'
    }
}, {
    dataField: 'activity',
    text: 'Activity',
    sort: true,
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'date',
    text: 'Date',
    sort: true,
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'status',
    text: 'Status',
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'action',
    text: 'Action',
    headerStyle: {
        width: '150px'
    }
}];

/*  define class based component */
class Transcript extends Component {
    constructor(props) {
        super(props);
        
        let userId = 0;
        if(localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
        }
        this.state = {
            userId: userId,
            transcriptEnable: false,
            transcriptDetail: {}
        }
        this.props.getTranscripts(this.props.token, userId);
    }

    renderAction = (id, isDisable) => {
      return(
        <div className="actions">
            <Button color="info" disabled={isDisable} data-id={id} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.getTranscriptItem(true, id)}>
               <FeatherIcon icon="eye" size="18" className="mb-1" />
            </Button>
        </div>
      );  
    }

    sumActivityStatus = function (obj) {
        return Object.keys(obj).reduce(function (sum, next) {
         return sum + obj[next];
        }, 0);
      };

    renderTranscripts = () => {
        let transcripts = [];
        if(Object.keys(this.props.GetTranscripts).length > 0 && 'status' in this.props.GetTranscripts) {
            if(this.props.GetTranscripts.status) {
                let status = 'Pending';
                let countActivity = 0;
                let processPercent = 0;
                let isDisable = '';
                let obj = {}

                this.props.GetTranscripts.data.map(item => {
                status = 'Pending';
                isDisable = false;
                processPercent = 0;
                countActivity = 0;

                if(item.progress != null){
                    obj = JSON.parse(item.progress);
                    countActivity = Object.keys(obj).length;    
                }

                var sumProgress = this.sumActivityStatus(obj);
                processPercent = (sumProgress * 100) / (countActivity*2).toFixed(2);
                status = (processPercent == 100) ? 'Completed' : 'Pending';
                isDisable = (processPercent == 100) ? false : true;
                let completedDate = item.updatedAt;
                    return transcripts.push({
                        id: item.Course.id,
                        course: item.Course.name || '-',
                        activity: item.Course.activitiesLength || '-',
                        status: status,
                        date: (completedDate != '' && !isDisable) ? <Moment format="DD/MM/YYYY" date={completedDate} /> : '---',
                        action: this.renderAction(item.Course.id, isDisable)
                    });
                });
            }
        }
        return transcripts;
    }

    getTranscriptItem = (enable = false, id = 0) => {
        this.setState({
            ...this.state,
            transcriptEnable: enable,
            accessId: id
        });
        if(enable){
            this.props.getTranscript(this.props.token, this.state.userId, id);
        }   
    }

    getTranscriptResult = () => {
        let data = '';
        let rendrData = [];
        let transcript = this.state.transcriptDetail.activitiesResult;
        transcript.forEach((item, key) => {
            if(item.type == 'assessment'){
                data = <tr key={key}>
                    <td>{item.name}</td>
                    <td>Total Question: {item.totalQuestions}</td>
                    <td>Correct: {item.correct}</td>
                    <td>Score: {item.scoredPercentage}%</td>
                    <td>{(item.completed) ? 'Completed' : 'Pending'}</td>
                </tr>
            } else {
                data = <tr key={key}>
                    <td>{item.name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{(item.completed) ? 'Completed' : 'Pending'}</td>
                </tr>
            }
            rendrData.push(data);
        })
        return rendrData;
    }

    transcriptModal = () => {
        
        return (
            <Modal  ref={el => (this.componentRef = el)} isOpen={this.state.transcriptEnable} toggle={() => this.getTranscriptItem(false, 0)} className="modal-lg" id="printThis"> 
            <ModalBody>
                <div className="transcript-form text-medium">
                <Col> 
                    <div className="transcript-detail">
                        <div className="top-section">
                            <div className="row">
                                <div className="col-md-8">
                                    <h3 className="text-uppercase">Transcripts Details</h3>
                                </div>
                                <div className="col-md-4 text-right">
                                    <ReactToPrint
                                        trigger={() => <button className="badge badge-primary text-uppercase badge-transcript badge-transcript-color"><i className="fa fa-print"></i> Print</button>}
                                        content={() => this.componentRef} bodyClass="reactprintclass"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="transcript-des">
                            <div className="form-group text-center">
                                <img src={logoStamp} alt="" />
                            </div>
                        
                        <div className="player-info">
                            <table className="table player-info2">
                                <tbody>
                                    <tr>
                                        <td><span><strong>Name:</strong></span> {this.state.transcriptDetail.courseName}</td>
                                        <td> <span><strong>Total Score:</strong></span> 100%</td>
                                    </tr>
                                    <tr>
                                        <td><span><strong>Assigment Date:</strong></span> {moment(this.state.transcriptDetail.createdAt).format('DD/MM/YYYY')}</td>
                                        <td><span><strong>Completion Date:</strong></span> {moment(this.state.transcriptDetail.updatedAt).format('DD/MM/YYYY')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="final-course">
                            <table className="table">
                                <tbody>
                                    {this.getTranscriptResult()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Col>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary btn-auto" onClick={() => this.getTranscriptItem(false, 0)}>
                <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
            </Button>
        </ModalFooter>
        </Modal>
        );
    }

    render = () => {   
        let error = '';
        if (Object.keys(this.props.GetTranscript).length > 0 && 'status' in this.props.GetTranscript) {
            if (this.props.GetTranscript.status && Object.keys(this.props.GetTranscript.data).length > 0) {
                this.setState({
                    ...this.state,
                    transcriptDetail: this.props.GetTranscript.data
                });
                this.props.getTranscript(this.props.token);
            } else {
                error = this.props.GetTranscript.message || '';
            }
        }

        return (
            <section>
                <h1 className="display-5">My Transcripts</h1>
                <div className="module-content">
                    <div className="overflow-x">
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={this.renderTranscripts()}
                            columns={columns}
                            noDataIndication="No Record Found."
                            pagination={paginationFactory()}
                        />
                    </div>
                </div>
                {this.state.transcriptEnable && (Object.keys(this.state.transcriptDetail).length > 0)  && this.transcriptModal()}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetTranscripts: state.GetTranscripts,
        GetTranscript: state.GetTranscript
    }
}

/* export class component*/
export default connect(mapStateToProps, { getTranscripts, getTranscript })(Transcript);