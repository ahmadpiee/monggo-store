import { combineReducers } from "redux";
import { productListReducer } from "./productReducers";

export const rootReducer = combineReducers({
    productList: productListReducer,
});
