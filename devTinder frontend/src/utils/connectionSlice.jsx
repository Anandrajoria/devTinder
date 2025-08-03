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





// src/utils/connectionSlice.js

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