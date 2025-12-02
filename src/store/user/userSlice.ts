import { createSlice } from "@reduxjs/toolkit";


interface User {
    email?: string;
    name?: string;
    token?: string;
    provider?: string;
    provider_account_id?: string;
    id?: string;
    image?: string;

}

const initialState : User = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;