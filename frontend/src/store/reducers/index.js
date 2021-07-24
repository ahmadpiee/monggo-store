import { combineReducers } from "redux";
import { productListReducer, productDetailsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./userReducers";
import { orderCreateReducer, orderDetailsReducer } from "./orderReducers";

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
});
