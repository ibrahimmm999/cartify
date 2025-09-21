import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: { cart: cartReducer, user: userReducer },
});

store.subscribe(() => {
  console.log("store change : ", store.getState());
});

export default store;
