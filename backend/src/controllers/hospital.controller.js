const HospitalModel = require('../models/hospital.model');
const { createError, errorValidator } = require('../utils/helper.util');

const getAllHospitals = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await HospitalModel.countDocuments({ isDeleted: false });

        const hospitals = await HospitalModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!hospitals.length) {
            createError(404, "No hospitals found.");
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Hospitals retrieved successfully.',
            data: hospitals,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getHospitalByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const hospital = await HospitalModel.findOne({
            isDeleted: false,
            _id: id
        });

        if (!hospital) {
            createError(404, "Hospital not found.");
        }

        return res.status(200).json({
            message: 'Hospital retrieved successfully.',
            data: hospital,
        });
    } catch (error) {
        next(error);
    }
};

const createHospital = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newHospital = await HospitalModel.create(req.body);

        return res.status(201).json({
            message: 'Hospital created successfully.',
            data: newHospital
        });
    } catch (error) {
        next(error);
    }
};

const updateHospital = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedHospital = await HospitalModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedHospital) {
            createError(404, 'Hospital not found.');
        }

        return res.status(201).json({
            message: 'Hospital updated successfully.',
            data: updatedHospital
        });
    } catch (error) {
        next(error);
    }
};

const deleteHospital = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedHospital = await HospitalModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedHospital) {
            createError(404, 'Hospital not found.');
        }

        return res.status(200).json({
            message: 'Hospital deleted successfully.',
            data: deletedHospital
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllHospitals,
    getHospitalByID,
    createHospital,
    updateHospital,
    deleteHospital
};