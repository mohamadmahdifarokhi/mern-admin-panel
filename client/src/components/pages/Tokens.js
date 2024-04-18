import React, {Component, Fragment} from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlus} from "@fortawesome/free-solid-svg-icons";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import TokenAddModal from "../partials/TokenAddModal";
import TokenUpdateModal from "../partials/TokenUpdateModal.js";
import {toast, ToastContainer} from "react-toastify";

class Tokens extends Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                key: "_id",
                text: "Id",
                className: "id",
                align: "left",
                sortable: true,
            },
            {
                key: "token",
                text: "Token",
                className: "token",
                align: "left",
                sortable: true,
            },
            {
                key: "email",
                text: "Email",
                className: "email",
                align: "left",
                sortable: true
            },
            {
                key: "expired_at",
                text: "Expiration Date",
                className: "expired_at",
                align: "left",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-token-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            filename: "Tokens",
            no_data_text: 'No token found!',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                token: '',
                email: '',
                expired_at: '',
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .get("http://127.0.0.1:8002/tokens/reads", {
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(res => {
                this.setState({records: res.data})
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                // Handle errors here
            });
    }

    editRecord(record) {
        this.setState({currentRecord: record});
    }

    deleteRecord(record) {
        axios
            .delete(`http://127.0.0.1:8002/tokens/delete/${record._id}`, {
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(res => {
                if (res.status === 200) {
                    toast(res.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                }
                // Fetch updated data after successful deletion
                this.getData();
            })
            .catch(error => {
                console.error("Error deleting record:", error);
                // Handle errors here
            });
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <TokenAddModal/>
                    <TokenUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-link mt-3" id="menu-toggle"><FontAwesomeIcon icon={faList}/>
                            </button>
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal"
                                    data-target="#add-token-modal"><FontAwesomeIcon icon={faPlus}/> Add Token
                            </button>
                            <h1 className="mt-2 text-primary">Tokens List</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

Tokens.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Tokens);
