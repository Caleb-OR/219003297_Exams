import axios from "axios";
import {
    GET_ERRORS,
    PATIENT_ADD,
    PATIENT_UPDATE
} from "./types";

export const addPatient = (patientData, history) => dispatch => {
    axios
        .post("/api/patient-add", patientData)
        .then(res =>
            dispatch({
                type: PATIENT_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updatePatient = (patientData) => dispatch => {
    axios
        .post("/api/patient-update", patientData)
        .then(res =>
            dispatch({
                type: PATIENT_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
