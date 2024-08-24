const UserModel = require('../models/user.model');
const PatientModel = require('../models/patient.model');
const OtpModel = require('../models/otp.model');
const { createError,
    saveRefreshToken,
    generateAccessRefreshToken,
    errorValidator,
    sendOTP,
    generateOTPToken,
    hashValue,
    compareHashedValue,
    checkPhoneNumberAndEmail
} = require('../utils/helper.util');

const createOTP = async (req, res, next) => {
    try {
        errorValidator(req, res);

        await checkPhoneNumberAndEmail(req.body.phoneNumber, req.body.email, UserModel, false);

        const OTP = await sendOTP({ ...req.body });
        const hashedOTP = await hashValue(OTP);

        await OtpModel.create({
            otp: hashedOTP,
            phoneNumber: req.body.phoneNumber
        });

        const otpToken = generateOTPToken({ ...req.body });

        return res.status(201).json({
            message: 'New OTP is created successfully.',
            otpToken
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const user = await UserModel.findOne({
            phoneNumber: req.body.phoneNumber
        });

        if (!user) {
            createError(400, 'Số điện thoại hoặc mật khẩu không đúng.');
        }

        const validPassword = await compareHashedValue(req.body.password, user.password);

        if (!validPassword) {
            createError(400, 'Số điện thoại hoặc mật khẩu không đúng.');
        }

        const patient = await PatientModel.findOne({
            userID: user._id
        });
        const { accessToken, refreshToken } = generateAccessRefreshToken(patient);

        saveRefreshToken(refreshToken, res);

        return res.status(200).json({
            message: 'User logged in successfully.',
            data: {
                accessToken
            }
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        if (!res.cookie('refreshToken')) {
            return res.status(204).send();
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: true,
        });

        return res.status(200).json({
            message: 'User logged out.'
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateAccessRefreshToken({ ...req.user, _id: req.user.id });

        saveRefreshToken(newRefreshToken, res);

        return res.status(200).json({
            newAccessToken
        });
    } catch (err) {
        next(err);
    }
};

const sendOTPForgotPassword = async (req, res, next) => {
    try {
        const { phone } = req.params;

        const userFound = await UserModel.findOne({ phoneNumber: phone, isActivated: true });

        if (!userFound) {
            createError(404, "Phone number not found.");
        }

        const OTP = await sendOTP({ phoneNumber: phone });

        const hashedOTP = await hashValue(OTP);

        await OtpModel.create({
            otp: hashedOTP,
            phoneNumber: phone
        });

        const otpToken = generateOTPToken({
            fullName: userFound.fullName,
            phoneNumber: userFound.phoneNumber,
            password: userFound.password
        });

        return res.status(201).json({
            message: 'New OTP is created successfully.',
            otpToken
        });
    } catch (error) {
        next(error);
    }
};

const checkOTPForgotPassword = async (req, res, next) => {
    try {

        const { OTP } = req.body;
        const { phoneNumber, password, fullName } = req.newUser;

        const otpToken = generateOTPToken({
            fullName: fullName,
            phoneNumber: phoneNumber,
            password: password
        });

        return res.status(201).json({
            message: 'OTP is correct',
            data: { OTP, otpToken }
        });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {

        const { phoneNumber } = req.newUser;

        const userFound = await UserModel.findOne({ phoneNumber, isActivated: true });

        if (!userFound) {
            createError(404, "Phone number not found.");
        }
        const hashedPassword = await hashValue(req.body.password);

        const newUser = await UserModel.findOneAndUpdate(
            { phoneNumber },
            { $set: { password: hashedPassword } },
            { new: true }
        );
        console.log(newUser);
        return res.status(201).json({
            message: 'Updated user successfully',
            user: newUser
        });
    } catch (error) {
        next(error);
    }
};

const googleCallback = async (req, res, next) => {
    try {
        const patient = await PatientModel.findOne({
            userID: req.user._id
        });
        const { accessToken, refreshToken } = generateAccessRefreshToken(patient);

        saveRefreshToken(refreshToken, res);

        return res.redirect(`${process.env.CLIENT_LOCAL_URL}?accessToken=${accessToken}`);
    } catch (error) {
        next(error);
    }
};

const facebookCallback = async (req, res, next) => {
    try {
        const patient = await PatientModel.findOne({
            userID: req.user._id
        });
        const { accessToken, refreshToken } = generateAccessRefreshToken(patient);

        saveRefreshToken(refreshToken, res);

        return res.redirect(`${process.env.CLIENT_LOCAL_URL}?accessToken=${accessToken}`);
    } catch (error) {
        next(error);
    }
};


// const updateProfile = async (req, res, next) => {
//     try {
//         // const { id } = req.params;
//         const { id } = req.user;

//         const updatedUser = await UserModel.findByIdAndUpdate(id, {
//             ...req.body,
//         }, { new: true });

//         if (!updatedUser) {
//             createError(404, "User not found");
//         }

//         return res.status(200).json({
//             message: 'User updated successfully.',
//             totalRecords: 1,
//             data: updatedUser
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// const changePassword = async (req, res, next) => {
//     try {
//         const { id } = req.user;

//         const hashedPassword = await hashPassword(req.body.newPassword);

//         await UserModel.findByIdAndUpdate(id, {
//             password: hashedPassword
//         }, { new: true });

//         return res.status(200).json({
//             message: 'User password updated successfully.',
//             totalRecords: 1,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// const changeRole = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { isAdmin } = req.body;

//         const updatedUser = await UserModel.findByIdAndUpdate(id, {
//             isAdmin: isAdmin
//         }, { new: true });

//         if (!updatedUser) {
//             createError(404, "User not found");
//         }

//         return res.status(200).json({
//             message: 'User role updated successfully.',
//             totalRecords: 1,
//             data: updatedUser
//         });
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    login,
    logout,
    refreshToken,
    googleCallback,
    facebookCallback,
    createOTP,
    forgotPassword,
    sendOTPForgotPassword,
    checkOTPForgotPassword
    // updateProfile,
    // changeRole,
    // changePassword
};