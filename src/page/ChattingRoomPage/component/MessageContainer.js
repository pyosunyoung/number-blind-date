import React from "react";
import styled from "styled-components";
import { Container } from "@mui/system";

const SystemMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SystemMessage = styled.p`
  background-color: #55667758;
  border-radius: 100px;
  text-align: center;
  color: white;
  padding: 2px 15px;
  font-size: 14px;
`;

const MyMessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
`;

const MyMessage = styled.div`
  background-color: #f7e600;
  border-radius: 8px;
  padding: 8px;
  max-width: 200px;
  font-size: 12px;
`;

const YourMessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const YourMessage = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  max-width: 200px;
  font-size: 12px;
`;

const ProfileImage = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 100px;
  margin-right: 10px;
`;

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => (
        <Container key={message._id}>
          {message.user.name === "system" ? (
            <SystemMessageContainer>
              <SystemMessage>{message.chat}</SystemMessage>
            </SystemMessageContainer>
          ) : message.user.name === user.name ? (
            <MyMessageContainer>
              <MyMessage>{message.chat}</MyMessage>
            </MyMessageContainer>
          ) : (
            <YourMessageContainer>
              <ProfileImage
                src="/profile.jpeg"
                style={
                  (index === 0
                    ? { visibility: "visible" }
                    : messageList[index - 1].user.name === user.name) ||
                  messageList[index - 1].user.name === "system"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              />
              <YourMessage>{message.chat}</YourMessage>
            </YourMessageContainer>
          )}
        </Container>
      ))}
    </div>
  );
};

export default MessageContainer;
