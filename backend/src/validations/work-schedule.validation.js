const { checkSchema } = require("express-validator");
const { checkIsExistID } = require('../utils/database.util');

const DoctorModel = require('../models/doctor.model');

const workScheduleValidator = checkSchema({
    doctorID: {
        customSanitizer: {
            options: (id) => checkIsExistID(DoctorModel, id),
        }
    },
    detail: {
        exists: {
            errorMessage: "Detail is required",
        },
        isObject: {
            errorMessage: "Detail should be an object",
        },
        customSanitizer: {
            options: (value) => {
                if (!value.day || !value.hour) {
                    throw new Error("Detail should have day and hour");
                }
                return true;
            },
        },
    },
});

module.exports = {
    workScheduleValidator
};