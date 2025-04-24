import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface HotelState {
  hotels: Hotel[];
  profile: HotelProfile | null;
  isStoreOpen: boolean;
  selectedItem?: Foods | null;
}

const initialState: HotelState = {
  hotels: [],
  profile: null,
  isStoreOpen: false,
  selectedItem: null,
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotels: (state, { payload }: PayloadAction<Hotel[]>) => {
      state.hotels = payload;
    },
    setHotelProfile: (state, { payload }: PayloadAction<HotelProfile>) => {
      state.profile = payload;
    },
    setIsStoreOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isStoreOpen = payload;
    },
    setSelectedItem: (state, { payload }: PayloadAction<Foods | null>) => {
      state.selectedItem = payload;
    },
  },
});
