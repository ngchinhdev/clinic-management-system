const NewsModel = require('../models/news.model');
const { createError, errorValidator } = require('../utils/helper.util');

const getAllNews = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await NewsModel.countDocuments({ isDeleted: false });

        const news = await NewsModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!news.length) {
            createError(404, 'No news found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Categories retrieved successfully.',
            data: news,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getNewsById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const news = await NewsModel.findById(id);

        if (!news) {
            createError(404, 'News not found.');
        }

        return res.status(200).json({
            message: 'News retrieved successfully.',
            data: news
        });
    } catch (error) {
        next(error);
    }
};

const createNews = async (req, res, next) => {
    try {
        errorValidator(req, res);
        const newNews = await NewsModel.create(req.body);
        return res.status(201).json({
            message: 'News created successfully.',
            data: newNews
        });
    } catch (error) {
        next(error);
    }
};

const updateNews = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const { id } = req.params;

        const updatedNews = await NewsModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            req.body,
            { new: true }
        );

        if (!updatedNews) {
            createError(404, 'News not found.');
        }

        return res.status(200).json({
            message: 'News updated successfully.',
            data: updatedNews
        });
    } catch (error) {
        next(error);
    }
};

const deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedNews = await NewsModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedNews) {
            createError(404, 'News not found.');
        }

        return res.status(200).json({
            message: 'News deleted successfully.',
            data: deletedNews
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};