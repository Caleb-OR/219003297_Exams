const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdatePatientInput(data) {
    let errors = {};
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.dateofbirth = !isEmpty(data.dateofbirth) ? data.dateofbirth : "";
    if (Validator.isEmpty(data.firstname)) {
        errors.name = "First name field is required";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.email = "Last name field is required";
    } 

    if (Validator.isEmpty(data.dateofbirth)) {
        errors.email = "Date of Birth field is required";
    } 
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
