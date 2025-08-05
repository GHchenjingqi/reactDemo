import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
  createTime: string;
  token: string;
  avatar: string;
  phone: string;
}


const initialState: UserState = {
  username: '',
  email: '',
  createTime: "",
  token: "",
  avatar: "",
  phone: "",
};
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserInfo(state, action: { payload: UserState }) {
      return action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;