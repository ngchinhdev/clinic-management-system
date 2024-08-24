const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const medicineImportController = require('../controllers/medicine-import.controller');
const medicineImportValidator = require('../validations/medicine-import.validation');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/medicine-imports':
 *  get:
 *    tags:
 *    - Medicine import Routes
 *    summary: Get all medicine import (?page=1&limit=10&sort=1)
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
    medicineImportController.getAllMedicineImports
);

/**
 * @openapi
 * '/api/v1/medicine-imports/{id}':
 *  get:
 *    tags:
 *    - Medicine import Routes
 *    summary: Get medicine import by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: medicine import id
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
    medicineImportController.getMedicineImportById
);
/** 
* @openapi
 * '/api/v1/medicine-imports/add':
 *  post:
 *    tags:
 *    - Medicine import Routes
 *    summary: Add new medicine import
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - medicineID
 *              - quantity
 *              - purchaseDate
 *              - manufacturingDate
 *              - expiryDate
 *              - purchasePrice
 *              - sellingPrice
 *              - origin
 *            properties:
 *              medicineID:
 *                type: string
 *              quantity:
 *                type: string
 *              purchaseDate:
 *                type: string
 *              manufacturingDate:
 *                type: string
 *              expiryDate:
 *                type: string
 *              purchasePrice:
 *                type: string
 *              sellingPrice:
 *                type: string
 *              origin:
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
    medicineImportValidator.medicineImportValidator,
    medicineImportController.createMedicineImport
);

/** 
* @openapi
 * '/api/v1/medicine-imports/update/{id}':
 *  put:
 *    tags:
 *    - Medicine import Routes
 *    summary: Update medicine import by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the medicine import to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
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
    medicineImportValidator.medicineImportValidator,
    medicineImportController.updateMedicineImport
);

/**
 * @openapi
 * '/api/v1/medicine-imports/delete/{id}':
 *  delete:
 *    tags:
 *    - Medicine import Routes
 *    summary: Delete medicine import by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the medicine import to delete
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
    medicineImportController.deleteMedicineImport
);

module.exports = router;