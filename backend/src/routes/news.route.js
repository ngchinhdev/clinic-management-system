const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const newsController = require('../controllers/news.controller');
const newsValidator = require('../validations/news.validation');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/news':
 *  get:
 *    tags:
 *    - News Routes
 *    summary: Get all news (?page=1&limit=10&sort=1)
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
    newsController.getAllNews
);

/**
 * @openapi
 * '/api/v1/news/{id}':
 *  get:
 *    tags:
 *    - News Routes
 *    summary: Get news by id
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
router.get(
    '/:id',
    helperMiddleware.checkValidId,
    newsController.getNewsById
);

/** 
* @openapi
 * '/api/v1/news/add':
 *  post:
 *    tags:
 *    - News Routes
 *    summary: Add new News
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - specialtyID
 *              - title
 *              - shortDescription
 *              - image
 *              - content
 *              - author
 *              - viewCount
 *              - isHidden
 *            properties:
 *              specialtyID:
 *                type: string
 *                description: The ID of the specialty placing the news
 *              title:
 *                type: string
 *              shortDescription:
 *                type: string
 *              images:
 *                type: string
 *              content:
 *                type: string
 *              author:
 *                type: string
 *              viewCount:
 *                type: number
 *              isHidden:
 *                type: boolean
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
    newsValidator.newsValidator,
    newsController.createNews
);

/** 
 * @openapi
 * '/api/v1/news/update/{id}':
 *  put:
 *    tags:
 *    - News Routes
 *    summary: Update news by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the news to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - specialtyID
 *              - title
 *              - shortDescription
 *              - image
 *              - content
 *              - author
 *              - viewCount
 *              - isHidden
 *            properties:
 *              specialtyID:
 *                type: string
 *              title:
 *                type: string
 *              shortDescription:
 *                type: string
 *              images:
 *                type: string
 *              content:
 *                type: string
 *              author:
 *                type: string
 *              viewCount:
 *                type: number
 *              isHidden:
 *                type: boolean
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
    newsValidator.newsValidator,
    newsController.updateNews
);

/**
 * @openapi
 * '/api/v1/news/delete/{id}':
 *  delete:
 *    tags:
 *    - News Routes
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
    newsController.deleteNews
);

module.exports = router;