const { checkSchema } = require('express-validator');
const PrescriptionModel = require('../models/prescription.model');


const prescriptionValidator = checkSchema({
    advice: {
        exists: {
            errorMessage: 'Advice is required'
        },
        isString: {
            errorMessage: 'Advice should be a string'
        },
        trim: true
    },
    'medicines.*.medicineImportID': {
        exists: {
            errorMessage: 'medicine import ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid medicine import ID'
        }
    },
    'medicines.*.quantity': {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'Quantity must be a positive integer'
        }
    },
    dosage: {
        exists: {
            errorMessage: 'Dosage is required'
        },
        isString: {
            errorMessage: 'Dosage should be a string'
        },
        trim: true
    },



});

module.exports = {
    prescriptionValidator
};