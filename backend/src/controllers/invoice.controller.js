const InvoiceModel = require('../models/branch.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllInvoices = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await InvoiceModel.countDocuments({ isDeleted: false });

        const invoices = await InvoiceModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!invoices.length) {
            createError(404, "No invoices found.");
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Invoices retrieved successfully.',
            data: invoices,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getInvoiceByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const invoice = await InvoiceModel.findOne({
            isDeleted: false,
            _id: id
        });

        if (!invoice) {
            createError(404, "invoice not found.");
        }

        return res.status(200).json({
            message: 'Invoice retrieved successfully.',
            data: invoice,
        });
    } catch (error) {
        next(error);
    }
};

const createInvoice = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newInvoice = await InvoiceModel.create(req.body);

        return res.status(201).json({
            message: 'Invoice created successfully.',
            data: newInvoice
        });
    } catch (error) {
        next(error);
    }
};

const updateInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedInvoice = await InvoiceModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedInvoice) {
            createError(404, 'Invoice not found.');
        }

        return res.status(201).json({
            message: 'Invoice updated successfully.',
            data: updatedInvoice
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllInvoices,
    getInvoiceByID,
    createInvoice,
    updateInvoice,
};