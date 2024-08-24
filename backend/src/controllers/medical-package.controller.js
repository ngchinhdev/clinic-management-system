const mongoose = require('mongoose');
const MedicalPackageModel = require('../models/medical-package.model');
const ServiceModel = require('../models/service.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllMedicalPackages = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;
        let { branchID, specialtyID, gender } = req.checkValueQuery;

        const pipeline = [
            {
                $unwind: '$services'
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    shortDescription: { $first: '$shortDescription' },
                    details: { $first: '$details' },
                    specialtyID: { $first: '$specialtyID' },
                    services: { $push: '$services' },
                    minDiscountPrice: { $min: '$services.discountPrice' },
                    isHidden: { $first: '$isHidden' },
                    isDeleted: { $first: '$isDeleted' },
                    createdAt: { $first: '$createdAt' },
                    updatedAt: { $first: '$updatedAt' },
                    image: { $first: '$image' },
                    orderCount: { $first: '$orderCount' }
                }
            },
            // ...(sortOptions['discountPrice'] ? [{
            //     $sort: {
            //         minDiscountPrice: sortOptions['discountPrice']
            //     }
            // }] : []),
            ...(sortOptions && Object.keys(sortOptions).length ?
                sortOptions['discountPrice'] ? [{
                    $sort: {
                        minDiscountPrice: sortOptions['discountPrice']
                    }
                }] : [{
                    $sort: sortOptions
                }] : []),
            {
                $project: {
                    minDiscountPrice: 0
                }
            },
            {
                $lookup: {
                    from: "Clinic",
                    localField: "specialtyID",
                    foreignField: "specialtyID",
                    as: "clinicInfo"
                }
            },
            {
                $lookup: {
                    from: "ApplicableObject",
                    localField: "_id",
                    foreignField: "medicalPackageID",
                    as: "ApplicableObjectInfo"
                }
            },
            {
                $match: {
                    isDeleted: false,
                    ...(specialtyID && { specialtyID: { $in: specialtyID.map(id => new mongoose.Types.ObjectId(id)) } }),
                }
            },

            {
                $skip: skip
            },
            {
                $limit: limitDocuments
            }
        ];

        if (gender) {
            pipeline.push({
                $match: {
                    $or: [
                        { "ApplicableObjectInfo.gender": gender },
                        { "ApplicableObjectInfo": { $exists: true, $size: 0 } },
                        { "ApplicableObjectInfo": { $exists: false } }
                    ]
                }
            });
        }

        if (branchID) {
            pipeline.push({
                $match: {
                    "clinicInfo.branchID": { $all: branchID.map(id => new mongoose.Types.ObjectId(id)) },
                    "clinicInfo.isDeleted": false,
                }
            });
        }

        const countPipeline = [...pipeline];
        countPipeline.push({
            $count: "totalRecords"
        });

        const totalRecords = await MedicalPackageModel.aggregate(countPipeline);

        const medicalPackages = await MedicalPackageModel.aggregate(pipeline);

        if (!medicalPackages.length) {
            createError(404, 'No medical packages found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Medical packages retrieved successfully.',
            data: medicalPackages,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getAllMedicalPackagesBySpecialtyId = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;
        const { id } = req.params;

        const totalRecords = await MedicalPackageModel.countDocuments({
            isDeleted: false,
            specialtyID: id,
        });
        const medicalPackages = await MedicalPackageModel
            .find({
                isDeleted: false,
                specialtyID: id,
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!medicalPackages.length) {
            createError(404, 'No medical packages found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Medical packages retrieved successfully.',
            data: medicalPackages,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getMedicalPackageById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const medicalPackage = await MedicalPackageModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!medicalPackage) {
            createError(404, 'Medical package not found.');
        }

        // sắp xếp lại array services theo thứ tự giảm dần của mảng servicesID
        const arrayServices = medicalPackage.services.sort((a, b) => {
            return b.servicesID.length - a.servicesID.length;
        });

        // Lấy tất cả các service có trong mảng dày nhất
        const services = await ServiceModel.find({
            _id: { $in: arrayServices[0].servicesID },
            isDeleted: false,
        }, {
            _id: 1, name: 1
        });

        const newMedicalPackage = {
            ...medicalPackage.toObject(),
            allServices: services
        };

        return res.status(200).json({
            message: 'Medical package retrieved successfully.',
            data: newMedicalPackage,
        });
    } catch (error) {
        next(error);
    }
};

const createMedicalPackage = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newMedicalPackage = await MedicalPackageModel.create(req.body);

        return res.status(201).json({
            message: 'Medical package created successfully.',
            data: newMedicalPackage
        });
    } catch (error) {
        next(error);
    }
};

const updateMedicalPackage = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedMedicalPackage = await MedicalPackageModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedMedicalPackage) {
            createError(404, 'Medical package not found.');
        }

        return res.status(201).json({
            message: 'Medical package updated successfully.',
            data: updatedMedicalPackage
        });
    } catch (error) {
        next(error);
    }
};

const deleteMedicalPackage = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedMedicalPackage = await MedicalPackageModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedMedicalPackage) {
            createError(404, 'Medical package not found.');
        }

        return res.status(200).json({
            message: 'Medical package deleted successfully.',
            data: deletedMedicalPackage
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMedicalPackages,
    getMedicalPackageById,
    createMedicalPackage,
    updateMedicalPackage,
    deleteMedicalPackage,
    getAllMedicalPackagesBySpecialtyId
};