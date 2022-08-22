/*
* @author: Adesh Nalpet Adimurthy
*/

import * as actionType from "../action-type/favorites-action-type";
import axios from "axios";

const user_id = localStorage.getItem('id')

/**
 * API call to add item favorites for a user-id
 * @param {*} item 
 * @returns 
 */
export const addToFavorites = (item) => async (dispatch, getState) => {
  try {
    await axios.post("/favorites/add-item", {
      userId: user_id,
      productId: item._id,
    });
  } catch (error) { }
  dispatch({
    type: actionType.ADD_TO_FAVORITES,
    payload: {
      item,
    },
  });
};

/**
 * Api Call to remove item from favorites for a user-id
 * @param {*} id 
 * @returns 
 */
export const removeFromFavorites = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/favorites/remove-item", {
      data: {
        userId: user_id,
        productId: id,
      },
    });
  } catch (error) { }
  dispatch({
    type: actionType.REMOVE_FROM_FAVORITES,
    payload: {
      id: id,
    },
  });
};

/**
 * API call to get all favorites for a user-id
 * @returns 
 */
export const getFavoritesItems = () => async (dispatch, getState) => {
  try {
    if(localStorage.getItem('id') !== null) {
      const { data } = await axios.get(`/favorites/get-items/${user_id}`);
      const favoritesItems = [];

      data?.map((value) => {
        favoritesItems.push(value.productDetails[0]);
      });
      dispatch({
        type: actionType.SET_FAVORITES,
        payload: {
          favoritesItems: favoritesItems,
        },
      });
    }
    
  } catch (error) { }
};
