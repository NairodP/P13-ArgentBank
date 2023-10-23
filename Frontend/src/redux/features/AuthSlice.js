import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: null,
  error: null,
  success: false,
  loading: false,
  signUpSuccess: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignUpSuccess: (state, action) => {
      state.signUpSuccess = action.payload;
    },
    resetAuthState: () => {
      return initialState;
    },
  },
});

export const {
  setUserToken,
  setError,
  setSuccess,
  setLoading,
  setSignUpSuccess,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;