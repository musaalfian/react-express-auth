import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   name: '',
   email: '',
   address: '',
   accessToken: '',
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      login: (state, action) => {
         state.name = action.payload.user.name;
         state.email = action.payload.user.email;
         state.address = action.payload.user.address;
         state.accessToken = action.payload.accessToken;
      },
      logout: (state) => {
         state.name = '';
         state.email = '';
         state.address = '';
         state.accessToken = '';
      },
   },
});

export const authUser = (state) => state.user;
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
