/**
 * @Author: Dhruvrajsinh Vansia
 * Banner ID: B00891415
 * Action of cart
 */


import * as actionType from "../action-type/cart-action-type";
import axios from "axios";

export const addToCart = (item) => async (dispatch, getState) => {
  const { cartItems } = getState().cartReducer;
  const user = localStorage.getItem("id");
  const existItem = cartItems.find((product) => product._id === item._id);

  if (!existItem) {
    if (user) {
      try {
        await axios.post("/cart/add-item", {
          userId: user,
          productId: item._id,
          qty: 1,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  const user = localStorage.getItem("id");

  if (user) {
    try {
      await axios.delete("/cart/remove-item", {
        data: {
          userId: user,
          productId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  dispatch({
    type: actionType.REMOVE_FROM_CART,
    payload: {
      id: id,
    },
  });
};

export const getCartItems = () => async (dispatch, getState) => {
  const user = localStorage.getItem("id");
  const { cartItems } = getState().cartReducer;

  if (user) {
    try {
      const { data } = await axios.get(`/cart/get-items/${user}`);
      if (data.length > 0) {
        data?.map((value) => {
          var isExist = false;
          cartItems.forEach((item) => {
            if (item.disc._id === value.productDetails[0]._id) {
              isExist = true;
            }
            if (isExist && item.qty !== value.qty) {
              item.qty = value.qty;
            }
          });
          if (!isExist) {
            const disc = value.productDetails[0];
            const cartDic = { disc, qty: value.qty };
            cartItems.push(cartDic);
          }
        });
        dispatch({
          type: actionType.SET_CART_ITEMS,
          payload: {
            cartItems: cartItems,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateQty = (product, qty) => async (dispatch, getState) => {
  const user = localStorage.getItem("id");
  try {
    axios
      .patch("/cart/item/updatequantity", {
        userId: user,
        productId: product.disc._id,
        qty: qty,
      })
      .then(() => {
        dispatch({
          type: actionType.UPDATE_QUANTITY,
          payload: {
            productId: product.disc._id,
            qty: qty,
          },
        });
      });
    console.log("cart-action-updateQTY: ", qty);
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = () => async (dispatch, getState) => {
  const user = localStorage.getItem("id");

    try {
      await axios.delete("/cart/removeall", {
        data: {
          userId: user,
        },
      });
    } catch (error) {}

  dispatch({
    type: actionType.REMOVE_ALL_ITEMS,
    payload: {},
  });
};
