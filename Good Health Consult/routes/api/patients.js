const express = require('express');
const router = express.Router();
const validatePatientInput = require('../../validation/add_patient_validation');
const validateUpdatePatientInput = require('../../validation/updatePatient');
const Patient = require('../../models/Patient');

router.post('/patient-add', (req, res) => {
    const { errors, isValid } = validatePatientInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Patient.findOne({ contact: req.body.contact }).then(patient => {
        if (patient) {
            return res.status(400).json({ email: 'Contact already exists' });
        } 
        else {
            const newPatient = new Patient({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dateofbirth: req.body.dateofbirth,
                contact: req.body.contact,
                residence_address: req.body.residence_address,
                emergency_contact: req.body.emergency_contact

            });
            newPatient
            .save()
            .then(user => {
                return res.status(200).json({message: 'Patient added successfully. Refreshing data...'})
            }).catch(err => console.log(err));
            
        }
    });
});

router.post('/patient-data', (req, res) => {
    Patient.find({}).select(['-password']).then(patient => {
        if (patient) {
            return res.status(200).send(patient);
        }
    });
});

router.post('/patient-delete', (req, res) => {
    Patient.deleteOne({ _id: req.body._id}).then(patient => {
        if (patient) {
            return res.status(200).json({message: 'Patient deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/patient-update', (req, res) => {
    const { errors, isValid } = validateUpdatePatientInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    Patient.findOne({ _id }).then(patient => {
        if (patient) {
            
            let update = {'firstname': req.body.firstname, 'lastname': req.body.lastname, 'dateofbirth': req.body.dateofbirth};
            Patient.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update patient record.' });
                } else {
                    return res.status(200).json({ message: 'Patient updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now patient found to update.' });
        }
    });
});


module.exports = router;
