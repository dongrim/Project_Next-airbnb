import { AnyAction, Store } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { UserState } from '../../types/reduxState';
import userReducer from '../store/userSlice';
import commonReducer from '../store/commonSlice';
import authReducer from '../store/authSlice';
import registerRoomReducer from '../store/registerRoomSlice';

const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
  auth: authReducer,
  registerRoom: registerRoomReducer,
});

const reducer = (state, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      // return state;
      return rootReducer(state, action);
  }
};

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const initStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

export const wrapper = createWrapper<Store<UserState>>(initStore /* { debug: true } */);
