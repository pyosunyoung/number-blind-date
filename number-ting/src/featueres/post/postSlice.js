import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";

// 비동기 액션 생성
export const getPostList = createAsyncThunk(
  "posts/getPostList",
  async (query, { rejectWithValue }) => {
    try {
      console.log("query", query);
      // 페이지 값을 숫자로 변환 (문자열일 가능성 대비)
      // const fixedQuery = {
      //   ...query,
      //   page: parseInt(query.page, 10) || 1,
      // };
      
      const response = await api.get("/posts", {
        params: {...query},
      });

      console.log("📌 API 응답:", response.data);
      if (response.status !== 200) throw new Error(response.error);

      return response.data; // `postits`가 포함된 전체 JSON을 반환
    } catch (error) {
      console.log("🚨 API 요청 실패:", error);
      return rejectWithValue(error.error);
    }
  }
);

// 개별 포스트 조회
export const getPostDetail = createAsyncThunk(
  "posts/getPostDetail",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${id}`);
      if (response.status !== 200) throw new Error(response.error);

      return response.data.data;
    } catch (error) {
      dispatch(
        showToastMessage({
          message: error.message || "게시글 정보를 불러오지 못했습니다.",
          status: "error",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

// 포스트 생성
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/post/create", formData);
      if (response.status !== 200) throw new Error(response.error);

      dispatch(showToastMessage({ message: "포스트잇 생성 완료", status: "success" }));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

// 초기 상태
const initialState = {
  postList: [],
  selectedPost: null,
  loading: false,
  error: "",
  totalPageNum: 1,
  totalItem:null,
  success: false,
};

// Redux Slice 생성
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.success = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getPostList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostList.fulfilled, (state, action) => {
        state.loading = false
        state.postList = action.payload.postits
        state.error = ""
        state.totalPageNum = action.payload.total_pages
        state.totalItem = action.payload.toal_items
      })
      .addCase(getPostList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getPostDetail.pending, (state)=>{
        state.loading = true;
      })
      .addCase(getPostDetail.fulfilled, (state,action) => {
        state.loading = false;
        state.selectedPost = action.payload;
        state.error = ""
      })
      .addCase(getPostDetail.rejected, (state, action)=> {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
  },
});

// 액션 및 리듀서 내보내기
export const { clearError } = postSlice.actions;
export default postSlice.reducer;