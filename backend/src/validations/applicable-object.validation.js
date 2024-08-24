const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const ApplicableObjectModel = require('../models/applicable-object.model');
const MedicalPackageModel = require('../models/medical-package.model');
const ServiceModel = require('../models/service.model');

const applicableObjectValidator = checkSchema({
    medicalPackageID: {
        customSanitizer: {
            options: (id) => checkIsExistID(MedicalPackageModel, id),
        }
    },
    serviceID: {
        customSanitizer: {
            options: (id) => checkIsExistID(ServiceModel, id),
        }
    },
    gender: {
        exists: {
            errorMessage: 'Gender is required'
        },
        isString: {
            errorMessage: 'Gender should be a string'
        },
        trim: true
    },

    'age.min': {
        exists: {
            errorMessage: 'Min is required'
        },
        isNumeric: {
            errorMessage: 'Min should be a number'
        }
    },
    'age.max': {
        exists: {
            errorMessage: 'Max is required'
        },
        isNumeric: {
            errorMessage: 'Max should be a number'
        },
    },
    isMarried: {
        exists: {
            errorMessage: 'is married is required'
        },
        isBoolean: {
            errorMessage: 'is married should be a boolean'
        },
    },
    isFamily: {
        exists: {
            errorMessage: 'is family is required'
        },
        isBoolean: {
            errorMessage: 'is family should be a boolean'
        },
    },

});


module.exports = {
    applicableObjectValidator
};