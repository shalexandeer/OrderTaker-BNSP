import { hotelSlice } from "./hotel";

export const { setHotels, setHotelProfile, setSelectedItem, setIsStoreOpen } =
  hotelSlice.actions;
export default hotelSlice.reducer;
