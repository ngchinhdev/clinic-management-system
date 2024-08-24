const express = require('express');

const router = express.Router();

const contactController = require('../controllers/contact.controller');
const contactCValidator = require('../validations/contact.validation');

/**
 * @openapi
 * '/api/v1/contact/contact-us':
 *  post:
 *    tags:
 *    - Contact Routes
 *    summary: Contact US
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - email
 *              - phoneNumber
 *              - note
 *            properties:
 *              fullName:
 *                type: string
 *              email:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              note:
 *                type: string
 *    responses:
 *      '201':
 *        $ref: '#/components/responses/201'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '409':
 *        $ref: '#/components/responses/409'
 *      '500':
 *        $ref: '#/components/responses/500'
 */
router.post(
    '/contact-us',
    contactCValidator.contactValidator,
    contactController.contactUs
);

module.exports = router;
