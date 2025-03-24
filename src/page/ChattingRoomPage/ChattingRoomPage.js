import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "@mui/base/Button";
import { Client, IMessage } from "@stomp/stompjs";

import { useNavigate, useParams } from "react-router-dom";
import InputField from "./component/InputField";
import MessageContainer from "./component/MessageContainer";
import { useSelector } from "react-redux";

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
  // const { id } = useParams(); // 유저가 조인한 방의 아이디를 url에서 가져옴
  // const { chatRoom } = useSelector((state) => state.chat);
  const { id: roomId } = useParams(); // URL에서 채팅방 ID 가져오기
  const [stompClient, setStompClient] = useState(null);
  const [messageList, setMessageList] = useState([]); // 웹소켓 클라이언트를 상태로 저장해서 채팅 서버와의 연결을 유지함.
  const [message, setMessage] = useState("");
  // console.log("chatRoom", chatRoom);

  const leaveRoom = () => {
    navigate("/");
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws-connect", // 백엔드 WebSocket 주소 노션 참고함.
      reconnectDelay: 5000, // 재연결 딜레이
      onConnect: () => {
        console.log("WebSocket 연결 시작");

        // 채팅방 메시지 수신 구독
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessageList((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      console.log("WebSocket 연결 종료");
      client.deactivate();
    };
  }, [roomId]);

  const sendMessage = () => {
    // if (!stompClient || !message.trim()) return;
    if (!stompClient || stompClient.connected !== true || !message.trim()) {
      console.error("WebSocket이 연결되지 않았거나 메시지가 비어 있습니다!");
      return;
    }

    const chatMessage = {
      room_id: parseInt(roomId),
      sender_id: user?.id, // user.id는 백엔드에서 받는 사용자 ID
      message: message,
    };

    stompClient.publish({
      destination: "/pub/chat/send",
      body: JSON.stringify(chatMessage),
    });

    setMessage(""); // 메시지 전송 후 입력 필드 비우기
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
        sendMessage={sendMessage}
      />
    </AppContainer>
  );
};

export default ChattingRoomPage;
