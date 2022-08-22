/**
 * Author: Hemanth Nadipineni
 */
import * as actionType from "../action-type/coupon-action-type";
import axios from "axios";

/**
 * API call to get all coupons.
 */
export const listCoupons = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/coupons/list-coupons");
    console.log(data);
    dispatch({
      type: actionType.LIST_COUPONS,
      payload: {
        coupons: data,
      },
    });
  } catch (error) { }
};


