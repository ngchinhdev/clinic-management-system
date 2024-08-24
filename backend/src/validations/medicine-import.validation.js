const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const MedicineImportModel = require('../models/medicine-import.model');
const MedicineModel = require('../models/medicine-import.model');

const medicineImportValidator = checkSchema({
    medicineID: {
        customSanitizer: {
            options: (id) => checkIsExistID(MedicineModel, id),
        }
    },
    quantity: {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isNumeric: {
            errorMessage: 'Quantity should be a number'
        }
    },
    purchaseDate: {
        exists: {
            errorMessage: 'Purchase date is required'
        },
        isString: {
            errorMessage: 'Purchase date should be a string'
        },
        trim: true
    },
    manufacturingDate: {
        exists: {
            errorMessage: 'Manufacturing date is required'
        },
        isDate: {
            errorMessage: 'Manufacturing date: Invalid date format'
        }
    },
    expiryDate: {
        exists: {
            errorMessage: 'ExpiryDate is required'
        },
        isDate: {
            errorMessage: 'Expiry date: Invalid date format'
        }
    },
    purchasePrice: {
        exists: {
            errorMessage: 'Purchase price is required'
        },
        isNumeric: {
            errorMessage: 'Purchase price should be a number'
        }
    },
    sellingPrice: {
        exists: {
            errorMessage: 'Selling price is required'
        },
        isNumeric: {
            errorMessage: 'Selling price should be a number'
        }
    },
    origin: {
        exists: {
            errorMessage: 'Origin is required'
        },
        isString: {
            errorMessage: 'Origin should be a string'
        },
        trim: true
    }

});



module.exports = {
    medicineImportValidator

};