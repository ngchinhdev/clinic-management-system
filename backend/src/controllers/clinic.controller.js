const ClinicModel = require('../models/clinic.model');
const { createError, errorValidator } = require('../utils/helper.util');

const getAllClinics = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await ClinicModel.countDocuments({ isDeleted: false });

        const clinics = await ClinicModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!clinics.length) {
            createError(404, "No clinics found.");
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Clinics retrieved successfully.',
            data: clinics,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getClinicByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const clinic = await ClinicModel.findOne({
            isDeleted: false,
            _id: id
        });

        if (!clinic) {
            createError(404, "Clinic not found.");
        }

        return res.status(200).json({
            message: 'Clinic retrieved successfully.',
            data: clinic,
        });
    } catch (error) {
        next(error);
    }
};

const createClinic = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newClinic = await ClinicModel.create(req.body);

        return res.status(201).json({
            message: 'Clinic created successfully.',
            data: newClinic
        });
    } catch (error) {
        next(error);
    }
};

const updateClinic = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedClinic = await ClinicModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedClinic) {
            createError(404, 'Clinic not found.');
        }

        return res.status(201).json({
            message: 'Clinic updated successfully.',
            data: updatedClinic
        });
    } catch (error) {
        next(error);
    }
};

const deleteClinic = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedClinic = await ClinicModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedClinic) {
            createError(404, 'Clinic not found.');
        }

        return res.status(200).json({
            message: 'Clinic deleted successfully.',
            data: deletedClinic
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllClinics,
    getClinicByID,
    createClinic,
    updateClinic,
    deleteClinic
};