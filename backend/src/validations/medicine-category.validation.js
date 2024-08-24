const { checkSchema } = require('express-validator');

const medicineCategoryValidator = checkSchema({

    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
});

module.exports = {
    medicineCategoryValidator
};