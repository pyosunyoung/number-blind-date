import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";


export const createPost = createAsyncThunk(
  "posts/createPost",
  async (finalData, { dispatch, rejectWithValue }) => {
    try{
      const response = await api.post("/post/create",finalData)
      if(response.status!==200) throw new Error(response.error)
      dispatch(showToastMessage({message:"포스트잇 생성 완료", status:"success"}))
      // dispatch(getPostList({page:1}))
        return response.data.data
    }catch(error){
      return rejectWithValue(error.error)
    }

  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    postList: [],
    selectedPost: null,
    loading: false,
    error: "",
    totalPageNum: 1,
    success: false,
  },
  reducers:{
    clearError: (state) => {
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createPost.pending,(state,action)=>{
      state.loading=true
    })
    .addCase(createPost.fulfilled,(state,action)=>{
      state.loading = false
      state.error = ""
      state.success=true // 이거의 역할 상품 생성을 성공했다? 다이얼로그를 닫고, 실패시 실패메세지를 다이어로그에 보여주고, 닫지 않음
    })
    .addCase(createPost.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
      state.success = false
    })
  }
})
export const {clearError} = postSlice.actions;
export default postSlice.reducer;