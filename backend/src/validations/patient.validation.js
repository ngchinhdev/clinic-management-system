const { checkSchema } = require("express-validator");

const patientValidator = checkSchema({
    patientCode: {
        exists: {
            errorMessage: "Patient code is required",
        },
        isString: {
            errorMessage: "Patient code should be a string",
        },
    },
    occupation: {
        optional: true,
        isString: {
            errorMessage: "Occupation should be a string",
        },
    },
    insuranceCode: {
        optional: true,
        isString: {
            errorMessage: "Insurance code should be a string",
        },
    },
    ethic: {
        optional: true,
        isString: {
            errorMessage: "Ethic should be a string",
        },
    },
    healthInformation: {
        optional: true,
        isArray: {
            errorMessage: "Health information should be an array",
        },
        custom: {
            options: (value) => {
                if (value.length > 0) {
                    for (let i = 0; i < value.length; i++) {
                        if (!value[i].type || !value[i].data || !value[i].unit || !value[i].date) {
                            return false;
                        }
                    }
                }
                return true;
            },
            errorMessage: "Health information should have type, data, unit, and date",
        },
    },
});

module.exports = {
    patientValidator,
};
