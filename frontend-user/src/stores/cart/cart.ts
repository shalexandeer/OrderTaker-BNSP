import { createSlice } from "@reduxjs/toolkit";
import { FoodCart } from "../../interface/global";

interface CartState {
  cart: {
    foodItems: FoodCart[];
  };
  order: OrderData[];
}

const initialState: CartState = {
  cart: {
    foodItems: [],
  },
  order: [],
};

function searchKey(from: string, state: CartState) {
  const keys = Object.keys(state.cart);
  let cartIndex = 0;

  keys.forEach((item) => {
    if (item.toLowerCase().includes(from.toLowerCase())) {
      cartIndex = keys.indexOf(item);
    }
  });

  return keys[cartIndex] as keyof typeof state.cart;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { quantity, foodId, from } = action.payload;
      // get key of the item
      const key = searchKey(from, state);
      const item = state.cart[key].find((item) => item.foodId === foodId);

      if (item) {
        item.quantity += quantity;
      } else {
        state.cart[key].push(action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const { foodId, from } = action.payload;
      const key = searchKey(from, state);
      const item = state.cart[key].find((item) => item.foodId === foodId);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const { foodId, from } = action.payload;
      const key = searchKey(from, state);
      const item = state.cart[key].find((item) => item.foodId === foodId);
      if (item) item.quantity--;
    },
    removeItem: (state, action) => {
      const { from, order } = action.payload;
      const key = searchKey(from, state);
      const items = state.cart[key];
      const removeItem = items.find(
        (item) => item.foodId == action.payload.order.foodId,
      );

      state.cart = {
        ...state.cart,
        [key]: items.filter((item) => item.foodId !== removeItem?.foodId),
      };
    },
    clearCart: (state) => {
      state.cart = initialState.cart;
    },
    sendOrders: (state, action) => {
      state.cart = action.payload;
    },
    insertOrder: (state, action) => {
      state.order = action.payload;
    },
    updateNotes: (state, action) => {
      const { from, id, note } = action.payload;
      const key = searchKey(from, state);
      const item = state.cart[key].find((item) => item.foodId === id);
      if (item) item.note = note;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  sendOrders,
  insertOrder,
  updateNotes,
} = cartSlice.actions;
