import axios from "axios";
import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const saveProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_SAVE_REQUEST });
  try {
    const { userSignin: { userInfo } } = getState();
    const headers = { Authorization: `Bearer ${userInfo.token}` }; // BUG FIX: was "Bearer" + token (no space)
    const { data } = product._id
      ? await axios.put(`/api/products/${product._id}`, product, { headers })
      : await axios.post("/api/products", product, { headers });
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST });
  try {
    const { userSignin: { userInfo } } = getState();
    // BUG FIX: delete was passing headers as 2nd arg instead of config object
    await axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.response?.data?.message || error.message });
  }
};