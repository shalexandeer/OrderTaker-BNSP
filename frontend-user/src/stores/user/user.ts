import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../utils/storage";
import { Meja, Restaurant } from "../../interface/global";

interface UserState {
  user: User;
  restaurantProfile: Restaurant | null;
  mejaData: Meja | null;
}

const initialState: UserState = {
  user: {
    customerEmail: "",
    customerName: "",
    mejaId: "",
    no: "",
    restaurantId: "",
    paymentMethod: "cashier",
  },
  restaurantProfile: null,
  mejaData: null,
};

const getInitialState = (): UserState => {
  const user = getUser();
  if (user === null) {
    return initialState;
  }
  return { ...initialState, user };
};

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setIds: (
      state,
      { payload }: PayloadAction<{ mejaId: string; restaurantId: string }>,
    ) => {
      if (state.user) {
        state.user.mejaId = payload.mejaId;
        state.user.restaurantId = payload.restaurantId;
      }
    },
    setRestaurantProfile: (state, { payload }: PayloadAction<Restaurant>) => {
      state.restaurantProfile = payload;
    },
    setMejaData: (state, { payload }: PayloadAction<Meja>) => {
      state.mejaData = payload;
    },
    removeUser: (state) => {
      state.user = initialState.user;
    },
  },
});
