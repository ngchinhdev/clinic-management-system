const ClinicCapacity = require('../models/clinic-capacity.model');
const { createError, errorValidator } = require('../utils/helper.util');

const getAllClinicCapacities = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await ClinicCapacity.countDocuments({ isDeleted: false });

        const clinicCapacities = await ClinicCapacity
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!clinicCapacities.length) {
            createError(404, "No clinic capacities found.");
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Clinic capacities retrieved successfully.',
            data: clinicCapacities,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getClinicCapacityByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const clinicCapacity = await ClinicCapacity.findOne({
            isDeleted: false,
            _id: id
        });

        if (!clinicCapacity) {
            createError(404, "Clinic capacity not found.");
        }

        return res.status(200).json({
            message: 'Clinic capacity retrieved successfully.',
            data: clinicCapacity,
        });
    } catch (error) {
        next(error);
    }
};

const createClinicCapacity = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newClinic = await ClinicCapacity.create(req.body);

        return res.status(201).json({
            message: 'Clinic created successfully.',
            data: newClinic
        });
    } catch (error) {
        next(error);
    }
};

const updateClinicCapacity = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedClinicCapacity = await ClinicCapacity.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedClinicCapacity) {
            createError(404, 'Clinic capacity not found.');
        }

        return res.status(201).json({
            message: 'Clinic capacity updated successfully.',
            data: updatedClinicCapacity
        });
    } catch (error) {
        next(error);
    }
};

const deleteClinicCapacity = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedClinicCapacity = await ClinicCapacity.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedClinicCapacity) {
            createError(404, 'Clinic capacity not found.');
        }

        return res.status(200).json({
            message: 'Clinic capacity deleted successfully.',
            data: deletedClinicCapacity
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllClinicCapacities,
    getClinicCapacityByID,
    createClinicCapacity,
    updateClinicCapacity,
    deleteClinicCapacity
};