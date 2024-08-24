const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const NewsModel = require('../models/news.model');
const SpecialtyModel = require('../models/specialty.model');

const newsValidator = checkSchema({
    specialtyID: {
        customSanitizer: {
            options: (id) => checkIsExistID(SpecialtyModel, id),
        }
    },
    title: {
        exists: {
            errorMessage: 'Title is required'
        },
        isString: {
            errorMessage: 'Title should be a string'
        },
        trim: true
    },
    shortDescription: {
        exists: {
            errorMessage: 'Short description is required'
        },
        isString: {
            errorMessage: 'Short description should be a string'
        },
        trim: true
    },
    image: {
        exists: {
            errorMessage: 'Image is required'
        },
        isString: {
            errorMessage: 'Image should be a string'
        },
        trim: true
    },
    content: {
        exists: {
            errorMessage: 'Content is required'
        },
        isString: {
            errorMessage: 'Content should be a string'
        },
        trim: true
    },
    author: {
        exists: {
            errorMessage: 'Author is required'
        },
        isString: {
            errorMessage: 'Author should be a string'
        },
        trim: true
    },
    viewCount: {
        exists: {
            errorMessage: 'View count is required'
        },
        isNumeric: {
            errorMessage: 'View count should be a number'
        }
    }

});



module.exports = {
    newsValidator,
};