import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistedReducer } from "./reducers/index";

const middleware = [thunk];

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
