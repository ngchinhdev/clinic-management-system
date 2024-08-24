const express = require('express');
const router = express.Router();
const passport = require('passport');

const userValidator = require('../validations/user.validation');
const authValidator = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @openapi
 * '/api/v1/auth/google':
 *  get:
 *    tags:
 *    - Auth Routes
 *    summary: Google Login
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
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @openapi
 * '/api/v1/auth/facebook':
 *  get:
 *    tags:
 *    - Auth Routes
 *    summary: Facebook Login
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
router.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    authController.googleCallback
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    authController.facebookCallback
);

/**
 * @openapi
 * '/api/v1/auth/register':
 *  post:
 *    tags:
 *    - Auth Routes
 *    summary: Register patient
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - phoneNumber
 *              - password
 *            properties:
 *              fullName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              password:
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
    '/register',
    authMiddleware.resendOTP,
    authValidator.registerValidator,
    authController.createOTP
);

/**
 * @openapi
 * '/api/v1/auth/login':
 *  post:
 *     tags:
 *     - Auth Routes
 *     summary: Login user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - phoneNumber
 *              - password
 *            properties:
 *              phoneNumber:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 */
router.post(
    '/login',
    authValidator.loginValidator,
    authController.login
);

/**
 * @openapi
<<<<<<< HEAD
 * '/api/v1/auth/logout':
 *  post:
 *     tags:
 *     - Auth Routes
 *     summary: Logout user
 *     responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 */
router.post(
    '/logout',
    authMiddleware.verifyAccessToken,
    authMiddleware.verifyRefreshToken,
    authController.logout
);

/**
 * @openapi
=======
>>>>>>> 6ca4a9e698fd347db0a708bd1ff47b81cda34bc5
 * '/api/v1/auth/forgot-password/send-otp/{phone}':
 *   post:
 *     tags:
 *     - Auth Routes
 *     summary: send OTP to the phone
 *     parameters:
 *      - in: path
 *        name: phone
 *        required: true
 *        description: Contract phone number
 *        schema:
 *          type: string
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '404':
 *         $ref: '#/components/responses/404'
 *       '500':
 *         $ref: '#/components/responses/500'
 */

router.post(
    '/forgot-password/send-otp/:phone',
    authMiddleware.resendOTP,
    authController.sendOTPForgotPassword
);

/**
 * @openapi
 * '/api/v1/auth/forgot-password/check-otp':
 *  post:
 *     tags:
 *     - Auth Routes
 *     summary: Check OTP 
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - OTP
 *              - otpToken
 *            properties:
 *              OTP:
 *                type: string
 *              otpToken:
 *                type: string
 *     responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 */

router.post(
    '/forgot-password/check-otp',
    authMiddleware.verifyOTP,
    authController.checkOTPForgotPassword
);

/**
 * @openapi
 * '/api/v1/auth/forgot-password/reset-password':
 *  put:
 *     tags:
 *     - Auth Routes
 *     summary: Check OTP 
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - OTP
 *              - otpToken
 *              - password
 *            properties:
 *              OTP:
 *                type: string
 *              otpToken:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 */

router.put(
    '/forgot-password/reset-password',
    authMiddleware.verifyOTP,
    authController.forgotPassword
);

// router.put(
//     '/forgot-password/:email',
//     authController.forgotPassword
// );

router.post(
    '/refresh-token',
    authMiddleware.verifyRefreshToken,
    authController.refreshToken
);

<<<<<<< HEAD
=======
router.post(
    '/logout',
    authMiddleware.verifyAccessToken,
    authMiddleware.verifyRefreshToken,
    authController.logout
);

>>>>>>> 6ca4a9e698fd347db0a708bd1ff47b81cda34bc5

module.exports = router;