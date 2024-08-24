const express = require('express');

const router = express.Router();

const medicalPackageController = require('../controllers/medical-package.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const medicalPackageValidator = require('../validations/medical-package.validation');

/**
 * @openapi
 * '/api/v1/medical-packages':
 *  get:
 *    tags:
 *    - Medical Package Routes
 *    summary: Get all medical package
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
 *      - in: query
 *        name: gender
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *      - in: query
 *        name: branchID
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        style: form
 *        explode: true
 *      - in: query
 *        name: specialtyID
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        style: form
 *        explode: true
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
    helperMiddleware.checkValueQuery,
    medicalPackageController.getAllMedicalPackages
);

/**
 * @openapi
 * '/api/v1/medical-packages/{id}':
 *  get:
 *    tags:
 *    - Medical Package Routes
 *    summary: Get medical package by id
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
    medicalPackageController.getMedicalPackageById
);

/**
 * @openapi
 * '/api/v1/medical-packages/specialty/{id}':
 *  get:
 *    tags:
 *    - Medical Package Routes
 *    summary: Get medical package by specialty id
*    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Specialty package id
 *        schema:
 *          type: string
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
    '/specialty/:id',
    helperMiddleware.checkQueryParams,
    helperMiddleware.checkValidId,
    medicalPackageController.getAllMedicalPackagesBySpecialtyId
);

/**
 * @openapi
 * '/api/v1/medical-packages/add':
 *  post:
 *    tags:
 *    - Medical Package Routes
 *    summary: Add a new medical package
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - specialtyID
 *              - name
 *              - image
 *              - shortDescription
 *              - details
 *              - services
 *            properties:
 *              specialtyID:
 *                type: string
 *              name:
 *                type: string
 *              image:
 *                type: string
 *              shortDescription:
 *                type: string
 *              details:
 *                type: string
 *              services:
 *                type: array
 *                items: 
 *                  type: object
 *                  properties: 
 *                    servicesID: 
 *                      type: array
 *                      items: 
 *                        type: string
 *                    levelName: 
 *                      type: string
 *                    price: 
 *                      type: number
 *                    discountPrice: 
 *                      type: number
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
    medicalPackageValidator.medicalPackageValidator,
    medicalPackageController.createMedicalPackage
);

/**
 * @openapi
 * '/api/v1/medical-packages/update/{id}':
 *  put:
 *    tags:
 *    - Medical Package Routes
 *    summary: Update medical package by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Medical package id
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - specialtyID
 *              - name
 *              - image
 *              - shortDescription
 *              - details
 *              - services
 *            properties:
 *              specialtyID:
 *                type: string
 *              name:
 *                type: string
 *              image:
 *                type: string
 *              shortDescription:
 *                type: string
 *              details:
 *                type: string
 *              services:
 *                type: array
 *                items: 
 *                  type: object
 *                  properties: 
 *                    servicesID: 
 *                      type: array
 *                      items: 
 *                        type: string
 *                    levelName: 
 *                      type: string
 *                    price: 
 *                      type: number
 *                    discountPrice: 
 *                      type: number
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
    medicalPackageValidator.medicalPackageValidator,
    medicalPackageController.updateMedicalPackage
);

/**
 * @openapi
 * '/api/v1/medical-packages/delete/{id}':
 *  delete:
 *    tags:
 *    - Medical Package Routes
 *    summary: Delete medical package by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the medical package to delete
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
    medicalPackageController.deleteMedicalPackage
);

module.exports = router;