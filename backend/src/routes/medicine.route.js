const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const medicineController = require('../controllers/medicine.controller');
const medicineValidator = require('../validations/medicine.validation');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/medicines':
 *  get:
 *    tags:
 *    - Medicine Routes
 *    summary: Get all medicine (?page=1&limit=10&sort=1)
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
    medicineController.getAllMedicines
);

/**
 * @openapi
 * '/api/v1/medicines/{id}':
 *  get:
 *    tags:
 *    - Medicine Routes
 *    summary: Get medicine  by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: medicine  id
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
    medicineController.getMedicineById
);

/** 
* @openapi
 * '/api/v1/medicines/add':
 *  post:
 *    tags:
 *    - Medicine Routes
 *    summary: Add new medicine 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - medicineCategoryID
 *              - medicineCode
 *              - name
 *              - ingredients
 *              - unit
 *              - sideEffects
 *              - type
 *              - instruction
 *              - note
 *            properties:
 *              medicineCategoryID:
 *                type: string
 *              medicineCode:
 *                type: string
 *              name:
 *                type: string
 *              ingredients:
 *                type: string
 *              unit:
 *                type: string
 *              sideEffects:
 *                type: string
 *              type:
 *                type: string
 *              instruction:
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
    '/add',
    // medicineValidator.medicineValidator,
    medicineController.createMedicine
);

/** 
* @openapi
 * '/api/v1/medicines/update/{id}':
 *  put:
 *    tags:
 *    - Medicine Routes
 *    summary: Update medicine by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the medicine to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - medicineCategoryID
 *              - medicineCode
 *              - name
 *              - ingredients
 *              - unit
 *              - sideEffects
 *              - type
 *              - instruction
 *              - note
 *            properties:
 *              medicineCategoryID:
 *                type: string
 *              medicineCode:
 *                type: string
 *              name:
 *                type: string
 *              ingredients:
 *                type: string
 *              unit:
 *                type: string
 *              sideEffects:
 *                type: string
 *              type:
 *                type: string
 *              instruction:
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
router.put(
    '/update/:id',
    helperMiddleware.checkValidId,
    medicineValidator.medicineValidator,
    medicineController.updateMedicine
);

/**
 * @openapi
 * '/api/v1/medicines/delete/{id}':
 *  delete:
 *    tags:
 *    - Medicine Routes
 *    summary: Delete medicine by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the medicine to delete
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
    medicineController.deleteMedicine
);

module.exports = router;