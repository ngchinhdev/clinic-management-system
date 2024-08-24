const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const clinicController = require('../controllers/clinic.controller');
const clinicValidator = require('../validations/clinic.validation');

/**
 * @openapi
 * '/api/v1/clinics':
 *  get:
 *    tags:
 *    - Clinic Routes
 *    summary: Get all clinics
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
    clinicController.getAllClinics
);

/**
 * @openapi
 * '/api/v1/clinics/{id}':
 *  get:
 *    tags:
 *    - Clinic Routes
 *    summary: Get clinic by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Clinic id
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
    clinicController.getClinicByID
);

/** 
* @openapi
 * '/api/v1/clinics/add':
 *  post:
 *    tags:
 *    - Clinic Routes
 *    summary: Add new clinic
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - branchID
 *              - specialtyID
 *              - name
 *            properties:
 *              branchID:
 *                type: string
 *              specialtyID:
 *                type: string
 *              name:
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
    clinicValidator.clinicValidator,
    clinicController.createClinic
);

/** 
 * @openapi
 * '/api/v1/clinics/update/{id}':
 *  put:
 *    tags:
 *    - Clinic Routes
 *    summary: Update branch by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the branch to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - branchID
 *              - specialtyID
 *              - name
 *            properties:
 *              branchID:
 *                type: string
 *              specialtyID:
 *                type: string
 *              name:
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
    clinicValidator.clinicValidator,
    clinicController.updateClinic
);

/**
 * @openapi
 * '/api/v1/clinics/delete/{id}':
 *  delete:
 *    tags:
 *    - Clinic Routes
 *    summary: Delete clinic by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Clinic id
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
    clinicController.deleteClinic
);

module.exports = router;