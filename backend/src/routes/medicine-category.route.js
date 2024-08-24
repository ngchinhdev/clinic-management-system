const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const medicineCategoryController = require('../controllers/medicine-category.controller');
const medicineCategoryValidator = require('../validations/medicine-category.validation');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/medicine-categories':
 *  get:
 *    tags:
 *    - Medicine category Routes
 *    summary: Get all medicine category (?page=1&limit=10&sort=1)
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
    medicineCategoryController.getAllMedicineCategories
);

/**
 * @openapi
 * '/api/v1/medicine-categories/{id}':
 *  get:
 *    tags:
 *    - Medicine category Routes
 *    summary: Get medicine category by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: medicine category id
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
    medicineCategoryController.getMedicineCategoryById
);

/** 
* @openapi
 * '/api/v1/medicine-categories/add':
 *  post:
 *    tags:
 *    - Medicine category Routes
 *    summary: Add new medicine category
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
router.post(
    '/add',
    medicineCategoryValidator.medicineCategoryValidator,
    medicineCategoryController.createMedicineCategory
);

/** 
* @openapi
 * '/api/v1/medicine-categories/update/{id}':
 *  put:
 *    tags:
 *    - Medicine category Routes
 *    summary: Update medicine category by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the medicine category to update
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
    medicineCategoryValidator.medicineCategoryValidator,
    medicineCategoryController.updateMedicineCategory
);

/**
 * @openapi
 * '/api/v1/medicine-categories/delete/{id}':
 *  delete:
 *    tags:
 *    - Medicine category Routes
 *    summary: Delete medicine category by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the medicine category to delete
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
    medicineCategoryController.deleteMedicineCategory
);

module.exports = router;