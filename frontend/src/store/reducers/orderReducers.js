import * as actions from "../actionTypes";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload,
            };
        case actions.ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case actions.ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };
        case actions.ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};