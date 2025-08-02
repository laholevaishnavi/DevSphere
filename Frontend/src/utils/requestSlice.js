import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name :"request",
  initialState : [],
  reducers :{
    addRequest : (state,action)=>{return action.payload;},
    removeRequest : (state,action)=>{
      // Filter out the request with the given id instead of returning null
      return state.filter(request => request._id !== action.payload);
    }
  }
});
export const {addRequest,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;