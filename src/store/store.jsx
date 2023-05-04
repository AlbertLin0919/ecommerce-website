import { configureStore } from "@reduxjs/toolkit";

import messageSlice from "./AllSlice/messageSlice";
import tempPageSlice from "./AllSlice/tempPageSlice";
import wishListSlice from "./AllSlice/wishListSlice";

export const store = configureStore({
  reducer: {
    message: messageSlice,
    tempPage: tempPageSlice,
    wishList: wishListSlice,
  },
});
