const BranchModel = require('../models/branch.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllBranches = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await BranchModel.countDocuments({ isDeleted: false });

        const branches = await BranchModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!branches.length) {
            createError(404, "No branches found.");
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Branches retrieved successfully.',
            data: branches,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getBranchByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const branch = await BranchModel.findOne({
            isDeleted: false,
            _id: id
        });

        if (!branch) {
            createError(404, "Branch not found.");
        }

        return res.status(200).json({
            message: 'Branch retrieved successfully.',
            data: branch,
        });
    } catch (error) {
        next(error);
    }
};

const createBranch = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newBranch = await BranchModel.create(req.body);

        return res.status(201).json({
            message: 'Branch created successfully.',
            data: newBranch
        });
    } catch (error) {
        next(error);
    }
};

const updateBranch = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedBranch = await BranchModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedBranch) {
            createError(404, 'Branch not found.');
        }

        return res.status(201).json({
            message: 'Branch updated successfully.',
            data: updatedBranch
        });
    } catch (error) {
        next(error);
    }
};

const deleteBranch = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedBranch = await BranchModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedBranch) {
            createError(404, 'Branch not found.');
        }

        return res.status(200).json({
            message: 'Branch deleted successfully.',
            data: deletedBranch
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBranches,
    getBranchByID,
    createBranch,
    updateBranch,
    deleteBranch
};