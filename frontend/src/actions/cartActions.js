import axios from "axios";
import Cookies from "js-cookie";
import {
  CART_ADD_ITEM, CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_CLEAR,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: Number(qty),
    },
  });
  Cookies.set("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  Cookies.set("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

export const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CART_CLEAR });
  Cookies.remove("cartItems");
};