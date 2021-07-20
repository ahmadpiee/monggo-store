import { combineReducers } from "redux";
import { productListReducer, productDetailsReducer } from "./productReducers";

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});
