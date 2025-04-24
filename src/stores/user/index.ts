import { userSlice } from "./user";

export const { setUser, setIds, setRestaurantProfile, setMejaData } =
  userSlice.actions;

export default userSlice.reducer;
