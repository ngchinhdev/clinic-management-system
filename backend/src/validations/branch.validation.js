const { checkSchema } = require('express-validator');

const branchValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    workingTime: {
        exists: {
            errorMessage: 'Working time is required'
        },
        isString: {
            errorMessage: 'Working time should be a string'
        },
        trim: true
    },
    imagesURL: {
        isArray: {
            errorMessage: 'ImagesURL is not Array'
        }
    },
    address: {
        exists: {
            errorMessage: 'Address is required'
        },
        isString: {
            errorMessage: 'Address should be a string'
        },
        trim: true
    },
    hotline: {
        exists: {
            errorMessage: 'Hotline is required'
        },
        isString: {
            errorMessage: 'Hotline should be a string'
        },
        trim: true
    },
    'coordinates.lng': {
        exists: {
            errorMessage: 'Lng is required'
        },
        isNumeric: {
            errorMessage: 'Lng should be a number'
        }
    },
    'coordinates.lat': {
        exists: {
            errorMessage: 'Lat is required'
        },
        isNumeric: {
            errorMessage: 'Lat should be a number'
        }
    }
});



module.exports = {
    branchValidator
};