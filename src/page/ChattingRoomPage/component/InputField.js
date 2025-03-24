import React from "react";
import styled from "styled-components";
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";

const InputArea = styled.div`
  background-color: white;
  min-height: 50px;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const PlusButton = styled.div`
  background-color: lightslategray;
  width: 50px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const InputContainer = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledInput = styled(Input)`
  height: 100%;
  width: 100%;
  border: none;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled(Button)`
  min-width: 70px;
  border-radius: 0;
  background-color: #f7e600;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: yellow;
  }
`;

// const InputField = ({ message, setMessage, sendMessage }) => {
//   return (
//     <InputArea>
//       <PlusButton>+</PlusButton>
//       <InputContainer onSubmit={sendMessage}>
//         <StyledInput
//           placeholder="Type in here…"
//           value={message}
//           onChange={(event) => setMessage(event.target.value)}
//           multiline={false}
//           rows={1}
//         />
//         <SendButton disabled={message === ""} type="submit">
//           전송
//         </SendButton>
//       </InputContainer>
//     </InputArea>
//   );
// };

const InputField = ({ message, setMessage, sendMessage }) => {
  // 엔터 키 입력 시 메시지 전송
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 폼 제출 방지
      sendMessage();
    }
  };

  return (
    <InputArea>
      <PlusButton>+</PlusButton>
      <InputContainer
        onSubmit={(event) => {
          event.preventDefault(); // 새로고침 방지
          sendMessage();
        }}
      >
        <StyledInput
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={handleKeyPress} // Enter 키 입력 시 전송
          multiline={false}
          rows={1}
        />
        <SendButton disabled={message.trim() === ""} type="submit">
          전송
        </SendButton>
      </InputContainer>
    </InputArea>
  );
};

export default InputField;
