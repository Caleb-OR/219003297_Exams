import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePatient } from "../../actions/patientActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class PatientUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            firstname: this.props.record.firstname,
            lastname: this.props.record.lastname,
            dateofbirth: this.props.record.dateofbirth,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                firstname: nextProps.record.firstname,
                lastname: nextProps.record.lastname,
                dateofbirth: nextProps.record.dateofbirth,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        // if (nextProps.auth !== undefined
        //     && nextProps.auth.user !== undefined
        //     && nextProps.auth.user.data !== undefined
        //     && nextProps.auth.user.data.message !== undefined
        //     && nextProps.auth.user.data.success) {
        //     $('#update-user-modal').modal('hide');
        //     toast(nextProps.auth.user.data.message, {
        //         position: toast.POSITION.TOP_CENTER
        //     });
        // }
    }

    onChange = e => {
        if (e.target.id === 'patient-update-firstname') {
            this.setState({ firstname: e.target.value });
        }
        if (e.target.id === 'patient-update-lastname') {
            this.setState({ lastname: e.target.value });
        }
        if (e.target.id === 'patient-update-dateofbirth') {
            this.setState({ dateofbirth: e.target.value });
        }
    };

    onPatientUpdate = e => {
        e.preventDefault();
        const newPatient = {
            _id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            dateofbirth: this.state.dateofbirth
        };
        this.props.updatePatient(newPatient);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-patient-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Patient</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onPatientUpdate} id="update-patient">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="patient-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="firstname">First name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.firstname}
                                                id="patient-update-firstname"
                                                type="text"
                                                error={errors.firstname}
                                                className={classnames("form-control", {
                                                    invalid: errors.firstname
                                                })}/>
                                            <span className="text-danger">{errors.firstname}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="lastname">Last name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.lastname}
                                                error={errors.email}
                                                id="patient-update-lastname"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.lastname
                                                })}
                                            />
                                            <span className="text-danger">{errors.lastname}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="dateofbirth">Date of Birth</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                               
                                                onChange={this.onChange}
                                                error={errors.dateofbirth}
                                                id="patient-update-dateofbirth"
                                                type="date"
                                                className={classnames("form-control", {
                                                    invalid: errors.dateofbirth
                                                })}
                                            />
                                            <span className="text-danger">{errors.dateofbirth}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-patient"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Patient
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PatientUpdateModal.propTypes = {
    updatePatient: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updatePatient }
)(withRouter(PatientUpdateModal));
