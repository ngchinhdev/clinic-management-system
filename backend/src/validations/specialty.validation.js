const { checkSchema } = require("express-validator");

const specialtyValidator = checkSchema({
    image: {
        exists: {
            errorMessage: "Image is required",
        },
        isString: {
            errorMessage: "Image should be a string",
        },
    },
    name: {
        exists: {
            errorMessage: "Name is required",
        },
        isString: {
            errorMessage: "Name should be a string",
        },
    },
});

module.exports = {
    specialtyValidator,
};