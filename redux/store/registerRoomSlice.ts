import { createSlice } from '@reduxjs/toolkit';

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
  // typeOfBuilding: {
  //   apart: 0,
  // },
  // type: {
  //   commonPlace: 0,
  // },
};

const registerRoomSlice = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    //
  },
});

export const registerRoomActions = { ...registerRoomSlice.actions };
// export const registerRoomActions = registerRoomSlice.actions;

export default registerRoomSlice.reducer;
