import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface UserProfileState {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: UserProfileState = {
  data: null,
  loading: false,
  error: null,
  lastFetched: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    fetchProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action: PayloadAction<UserProfile>) {
      state.loading = false;
      state.data = action.payload;
      state.lastFetched = Date.now();
      state.error = null;
    },
    fetchProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action: PayloadAction<UserProfile>) {
      state.loading = false;
      state.data = action.payload;
      state.lastFetched = Date.now();
      state.error = null;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearProfile(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  clearProfile,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
