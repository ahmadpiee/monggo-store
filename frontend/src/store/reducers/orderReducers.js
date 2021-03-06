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

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case actions.ORDER_PAY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

export const myOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case actions.MY_ORDER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.MY_ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case actions.MY_ORDER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.MY_ORDER_LIST_RESET:
            return { orders: [] };
        default:
            return state;
    }
};

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case actions.ORDER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case actions.ORDER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ORDER_DELIVER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.ORDER_DELIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case actions.ORDER_DELIVER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.ORDER_DELIVER_RESET:
            return {};
        default:
            return state;
    }
};
