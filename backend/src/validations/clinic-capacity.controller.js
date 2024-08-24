const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const DoctorModel = require('../models/doctor.model');
const ClinicModel = require('../models/clinic.model');
const AppointmentModel = require('../models/appointment.model');

const clinicCapacityValidator = checkSchema({
    doctorID: {
        customSanitizer: {
            options: (id) => checkIsExistID(DoctorModel, id),
        }
    },
    clinicID: {
        customSanitizer: {
            options: (id) => checkIsExistID(ClinicModel, id),
        }
    },
    appointmentIDs: {
        customSanitizer: {
            options: async (ids) => {
                for (const id of ids) {
                    await checkIsExistID(AppointmentModel, id);
                }
            },
        }
    },
});

module.exports = {
    clinicCapacityValidator
};