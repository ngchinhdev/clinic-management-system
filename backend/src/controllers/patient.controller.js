const Patient = require('../models/patient.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllPatients = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await Patient.countDocuments().populate({
            path: 'userID',
            match: { isDeleted: false }
        });

        const patients = await Patient
            .find().populate({
                path: 'userID',
                match: { isDeleted: false }
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);
        if (!patients.length) {
            createError(404, 'No patient found.');
        }
        return res.status(200).json({
            page: page || 1,
            message: 'Patient retrieved successfully.',
            data: patients,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getPatientById = async (req, res, next) => {
    try {
        const idParams = req.params?.id;
        const idMid = req.user?.id;

        console.log(idParams, idMid);

        const patient = await Patient
            .findById(idParams || idMid)
            .populate({
                path: 'userID',
                select: '-_id'
            });

        if (!patient) {
            createError(404, 'Patient not found.');
        }

        const patientObj = patient.toObject();
        const userObj = patientObj.userID;
        delete patientObj['userID'];

        return res.status(200).json({
            message: 'Patient retrieved successfully.',
            data: {
                ...patientObj,
                ...userObj
            }
        });
    } catch (error) {
        next(error);
    }
};

const createPatient = async (req, res, next) => {
    try {
        const userID = req.newUser._id;

        const lastPatient = await Patient.find({}).sort({ createdAt: -1 }).limit(1);
        let lastPatientCode = '';

        if (lastPatient.length) {
            lastPatientCode = +lastPatient[0].patientCode.slice(2).toString();
            console.log(lastPatientCode);
        } else {
            lastPatientCode = "BN1";
        }

        const newPatient = await Patient.create({ userID, patientCode: lastPatient.length ? 'BN' + (lastPatientCode + 1) : lastPatientCode });
        newPatient.userID = req.newUser;

        return res.status(201).json({
            message: 'Patient created successfully.',
            data: newPatient
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPatients,
    createPatient,
    getPatientById,
};