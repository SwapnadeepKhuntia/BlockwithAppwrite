import {createSlice} from '@reduxjs/toolkit';

const initialState = {
     status:false,
     userData: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.status = true; // Set the status to true when the user logs in
      state.userData = action.payload.userData; // Store the user data in the state
    },
    logout(state) {
      state.status = false; // Set the status to false when the user logs out
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const {login, logout} = authSlice.actions;