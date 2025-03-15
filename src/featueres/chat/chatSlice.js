import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showToastMessage } from '../common/uiSlice';

export const createChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async (ownerEmail, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("access_token");
      if (!accessToken) throw new Error("Access token not found");
      console.log("[chatslice] accessToken ",accessToken)
      const response = await api.post(
        "/create/chat/room",
        null,  // POST 요청의 본문이 없으므로 `null`
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { ownerEmail }, // 쿼리 파라미터로 전달
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