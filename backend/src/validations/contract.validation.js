const { checkSchema } = require("express-validator");

const contractValidator = checkSchema({
    doctorID: {
        optional: true,
        isMongoId: {
            errorMessage: "Invalid Doctor ID",
        },
    },
    hospitalID: {
        optional: true,
        isMongoId: {
            errorMessage: "Invalid Hospital ID",
        },
    },
    startDate: {
        exists: {
            errorMessage: "Start date is required",
        },
        isString: {
            errorMessage: "Start date should be a date type",
        },
    },
    endDate: {
        exists: {
            errorMessage: "End date is required",
        },
        isISO8601: {
            errorMessage: "End date should be a date type",
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
});

module.exports = {
    contractValidator,
};
