import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../featueres/user/userSlice";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fbcfe8;
  text-align: center;
  max-width: 28rem;
  position:relative;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  width: 200px;
  padding: 10px 15px;
  margin: 10px 0;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const IntroPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>IntroPage</Title>
      <StyledButton onClick={() => navigate("/login")}>로그인</StyledButton>
      <StyledButton onClick={() => navigate("/MatchingPage")}>매칭페이지</StyledButton>
      <StyledButton onClick={() => dispatch(logout())}>로그아웃</StyledButton>
      <StyledButton onClick={() => navigate("/MyPage")}>마이페이지</StyledButton>
    </Container>
  );
};

export default IntroPage;
