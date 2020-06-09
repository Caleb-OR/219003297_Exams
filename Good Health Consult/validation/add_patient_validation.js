const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePatientInput(data) {
    let errors = {};
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.contact = !isEmpty(data.contact) ? data.contact : "";
    data.dateofbirth = !isEmpty(data.dateofbirth) ? data.dateofbirth : "";
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "First name field is required";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Last name field is required";
    } 
   
    if (Validator.isEmpty(data.contact)) {
        errors.contact = "Contact field is required";
    }
    if (Validator.isEmpty(data.dateofbirth)) {
        errors.dateofbirth = "Date of Birth field is required";
    }
    if (!Validator.isLength(data.contact, { min: 10, max: 10 })) {
        errors.contact = "Contact must be 10 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};