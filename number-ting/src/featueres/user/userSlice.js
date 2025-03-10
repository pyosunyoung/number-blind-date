import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";
// 지침 사항
// 툴킷 로그인, 회원가입 샘플
// 예시이니 변경있을 수 있음.
// userSlice는 로그인 회원가입 관련 툴킷 리듀스 스토어라고 보면 됨
// 개발하면서 유동적으로 폴더 및 파일 생성해가면서 Slice를 추가시키면 됨
// 예로 번호팅 사이트에서 사용자가 포스트잇을 생성해서 그 정보들을 백엔드와 연동하고 싶으면
// post라는 폴더 만들고 그 안에 postSlice 이런식으로 파일을 만들고 그안에 프론트 툴킷 기능들을 이 및 샘플과 같은 형식으로 코드를 작성하면 됨됨
// featueres가 리듀스 툴킷 쓰는 파일들, postSlice를 만들었으면 store.js 객체안에도 넣어서 적용시켜주면 됨, post : postSlice이렇게
// page나 라우터도 어떤 대략적인 페이지들만 설정해논거라 알아서 유동적으로 페이지 추가시 라우터도 수정 바람.
export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, userPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, userPassword }); // post로 보내줌
      console.log(response);
      //성공
      //Loginpage에서 처리
      // 토큰저장
      //1. local storage(페이지 닫혔다 켜져도 다시 유지)
      //2. session storage (새로고침하면 유지, 페이지 닫히면 유지x)

      const authHeader = response.headers.authorization;

      const accessToken = authHeader.replace("Bearer ", "").trim();
      sessionStorage.setItem("access_token", accessToken);

      return response.data; // response.data.user이렇게 해도 됨
    } catch (error) {
      //실패
      //실패시 생긴 에러값을 reducer에 저장
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => { }
);

export const logout = () => async (dispatch) => {
  try {
    await api.post("/auth/logout", {});
    sessionStorage.removeItem("access_token");
    dispatch(userLoggedOut());
    window.location.href = "/login";
  } catch (error) {
    console.log("로그아웃 실패", error);
  }
  // user정보를 지우고

  // session token의 값을 지운다.
};

// 회원가입 요청 처리 (Redux 비동기 함수) - 주은 수정
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    {
      userName,
      email,
      userPassword,
      gender,
      age,
      nickname,
      contact,
      major,
      location,
      navigate,
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        userName,
        userPassword,
        gender,
        age,
        nickname,
        contact,
        major,
        location,
      });

      dispatch(
        showToastMessage({
          message: "회원가입을 성공했습니다!",
          status: "success",
        })
      );
      navigate("/login");

      return response.data;
    } catch (error) {
      dispatch(
        showToastMessage({
          message: "회원가입에 실패했습니다.",
          status: "error",
        })
      );
      return rejectWithValue(error.response?.data || "회원가입 실패");
    }
  }
);

// 회원 정보 불러오기
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/mypage");
      console.log("Redux: 응답 데이터:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "회원 정보를 불러오는데 실패했습니다."
      );
    }
  }
);

// 회원 정보 수정
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    { userName, email, gender, age, nickname, contact, major, location },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.put("/user/profile", {
        userName,
        email,
        gender,
        nickname,
        age,
        contact,
        major,
        location,
      });

      dispatch(
        showToastMessage({
          message: "회원 정보가 성공적으로 수정되었습니다.",
          status: "success",
        })
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      dispatch(
        showToastMessage({
          message: "회원 정보 수정에 실패했습니다.",
          status: "error",
        })
      );
      return rejectWithValue(error.response?.data || "회원 정보 수정 실패");
    }
  }
);

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {
    // _는 주는 정보 없음
    // 토큰은 login했을 때 저장됨 그 로직 짜러 가야함 login with email ㄱㄱ
    try {
      // 다시 뭐 get TKoen을 할필요가 없음 우리는 이미 api.js에서 headrs에 token을 설정시켜놨기 떄문 그래서 이 토큰이 누구의 토큰인지만 요청해주면 됨
      const response = await api.get("/user/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
    profile: null,
  },
  reducers: {
    // 직접적으로 호출
    setUser: (state, action) => {
      state.user = action.payload; // user 정보 업데이트
    },
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
    // 로그아웃 처리: 상태 초기화
    userLoggedOut: (state) => {
      state.user = null;
      state.loading = false;
      state.loginError = null;
      state.registrationError = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // async처럼 외부의 함수를 통해 호출
    builder
      .addCase(registerUser.pending, (state) => {
        // 데이터 기다림, state는 initialState를 넘겨줌
        state.loading = true; // 로딩스피너
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationError = null;
      }) // 성공
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationError = action.payload;
      }) // 실패
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // 로그인이 성공적이라면 이 user값을 init initialState: { user: null, 여기에 넣어주겠다
        state.loginError = null; // 로그인 에러는 null로 바꿔주고
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      // .addCase(loginWithToken.pending, (state,action)=>{
      //   //로딩스피너 보여줄 필요 없음 그냥 유저 체크하는 것임
      // })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user; // 유저값 찾았으면 그냥 토큰 세팅만 해주면 됨
      })
      // .addCase(loginWithToken.rejected, (state,action)=>{
      //   //유저값을 찾는건 이미 뒤에서 진행되는 것이니 유저값을 못찾으면
      //다시 그냥 유저가 로그인 페이지를 다시 로그인할 수 있게 해주면 됨 필요x
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload
        state.loginError = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })

  },

});
export const { clearErrors, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;
