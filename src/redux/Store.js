import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from './Slice/authslice.js';
const store = configureStore({
  reducer: {
    authSlice: authSliceReducer,
  },
});

export default store;
