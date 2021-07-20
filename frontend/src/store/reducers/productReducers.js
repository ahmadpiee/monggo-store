import * as actions from "../actionTypes";

const initialState = {
    products: [],
};

const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                products: [],
            };
        case actions.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.type.payload,
            };
        case actions.PRODUCT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.type.payload,
            };
        default:
            return state;
    }
};

export default productListReducer;
