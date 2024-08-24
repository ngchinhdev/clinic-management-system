const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const resultController = require('../controllers/result.controller');

/**
 * @openapi
 * '/api/v1/results':
 *  get:
 *    tags:
 *    - Result Route
 *    summary: Get all results
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
    resultController.getAllResults
);

/**
 * @openapi
 * '/api/v1/results/{id}':
 *  get:
 *    tags:
 *    - Result Route
 *    summary: Get result by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Result id
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
    resultController.getResultByID
);

module.exports = router;