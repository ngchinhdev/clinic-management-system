const ResultModel = require('../models/clinic.model');
const { createError, errorValidator } = require('../utils/helper.util');

const getAllResults = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await ResultModel.countDocuments({ isDeleted: false });

        const results = await ResultModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!results.length) {
            createError(404, "No results found.");
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Results retrieved successfully.',
            data: results,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getResultByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await ResultModel.findOne({
            isDeleted: false,
            _id: id
        });

        if (!result) {
            createError(404, "Result not found.");
        }

        return res.status(200).json({
            message: 'Result retrieved successfully.',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const createResult = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newResult = await ResultModel.create(req.body);

        return res.status(201).json({
            message: 'Result created successfully.',
            data: newResult
        });
    } catch (error) {
        next(error);
    }
};

const updateResult = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedResult = await ResultModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedResult) {
            createError(404, 'Result not found.');
        }

        return res.status(201).json({
            message: 'Result updated successfully.',
            data: updatedResult
        });
    } catch (error) {
        next(error);
    }
};

const deleteResult = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedResult = await ResultModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedResult) {
            createError(404, 'Result not found.');
        }

        return res.status(200).json({
            message: 'Result deleted successfully.',
            data: deletedResult
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllResults,
    getResultByID,
    createResult,
    updateResult,
    deleteResult
};