import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPatient } from "../../actions/patientActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import moment from 'moment'

import 'react-toastify/dist/ReactToastify.css';

class PatientAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            contact: "",
            dateofbirth: "",
            residence_address: "",
            emergency_contact: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined) {
            $('#add-patient-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onPatientAdd = e => {
      
        e.preventDefault();
        const newPatient = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            contact: this.state.contact,
            dateofbirth:  moment(this.dateofbirth, "MM/DD/YYYY").format(),
            residence_address: this.state.residence_address,
            emergency_contact: this.state.emergency_contact,
        };
        this.props.addPatient(newPatient, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-patient-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Patient</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onPatientAdd} id="add-patient">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="firstname">Firt Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.firstname}
                                                id="firstname"
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
                                            <label htmlFor="lastname">Last Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.lastname}
                                                error={errors.lastname}
                                                id="lastname"
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
                                            <label htmlFor="contact">Contact</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.contact}
                                                error={errors.contact}
                                                id="contact"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.contact
                                                })}
                                            />
                                            <span className="text-danger">{errors.lastname}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="dateofbirth">Date Of Birth</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.dateofbirth}
                                                error={errors.dateofbirth}
                                                id="dateofbirth"
                                                type="date"
                                                className={classnames("form-control", {
                                                    invalid: errors.dateofbirth
                                                })}
                                            />
                                            <span className="text-danger">{errors.dateofbirth}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="emergency_contact">Emergency Contact</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.emergency_contact}
                                                id="emergency_contact"
                                                type="text"
                                                className={classnames("form-control", {
                                                    
                                                })}
                                            />
                                            <span className="text-danger">{errors.emergency_contact}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="residence_address">Residence Address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.residence_address}
                                                id="residence_address"
                                                type="text"
                                                className={classnames("form-control", {
                                                    
                                                })}
                                            />
                                            <span className="text-danger">{errors.emergency_contact}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-patient"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Patient
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PatientAddModal.propTypes = {
    addPatient: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addPatient }
)(withRouter(PatientAddModal));
