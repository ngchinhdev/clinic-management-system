const MedicineModel = require('../models/medicine.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllMedicines = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await MedicineModel.countDocuments({
            isDeleted: false,
        });

        const medicines = await MedicineModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!medicines.length) {
            createError(404, 'No medicines found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Medicines retrieved successfully.',
            data: medicines,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getMedicineById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const medicine = await MedicineModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!medicine) {
            createError(404, 'Medical package not found.');
        }

        return res.status(200).json({
            message: 'Medical package retrieved successfully.',
            data: medicine,
        });
    } catch (error) {
        next(error);
    }
};

const createMedicine = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newMedicine = await MedicineModel.create(req.body);

        return res.status(201).json({
            message: 'Medicine created successfully.',
            data: newMedicine
        });
    } catch (error) {
        next(error);
    }
};

const updateMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedMedicine = await MedicineModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        return res.status(201).json({
            message: 'Medicine updated successfully.',
            data: updatedMedicine
        });
    } catch (error) {
        next(error);
    }
};

const deleteMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedMedicine = await MedicineModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedMedicine) {
            createError(404, 'Medicine not found.');
        }

        return res.status(200).json({
            message: 'Medicine deleted successfully.',
            data: deletedMedicine
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine
};