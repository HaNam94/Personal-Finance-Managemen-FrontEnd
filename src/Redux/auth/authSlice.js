import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import UserApi from "../../Apis/UserApi";

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle'
};

// Define an async thunk for fetching user information
export const fetchUser = createAsyncThunk('auth/fetchUser', async (token) => {
  const res= await UserApi.getCurrentUser();
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.status = "idle";
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        localStorage.removeItem('token');
      });
  }
});

export const {setToken, logout} = authSlice.actions;

export default authSlice.reducer;