import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers/index";

// localstorage for cart screen
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
// end.. don't forget to "save on initialState below"

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
};
// store the initialState below ("MUST below the rootReducer/combinereducer")

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
