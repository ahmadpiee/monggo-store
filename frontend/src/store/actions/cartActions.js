import axios from "axios";
import * as actions from "../actionTypes";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
        type: actions.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    });
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actions.CART_REMOVE_ITEM,
        payload: id,
    });
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: actions.CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
};
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: actions.CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });
};
