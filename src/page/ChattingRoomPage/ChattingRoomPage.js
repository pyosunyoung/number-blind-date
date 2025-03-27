import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/base/Button";
import { Client } from "@stomp/stompjs";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "./component/InputField";
import MessageContainer from "./component/MessageContainer";
import { useSelector, useDispatch } from "react-redux";
import { deleteChatRoom } from "../../featueres/chat/chatSlice";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const BackButton = styled(Button)`
  height: 50px;
  width: 50px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
`;

const NavUser = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const BurgerMenu = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
`;

const SideMenu = styled.div`
  height: 100vh;
  width: ${(props) => (props.open ? "250px" : "0")};
  position: absolute;
  top: 0;
  right: 0; // 왼쪽이 아니라 오른쪽에서 나오도록 변경
  background-color: rgb(189, 42, 42);
  overflow-x: hidden;
  transition: width 0.5s ease; // 부드럽게 열리도록 애니메이션 적용
  padding-top: 60px;
  z-index: 2;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 36px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
`;

const SideMenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;

  button {
    margin: 5px;
    border: none;
    background: none;
    width: 120px;
    color: white;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: black;
      border-radius: 3px;
    }
  }
`;

const LeaveButton = styled.button`
  background: red;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
`;

const ChattingRoomPage = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // 유저가 조인한 방의 아이디를 url에서 가져옴
  // const { chatRoom } = useSelector((state) => state.chat);
  const { chatRoom } = useSelector((state) => state.chat);
  const { id: roomId } = useParams(); // URL에서 채팅방 ID 가져오기
  const [stompClient, setStompClient] = useState(null);
  const [messageList, setMessageList] = useState([]); // 웹소켓 클라이언트를 상태로 저장해서 채팅 서버와의 연결을 유지함.
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  // console.log("chatRoom", chatRoom);

  const leaveRoom = () => {
    navigate("/");
  };

  const deleteRoom = async () => {
    try {
      await dispatch(deleteChatRoom(id)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("채팅방 나가기 오류:", error);
      alert("채팅방을 나갈 수 없습니다.");
    }
  };

  // useEffect(() => {
  //   const client = new Client({
  //     brokerURL: "ws://localhost:8080/ws-connect", // 백엔드 WebSocket 주소 노션 참고함.
  //     reconnectDelay: 5000, // 재연결 딜레이
  //     onConnect: () => {
  //       console.log("WebSocket 연결 시작");

  //       // 채팅방 메시지 수신 구독
  //       client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
  //         const receivedMessage = JSON.parse(message.body);
  //         setMessageList((prevMessages) => [...prevMessages, receivedMessage]);
  //       });
  //     },
  //   });

  //   client.activate();
  //   setStompClient(client);

  //   return () => {
  //     console.log("WebSocket 연결 종료");
  //     client.deactivate();
  //   };
  // }, [roomId]);

  // 채팅 내역 가져오기 (GET 방식)
  useEffect(() => {
    const loadChatMessages = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        const cleanToken = accessToken ? accessToken.trim() : "";

        const response = await axios.get(
          `http://localhost:8080/chat/room/${roomId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
            },
          }
        );
        setMessageList(response.data); // 채팅 메시지 목록 설정
      } catch (error) {
        console.error("채팅 메시지 로드 실패", error);
      }
    };
    loadChatMessages();
  }, [roomId]); // roomId가 변경될 때마다 메시지 로드

  const sendMessage = () => {
    // if (!stompClient || !message.trim()) return;
    if (!stompClient || stompClient.connected !== true || !message.trim()) {
      console.error("WebSocket이 연결되지 않았거나 메시지가 비어 있습니다!");
      return;
    }

    // const chatMessage = {
    //   room_id: parseInt(roomId),
    //   sender_id: user?.id, // user.id는 백엔드에서 받는 사용자 ID
    //   message: message,
    // };
    const chatMessage = {
      chatRoomId: parseInt(roomId),
      content: message,
    };

    const accessToken = sessionStorage.getItem("access_token");
    const cleanToken = accessToken ? accessToken.trim() : "";

    stompClient.publish({
      destination: `/pub/chat/${roomId}`,
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },

      body: JSON.stringify(chatMessage),
    });

    setMessage(""); // 메시지 전송 후 입력 필드 비우기
  };

  // WebSocket 연결 및 구독 설정
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws-connect", // WebSocket 서버 URL
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

  return (
    <AppContainer>
      <Navbar>
        <BackButton onClick={leaveRoom}>←</BackButton>
        <NavUser>{user?.name}</NavUser>
        <BurgerMenu icon={faBars} onClick={() => setMenuOpen(true)} />
      </Navbar>
      {messageList.length > 0 && (
        <MessageContainer messageList={messageList} user={user} />
      )}
      <InputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />

      <SideMenu open={menuOpen}>
        <CloseButton onClick={() => setMenuOpen(false)}>&times;</CloseButton>
        <SideMenuList>
          <h2 style={{ color: "white" }}>채팅 참여자</h2>
          {chatRoom?.participants?.length > 0 ? ( // 채팅 참여자
            chatRoom.participants.map((user, index) => (
              <button key={index}>{user.name}</button>
            ))
          ) : (
            <p style={{ color: "white" }}>참여자가 없습니다.</p>
          )}
          <LeaveButton onClick={deleteRoom}>나가기</LeaveButton>
        </SideMenuList>
      </SideMenu>
    </AppContainer>
  );
};

export default ChattingRoomPage;
