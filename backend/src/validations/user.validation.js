const { checkSchema } = require("express-validator");

const userValidator = checkSchema({
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
        optional: true,
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
        isLength: {
            errorMessage: 'Password should be at least 6 chars long',
            options: { min: 6 }
        },
    },
    avatar: {
        optional: true,
        isString: {
            errorMessage: "Avatar should be a string",
        },
    },
    citizenIdentificationNumber: {
        optional: true,
        isNumeric: {
            errorMessage: "Citizen identification number should be a number",
        },
    },
});

module.exports = {
    userValidator,
};

