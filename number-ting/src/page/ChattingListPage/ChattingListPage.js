import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  text-align: center;
  max-width: 25rem;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ChattingListPage = () => {
  return (
    <Container>
      <Title>Chatting List Page</Title>
    </Container>
  );
};

export default ChattingListPage;