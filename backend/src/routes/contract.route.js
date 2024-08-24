const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const contractController = require('../controllers/contract.controller');
const contractValidator = require('../validations/contract.validation');

/**
 * @openapi
 * '/api/v1/contracts':
 *  get:
 *    tags:
 *    - Contract Routes
 *    summary: Get all contracts
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
    contractController.getAllContracts
);

/**
 * @openapi
 * '/api/v1/contracts/{id}':
 *  get:
 *    tags:
 *    - Contract Routes
 *    summary: Get contract by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Contract id
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
    contractController.getContractByID
);

/** 
* @openapi
 * '/api/v1/contracts/add':
 *  post:
 *    tags:
 *    - Contract Routes
 *    summary: Add new contract
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - startDate
 *              - endDate
 *              - detail
 *            properties:
 *              doctorID:
 *                type: string
 *              hospitalID:
 *                type: string
 *              startDate:
 *                type: string
 *                format: date
 *              endDate:
 *                type: string
 *                format: date
 *              detail:
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
    contractValidator.contractValidator,
    contractController.createContract
);

/** 
 * @openapi
 * '/api/v1/contracts/update/{id}':
 *  put:
 *    tags:
 *    - Contract Routes
 *    summary: Update contract by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the contract to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - startDate
 *              - endDate
 *              - detail
 *            properties:
 *              doctorID:
 *                type: string
 *              hospitalID:
 *                type: string
 *              startDate:
 *                type: string
 *                format: date
 *              endDate:
 *                type: string
 *                format: date
 *              detail:
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
    contractValidator.contractValidator,
    contractController.updateContract
);

/**
 * @openapi
 * '/api/v1/contracts/delete/{id}':
 *  delete:
 *    tags:
 *    - Contract Routes
 *    summary: Delete contract by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Contract id
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
    contractController.deleteContract
);

module.exports = router;