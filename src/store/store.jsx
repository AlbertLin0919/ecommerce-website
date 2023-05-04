import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./messageSlice/messageSlice";
import tempPageSlice from "./messageSlice/tempPageSlice";
import wishListSlice from "./Slice/wishListSlice";

export const store = configureStore({
  reducer: {
    message: messageSlice,
    tempPage: tempPageSlice,
    wishList: wishListSlice,
  },
});
