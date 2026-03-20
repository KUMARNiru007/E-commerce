import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
  CART_CLEAR,
} from "../constants/cartConstants";

export function cartReducer(
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const exists = state.cartItems.find((x) => x.product === item.product);
      return {
        ...state, // BUG FIX: was dropping shipping/payment on add/remove
        cartItems: exists
          ? state.cartItems.map((x) => (x.product === item.product ? item : x))
          : [...state.cartItems, item],
      };
    }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    case CART_CLEAR:
      return { cartItems: [], shipping: {}, payment: {} };
    default:
      return state;
  }
}