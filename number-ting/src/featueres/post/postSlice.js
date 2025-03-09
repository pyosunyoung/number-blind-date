import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";


// 비동기 액션 생성
export const getPostList = createAsyncThunk(
  "posts/getPostList",
  async (query, { rejectWithValue }) => {
    try{
      const response = await api.get("/posts", {params: {...query}}); // params가져와서 백엔드에 보냄
      console.log(query);
      if(response.status!==200) throw new Error(response.error);
      // console.log("rrr", response);
      return response.data; // pagnum으로 인한 data로 변경
    }catch(error){
      rejectWithValue(error.error);
    }
  }
);

export const getPostDetail = createAsyncThunk(
  "posts/getPostDetail",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${id}`); // 상품 상세 정보 요청
      if (response.status !== 200) throw new Error(response.error);

      // 요청 성공 시 데이터 반환
      return response.data.data;
    } catch (error) {
      // 실패 시 에러 메시지 표시
      dispatch(showToastMessage({ message: error.message || "게시글 정보를 불러오지 못했습니다.", status: "error" }));
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { dispatch, rejectWithValue }) => {
    try{
      const response = await api.post("/post/create",formData)
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
    totalItemNum: null,
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
    .addCase(getPostList.pending, (state, action) => [
      state.loading = true
    ])
    .addCase(getPostList.fulfilled, (state, action) => {
      state.loading = false
      state.postList = action.payload.postits
      state.error = ""
      state.totalPageNum = action.payload.total_pages
      state.totalItemNum = action.payload.total_items
      
    })
    .addCase(getPostList.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })
  }
})
export const {clearError} = postSlice.actions;
export default postSlice.reducer;