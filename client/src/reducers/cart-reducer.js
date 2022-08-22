/**
 * @Author: Dhruvrajsinh Vansia
 * Banner ID: B00891415
 * Cart reducer: add, update, delete, get functionality
 */

import * as actionType from "../action-type/cart-action-type";

const initialState = {
  cartItems: [],
  stateChangeNotifyCounter: 1,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const item = action.payload.item;
      const existItem = state.cartItems.find(
        (product) => product._id === item._id
      );
      if (existItem) {
        return state;
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload.item],
        };
      }

    case actionType.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.disc._id !== action.payload.id
        ),
      };

    case actionType.UPDATE_QUANTITY:
      let index = 0;
      state.cartItems.map((product, i) => {
        if (product.disc._id === action.payload.productId) {
          index = i;
        }
      });
      state.cartItems[index].qty = action.payload.qty;
      return {
        ...state,
        cartItems: state.cartItems,
        stateChangeNotifyCounter: state.stateChangeNotifyCounter + 1,
      };

    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

      case actionType.REMOVE_ALL_ITEMS:
        return {
          ...state,
          cartItems: [],
        };
    default:
      return state;
  }



};

export default cartReducer;