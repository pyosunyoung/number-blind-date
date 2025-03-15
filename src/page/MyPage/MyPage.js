import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../featueres/user/userSlice";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단에서 시작 */
  min-height: 100vh;
  background: #f8f6ff;
  padding: 40px 20px; /* 전체적인 패딩 추가 */
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  background: #9333ea;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 16px;
`;

const MyPage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("남성");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("");
  const [nickname, setNickname] = useState("");
  const [contact, setContact] = useState("");
  const [contactMethod, setContactMethod] = useState("phone");
  const placeholders = {
    phone: "전화번호를 입력하세요.",
    instagram: "인스타 ID를 입력하세요.",
    kakao: "카카오톡 ID를 입력하세요.",
  };

  // const [birth_date, setBirthDate] = useState("");
  // const [major, setMajor] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // 마이페이지 데이터가 로드되면 콘솔에 출력
  useEffect(() => {
    if (profile) {
      console.log("응답 데이터:", JSON.stringify(profile, null, 2));
    } else {
      console.log("⚠️ 아직 데이터가 로드되지 않았습니다.");
    }
  }, [profile]);

  // 컴포넌트가 마운트될 때 사용자 정보 불러오기
  // 컴포넌트가 마운트될 때 사용자 정보 불러오기
  useEffect(() => {
    console.log("📌 Fetching user profile..."); // API 요청 전 로그
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // 마이페이지 데이터가 로드되면 콘솔에 출력
  useEffect(() => {
    if (profile) {
      console.log("응답 데이터:", JSON.stringify(profile, null, 2)); // API 응답 데이터 확인
    } else {
      console.log("⚠️ 아직 데이터가 로드되지 않았습니다.");
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      setUserName(profile.userName || "");
      setEmail(profile.email || "");
      setGender(profile.gender || "남성");
      setAge(profile.age || "");
      setMajor(profile.major || "");
      setNickname(profile.nickname || "");
      setContact(profile.contact || "");
      setLocation(profile.location || "");
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userName,
        email,
        nickname,
        gender,
        age,
        major,
        contact,
        location,
      })
    );
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <Container>
      <FormWrapper>
        <Title>마이페이지</Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="이름"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </Select>
          <Input
            type="number"
            placeholder="나이"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Select
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
          >
            <option value="phone">전화번호</option>
            <option value="instagram">인스타그램</option>
            <option value="kakao">카카오톡</option>
          </Select>
          <Input
            type="text"
            placeholder={placeholders[contactMethod]}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <Input
            type="text"
            placeholder="지역"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button type="submit">회원정보 수정</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default MyPage;
