import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempPage: 1,
  tempCategory: "",
};

const tempPageSlice = createSlice({
  name: "tempPage",
  initialState,
  reducers: {
    getTempPage(state, { payload: { page, category } }) {
      state.tempPage = page;
      state.tempCategory = category;
    },
  },
});

export const { getTempPage } = tempPageSlice.actions;
export default tempPageSlice.reducer;
