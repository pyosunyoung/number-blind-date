import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";


export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { dispatch, rejectWithValue }) => {
    try{
      const response = await api.post("/matching/posts",formData)
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

  },
  extraReducers: (builder) => {
    builder

  }
})
export const {} = postSlice.actions;
export default postSlice.reducer;