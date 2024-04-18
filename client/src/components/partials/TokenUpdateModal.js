import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateToken } from '../../actions/tokenActions';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';
import classnames from "classnames";

class TokenUpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            token: this.props.record.token,
            email: this.props.record.email,
            expired_at: this.props.record.expired_at,
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record._id,
                token: nextProps.record.token,
                email: nextProps.record.email,
                expired_at: nextProps.record.expired_at
            });
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (
            nextProps.auth !== undefined &&
            nextProps.auth.token !== undefined &&
            nextProps.auth.token.data !== undefined &&
            nextProps.auth.token.data.message !== undefined &&
            nextProps.auth.token.data.success
        ) {
            $('#update-token-modal').modal('hide');
            toast(nextProps.auth.token.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'token-update-token') {
            this.setState({ token: e.target.value });
        }
        if (e.target.id === 'token-update-email') {
            this.setState({ email: e.target.value });
        }
        if (e.target.id === 'token-update-expired_at') {
            this.setState({ expired_at: e.target.value });
        }
    };

    onTokenUpdate = e => {
        e.preventDefault();
        console.log(this.state, "asdasd")

        const newToken = {
            _id: this.state.id,
            token: this.state.token,
            email: this.state.email,
            expired_at: this.state.expired_at
        };
        this.props.updateToken(this.state.id, newToken);
        window.location.reload()
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-token-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Token</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTokenUpdate} id="update-token">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="token-update-id"
                                        type="text"
                                        className="d-none"
                                    />
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="token">Token</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.token}
                                                id="token-update-token"
                                                type="text"
                                                error={errors.token}
                                                className={classnames('form-control', {
                                                    invalid: errors.token
                                                })}
                                            />
                                            <span className="text-danger">{errors.token}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="token-update-email"
                                                type="email"
                                                className={classnames('form-control', {
                                                    invalid: errors.email
                                                })}
                                            />
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="expired_at">Expired At</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.expired_at}
                                                error={errors.expired_at}
                                                id="token-update-expired_at"
                                                type="datetime"
                                                className={classnames('form-control', {
                                                    invalid: errors.expired_at
                                                })}
                                            />
                                            <span className="text-danger">{errors.expired_at}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Close
                                </button>
                                <button form="update-token" type="submit" className="btn btn-primary">
                                    Update Token
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TokenUpdateModal.propTypes = {
    updateToken: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { updateToken })(withRouter(TokenUpdateModal));
