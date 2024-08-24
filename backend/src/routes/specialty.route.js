const express = require('express');

const router = express.Router();

const specialtyController = require('../controllers/specialty.controller');
const specialtyValidator = require('../validations/specialty.validation');
const helperMiddleware = require('../middlewares/helper.middleware');

/**
 * @openapi
 * '/api/v1/specialties':
 *  get:
 *    tags:
 *    - Specialty Routes
 *    summary: Get all specialties
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *      - in: query
 *        name: sort
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/',
    helperMiddleware.checkQueryParams,
    specialtyController.getAllSpecialties
);

/**
 * @openapi
 * '/api/v1/specialties/specialties-with-services':
 *  get:
 *    tags:
 *    - Specialty Routes
 *    summary: Get all specialties with services
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/specialties-with-services',
    specialtyController.getAllSpecialtiesWithServices
);

/**
 * @openapi
 * '/api/v1/specialties/{id}':
 *  get:
 *    tags:
 *    - Specialty Routes
 *    summary: Get specialty by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Specialty id
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/:id',
    helperMiddleware.checkValidId,
    specialtyController.getSpecialtyById
);

/**
 * @openapi
 * '/api/v1/specialties/add':
 *  post:
 *    tags:
 *    - Specialty Routes
 *    summary: Add a new specialty
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - image
 *            properties:
 *              name:
 *                type: string
 *              image:
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
    '/add',
    specialtyValidator.specialtyValidator,
    specialtyController.createSpecialty
);

/**
 * @openapi
 * '/api/v1/specialties/update/{id}':
 *  put:
 *    tags:
 *    - Specialty Routes
 *    summary: Update specialty by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Specialty id
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - image
 *            properties:
 *              name:
 *                type: string
 *              image:
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
router.put(
    '/update/:id',
    helperMiddleware.checkValidId,
    specialtyValidator.specialtyValidator,
    specialtyController.createSpecialty
);

/**
 * @openapi
 * '/api/v1/specialties/delete/{id}':
 *  delete:
 *    tags:
 *    - Specialty Routes
 *    summary: Delete specialty by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the specialty to delete
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    specialtyController.deleteSpecialty
);

module.exports = router;