import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../featueres/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단에서 시작 */
  min-height: 100vh;
  height: auto;
  background: #f8f6ff;
  padding: 30px 5px; /* 전체적인 패딩 추가 */
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  background: #9333ea;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
  margin-bottom: 10px;

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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 14px;
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

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("남성");
  const [birth_date, setBirthDate] = useState("");
  const [major, setMajor] = useState("");
  const [location, setLocation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validateEmail = (email) => email.endsWith("@bu.ac.kr");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      alert("올바른 학교 이메일을 입력하세요 (예: example@bu.ac.kr). ");
      return;
    }

    if (userPassword.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    if (userPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreeTerms) {
      alert("서비스 이용약관 및 개인정보 처리방침에 동의해야 합니다.");
      return;
    }

    dispatch(
      registerUser({
        email,
        userName,
        userPassword,
        gender,
        birth_date,
        major,
        location,
        navigate,
      })
    );
  };

  return (
    <Container>
      <LogoWrapper>
        <Logo>BU</Logo>
        <Subtitle>백석대학교 학생들을 위한 특별한 만남</Subtitle>
      </LogoWrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="이름"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="학교 이메일"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호 (8자 이상)"
            required
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </Select>
          <Input
            type="date"
            required
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            type="text"
            placeholder="전공"
            required
            onChange={(e) => setMajor(e.target.value)}
          />
          <Input
            type="text"
            placeholder="지역"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
          <CheckboxContainer>
            <input
              type="checkbox"
              required
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label>서비스 이용약관 및 개인정보 처리방침에 동의합니다.</label>
          </CheckboxContainer>
          <Button type="submit">회원가입</Button>
        </form>
      </FormWrapper>
      <br/>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </Container>
  );
};

export default RegisterPage;
