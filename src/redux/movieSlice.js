import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: { url: "http://" },
  geners: {},
};

const movieReducer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setApiconfig: (state, action) => {
      state.url = action.payload;
    },
    setGeners: (state, action) => {
      state.geners = action.payload;
    },
  },
});

export const { setApiconfig, setGeners } = movieReducer.actions;
export default movieReducer.reducer;
