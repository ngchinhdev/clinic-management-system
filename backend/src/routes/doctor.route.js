const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
// const uploadMiddleware = require('../middlewares/upload.middleware');
const doctorController = require('../controllers/doctor.controller');
const doctorValidator = require('../validations/doctor.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/doctors':
 *  get:
 *    tags:
 *    - Doctor Routes
 *    summary: Get all doctor (?page=1&limit=10&sort=1)
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
    doctorController.getAllDoctors
);

/**
 * @openapi
 * '/api/v1/doctors/{id}':
 *  get:
 *    tags:
 *    - Doctor Routes
 *    summary: Get doctor by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: doctor id
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
    doctorController.getDoctorById
);

/**
 * @openapi
 * '/api/v1/doctors/specialty/{id}':
 *  get:
 *    tags:
 *    - Doctor Routes
 *    summary: Get doctor by specialty id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: doctor id
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
    helperMiddleware.checkValidId,
    helperMiddleware.checkQueryParams,
    doctorController.getAllDoctorsBySpecialtyId
);

/**
 * @openapi
 * '/api/v1/doctors/add':
 *  post:
 *    tags:
 *    - Doctor Routes
 *    summary: Add a new doctor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - dateOfBirth
 *              - address
 *              - gender
 *              - password
 *              - avatar
 *              - citizenIdentificationNumber
 *              - specialtyID
 *              - isActivated
 *              - title
 *              - practicingCertificate
 *              - yearsExperience
 *              - detail
 *              - isInternal
 *            properties:
 *              fullName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              email:
 *                type: string
 *              dateOfBirth:
 *                type: string
 *              gender:
 *                type: string
 *              address:
 *                type: object
 *                required:
 *                  - province
 *                  - district
 *                  - ward
 *                  - street
 *                properties:
 *                  province:
 *                    type: string
 *                  district:
 *                    type: string
 *                  ward:
 *                    type: string
 *                  street:
 *                    type: string
 *              password:
 *                type: string
 *              avatar:
 *                type: string
 *              citizenIdentificationNumber:
 *                type: number
 *              isActivated:
 *                type: boolean
 *              specialtyID:
 *                type: string
 *              title:
 *                type: string
 *              practicingCertificate:
 *                type: string
 *              yearsExperience:
 *                type: number
 *              detail:
 *                type: string
 *              isInternal:
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
    doctorValidator.doctorValidator,
    userController.createUser,
    doctorController.createDoctor
);

/**
 * @openapi
 * '/api/v1/doctors/update/{id}':
 *  put:
 *    tags:
 *    - Doctor Routes
 *    summary: Update doctor
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the doctor to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - dateOfBirth
 *              - address
 *              - gender
 *              - password
 *              - avatar
 *              - citizenIdentificationNumber
 *              - specialtyID
 *              - isActivated
 *              - title
 *              - practicingCertificate
 *              - yearsExperience
 *              - detail
 *              - isInternal
 *            properties:
 *              fullName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              email:
 *                type: string
 *              dateOfBirth:
 *                type: string
 *              gender:
 *                type: string
 *              address:
 *                type: object
 *                required:
 *                  - province
 *                  - district
 *                  - ward
 *                  - street
 *                properties:
 *                  province:
 *                    type: string
 *                  district:
 *                    type: string
 *                  ward:
 *                    type: string
 *                  street:
 *                    type: string
 *              password:
 *                type: string
 *              avatar:
 *                type: string
 *              citizenIdentificationNumber:
 *                type: number
 *              isActivated:
 *                type: boolean
 *              specialtyID:
 *                type: string
 *              title:
 *                type: string
 *              practicingCertificate:
 *                type: string
 *              yearsExperience:
 *                type: number
 *              detail:
 *                type: string
 *              isInternal:
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
    doctorValidator.doctorValidator,
    userController.updateUser,
    doctorController.updateDoctor
);

/**
 * @openapi
 * '/api/v1/doctors/delete/{id}':
 *  delete:
 *    tags:
 *    - Doctor Routes
 *    summary: Delete doctor by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the doctor to delete
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
    userController.deleteUser,
    doctorController.deleteDoctor
);

module.exports = router;