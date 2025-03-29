import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginWithEmail } from "../../featueres/user/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 스타일 컴포넌트 추가
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단에서 시작 */
  min-height: 100vh;
  height: auto;
  background: #f8f6ff;
  padding: 30px 5px;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const { user } = useSelector((state) => state.user);
  const { loginError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [loginError, dispatch]);

  const handleLoginWithEmail = (event) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, userPassword }));
  };

  if (user) {
    navigate("/");
  }

  return (
    <Container>
      <LogoWrapper>
        <Logo>BU</Logo>
        <Subtitle>백석대학교 학생들을 위한 특별한 만남</Subtitle>
      </LogoWrapper>
      {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
      <FormWrapper>
        <form onSubmit={handleLoginWithEmail}>
          <Input
            type="email"
            placeholder="학교 이메일"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit">로그인</Button>
        </form>
        <p>
          계정이 없다면? <Link to="/RegisterPage">회원가입 하기</Link>
        </p>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;

