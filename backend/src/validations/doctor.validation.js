const { checkSchema } = require("express-validator");
const { checkIsExistID } = require('../utils/database.util');

const Specialty = require('../models/specialty.model');

const doctorValidator = checkSchema({
    fullName: {
        exists: {
            errorMessage: "Full name is required",
        },
        isString: {
            errorMessage: "Full name should be a string",
        },
    },
    phoneNumber: {
        optional: true,
        isString: {
            errorMessage: "Phone number should be a string",
        },
    },

    email: {
        optional: true,
        isString: {
            errorMessage: "Email should be a string",
        },
    },


    dateOfBirth: {
        optional: true,
        isISO8601: {
            errorMessage: "Invalid date of birth time format",
        },
    },
    address: {
        optional: true,
        isObject: {
            errorMessage: "Address should be an object",
        },
        custom: {
            options: (value) => {
                if (!value.province || !value.district || !value.ward || !value.street) {
                    throw new Error("Address should have province, district, ward, and street");
                }
                return true;
            },
        },
    },
    gender: {
        exists: {
            errorMessage: "Gender is required",
        },
        isString: {
            errorMessage: 'Gender should be a string'
        }
    },
    password: {
        exists: {
            errorMessage: "Password is required",
        },
        isString: {
            errorMessage: "Password should be a string",
        },
    },
    avatar: {
        exists: {
            errorMessage: "Avatar is required",
        },
        isString: {
            errorMessage: "Avatar should be a string",
        },
    },
    citizenIdentificationNumber: {
        exists: {
            errorMessage: "Avatar is required",
        },
        isNumeric: {
            errorMessage: "Citizen identification number should be a number",
        },
    },
    isActivated: {
        exists: {
            errorMessage: "Is activated is required",
        },
        isBoolean: {
            errorMessage: "Is activated should be a boolean",
        },
    },

    specialtyID: {
        customSanitizer: {
            options: (id) => checkIsExistID(Specialty, id),
        }
    },

    title: {
        exists: {
            errorMessage: "Title is required",
        },
        isString: {
            errorMessage: "Title should be a string",
        },
    },
    practicingCertificate: {
        exists: {
            errorMessage: "Practicing certificate is required",
        },
        isString: {
            errorMessage: "Practicing certificate should be a string",
        },
    },
    yearsExperience: {
        exists: {
            errorMessage: "Years of experience is required",
        },
        isNumeric: {
            errorMessage: "Years of experience should be a number",
        },
    },
    detail: {
        exists: {
            errorMessage: "Detail is required",
        },
        isString: {
            errorMessage: "Detail should be a string",
        },
    },
    isInternal: {
        exists: {
            errorMessage: "Internal status is required",
        },
        isBoolean: {
            errorMessage: "Internal status should be a boolean",
        },
    },
});

module.exports = {
    doctorValidator,
};