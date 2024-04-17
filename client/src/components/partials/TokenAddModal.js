import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToken } from '../../actions/tokenActions'; // Assuming you have a tokenActions file
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class TokenAddModal extends React.Component {
    constructor() {
        super();
        this.state = {
            token: '',
            email: '',
            expired_at: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
        if (
            nextProps.auth !== undefined &&
            nextProps.auth.user !== undefined &&
            nextProps.auth.user.data !== undefined &&
            nextProps.auth.user.data.message !== undefined
        ) {
            $('#add-token-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onTokenAdd = (e) => {
        e.preventDefault();
        const newToken = {
            token: this.state.token,
            email: this.state.email,
            expired_at: this.state.expired_at,
        };
        this.props.addToken(newToken, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-token-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Token</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTokenAdd} id="add-token">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="token">Token</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.token}
                                                id="token"
                                                type="text"
                                                error={errors.token}
                                                className={classnames('form-control', {
                                                    invalid: errors.token,
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
                                                id="email"
                                                type="email"
                                                className={classnames('form-control', {
                                                    invalid: errors.email,
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
                                                id="expired_at"
                                                type="text"
                                                className={classnames('form-control', {
                                                    invalid: errors.expired_at,
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
                                <button form="add-token" type="submit" className="btn btn-primary">
                                    Add Token
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TokenAddModal.propTypes = {
    addToken: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { addToken })(withRouter(TokenAddModal));
