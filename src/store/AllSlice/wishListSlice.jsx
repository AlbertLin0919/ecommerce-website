import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishList: [],
  },
  reducers: {
    toggleWishList(state, { payload }) {
      const index = state.wishList.findIndex((list) => list.id === payload.id);
      if (index === -1) {
        state.wishList.push(payload);
      } else {
        state.wishList.splice(index, 1);
      }
    },

    removeWishList(state, { payload }) {
      state.wishList = state.wishList.filter((list) => list.id !== payload);
    },
  },
});

export const { toggleWishList, removeWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
