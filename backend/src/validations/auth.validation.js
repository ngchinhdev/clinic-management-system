const { checkSchema } = require('express-validator');

const loginValidator = checkSchema({
    phoneNumber: {
        exists: {
            errorMessage: 'Phone number is required'
        },
        isString: {
            errorMessage: 'Phone number should be a string'
        },
        trim: true
    },
    password: {
        exists: {
            errorMessage: 'Password is required'
        },
        isString: {
            errorMessage: 'Password should be a string'
        },
        trim: true
    },
});

const registerValidator = checkSchema({
    fullName: {
        exists: {
            errorMessage: 'Phone number is required'
        },
        isString: {
            errorMessage: 'Phone number should be a string'
        },
        trim: true
    },
    phoneNumber: {
        exists: {
            errorMessage: 'Phone number is required'
        },
        isString: {
            errorMessage: 'Phone number should be a string'
        },
        trim: true
    },
    password: {
        exists: {
            errorMessage: 'Password is required'
        },
        isString: {
            errorMessage: 'Password should be a string'
        },
        trim: true
    },
});

module.exports = {
    loginValidator,
    registerValidator
};