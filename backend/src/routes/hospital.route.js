const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const hospitalController = require('../controllers/hospital.controller');
const hospitalValidator = require('../validations/hospital.validation');

/**
 * @openapi
 * '/api/v1/hospitals':
 *  get:
 *    tags:
 *    - Hospital Routes
 *    summary: Get all hospital
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
    hospitalController.getAllHospitals
);

/**
 * @openapi
 * '/api/v1/hospitals/{id}':
 *  get:
 *    tags:
 *    - Hospital Routes
 *    summary: Get hospital by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Hospital id
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
    hospitalController.getHospitalByID
);

/** 
* @openapi
 * '/api/v1/hospitals/add':
 *  post:
 *    tags:
 *    - Hospital Routes
 *    summary: Add new hospital
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - image
 *              - address
 *              - hotline
 *            properties:
 *              name:
 *                type: string
 *              image:
 *                type: string
 *              address:
 *                type: string
 *              hotline:
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
    hospitalValidator.hospitalValidator,
    hospitalController.createHospital
);

/** 
 * @openapi
 * '/api/v1/hospitals/update/{id}':
 *  put:
 *    tags:
 *    - Hospital Routes
 *    summary: Update hospital by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the hospital to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - image
 *              - address
 *              - hotline
 *            properties:
 *              name:
 *                type: string
 *              image:
 *                type: string
 *              address:
 *                type: string
 *              hotline:
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
    hospitalValidator.hospitalValidator,
    hospitalController.updateHospital
);

/**
 * @openapi
 * '/api/v1/hospitals/delete/{id}':
 *  delete:
 *    tags:
 *    - Hospital Routes
 *    summary: Delete hospital by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Hospital id
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
    hospitalController.deleteHospital
);

module.exports = router;