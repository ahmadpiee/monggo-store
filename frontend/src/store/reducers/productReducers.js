import * as actions from "../actionTypes";

const initialState = {
    products: [],
};

export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case actions.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case actions.PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
