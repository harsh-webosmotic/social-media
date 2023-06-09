import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TOKEN, baseUrl } from '../../utils/config';
import { getCookie } from '../../utils/cookiesManagement';

export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (state, action) => {
    const res = await fetch(`${baseUrl}/users/get-user-profile`, {
      method: 'GET',
      headers: {
        Authorization: getCookie(TOKEN),
      },
    })
      .then((res) => res.json())
      .then((json) => json?.data);
    return res;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userProfile: { isLoading: false },
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.userProfile.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = { isLoading: false, ...action.payload };
      });
  },
});

export const getProfile = (state) => {
  return state?.profile?.userProfile;
};
// export const {} = userSlice.

export default userSlice.reducer;
