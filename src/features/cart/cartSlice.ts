import { CartItem } from "@/types/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

const initialState: { cart: CartItem[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(
        cartItem => cartItem.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(
        cartItem => cartItem.pizzaId === action.payload,
      );
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(
        cartItem => cartItem.pizzaId === action.payload,
      );

      if (!item) return state;

      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const selectTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, currentItem) => sum + currentItem.quantity, 0);

export const selectTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, currentItem) => sum + currentItem.totalPrice, 0);

export const selectPizzaInCart = (state: RootState, id: number) =>
  state.cart.cart.some(cartItem => cartItem.pizzaId === id);

export const selectQuantityByPizzaId = (state: RootState, id: number) =>
  state.cart.cart.find(cartItem => cartItem.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
