import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Moment from 'react-moment'
import ReactToPrint from "react-to-print";

import { Nav, Col, NavItem, NavLink, Button, UncontrolledAlert, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import { getCertificate, getCertificateById } from './../../actions/modules_action/certificate';
import JsxParser from 'react-jsx-parser'

const columns = [{
    dataField: 'course',
    text: 'Course',
    sort: true,
    headerStyle: {
        width: '100px'
    }
}, {
    dataField: 'dateAdded',
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

class Certificate extends Component {
    constructor(props) {
        super(props);
        let userId = 0;
        if (localStorage.getItem('fs_user_data') !== null) {
            let user_data = JSON.parse(localStorage.getItem('fs_user_data'));
            userId = user_data.data.id;
        }
        this.state = {
            certificateEnable: false,
            userId: userId,
            certificateById: {}
        }
        this.props.getCertificate(this.props.token, userId);
    }

    sumActivityStatus = function (obj) {
        return Object.keys(obj).reduce(function (sum, next) {
          return sum + obj[next];
        }, 0);
      };

      viewCertificate = (enable = false, id = 0) => {
        this.setState({
            ...this.state,
            certificateEnable: enable
        });
        this.props.getCertificateById(this.props.token, this.state.userId, id);
    }

    renderAction = (id, isDisable) =>{
        return (
            <div className="actions">
            <Button color="info" data-id={id} disabled={isDisable} className="btn-auto pt-1 pb-1 px-2 mr-2" onClick={() => this.viewCertificate(true, id)}>
                <FeatherIcon icon="eye" size="18" className="mb-1" />
            </Button>
        </div>
        );
    }
 
    renderRecords = (certificate) => {
        let status = 'Pending';
        let countActivity = 0;
        let processPercent = 0;
        let obj = {}
        let isDisable = '';
        return certificate.map(item => {
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
            return {
                id: item.Course.id,
                course: item.Course.name,
                status: status,
                dateAdded: (completedDate != '' && !isDisable) ? <Moment format="DD/MM/YYYY" date={completedDate} /> : '---',
                action: this.renderAction(item.Course.id, isDisable)
            }
        });
    }

    certificateModal = () => {
        var certificate = this.state.certificateById.html;
        let dateFormat = '<Moment format="DD/MM/YYYY" date={this.state.certificateById.createdAt} />' 
        certificate = certificate.replace('COURSENAME', this.state.certificateById.Course.name)
        certificate = certificate.replace('DATE', dateFormat)
        certificate = certificate.replace('FIRSTNAME', this.state.certificateById.User.firstName)
        certificate = certificate.replace('LASTNAME', this.state.certificateById.User.lastName)
        certificate = certificate.replace('TRAINERFIRSTNAME', this.state.certificateById.Course.createdBy.firstName)
        certificate = certificate.replace('TRAINERLASTNAME', this.state.certificateById.Course.createdBy.lastName)
        console.log("certificate==>", certificate);
        return (
            <Modal ref={el => (this.componentRef = el)} isOpen={this.state.certificateEnable} toggle={() => this.viewCertificate(false, 0)} className="modal-lg">
                <ModalBody>
                <div className="certificate-form text-medium">
                <div class="row"> 
                    <div className="col-md-12 certificate-detail">
                        
                            <div className="row">
                                <div className="col-md-8 form-group">
                                    <h3 className="text-uppercase">Certificate</h3>
                                </div>
                                <div className="col-md-4 text-right form-group">
                                    <ReactToPrint
                                        trigger={() => <button className="btn btn-secondary btn-auto badge-certificate-color badge-certificate"><i className="fa fa-print"></i> Print</button>}
                                        content={() => this.componentRef} bodyClass="reactprintclass"
                                    />
                                </div>
                            </div>
                </div>
                </div>
                </div>
                    <JsxParser
                      allowUnknownElements= {true}
                      components={{ Moment }}
                        jsx={certificate}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-auto" onClick={() => this.viewCertificate(false, 0)}>
                        <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    render = () => {
        let certificate = [];
        let error = '';
        if (Object.keys(this.props.GetCertificate).length > 0 && 'status' in this.props.GetCertificate) {
            if (this.props.GetCertificate.status) {
                certificate = this.renderRecords(this.props.GetCertificate.data, true);
                certificate = certificate.filter(item => item !== undefined);
            } else {
                error = this.props.GetCertificate.message || '';
            }
        }
        
        if(Object.keys(this.props.GetCertificateById).length > 0 && 'status' in this.props.GetCertificateById){
            if (this.props.GetCertificateById.status) {
               this.setState({
                   ...this.state,
                   certificateById: this.props.GetCertificateById.data
               });
               this.props.getCertificateById(this.props.token);
            } else {
                error = this.props.GetCertificateById.message || '';
            }
        }

        return(
            <section>
                <h1 className="display-5">My Certificates</h1>
                <div className="module-content">
                    <div className="overflow-x">
                        <BootstrapTable
                            bootstrap4
                            keyField="course"
                            data={certificate}
                            columns={columns}
                            noDataIndication="No Record Found."
                            pagination={paginationFactory()}
                        />
                    </div>
                </div>
                {this.state.certificateEnable && (Object.keys(this.state.certificateById).length > 0) && this.certificateModal()}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetCertificate: state.GetCertificate,
        GetCertificateById: state.GetCertificateById
    }
}

export default connect(mapStateToProps, { getCertificate, getCertificateById })(Certificate);