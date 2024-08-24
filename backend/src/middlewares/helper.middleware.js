const mongoose = require("mongoose");

const { createError } = require("../utils/helper.util");

const checkValidId = (req, res, next) => {
    const { id } = req.params;

    try {
        if (!id) {
            createError(400, 'ID is required.');
        }

        if (!mongoose.isValidObjectId(id)) {
            createError(400, 'Invalid ID.');
        }

        next();
    } catch (error) {
        next(error);
    }
};
const checkValueQuery = (req, res, next) => {
    try {
        let { branchID = null, specialtyID = null, gender = null } = req.query;

        if (Array.isArray(gender)) {
            if (gender.includes('Nam') && gender.includes('Nữ')) {
                gender = null;
            } else {
                gender = gender[0];
            }
        }

        if (branchID && !Array.isArray(branchID)) {
            branchID = [branchID];
        }

        if (specialtyID && !Array.isArray(specialtyID)) {
            specialtyID = [specialtyID];
        }

        if (branchID) {
            branchID.forEach(id => {
                if (!mongoose.isValidObjectId(id)) {
                    createError(400, `Invalid branchID: ${id}`);
                }
            });
        }

        if (specialtyID) {
            specialtyID.forEach(id => {
                if (!mongoose.isValidObjectId(id)) {
                    createError(400, `Invalid specialtyID: ${id}`);
                }
            });
        }
        req.checkValueQuery = {
            branchID,
            specialtyID,
            gender
        };

        next();
    } catch (error) {
        next(error);
    }
};

const checkQueryParams = (req, res, next) => {
    try {
        let { page, limit, sort } = req.query;

        const sortOptions = {};
        let limitDocuments;
        let skip;

        page = Array.isArray(page) ? page[0] : page;
        limit = Array.isArray(limit) ? limit[0] : limit;
        sort = Array.isArray(sort) ? sort[0] : sort;

        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || page <= 0) {
            page = 1;
        }

        if (isNaN(limit) || limit <= 0) {
            console.log(true);
            limit = 10;
        }

        limitDocuments = limit;
        skip = (page - 1) * limitDocuments;

        if (sort) {
            if (sort.startsWith('-')) {
                sortOptions[sort.substring(1)] = -1;
            } else {
                sortOptions[sort] = 1;
            }
        }

        req.customQueries = {
            limitDocuments,
            page,
            skip,
            sortOptions
        };

        next();
    } catch (error) {
        next(error);
    }
};

const isCreatePatient = (req, res, next) => {
    try {
        req.isCreateDoctor = false;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkValidId,
    checkValueQuery,
    checkQueryParams,
    isCreatePatient
};