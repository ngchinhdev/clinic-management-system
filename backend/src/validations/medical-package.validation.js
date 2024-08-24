const { checkSchema } = require('express-validator');
const { isValidObjectId } = require("mongoose");
const { checkIsExistID } = require('../utils/database.util');
const SpecialtyModel = require('../models/specialty.model');

const medicalPackageValidator = checkSchema({
    specialtyID: {
        customSanitizer: {
            options: (id) => checkIsExistID(SpecialtyModel, id),
        }
    },
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    image: {
        exists: {
            errorMessage: 'Image is required'
        },
        isString: {
            errorMessage: 'Image should be a string'
        },
        trim: true
    },
    shortDescription: {
        exists: {
            errorMessage: 'Short description is required'
        },
        isString: {
            errorMessage: 'Short description should be a string'
        },
        trim: true
    },
    details: {
        exists: {
            errorMessage: 'Details is required'
        },
        isString: {
            errorMessage: 'Details should be a string'
        },
        trim: true
    },
    'services.*.servicesID': {
        custom: {
            options: (serviceIDArray) => {
                if (!serviceIDArray.length) return false;
                return serviceIDArray.every(id => isValidObjectId(id));
            },
            errorMessage: 'Each Service ID must be a valid MongoDB ObjectID'
        }
    },
    'services.*.levelName': {
        exists: {
            errorMessage: 'Level name is required'
        },
        isString: {
            errorMessage: 'Level name should be a string'
        },
        trim: true
    },
    'services.*.price': {
        exists: {
            errorMessage: 'Price is required'
        },
        isNumeric: {
            errorMessage: 'Price must be a number'
        }
    },
    'services.*.discountPrice': {
        optional: true,
        isNumeric: {
            errorMessage: 'Discount price must be a number'
        }
    },
});


module.exports = {
    medicalPackageValidator
};