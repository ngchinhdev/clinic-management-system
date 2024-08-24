const { checkSchema } = require('express-validator');

const SpecialtyModel = require('../models/specialty.model');
const { checkIsExistID } = require('../utils/database.util');

const serviceValidator = checkSchema({
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
    price: {
        exists: {
            errorMessage: 'Price is required'
        },
        isNumeric: {
            errorMessage: 'Price should be a number'
        }
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
    discountPrice: {
        optional: true,
        isNumeric: {
            errorMessage: 'Discount Price should be a number'
        }
    },
});

module.exports = {
    serviceValidator,
};