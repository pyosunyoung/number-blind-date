import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createChatRoom } from '../../../featueres/chat/chatSlice';
const PostitDetailModal = ({ show, onHide, post }) => {
  const { selectedPost } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log("selectedPost", selectedPost);
  const gotochat = async() =>{
    try {
      await dispatch(createChatRoom(post.email)).unwrap();
      navigate("/ChattingRoom"); // 채팅방 페이지로 이동
    } catch (error) {
      console.error("채팅방 생성 오류:", error);
      alert("채팅방을 생성할 수 없습니다.");
    }
  }
  
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{post?.nickname}님의 프로필</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {post ? (
          <div>
            <p><strong>성별:</strong> {post.gender}</p>
            <p><strong>나이:</strong> {post.age}</p>
            <p><strong>전공:</strong> {post.major}</p>
            <p><strong>MBTI:</strong> {post.mbti}</p>
            <p><strong>키:</strong> {post.height}cm</p>
            <p><strong>취미:</strong> {post.hobbies}</p>
            <p><strong>하고 싶은 말:</strong> {post.highlight}</p>
          </div>
        ) : (
          <p>정보를 불러오는 중...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>닫기</Button>
        <Button variant="primary" onClick={gotochat}>1대1 채팅하기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PostitDetailModal
