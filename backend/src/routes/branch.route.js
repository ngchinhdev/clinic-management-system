const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const branchController = require('../controllers/branch.controller');
const branchValidator = require('../validations/branch.validation');

/**
 * @openapi
 * '/api/v1/branches':
 *  get:
 *    tags:
 *    - Branch Routes
 *    summary: Get all branches
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
    branchController.getAllBranches
);

/**
 * @openapi
 * '/api/v1/branches/{id}':
 *  get:
 *    tags:
 *    - Branch Routes
 *    summary: Get branch by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Branch id
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
    branchController.getBranchByID
);

/** 
* @openapi
 * '/api/v1/branches/add':
 *  post:
 *    tags:
 *    - Branch Routes
 *    summary: Add new branch
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - workingTime
 *              - imagesURL
 *              - address
 *              - hotline
 *              - coordinates
 *            properties:
 *              name:
 *                type: string
 *              workingTime:
 *                type: string
 *              imagesURL:
 *                type: array
 *                items: 
 *                  type: string
 *              address:
 *                type: string
 *              hotline:
 *                type: string
 *              coordinates:
 *                type: object
 *                properties: 
 *                  lat:
 *                    type: number
 *                  lng:
 *                    type: number
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
    branchValidator.branchValidator,
    branchController.createBranch
);

/** 
 * @openapi
 * '/api/v1/branches/update/{id}':
 *  put:
 *    tags:
 *    - Branch Routes
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
 *              - name
 *              - workingTime
 *              - imagesURL
 *              - address
 *              - hotline
 *              - coordinates
 *            properties:
 *              name:
 *                type: string
 *              workingTime:
 *                type: string
 *              imagesURL:
 *                type: array
 *                items: 
 *                  type: string
 *              address:
 *                type: string
 *              hotline:
 *                type: string
 *              coordinates:
 *                type: object
 *                properties: 
 *                  lat:
 *                    type: number
 *                  lng:
 *                    type: number
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
    branchValidator.branchValidator,
    branchController.updateBranch
);
/**
 * @openapi
 * '/api/v1/branches/delete/{id}':
 *  delete:
 *    tags:
 *    - Branch Routes
 *    summary: Delete news by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: News id
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
    branchController.deleteBranch
);

module.exports = router;