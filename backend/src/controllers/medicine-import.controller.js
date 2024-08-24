const MedicineImportModel = require('../models/medicine-import.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllMedicineImports = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await MedicineImportModel.countDocuments({
            isDeleted: false,
        });
        const medicineImports = await MedicineImportModel
            .find({
                isDeleted: false,
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!medicineImports.length) {
            createError(404, 'No medical packages found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Medical packages retrieved successfully.',
            data: medicineImports,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getMedicineImportById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const medicineImport = await MedicineImportModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!medicineImport) {
            createError(404, 'Medical package not found.');
        }

        return res.status(200).json({
            message: 'Medical package retrieved successfully.',
            data: medicineImport,
        });
    } catch (error) {
        next(error);
    }
};

const createMedicineImport = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newMedicineImport = await MedicineImportModel.create(req.body);

        return res.status(201).json({
            message: 'Medicine import created successfully.',
            data: newMedicineImport
        });
    } catch (error) {
        next(error);
    }
};

const updateMedicineImport = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedMedicineImport = await MedicineImportModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        return res.status(201).json({
            message: 'Medicine import updated successfully.',
            data: updatedMedicineImport
        });
    } catch (error) {
        next(error);
    }
};

const deleteMedicineImport = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedMedicineImport = await MedicineImportModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedMedicineImport) {
            createError(404, 'Medicine import not found.');
        }

        return res.status(200).json({
            message: 'Medicine import deleted successfully.',
            data: deletedMedicineImport
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMedicineImports,
    getMedicineImportById,
    createMedicineImport,
    updateMedicineImport,
    deleteMedicineImport
};