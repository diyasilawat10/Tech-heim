import axios from "axios";
import { BASE_URL, getAuthHeaders } from './apiConfig';

const BASE_URL_CAT = `${BASE_URL}/categories`;

export const getCategories = () => axios.get(BASE_URL_CAT);

export const createCategory = (data) =>
  axios.post(BASE_URL_CAT, data, {
    headers: getAuthHeaders(),
  });

export const deleteCategory = (id) =>
  axios.delete(`${BASE_URL_CAT}/${id}`, {
    headers: getAuthHeaders(),
  });
