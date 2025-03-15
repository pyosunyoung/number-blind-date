import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showToastMessage } from '../common/uiSlice';

export const createChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async (ownerEmail, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("access_token");
      if (!accessToken) throw new Error("Access token not found");

      const response = await api.post(
        "/create/chat/room",
        
        {
          Header: {
            Authorization: `Bearer ${accessToken}`,
          },
          Params: {
            ownerEmail : ownerEmail
          } , //오른쪽 ownerEmail안에 pyo@bu.ac.kr 들어있음음
        }
      );
      dispatch(showToastMessage({ message: "채팅방 생성 완료", status: "success" }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRoom: null,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createChatRoom.pending, (state, action) => {
      state.loading = true;
    })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.chatRoom = action.payload;
        state.error = "";
        state.success = true;
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default chatSlice.reducer;