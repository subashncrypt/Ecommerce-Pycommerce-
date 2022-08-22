/**
 * @author: Karthik Kannan Nanthakumar
 * @desc: Order and Payment actions
*/

import * as actionType from "../action-type/order-action-type";
import axios from "axios";

const user_id = localStorage.getItem('id')

/**
 * API call to add item favorites for a user-id
 * @param {*} item 
 * @returns 
 */
export const addProducts = (products) => async (dispatch, getState) => {
    dispatch({
        type: actionType.ADD_PRODUCTS,
        payload: {
            products,
        },
    });
};

/**
 * Api Call to remove item from favorites for a user-id
 * @param {*} id 
 * @returns 
 */
export const addPaymentDetails = (paymentDetails) => async (dispatch, getState) => {
    dispatch({
        type: actionType.ADD_PAYMENT_DETAILS,
        payload: {
            paymentDetails: paymentDetails,
        },
    });
};

/**
 * Api Call to remove item from favorites for a user-id
 * @param {*} id 
 * @returns 
 */
 export const addShippingDetails = (shippingDetails) => async (dispatch, getState) => {
    dispatch({
        type: actionType.ADD_SHIPPING_DETAILS,
        payload: {
            shippingDetails: shippingDetails,
        },
    });
};

/**
 * Api Call to remove item from favorites for a user-id
 * @param {*} id 
 * @returns 
 */
 export const addDeliveryDetails = (deliveryDetails) => async (dispatch, getState) => {
    dispatch({
        type: actionType.ADD_DELIVERY_DETAILS,
        payload: {
            deliveryDetails: deliveryDetails,
        },
    });
};

/**
 * Api Call to remove item from favorites for a user-id
 * @param {*} id 
 * @returns 
 */
 export const addDiscount = (discount) => async (dispatch, getState) => {
    dispatch({
        type: actionType.ADD_DISCOUNT,
        payload: {
            discount: discount,
        },
    });
};

/**
 * Api Call to remove item from favorites for a user-id
 * @param {*} id 
 * @returns 
 */
 export const placeOrder = () => async (dispatch, getState) => {
    const { orderDetails } = getState().orderReducer;
    orderDetails.orderStatus = 'Order Placed'
    axios.post('/order/create-order', orderDetails).then(response=>{
        console.log(response)
    })
    dispatch({
        type: actionType.PLACE_ORDER,
    });
};

/**
 * Api Call to remove item from favorites for a user-id
 * @param {*} id 
 * @returns 
 */
 export const saveOrderDetails = () => async (dispatch, getState) => {
    const { orderDetails } = getState().orderReducer;
    localStorage.setItem('orderDetails',JSON.stringify(orderDetails))
};

/**
 * Api Call to remove item from favorites for a user-id
 * @param {*} id 
 * @returns 
 */
 export const retrieveOrder = () => async (dispatch, getState) => {
    const { orderDetails } = getState().orderReducer;
    const temp = JSON.parse(localStorage.getItem('orderDetails'));
    dispatch({
        type: actionType.RETRIEVE_ORDER,
        payload: {
            orderDetails: temp,
        },
    });
};