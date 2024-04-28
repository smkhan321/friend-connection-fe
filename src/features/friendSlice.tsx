import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types/userInterface'

export interface FriendState {
  allRequests: User[]
}

const initialState: FriendState = {
  allRequests: [],
}

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addRequests: (state, action) => {
      state.allRequests = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRequests } = friendSlice.actions

export default friendSlice.reducer