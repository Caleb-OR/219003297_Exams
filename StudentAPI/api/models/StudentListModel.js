'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var studentSchema = new Schema({
    firstname: {
          type: String,
          required: 'Kindly enter the first name'
        },
        lastname: {
          type: String,
          required: 'Kindly enter the last name'
        },
        dob: {
          type: Date,
          required: 'Kindly enter the date'
        },
        contact: {
          type: String,
          required: 'Kindly enter the contact'
        },
});

module.exports = mongoose.model('Student', studentSchema);
