import { createSlice } from "@reduxjs/toolkit";

export const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    postMessage(state, { payload }) {
      console.log(payload);
      return { ...state, ...payload };
    },
    clearMessage() {
      return {};
    },
  },
});

export const { postMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;

//function
export function handleSuccessMessage(dispatch, res) {
  dispatch(
    postMessage({
      type: "success",
      title: "更新成功",
      text: res.data.message,
    })
  );
  setTimeout(() => {
    clearMessage({});
  }, 3000);
}

export function handleErrorMessage(dispatch, error) {
  dispatch(
    postMessage({
      type: "danger",
      title: "失敗",
      text: Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join("、")
        : error?.response?.data?.message,
    })
  );
  setTimeout(() => {
    dispatch(clearMessage({}));
  }, 3000);
}
