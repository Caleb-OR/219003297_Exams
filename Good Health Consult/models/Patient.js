const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PatientSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    residence_address: {
        type: String,
        required: true
    },
    emergency_contact: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: Date,
        default: Date.now
    }
});

PatientSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

PatientSchema.set('toJSON', {
    virtuals: true
});

module.exports = Patient = mongoose.model("patients", PatientSchema);
