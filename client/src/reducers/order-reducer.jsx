/** 
 * @author: Karthik Kannan Nanthakumar
 * @desc: Reduce to maintain Order Details 
*/

import * as actionType from "../action-type/order-action-type";
const user_id = localStorage.getItem('id')

const initialState = {
    orderDetails: {
        userId: user_id,
        products: [],
        netPrice: 0,
        tax: 0,
        orderStatus: 'Order Drafted',
        discount: 0,
        shippingCharges: 30,
        totalPrice: 0,
        paymentDetails: {},
        shippingDetails: {},
        deliveryDetails: {}
    },
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_PRODUCTS:
            state.orderDetails.products = action.payload.products;
            state.orderDetails.products.forEach((product)=>{
                product.product.price.mrp *= product.qty
                product.product.price.cost *= product.qty
            })
            state.orderDetails.netPrice = action.payload.products.reduce((acc, product) => acc + product.product.price.cost, 0)
            state.orderDetails.tax = state.orderDetails.netPrice * 0.15
            state.orderDetails.totalPrice = state.orderDetails.netPrice + state.orderDetails.tax - state.orderDetails.discount
            return { ...state, orderDetails: state.orderDetails };
        case actionType.ADD_DISCOUNT:
            state.orderDetails.discount = action.payload.discount
            state.orderDetails.totalPrice = state.orderDetails.netPrice + state.orderDetails.tax - state.orderDetails.discount
            return { ...state, orderDetails: state.orderDetails };
        case actionType.ADD_PAYMENT_DETAILS:
            state.orderDetails.paymentDetails = action.payload.paymentDetails
            return { ...state, orderDetails: state.orderDetails };
        case actionType.ADD_SHIPPING_DETAILS:
            state.orderDetails.shippingCharges = 30
            state.orderDetails.shippingDetails = action.payload.shippingDetails
            return { ...state, orderDetails: state.orderDetails };
        case actionType.ADD_DELIVERY_DETAILS:
            state.orderDetails.deliveryDetails = action.payload.deliveryDetails
            return { ...state, orderDetails: state.orderDetails };
        case actionType.PLACE_ORDER:
            return { ...state, orderDetails: initialState.orderDetails };
        case actionType.RETRIEVE_ORDER:
            return { ...state, orderDetails: action.payload.orderDetails };
        default:
            return state;
    }
};

export default orderReducer;
