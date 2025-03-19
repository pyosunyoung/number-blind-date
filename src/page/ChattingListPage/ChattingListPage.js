import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getChatList } from '../../featueres/chat/chatSlice';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f0f0f0;
//   text-align: center;
//   max-width: 25rem;
//   margin: auto;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   margin-bottom: 20px;
// `;
const RoomBody = styled.div`
  height: 100vh;
  background-color: whitesmoke;
  margin-left: auto;
  margin-right: auto;
  max-width: 28rem;
  position: relative;
`;

const RoomNav = styled.div`
  padding: 20px 10px;
  background-color: white;
`;

const RoomList = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
`;

const RoomTitle = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  border-radius: 20px;
  margin-right: 10px;
`;

const MemberNumber = styled.div`
  color: white;
  background-color: rgb(237, 71, 71);
  border-radius: 50px;
  padding: 3px 8px;
`;




const ChattingListPage = ({ rooms }) => {
  const  {chatList} = useSelector((state)=>state.chat);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem("access_token");
  const moveToChat = (rid) => {
    navigate(`/ChattingRoom/${rid}`);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getChatList(accessToken));
    }

  }, [accessToken, dispatch]);
  console.log("1",chatList);
 

// 문득든생각 닉네임 중복검사 빡세게 해야할듯
  // const TestChatList = 
  //     [
  //       {
  //         chatRoomId: 1,
  //         owner: "백석대 차은우",
  //         sender: "백석대 표선영",
  //       },
  //       {
  //         chatRoomId: 2,
  //         owner: "백석대 설윤",
  //         sender: "백석대 표선영",
  //       },
  //       {
  //         chatRoomId: 3,
  //         owner: "백석대 장원영",
  //         sender: "백석대 표선영",
  //       },

  //     ]
    
  
//   return (
//     // <Container>
//     //   <Title>Chatting List Page</Title>
//     // </Container> // 밑에 테스트시 TestChatList는는 => chatList로 모두 변경 부탁드립니다~
//     <RoomBody>공지사항
//     <RoomNav>채팅 ▼</RoomNav>
//     {TestChatList.length > 0 &&
//       TestChatList.map((room) => (
//         <RoomList key={room.chatRoomId} onClick={() => moveToChat(room.owner)}> 
//           <RoomTitle>
//             <ProfileImage src="/profile.jpeg" />
//             <p>{room.owner}</p>
//           </RoomTitle>
//           <MemberNumber>{TestChatList.length}</MemberNumber>
//         </RoomList>
//       ))} 
//   </RoomBody>
//   );
// };

// export default ChattingListPage;

return (
  <RoomBody>
    공지사항
    <RoomNav>채팅 ▼</RoomNav>

    {/* 🔥 오류 발생 시 메시지 표시 */}


    {/* 🔥 채팅방 목록 표시 (안전하게 옵셔널 체이닝 사용) */}
    {chatList?.length > 0 ? (
      chatList.map((room) => (
        <RoomList key={room.chatRoomId} onClick={() => moveToChat(room.chatRoomId)}>
          <RoomTitle>
            <ProfileImage src="/profile.jpeg" />
            <p>{room.chatRoomName}</p>
          </RoomTitle>
          <MemberNumber>{chatList.length}</MemberNumber>
        </RoomList>
      ))
    ) : (
      <p>채팅방이 없습니다.</p>
    )}
  </RoomBody>
);
};

export default ChattingListPage;