import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/reduxState';

const initialState: AuthState = {
  authModalMode: 'signup',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthModalMode(state, action: PayloadAction<'signup' | 'login'>) {
      state.authModalMode = action.payload;
    },
  },
});

export const authActions = { ...authSlice.actions };

export default authSlice.reducer;
