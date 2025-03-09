import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const PostitDetailModal = ({ show, onHide, post }) => {
  const { selectedPost } = useSelector((state) => state.post);
  console.log("selectedPost", selectedPost);
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
      </Modal.Footer>
    </Modal>
  )
}

export default PostitDetailModal
