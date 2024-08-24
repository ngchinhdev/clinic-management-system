const express = require('express');

const router = express.Router();

const applicableObjectController = require('../controllers/applicable-object.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const applicableObjectValidator = require('../validations/applicable-object.validation');

/**
 * @openapi
 * '/api/v1/applicable-objects':
 *  get:
 *    tags:
 *    - Applicable object Routes
 *    summary: Get all applicable objects
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
    applicableObjectController.getAllApplicableObjects
);

/**
 * @openapi
 * '/api/v1/applicable-objects/{id}':
 *  get:
 *    tags:
 *    - Applicable object Routes
 *    summary: Get applicable object by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Medical package id
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
    applicableObjectController.getApplicableObjectById
);

/**
 * @openapi
 * '/api/v1/applicable-objects/add':
 *  post:
 *    tags:
 *    - Applicable object Routes
 *    summary: Add a new applicable object
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - medicalPackageID
 *              - serviceID
 *              - gender
 *              - age
 *              - isMarried
 *            properties:
 *              medicalPackageID:
 *                type: string
 *              serviceID: 
 *                type: string
 *              gender:
 *                type: string
 *              isMarried:
 *                type: boolean
 *              isFamily:
 *                type: boolean
 *              age: 
 *                type: object
 *                properties: 
 *                  min: 
 *                   type: number
 *                  max: 
 *                   type: number
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
    applicableObjectValidator.applicableObjectValidator,
    applicableObjectController.createApplicableObject
);

/**
 * @openapi
 * '/api/v1/applicable-objects/update/{id}':
 *  put:
 *    tags:
 *    - Applicable object Routes
 *    summary: Update applicable object by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Applicable object id
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - medicalPackageID
 *              - gender
 *              - age
 *              - isMarried
 *            properties:
 *              medicalPackageID:
 *                type: string
 *              gender:
 *                type: string
 *              isMarried:
 *                type: boolean
 *              isFamily:
 *                type: boolean
 *              age: 
 *                type: object
 *                properties: 
 *                  min: 
 *                   type: number
 *                  max: 
 *                   type: number
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
    applicableObjectValidator.applicableObjectValidator,
    applicableObjectController.updateApplicableObject
);

/**
 * @openapi
 * '/api/v1/applicable-objects/delete/{id}':
 *  delete:
 *    tags:
 *    - Applicable object Routes
 *    summary: Delete applicable object by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the applicable object to delete
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
    applicableObjectController.deleteApplicableObject
);

module.exports = router;