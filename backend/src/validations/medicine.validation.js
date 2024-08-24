const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');
const MedicineModel = require('../models/medicine.model');
const MedicineCategoryModel = require('../models/medicine.model');

const medicineValidator = checkSchema({
    medicineCategoryID: {
        customSanitizer: {
            options: (id) => checkIsExistID(MedicineCategoryModel, id),
        }
    },
    medicineCode: {
        exists: {
            errorMessage: 'Medicine code is required'
        },
        isString: {
            errorMessage: 'Medicine code should be a string'
        },
        trim: true
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
    ingredients: {
        exists: {
            errorMessage: 'Ingredients is required'
        },
        isString: {
            errorMessage: 'Ingredients should be a string'
        },
        trim: true
    },
    unit: {
        exists: {
            errorMessage: 'Unit is required'
        },
        isString: {
            errorMessage: 'Unit should be a string'
        },
        trim: true
    },
    sideEffects: {
        exists: {
            errorMessage: 'Side effects is required'
        },
        isString: {
            errorMessage: 'Side effects should be a string'
        },
        trim: true
    },
    type: {
        exists: {
            errorMessage: 'Type is required'
        },
        isString: {
            errorMessage: 'Type should be a string'
        },
        trim: true
    },
    instruction: {
        exists: {
            errorMessage: 'Instruction is required'
        },
        isString: {
            errorMessage: 'Instruction should be a string'
        },
        trim: true
    },
    note: {
        exists: {
            errorMessage: 'Note is required'
        },
        isString: {
            errorMessage: 'Note should be a string'
        },
        trim: true
    }

});



module.exports = {
    medicineValidator,

};