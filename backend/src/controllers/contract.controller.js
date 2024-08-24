const ContractModel = require('../models/contract.model');
const { createError, errorValidator } = require('../utils/helper.util');

const getAllContracts = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await ContractModel.countDocuments({ isDeleted: false });

        const contracts = await ContractModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!contracts.length) {
            createError(404, "No contracts found.");
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Contracts retrieved successfully.',
            data: contracts,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getContractByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const contract = await ContractModel.findOne({
            isDeleted: false,
            _id: id
        });

        if (!contract) {
            createError(404, "Contract not found.");
        }

        return res.status(200).json({
            message: 'Contract retrieved successfully.',
            data: contract,
        });
    } catch (error) {
        next(error);
    }
};

const createContract = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newContract = await ContractModel.create(req.body);

        return res.status(201).json({
            message: 'Contract created successfully.',
            data: newContract
        });
    } catch (error) {
        next(error);
    }
};

const updateContract = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedContract = await ContractModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedContract) {
            createError(404, 'Contract not found.');
        }

        return res.status(201).json({
            message: 'Contract updated successfully.',
            data: updatedContract
        });
    } catch (error) {
        next(error);
    }
};

const deleteContract = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedContract = await ContractModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedContract) {
            createError(404, 'Contract not found.');
        }

        return res.status(200).json({
            message: 'Contract deleted successfully.',
            data: deletedContract
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllContracts,
    getContractByID,
    createContract,
    updateContract,
    deleteContract
};