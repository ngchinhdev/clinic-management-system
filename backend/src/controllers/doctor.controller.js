const DoctorModel = require('../models/doctor.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllDoctors = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await DoctorModel.countDocuments().populate({
            path: 'userID',
            match: { isDeleted: false }
        });

        const doctors = await DoctorModel
            .find().populate({
                path: 'userID',
                match: { isDeleted: false }
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);
        if (!doctors.length) {
            createError(404, 'No doctor found.');
        }
        return res.status(200).json({
            page: page || 1,
            message: 'Doctor retrieved successfully.',
            data: doctors,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getAllDoctorsBySpecialtyId = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;
        const { id } = req.params;

        const totalRecords = await DoctorModel.countDocuments()
            .find({ specialtyID: id })
            .populate({
                path: 'userID',
                match: { isDeleted: false }
            });

        const doctors = await DoctorModel
            .find({ specialtyID: id }).populate({
                path: 'userID',
                match: { isDeleted: false }
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);
        if (!doctors.length) {
            createError(404, 'No doctor found.');
        }
        return res.status(200).json({
            page: page || 1,
            message: 'Doctor retrieved successfully.',
            data: doctors,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getDoctorById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const doctors = await DoctorModel.findById(id).populate({
            path: 'userID'
        });

        if (!doctors) {
            createError(404, 'News not found.');
        }
        return res.status(200).json({
            message: 'News retrieved successfully.',
            data: doctors
        });
    } catch (error) {
        next(error);
    }
};

const createDoctor = async (req, res, next) => {
    try {
        const userID = req.newUser._id;
        const newDoctor = await DoctorModel.create({ userID, ...req.body });
        newDoctor.userID = req.newUser;

        return res.status(201).json({
            message: 'Doctor created successfully.',
            data: newDoctor
        });
    } catch (error) {
        next(error);
    }
};
const updateDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        errorValidator(req, res);
        const updatedDoctor = await DoctorModel.findOneAndUpdate(
            {
                _id: id
            },
            { ...req.body },
            { new: true }
        );
        updatedDoctor.userID = await req.updatedUser;

        return res.status(201).json({
            message: 'Doctor updated successfully.',
            data: updatedDoctor,
        });
    } catch (error) {
        next(error);
    }
};


const deleteDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedDoctor = await DoctorModel.findById(id).populate({ path: 'userID' });

        return res.status(200).json({
            message: 'Doctor deleted successfully.',
            data: deletedDoctor
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllDoctors,
    createDoctor,
    updateDoctor,
    getDoctorById,
    deleteDoctor,
    getAllDoctorsBySpecialtyId
};