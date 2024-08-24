const { checkSchema } = require("express-validator");
const { checkIsExistID } = require('../utils/database.util');

const AppointmentModel = require('../models/appointment.model');
const ServiceModel = require('../models/service.model');

const resultValidator = checkSchema({
    appointmentID: {
        customSanitizer: {
            options: (id) => checkIsExistID(AppointmentModel, id),
        }
    },
    serviceID: {
        customSanitizer: {
            options: (id) => checkIsExistID(ServiceModel, id),
        }
    },
    diagnose: {
        exists: {
            errorMessage: "Diagnose is required",
        },
        isString: {
            errorMessage: "Diagnose should be a string",
        },
    },
    images: {
        optional: true,
        isArray: {
            errorMessage: "Images should be an array",
        },
    },
    description: {
        exists: {
            errorMessage: "Description is required",
        },
        isString: {
            errorMessage: "Description should be a string",
        },
    },
});

module.exports = {
    resultValidator,
};