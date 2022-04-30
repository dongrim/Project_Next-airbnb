import { UserType } from './../../types/user.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types/reduxState';

const initialState: UserState = {
  id: 0,
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  birth: '',
  profileImage: '',
  isLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<UserType>) => {
      state = { ...action.payload, isLogged: true };
      return state;
    },
    initUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

// export const { setLoggedUser } = userSlice.actions;
export const userActions = userSlice.actions;

export default userSlice.reducer;
