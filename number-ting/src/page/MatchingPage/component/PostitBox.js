import React from 'react';
import styled from 'styled-components';

const PostitContainer = styled.div`
  background-color: #fff176;
  border-radius: 12px;
  padding: 12px;
  width: 200px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const PostitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const PostitTag = styled.span`
  background-color: #fff59d;
  padding: 4px 8px;
  border-radius: 12px;
`;

const PostitBody = styled.div`
  p {
    margin: 4px 0;
  }
`;

const PostitBox = ({ item }) => {
  return (
    <PostitContainer>
      <PostitHeader>
        <PostitTag>{item.age}세</PostitTag>
        <PostitTag>{item.mbti}</PostitTag>
      </PostitHeader>
      <PostitBody>
        <p><strong>학과:</strong> {item.department}</p>
        <p><strong>키:</strong> {item.height}cm</p>
        <p><strong>관심사:</strong> {item.hobby}</p>
        <p><strong>하고 싶은 말:</strong> {item.highlight}</p>
      </PostitBody>
    </PostitContainer>
  );
};

export default PostitBox;
