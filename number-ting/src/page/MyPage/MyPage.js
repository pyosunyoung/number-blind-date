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
  const [birth_date, setBirthDate] = useState("");
  const [major, setMajor] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setUserName(profile.userName || "");
      setEmail(profile.email || "");
      setGender(profile.gender || "남성");
      setBirthDate(profile.birth_date || "");
      setMajor(profile.major || "");
      setLocation(profile.location || "");
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userName,
        email,
        gender,
        birth_date,
        major,
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
            type="date"
            value={birth_date}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
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
