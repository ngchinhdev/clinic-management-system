import { API_URL_GET_ALL_NEWS } from "@/configs/varibles";
import axios from "axios";

export const getAllNews = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_NEWS);
    console.log("res.data.data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_NEWS}/${id}`);
    console.log("res.data.data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
