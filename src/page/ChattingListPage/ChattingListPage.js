import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const moveToChat = (rid) => {
    navigate(`/room/${rid}`);
  };
  return (
    // <Container>
    //   <Title>Chatting List Page</Title>
    // </Container>
    <RoomBody>
    <RoomNav>채팅 ▼</RoomNav>
    {rooms.length > 0 &&
      rooms.map((room) => (
        <RoomList key={room._id} onClick={() => moveToChat(room._id)}>
          <RoomTitle>
            <ProfileImage src="/profile.jpeg" />
            <p>{room.room}</p>
          </RoomTitle>
          <MemberNumber>{room.members.length}</MemberNumber>
        </RoomList>
      ))}
  </RoomBody>
  );
};

export default ChattingListPage;