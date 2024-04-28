import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wardens: [],
  email: null,
  token : null,
  name:null,
  hostel:null,
};

const wardenSlice = createSlice({
  name: "wardens",
  initialState,
  reducers: {
    create_warden: (state, action) => {
      console.log(action.payload);
      state.wardens.push(action.payload);
    },
    redirect_to_dashboard: (state, action) => {
      console.log(action.payload);
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.hostel = action.payload.hostel;
    },
    logoutWarden: (state) => {
      // Reset user-related information on logout
      state.email = null;
      state.token = null;
      state.name = null;
      state.hostel = null;
    },
    get_unassigned_wardens: (state,action) => {

      state.wardens = action.payload.wardens;
      console.log(action.payload.wardens);
    }
  },
});

export const {  redirect_to_dashboard, logoutWarden, create_warden,get_unassigned_wardens } = wardenSlice.actions;
export default wardenSlice.reducer;
