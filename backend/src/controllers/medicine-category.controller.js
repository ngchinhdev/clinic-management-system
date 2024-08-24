const MedicineCategoryModel = require('../models/medicine-category.model');
const { createError, errorValidator } = require('../utils/helper.util');


const getAllMedicineCategories = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await MedicineCategoryModel.countDocuments({ isDeleted: false });

        const medicineCategories = await MedicineCategoryModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!medicineCategories.length) {
            createError(404, 'No medicine categories found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Medicine categories retrieved successfully.',
            data: medicineCategories,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getMedicineCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const MedicineCategory = await MedicineCategoryModel.findById(id);

        if (!MedicineCategory) {
            createError(404, 'Medicine category not found.');
        }

        return res.status(200).json({
            message: 'Medicine category retrieved successfully.',
            data: MedicineCategory
        });
    } catch (error) {
        next(error);
    }
};

const createMedicineCategory = async (req, res, next) => {
    try {
        errorValidator(req, res);
        const newMedicineCategory = await MedicineCategoryModel.create(req.body);
        return res.status(201).json({
            message: 'Medicine category created successfully.',
            data: newMedicineCategory
        });
    } catch (error) {
        next(error);
    }
};

const updateMedicineCategory = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const { id } = req.params;

        const updatedMedicineCategory = await MedicineCategoryModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            req.body,
            { new: true }
        );

        if (!updatedMedicineCategory) {
            createError(404, 'Medicine category not found.');
        }

        return res.status(200).json({
            message: 'Medicine category updated successfully.',
            data: updatedMedicineCategory
        });
    } catch (error) {
        next(error);
    }
};

const deleteMedicineCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedMedicineCategory = await MedicineCategoryModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedMedicineCategory) {
            createError(404, 'Medicine category not found.');
        }

        return res.status(200).json({
            message: 'Medicine category deleted successfully.',
            data: deletedMedicineCategory
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMedicineCategories,
    getMedicineCategoryById,
    createMedicineCategory,
    updateMedicineCategory,
    deleteMedicineCategory,
};