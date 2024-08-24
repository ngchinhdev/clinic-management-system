const { checkSchema } = require("express-validator");

const contactValidator = checkSchema({
    fullName: {
        exists: {
            errorMessage: "Full name is required",
        },
        isString: {
            errorMessage: "Full name should be a string type",
        },
    },
    email: {
        exists: {
            errorMessage: "Email is required",
        },
        isString: {
            errorMessage: "Email should be a string type",
        },
    },
    phoneNumber: {
        exists: {
            errorMessage: "Phone number is required",
        },
        isString: {
            errorMessage: "Phone number should be a string type",
        },
    },
    note: {
        exists: {
            errorMessage: "Note is required",
        },
        isString: {
            errorMessage: "Note should be a string type",
        },
    },
});

module.exports = {
    contactValidator,
};
