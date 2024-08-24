const { checkSchema } = require("express-validator");

const hospitalValidator = checkSchema({
    name: {
        exists: {
            errorMessage: "Name is required",
        },
        isString: {
            errorMessage: "Name should be a string",
        },
    },
    image: {
        exists: {
            errorMessage: "Image is required",
        },
        isString: {
            errorMessage: "Image should be a string",
        },
    },
    address: {
        exists: {
            errorMessage: "Address is required",
        },
        isString: {
            errorMessage: "Address should be a string",
        },
    },
    hotline: {
        exists: {
            errorMessage: "Hotline is required",
        },
        isString: {
            errorMessage: "Hotline should be a string",
        },
    },
});

module.exports = {
    hospitalValidator,
};