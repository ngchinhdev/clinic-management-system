import { API_URL_POST_CONTACT } from "@/configs/varibles";
import axios from "axios";

export const postContact = async (data) => {
  try {
    const res = await axios.post(API_URL_POST_CONTACT, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
