import {
  API_URL_GET_ALL_MEDICAL_PACKAGES,
  API_URL_GET_MEDICAL_PACKAGE_BY_ID,
  API_URL_GET_MEDICAL_PACKAGE_BY_SPECIALTIES,
} from "@/configs/varibles";
import axios from "axios";
export const getAllMedicalPackages = async (filter) => {
  try {
    const { page, limit, sort, gender, branch, specialtyID } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
      ...(sort !== undefined && sort !== null && sort !== "" && { sort }),
      ...(gender !== undefined &&
        gender !== null &&
        gender !== "" && { gender }),
      ...(branch !== undefined &&
        branch !== null &&
        branch.length > 0 && { branch }),
      ...(specialtyID !== undefined &&
        specialtyID !== null &&
        specialtyID.length > 0 && { specialtyID }),
    };

    const res = await axios.get(API_URL_GET_ALL_MEDICAL_PACKAGES, {
      params: Object.keys(params).length > 0 ? params : undefined,
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getMedicalPackageById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_MEDICAL_PACKAGE_BY_ID}/${id}`);

    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getMedicalPackageBySpecialty = async (id, page, limit, sort) => {
  try {
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
      ...(sort !== undefined && sort !== null && sort !== "" && { sort }),
    };
    const res = await axios.get(
      `${API_URL_GET_MEDICAL_PACKAGE_BY_SPECIALTIES}/${id}`,
      {
        params: Object.keys(params).length > 0 ? params : undefined,
      },
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
