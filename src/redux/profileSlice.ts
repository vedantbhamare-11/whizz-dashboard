// ./redux/profileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  name: string;
  email: string;
  phone: string;
  profilePic: string;
}

const initialState: Profile = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "9876543210",
  profilePic: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Profile>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
