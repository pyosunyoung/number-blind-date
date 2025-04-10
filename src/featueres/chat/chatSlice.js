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

export const deleteChatRoom = createAsyncThunk(
  "chat/deleteChatRoom",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem("access_token");
      if (!accessToken) throw new Error("Access token not found");
      const response = await api.delete(
        `/chat/room/${id}/delete`,
        null,  // POST 요청의 본문이 없으므로 `null`
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(showToastMessage({ message: "채팅방 삭제 완료", status: "success" }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
)
export const getChatList = createAsyncThunk(
  "chat/chatList",
  async (token, { rejectWithValue }) => {
    try{
      
      const response = await api.get("/chat/rooms",
         // POST 요청의 본문이 없으므로 `null`
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

      if(response.status !== 200) throw new Error(response.error);

      // console.log("API 응답 데이터:", response.data);
      return response.data;
    }catch(error){

      return rejectWithValue(error.error);
    }
  }
)

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRoom: null,
    chatList: [],
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
      })
      .addCase(getChatList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("action.payload",action.payload);
        state.chatList = action.payload;
        state.success = true;
      })
      .addCase(getChatList.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload
        state.success = false;
      })
  },
});

export default chatSlice.reducer;