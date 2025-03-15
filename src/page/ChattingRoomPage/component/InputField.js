import React from 'react';
import styled from 'styled-components';
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base/Button';

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
  background-color: #F7E600;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: yellow;
  }
`;

const InputField = ({ message, setMessage, sendMessage }) => {
  return (
    <InputArea>
      <PlusButton>+</PlusButton>
      <InputContainer onSubmit={sendMessage}>
        <StyledInput
          placeholder="Type in here…"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline={false}
          rows={1}
        />
        <SendButton disabled={message === ""} type="submit">
          전송
        </SendButton>
      </InputContainer>
    </InputArea>
  );
};

export default InputField;
