import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: null,
  lastName: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      // Met à jour les données du profil avec les données reçues de l'action
      return { ...state, ...action.payload };
    },
    resetUserProfile: () => {
      // Réinitialise les données du profil si nécessaire
      return initialState;
    },
  },
});

export const { setUserProfile, resetUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;