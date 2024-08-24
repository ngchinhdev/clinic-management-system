const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const BranchModel = require('../models/branch.model');
const SpecialtyModel = require('../models/specialty.model');

const clinicValidator = checkSchema({
    branchID: {
        customSanitizer: {
            options: (id) => checkIsExistID(BranchModel, id),
        }
    },
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
});

module.exports = {
    clinicValidator
};