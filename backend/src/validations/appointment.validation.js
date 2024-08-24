const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const patientModel = require('../models/patient.model');
const doctorModel = require('../models/patient.model');

const appointmentValidator = checkSchema({
    patientID: {
        customSanitizer: {
            options: (id) => checkIsExistID(patientModel, id),
        }
    },
    doctorID: {
        customSanitizer: {
            options: (id) => checkIsExistID(doctorModel, id),
        }
    },
    clinicID: {
        exists: {
            errorMessage: 'Clinic ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid Clinic ID'
        }
    },
    serviceID: {
        optional: true,
        isMongoId: {
            errorMessage: 'Invalid Service ID'
        }
    },
    medicalPackageID: {
        optional: true,
        isMongoId: {
            errorMessage: 'Invalid Medical Package ID'
        }
    },
    type: {
        exists: {
            errorMessage: 'Appointment type is required'
        },
        isString: {
            errorMessage: 'Appointment type should be a string'
        },
    },
    time: {
        exists: {
            errorMessage: 'Appointment time is required'
        },
        isISO8601: {
            errorMessage: 'Invalid appointment time format'
        }
    },
    status: {
        exists: {
            errorMessage: 'Status is required'
        },
        isString: {
            errorMessage: 'Status should be a string'
        },
        isIn: {
            options: [['Đã xác nhận', 'Đã hủy', 'Đang chờ', 'Đã khám']],
            errorMessage: 'Status is not valid'
        }
    },
    isService: {
        exists: {
            errorMessage: 'Appointment or Service?'
        },
        isBoolean: {
            errorMessage: 'Appointment or Service should be a boolean'
        }
    },
    'paymentMethod.method': {
        optional: true,
        isString: {
            errorMessage: 'Payment method should be a string'
        }
    },
    'paymentMethod.token': {
        optional: true,
        isString: {
            errorMessage: 'Payment token should be a string'
        }
    },
    'paymentMethod.isPaid': {
        optional: true,
        isBoolean: {
            errorMessage: 'Payment status should be a boolean'
        }
    },
});

module.exports = {
    appointmentValidator
};
