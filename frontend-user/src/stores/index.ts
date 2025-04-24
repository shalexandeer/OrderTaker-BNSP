import { ThunkDispatch, configureStore, AnyAction, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartReducer } from "./cart/cart";
import ui from "./ui";
import user from "./user";
import hotel from "./hotel";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui,
    user,
    hotel
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;