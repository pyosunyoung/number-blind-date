import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "@mui/base/Button";

import { useNavigate, useParams } from "react-router-dom";
import InputField from './component/InputField';
import MessageContainer from './component/MessageContainer';
import { useSelector } from 'react-redux';

const AppContainer = styled.div`
  height: 90vh;
  background-color: pink;
  margin-left: auto;
  margin-right: auto;
  max-width: 28rem;
  position: relative;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BackButton = styled(Button)`
  height: 50px;
  width: 50px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
  margin-right: 10px;
`;

const NavUser = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const ChattingRoomPage = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // 유저가 조인한 방의 아이디를 url에서 가져옴
  const {chatRoom} = useSelector((state)=> state.chat)
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  console.log("chatRoom", chatRoom);

  const leaveRoom = () => {
    navigate("/")
  };

  return (
    <AppContainer>
      <Navbar>
        <BackButton onClick={leaveRoom}>←</BackButton>
        <NavUser>{user?.name}</NavUser>
      </Navbar>
      {messageList.length > 0 && (
        <MessageContainer messageList={messageList} user={user} />
      )}
      <InputField
        message={message}
        setMessage={setMessage}
        // sendMessage={sendMessage}
      />
    </AppContainer>
  );
};

export default ChattingRoomPage;
