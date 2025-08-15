import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnection:(state,action)=>action.payload,
        removeConnection:()=>null,
    }
})

export const {addConnection,removeConnection} = connectionSlice.actions;

export default connectionSlice.reducer



// import { createSlice } from "@reduxjs/toolkit";

// const connectionSlice = createSlice({
//   // ✅ 1. Name changed to 'connections' (plural) to match the selector.
//   name: "connections",

//   // ✅ 2. Initial state is now an empty array to prevent crashes.
//   initialState: [],

//   reducers: {
//     // ✅ 3. Renamed for clarity: this action SETS the entire list.
//     setConnections: (state, action) => {
//       // The payload from your API call will become the new state.
//       return action.payload;
//     },
//     // This reducer correctly removes a single connection from the array.
//     removeConnection: (state, action) => {
//       const connectionIdToRemove = action.payload;
//       return state.filter(
//         (connection) => connection._id !== connectionIdToRemove
//       );
//     },
//   },
// });

// // Export the updated actions.
// export const { setConnections, removeConnection } = connectionSlice.actions;

// export default connectionSlice.reducer;






// import { createSlice } from "@reduxjs/toolkit";

// const connectionSlice = createSlice({
//   name: 'connection',
//   // Use an object for the initial state
//   initialState: {
//     items: [], // Always start with an empty array
//   },
//   reducers: {
//     addConnection: (state, action) => {
//       // Replace the items array with the payload
//       state.items = action.payload;
//     },
//     removeConnection: (state) => {
//       // Reset to the initial state
//       state.items = [];
//     },
//   },
// });

// export const { addConnection, removeConnection } = connectionSlice.actions;

// export default connectionSlice.reducer;