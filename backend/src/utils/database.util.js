const { isValidObjectId } = require("mongoose");
const { createError, hashValue } = require("./helper.util");
const UserModel = require("../models/user.model");
const PatientModel = require("../models/patient.model");

const checkIsExistID = async (model, id) => {
    if (!id) {
        createError(400, `${model.modelName} ID is required`);
    }

    if (!isValidObjectId(id)) {
        createError(400, `${model.modelName} ID is not valid`);
    }

    const existedData = await model.findOne({ _id: id });

    if (!existedData) {
        createError(404, `${model.modelName} ID not found`);
    }

    return id;
};

const getExistingUserByEmail = async email => {
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return false;
        }
        return user;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const createUserGoogleFacebook = async (body) => {
    try {
        let randomPassword = (Math.random() + 1).toString(36).substring(7);
        const hashedPassword = await hashValue(randomPassword);

        const newUser = await UserModel.create({
            ...body,
            password: hashedPassword,
            isActivated: true
        });

        const lastPatient = await PatientModel.find({}).sort({ createdAt: -1 }).limit(1);
        let lastPatientCode = '';

        if (lastPatient.length) {
            lastPatientCode = +lastPatient[0].patientCode.slice(2).toString();
        } else {
            lastPatientCode = "BN1";
        }

        const newPatient = await PatientModel.create({
            userID: newUser._id,
            patientCode: lastPatient.length ? 'BN' + (lastPatientCode + 1) : lastPatientCode
        });

        return newPatient;
    } catch (error) {
        createError(500, error?.message || '');
    }
};

module.exports = {
    checkIsExistID,
    getExistingUserByEmail,
    createUserGoogleFacebook
};