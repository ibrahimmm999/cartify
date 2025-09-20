import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.qty += action.payload.qty;
      } else {
        state.data.push(action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.data.find((i) => i.id === id);
      if (item) {
        item.qty = qty;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
