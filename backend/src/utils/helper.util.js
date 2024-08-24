const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const axios = require('axios');
const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");

const createError = (statusCode, message) => {
    throw new createHttpError(statusCode, message);
};

const sendEmail = async (email, subject, html, attachments = []) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_SEND,
                pass: process.env.PASSWORD_EMAIL_SEND
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_SEND,
            to: email,
            subject: subject,
            html: html,
            attachments: attachments
        });
    } catch (error) {
        console.log(error);
        createError(500, 'Không thể gửi mail.');
    }
};

function getAccessToken() {

    const apiKeySid = process.env.API_KEY_SID;
    const apiKeySecret = process.env.API_KEY_SECRET;

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600;

    const header = { cty: "stringee-api;v=1" };
    const payload = {
        jti: apiKeySid + "-" + now,
        iss: apiKeySid,
        exp: exp,
        rest_api: 1
    };

    const token = jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header });
    return token;
}

const generateAccessRefreshToken = user => {
    const accessToken = jwt.sign(
        {
            id: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
    );

    const refreshToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

const generateOTPToken = ({ fullName, phoneNumber, password }) => {
    const otpToken = jwt.sign(
        {
            fullName,
            phoneNumber,
            password,
            expiresIn: Date.now() + 300000
        },
        process.env.OTP_TOKEN_SECRET,
        { expiresIn: '5m' }
    );

    return otpToken;
};

const saveRefreshToken = (refreshToken, res) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: true,
        maxAge: 48 * 60 * 60 * 1000
    });
};

const compareHashedValue = async (value, hashedValue) => {
    const valid = await bcrypt.compare(value, hashedValue);
    return valid;
};

const hashValue = async (value) => {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt);
    return hashedValue;
};

const errorValidator = (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        error.statusCode = 400;
        throw error.array();
    }

    return true;
};

const checkValidObjectId = (id, type) => {
    if (!isValidObjectId(id)) {
        createError(400, `${type} ID is invalid.`);
    }

    return id;
};

const isValidPhoneNumber = (phoneNumber) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phoneNumber);
};

const isValidEmail = (email) => {
    return (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/).test(email);
};

const checkPhoneNumberAndEmail = async (phoneNumber, email, Model, isEmailRequired) => {
    if (!phoneNumber || !phoneNumber.trim()) {
        createError(400, 'Phone number is required');
    }

    if (isEmailRequired) {
        if ((!email) || !email.trim() === '') {
            createError(400, 'Email is required');
        }
    }

    if (email && email.trim() !== '') {
        if (!isValidEmail(email)) {
            createError(400, 'Email không hợp lệ');
        }

        const getExistingUserByEmail = await Model.findOne({ email });
        if (getExistingUserByEmail) {
            createError(409, 'Email đã tồn tại');
        }
    }

    if (phoneNumber && phoneNumber.trim() !== '') {
        if (!isValidPhoneNumber(phoneNumber)) {
            createError(400, 'Số điện thoại không hợp lệ');
        }

        const getExistingUserByPhoneNumber = await Model.findOne({ phoneNumber });
        if (getExistingUserByPhoneNumber) {
            createError(409, 'Số điện thoại đã tồn tại');
        }
    }
};

module.exports = {
    createError,
    sendEmail,
    generateAccessRefreshToken,
    saveRefreshToken,
    compareHashedValue,
    hashValue,
    errorValidator,
    checkValidObjectId,
    sendOTP,
    generateOTPToken,
    checkPhoneNumberAndEmail
};