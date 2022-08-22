import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import cartReducer from "./cart-reducer";
import storage from "redux-persist/lib/storage";

import productReducer from "./producd-reducer";
import favoritesReducer from "./favories-reducer";
import orderReducer from './order-reducer';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "userReducer"],
};


const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  favoritesReducer,
  orderReducer,
});

export default persistReducer(persistConfig, rootReducer);
