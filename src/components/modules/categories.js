import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import FeatherIcon from 'feather-icons-react';
import { Button } from 'reactstrap';

import CategoriesForm from './categories_form';
import { getCategories } from './../../actions/modules_action/categories';

const columns = [{
    dataField: 'categoryName',
    text: 'Category Name',
    sort: true
}, {
    dataField: 'totalCourses',
    text: 'Total Courses',
    sort: true
}, {
    dataField: 'status',
    text: 'Status'
}, {
    dataField: 'dateAdded',
    text: 'Date Added'
}, {
    dataField: 'action',
    text: 'Action',
}];

class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormEditable: false
        }

        this.props.getCategories(this.props.token);
    }

    renderRecords = (categories) => {
        return categories.map(item => {
            return {
                id: item.id,
                categoryName: item.categoryName,
                totalCourses: 0,
                status: item.isActive ? 'Active' : 'Inactive',
                dateAdded: item.dateAdded
            }
        });
    }

    formModalToggle = () => {
        this.setState({
            ...this.state,
            isFormEditable: !this.state.isFormEditable
        });
    }

    renderForm = () => (
        <CategoriesForm formEditable={this.state.isFormEditable} onFormEdited={this.formModalToggle} />
    )

    render = () => {
        let error = '';
        let categories = [];
        if(Object.keys(this.props.GetCategories).length > 0 && 'status' in this.props.GetCategories) {
            if(this.props.GetCategories.status) {
                categories = this.renderRecords(this.props.GetCategories.data);
                categories = categories.filter(item => item !== undefined);
            } else {
                error = this.props.GetCategories.message;
            }
        }
        
        return (
            <section>
                <Button color="success" className="float-right btn-auto" onClick={this.formModalToggle}>
                    <FeatherIcon icon="plus" size="20" className="mb-1" /> Add
                </Button>
                <h1 className="display-5">Categories</h1>
                <div className="module-content">
                    <BootstrapTable 
                        bootstrap4
                        keyField="id"
                        data={categories}
                        columns={columns}
                        noDataIndication="No Record Found."
                        pagination={ paginationFactory() }
                    />
                </div>
                {this.renderForm()}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        GetCategories: state.GetCategories
    }
}

export default connect(mapStateToProps, { getCategories })(Categories);