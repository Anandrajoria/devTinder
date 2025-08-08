
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // Use an empty array as the initial state
  reducers: {
    // Replaces the feed. Used for the initial fetch.
    setFeed: (state, action) => {
      return action.payload;
    },
    // Adds new users to the end of the existing feed. Used for "Load More".
    appendFeed: (state, action) => {
      // Prevent duplicates in case of network re-tries
      const existingIds = new Set(state.map(user => user._id));
      const newUsers = action.payload.filter(user => !existingIds.has(user._id));
      state.push(...newUsers);
    },
    // Removes a single user after an action (ignore/interested)
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { setFeed, appendFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;


