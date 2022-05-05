import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
};

const registerRoomSlice = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    setLargeBuildingType(state, action: PayloadAction<string>) {
      state.largeBuildingType = action.payload;
      return state;
    },
    setBuildingType(state, action: PayloadAction<string>) {
      /* if (action.payload === "") {
        state.buildingType = null;
      } */
      state.buildingType = action.payload;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoomSlice.actions };
// export const registerRoomActions = registerRoomSlice.actions;

export default registerRoomSlice.reducer;
