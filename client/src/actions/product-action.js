/*
* @author: Adesh Nalpet Adimurthy
*/

import * as actionType from "../action-type/product-action-type";
import axios from "axios";

/**
 * API call to get all products.
 * @returns 
 */
export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/products/get-products");
    dispatch({
      type: actionType.GET_PRODUCTS,
      payload: {
        products: data,
      },
    });
  } catch (error) { }
};

/**
 * API call to get product details
 * @param {*} id 
 * @returns 
 */
export const getProductById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/products/get-product/${id}`);
    dispatch({
      type: actionType.GET_PRODUCT_BY_ID,
      payload: {
        product: data,
      },
    });
  } catch (error) { }
};

/**
 * API call to get all products by category
 * @param {*} name 
 * @returns 
 */
export const getProductsByCategory = async (name) => {
  try {
    const { data } = await axios.get(`/products/get-products/${name}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
